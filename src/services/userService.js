import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import jwt from 'jsonwebtoken';
require("dotenv").config()
const salt = bcrypt.genSaltSync(10);
let getAllBlog = (blogId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = "";
            if (!blogId) {
                blog = await db.Blog.findAll({
                });
            }
            if (blogId && blogId !== "ALL") {
                blog = await db.Blog.findOne({
                    where: {
                        id: blogId,
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
                    attributes: ["id", "email", "password", "roleID", "jwtToken"],
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
}