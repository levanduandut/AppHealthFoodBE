import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import jwt from 'jsonwebtoken';
require("dotenv").config()
const salt = bcrypt.genSaltSync(10);

let createNewIngredient = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let calo = Number(data.calo)
            let protein = Number(data.protein)
            let fat = Number(data.fat)
            let carb = Number(data.carb)
            let fiber = Number(data.fiber)
            let cholesterol = Number(data.cholesterol)
            let canxi = Number(data.canxi)
            let photpho = Number(data.photpho)
            let fe = Number(data.fe)
            let natri = Number(data.natri)
            let kali = Number(data.kali)
            let betacaroten = Number(data.betacaroten)
            let vita = Number(data.vita)
            let vitb1 = Number(data.vitb1)
            let vitc = Number(data.vitc)
            if (!data) {
                resolve({
                    errCode: 1,
                    message: "Error !",
                });
            }
            else {
                await db.Ingredient.create({
                    name: data.name,
                    category: data.category,
                    unit: data.unit,
                    calo: calo,
                    protein: protein,
                    fat: fat,
                    carb: carb,
                    fiber: fiber,
                    cholesterol: cholesterol,
                    canxi: canxi,
                    photpho: photpho,
                    fe: fe,
                    natri: natri,
                    kali: kali,
                    betacaroten: betacaroten,
                    vita: vita,
                    vitb1: vitb1,
                    vitc: vitc,
                });
                resolve({
                    errCode: 0,
                    message: "Save Ok",
                });
            }

        } catch (error) {
            reject(error);
        }
    });
};
let deleteAllIngredient = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = "";
            if (data.Delete === 1) {
                message = "Done Delete"
                await db.Ingredient.destroy({
                    where: {},
                    truncate: true
                })
            }
        } catch (error) {
            reject(error);
        }
    });
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // coparepass
                let user = await db.User.findOne({
                    attributes: ["id", "email", "password", "roleID", "jwtToken"],
                    where: {
                        email: email,
                    },
                    raw: true,
                });

                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (user.roleID != 1) {
                        userData.errCode = 5;
                        userData.errmessage = "Không phải tài khoản Admin !";
                    }
                    else if (user.roleID == 1 && check) {

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
                userData.errmessage = "Email không tồn tại";
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
}

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
                    age: data.age,
                    address: data.address,
                    // phoneNumber: data.phoneNumber,
                    gender: data.gender === "1" ? true : false,
                    // image: DataTypes.STRING,
                    roleId: data.roleId,
                    // positionId: DataTypes.STRING,
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
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = "";
            if (!userId) {
                users = await db.User.findAll({
                    order: [
                        ['age', 'DESC'],
                        ["email", "ASC"],
                    ],
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    attributes: {
                        exclude: ["password"],
                    },
                    where: {
                        id: userId,
                    },
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: "Khong co id",
                    data,
                });
            } else {
                let user = await db.User.findOne({
                    where: {
                        id: data.id,
                    },
                });
                if (user) {
                    user.fullName = data.fullName;
                    user.gender = data.gender;
                    user.roleId = data.roleId;
                    user.age = data.age;

                    await user.save();
                    resolve({
                        errCode: 0,
                        message: "da sua",
                        data,
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: "Khong sua dc ",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deleteUserData = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: idUser } });
            if (!user) {
                resolve({
                    errCode: 1,
                    message: "Khong ton tai",
                    idUser,
                });
            }
            await db.User.destroy({
                where: { id: idUser },
            });
            resolve({
                errCode: 0,
                message: "Delete OK",
                idUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};
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
module.exports = {
    createNewUser,
    getAllUser,
    updateUserData,
    deleteUserData,
    handleUserLogin,
    createNewIngredient,
    deleteAllIngredient,
}