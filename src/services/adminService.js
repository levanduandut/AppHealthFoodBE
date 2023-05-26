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
            console.log(data)
            data.forEach(async (value, index) => {
                await db.Ingredient.create({
                    name: value.name,
                    category: value.category,
                    unit: value.unit,
                    calo: Number(value.calo),
                    protein: Number(value.protein),
                    fat: Number(value.fat),
                    carb: Number(value.carb),
                    fiber: Number(value.fiber),
                    cholesterol: Number(value.cholesterol),
                    canxi: Number(value.canxi),
                    photpho: Number(value.photpho),
                    fe: Number(value.fe),
                    natri: Number(value.natri),
                    kali: Number(value.kali),
                    betacaroten: Number(value.betacaroten),
                    vita: Number(value.vita),
                    vitb1: Number(value.vitb1),
                    vitc: Number(value.vitc),
                });
            })
            resolve({
                errCode: 0,
                message: "Save Ok",
            });
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
            resolve({
                errCode: 0,
                message: "Delete All Ok",
            });
            
        } catch (error) {
            reject(error);
        }
    });
}

let updateIngredientData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: "Khong co id Ingredient",
                    data,
                });
            } else {
                let ingredient = await db.Ingredient.findOne({
                    where: {
                        id: data.id,
                    },
                });
                if (ingredient) {
                    // ingredient.name= data.name,
                    ingredient.category= data.category,
                    ingredient.unit= data.unit,
                    ingredient.calo= Number(data.calo),
                    ingredient.protein= Number(data.protein),
                    ingredient.fat= Number(data.fat),
                    ingredient.carb= Number(data.carb),
                    ingredient.fiber= Number(data.fiber),
                    ingredient.cholesterol= Number(data.cholesterol),
                    ingredient.canxi= Number(data.canxi),
                    ingredient.photpho= Number(data.photpho),
                    ingredient.fe= Number(data.fe),
                    ingredient.natri= Number(data.natri),
                    ingredient.kali= Number(data.kali),
                    ingredient.betacaroten= Number(data.betacaroten),
                    ingredient.vita= Number(data.vita),
                    ingredient.vitb1= Number(data.vitb1),
                    ingredient.vitc= Number(data.vitc),

                    await ingredient.save();
                    resolve({
                        errCode: 0,
                        message: "Da sua",
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

let deleteOneIngredient = (idIngre) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ingre = await db.Ingredient.findOne({ where: { id: idIngre } });
            if (!ingre) {
                resolve({
                    errCode: 1,
                    message: "Khong ton tai",
                    idIngre,
                });
            }
            await db.Ingredient.destroy({
                where: { id: idIngre },
            });
            resolve({
                errCode: 0,
                message: "Delete OK",
                idIngre,
            });
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
    deleteOneIngredient,
    updateIngredientData,
}