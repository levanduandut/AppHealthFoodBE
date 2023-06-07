import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import jwt from 'jsonwebtoken';
require("dotenv").config()
const salt = bcrypt.genSaltSync(10);

let createNewHealth = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let vT = verifyToken(data.token);
            console.log(vT.id);
            let idUser = vT.id;
            if (data) {
                await db.Health.create({
                    userId: Number(idUser),
                    sickId: Number(data.sickId),
                    haTruong: Number(data.haTruong),
                    haThu: Number(data.haThu),
                    duongH: Number(data.duongH),
                    height: Number(data.height),
                    weight: Number(data.weight),
                    bmi: Number(data.bmi),
                });
                let user = await db.User.findOne({
                    where: {
                        id: idUser,
                    },
                });
                user.status = 1;
                user.sickId = data.sickId;
                await user.save();
                resolve({
                    errCode: 0,
                    message: "Lưu thành công !",
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Lưu không thành công !",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getHealthInfo = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = verifyToken(token)
            if (data.id) {
                let user = await db.Health.findAll({
                    limit: 1,
                    where: {
                        userId: data.id,
                    },
                    order: [['createdAt', 'DESC']]
                })
                if (user) {
                    delete user.password;
                    resolve(user);
                } else {
                    resolve({
                        errCode: 1,
                    });
                }
            }
            resolve({
                errCode: 2,
            });

        } catch (error) {
            reject(error);
        }
    });
};
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: "Đã có tài khoản đăng ký bằng email này !",
                });
            }
            else {
                let hashPassword = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    fullName: data.fullName,
                    age: Number(data.age),
                    gender: Number(data.gender),
                    roleId: 2,
                });
                resolve({
                    errCode: 0,
                    message: "OK",
                    data,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getAllSick = (sickId, info) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (info === 0) {
                let sick = "";
                if (!sickId) {
                    sick = await db.Sick.findAll({
                        attributes: ['id', 'name'],
                    });
                }
                if (sickId && sickId !== "ALL") {
                    sick = await db.Sick.findAll({
                        attributes: ['id', 'name'],
                        where: {
                            id: sickId,
                        },
                    });
                }
                const newArrayOfObj = sick.map(({
                    id: key,
                    name: value,
                }) => ({
                    key,
                    value,
                }));
                resolve(newArrayOfObj);
            }
            else if (info === 1) {
                console.log("hehe");
                let sick = "";
                if (!sickId) {
                    sick = await db.Sick.findAll({
                        order: [['id', 'DESC']]
                    });
                }
                if (sickId && sickId !== "ALL") {
                    sick = await db.Sick.findAll({
                        where: {
                            id: sickId,
                        },
                    });
                }
                resolve(sick);
            }
            else {
                let sick = "";
                if (!sickId) {
                    sick = await db.Sick.findAll({
                    });
                }
                if (sickId && sickId !== "ALL") {
                    sick = await db.Sick.findAll({
                        where: {
                            id: sickId,
                        },
                    });
                }
                resolve(sick);
            }

        } catch (error) {
            reject(error);
        }
    });
};
let getAllBlog = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = "";
            if (!categoryId) {
                blog = await db.Blog.findAll({

                });
            }
            if (categoryId && categoryId !== "ALL") {
                blog = await db.Blog.findAll({
                    where: {
                        categoryId: categoryId,
                    },
                });
            }
            resolve(blog);
        } catch (error) {
            reject(error);
        }
    });
};
let getAllIngredient = (IngreId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let ingre = "";
            if (!IngreId) {
                ingre = await db.Ingredient.findAll({

                });
            }
            if (IngreId && IngreId !== "ALL") {
                ingre = await db.Ingredient.findOne({
                    where: {
                        id: IngreId,
                    },
                });
            }
            resolve(ingre);
        } catch (error) {
            reject(error);
        }
    });
};
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // coparepass
                let user = await db.User.findOne({
                    attributes: ["id", "status", "email", "password", "sickId", "roleID", "jwtToken"],
                    where: {
                        email: email,
                    },
                    raw: true,
                });
                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        let payload = { id: user.id, roleID: user.roleID, email: email }
                        let jwtToken = null;
                        try {
                            jwtToken = await jwt.sign(payload, process.env.JWT_SECRET);
                        } catch (error) {
                            console.log(error)
                        }
                        let userx = await db.User.findOne({
                            where: {
                                id: user.id,
                            },
                        });
                        if (userx) {
                            userx.jwtToken = jwtToken;
                            await userx.save();
                        }
                        userData.status = userx.status;
                        userData.sickId = userx.sickId;
                        userData.errCode = 0;
                        userData.errmessage = null;
                        userData.jwtToken = jwtToken;
                        delete user.password;// Hien trhong tin user
                    } else {
                        userData.errCode = 3;
                        userData.errmessage = "Sai mật khẩu !";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errmessage = "Tài khoản không tồn tại !";
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.errmessage = "Mail không tồn tại";
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
}
let checkUserEmail = userEmail => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail,
                },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    });
};
let verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let encoded = jwt.verify(token, key);
        data = encoded;
    } catch (error) {
        console.log(error)
    }
    return data;
}
let handleUserInfo = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = verifyToken(token)
            let user = await db.User.findOne({ where: { id: data.id }, raw: true });
            if (user) {
                delete user.password;
                resolve(user);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    handleUserLogin,
    handleUserInfo,
    getAllIngredient,
    getAllBlog,
    createNewUser,
    getAllSick,
    createNewHealth,
    getHealthInfo
}