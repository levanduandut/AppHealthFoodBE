import { INTEGER, where, fn } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { raw, urlencoded } from "body-parser";
import jwt from 'jsonwebtoken';
require("dotenv").config()
const salt = bcrypt.genSaltSync(10);
import axios from "axios";

let translateLang = async (text, lang) => {
    return new Promise(async (resolve, reject) => {
        try {
            const encodedParams = new URLSearchParams();
            encodedParams.set('target', 'en');
            encodedParams.set('source', 'vi');
            encodedParams.set('q', text);
            const options = {
                method: 'POST',
                url: process.env.URLTRANSLATE,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Accept-Encoding': 'application/gzip',
                    'X-RapidAPI-Key': process.env.KEY_TRANS,
                    'X-RapidAPI-Host': process.env.HOST_TRANS
                },
                data: encodedParams,
            };
            try {
                const response = await axios.request(options);
                let x = response.data.data.translations[0].translatedText;
                resolve(x);

            } catch (error) {
                resolve({
                    errCode: 1,
                })
            }
        } catch (error) {
            reject(error);
        }
    });
}

let updateUserInfo = (data, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let id = verifyToken(token).id;
            if (!id) {
                resolve({
                    errCode: 1,
                    message: "Không có id User",
                    data,
                });
            } else {
                let user = await db.User.findOne({
                    where: {
                        id: id,
                    },
                });
                if (user) {
                    user.fullName = data.name;
                    user.gender = data.gender;
                    user.age = data.age;
                    await user.save();
                    resolve({
                        errCode: 0,
                        message: "Đã sửa",
                        data,
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: "Không sửa được",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getCaloById = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = verifyToken(token);
            let calo = '';
            if (data.id) {
                let user = await db.User.findOne({ where: { id: data.id }, raw: true });
                let health = await db.Health.findAll({
                    limit: 1,
                    where: {
                        userId: data.id,
                    },
                    order: [['createdAt', 'DESC']]
                })
                if (user != null && health.length === 1) {
                    if (user.gender == 2) {
                        calo = 66 + (13.7 * (health[0].weight)) + (5 * (health[0].height)) - (6.8 * (user.age));
                    }
                    else {
                        calo = 665 + (9.6 * (health[0].weight)) + (1.8 * (health[0].height)) - (4.7 * (user.age));
                    }
                    resolve(calo);
                } else {
                    resolve({
                        errCode: 1
                    });
                }
            }
            else {
                resolve(calo);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getFieldIngredient = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let ingredient = await db.Ingredient; // Lấy model "Ingredient" từ models/index.js
            let fields = Object.keys(ingredient.rawAttributes); // Lấy các trường của model "Ingredient"
            let unwantedFields = ['id', 'updatedAt', 'createdAt', 'category', 'name', 'unit'];
            let filteredFields = fields.filter(field => !unwantedFields.includes(field));
            resolve(filteredFields);
        } catch (error) {
            reject(error);
        }
    });
};
let getSickIngredient = (sickId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datax = "";
            let datay = "";
            let data = "";
            let arr = "";
            if (sickId && sickId !== "ALL") {
                arr = await db.Sick.findOne({
                    where: {
                        id: sickId,
                    },
                    attributes: ['arring'],
                    raw: true
                });
            }
            let ingredient = await db.Ingredient; // Lấy model "Ingredient" từ models/index.js
            let fields = Object.keys(ingredient.rawAttributes); // Lấy các trường của model "Ingredient"
            let unwantedFields = ['id', 'updatedAt', 'createdAt', 'category', 'name', 'unit'];
            let filteredFields = fields.filter(field => !unwantedFields.includes(field));
            if (arr.arring !== null) {
                let arringItems = arr.arring.split(","); // Tách các phần tử trong chuỗi thành mảng
                let sortingExpressionX = "";
                let sortingExpressionY = "";

                for (let i = 0; i < arringItems.length; i++) {
                    let item = arringItems[i].trim(); // Xóa khoảng trắng đầu và cuối
                    let [fieldIndex, multiplier = 1] = item.split(":"); // Tách số cũ và hệ số nhân
                    let fieldName = filteredFields[Math.abs(parseInt(fieldIndex))]; // Lấy tên trường từ filteredFields
                    let expression = `(${fieldName} * ${multiplier})`; // Biểu thức sắp xếp cho mỗi phần tử
                    if (parseInt(fieldIndex) >= 0) {
                        if (sortingExpressionX !== "") {
                            sortingExpressionX += " + ";
                        }
                        sortingExpressionX += expression;
                    } else {
                        if (sortingExpressionY !== "") {
                            sortingExpressionY += " + ";
                        }
                        sortingExpressionY += expression;
                    }
                }

                if (sortingExpressionX !== "") {
                    datax = await db.Ingredient.findAll({
                        limit: 10,
                        where: {},
                        raw: true,
                        order: [[db.sequelize.literal(`(${sortingExpressionX}) DESC`)]]
                    });
                }

                if (sortingExpressionY !== "") {
                    datay = await db.Ingredient.findAll({
                        limit: 7,
                        where: {},
                        raw: true,
                        order: [[db.sequelize.literal(`(${sortingExpressionY}) DESC`)]]
                    });
                }
            }
            data = {
                should: datax,
                shouldnot: datay
            };
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

let getStatusUser = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = verifyToken(token);
            let sickId = '';
            let status = '';
            let errCode = 0;
            let user = await db.Health.findAll({
                limit: 1,
                where: {
                    userId: data.id,
                },
                order: [['createdAt', 'DESC']],
                raw: true
            })
            if (user.length > 0) {
                sickId = user[0].sickId;
            } else {
                errCode = 1;
            }

            let userx = await db.User.findOne({ where: { id: data.id }, raw: true });
            if (userx) {
                status = userx.status;
            }
            resolve({
                errCode: errCode,
                sickId: sickId,
                status: status,

            });
        } catch (error) {
            reject(error);
        }
    });
};
let getAbsorbInfo = (token, x) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = verifyToken(token);
            if (data) {
                if (data.id) {
                    let user = await db.Absorb.findAll({
                        limit: parseInt(x),
                        where: {
                            idUser: data.id,
                        },
                        order: [['createdAt', 'ASC']]
                    });
                    if (user) {
                        resolve(user);
                    } else {
                        resolve({
                            errCode: 1,
                        });
                    }
                } else {
                    resolve({
                        errCode: 2,
                    });
                }
            } else {
                resolve({
                    errCode: 3,
                });
            }
        } catch (error) {
            // Xử lý hoặc bỏ qua lỗi tùy vào ngữ cảnh
            console.error('Lỗi khi lấy thông tin absorb:', error);
            reject(error); // Hoặc resolve với giá trị mặc định khác tùy vào ngữ cảnh
        }
    });
};
let createNewAbsorb = (data, token, eat) => {
    return new Promise(async (resolve, reject) => {
        try {
            let vT = await verifyToken(token);
            let idUser = vT.id;
            if (data) {
                await db.Absorb.create({
                    idUser: Number(idUser),
                    eat: eat,
                    totalCalo: Number(data.totalCalo),
                    totalTinhBot: Number(data.totalTinhBot),
                    totalCho: Number(data.totalCho),
                    totalFatSat: Number(data.totalFatSat),
                    totalFatTotal: Number(data.totalFatTotal),
                    totalChatXo: Number(data.totalChatXo),
                    totalKali: Number(data.totalKali),
                    totalPro: Number(data.totalPro),
                    totalSize: Number(data.totalSize),
                    totalNatri: Number(data.totalNatri),
                    totalSugar: Number(data.totalSugar),
                });
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
let getAllFood = (dataId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = "";
            if (dataId.categoryId) {
                let categoryId = dataId.categoryId;
                if (categoryId === "ALL") {
                    data = await db.Food.findAll({

                    });
                }
                if (categoryId && categoryId !== "ALL") {
                    data = await db.Food.findAll({
                        where: {
                            categoryId: categoryId,
                        },
                    });
                }
            }
            else {
                let sickId = dataId.sickId;
                if (sickId === "ALL") {
                    data = await db.Food.findAll({

                    });
                }
                if (sickId && sickId !== "ALL") {
                    data = await db.Food.findAll({
                        where: {
                            [Op.or]: [{ sickId: sickId }, { sickId1: sickId }, { sickId2: sickId }]
                        },
                    });
                }
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
let getAllFoodCa = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = "";
            if (!categoryId) {
                data = await db.CategoryFood.findAll({

                });
            }
            if (categoryId && categoryId !== "ALL") {
                data = await db.CategoryFood.findAll({
                    where: {
                        categoryId: categoryId,
                    },
                });
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
let getAllExerciseCa = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = "";
            if (!categoryId) {
                data = await db.CategoryExercise.findAll({

                });
            }
            if (categoryId && categoryId !== "ALL") {
                data = await db.CategoryExercise.findAll({
                    where: {
                        categoryId: categoryId,
                    },
                });
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
let getAllExercise = (dataId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = "";
            if (dataId.categoryId) {
                let categoryId = dataId.categoryId;
                if (categoryId === "ALL") {
                    data = await db.Exercise.findAll({

                    });
                }
                if (categoryId && categoryId !== "ALL") {
                    data = await db.Exercise.findAll({
                        where: {
                            categoryId: categoryId,
                        },
                    });
                }
            }
            else {
                let sickId = dataId.sickId;
                if (sickId === "ALL") {
                    data = await db.Exercise.findAll({

                    });
                }
                if (sickId && sickId !== "ALL") {
                    data = await db.Exercise.findAll({
                        where: {
                            [Op.or]: [{ sickId: sickId }, { sickId1: sickId }, { sickId2: sickId }]
                        },
                    });
                }
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

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
let getHealthInfo = (token, x) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = verifyToken(token);
            if (data) {
                if (data.id) {
                    let user = await db.Health.findAll({
                        limit: x,
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
                else {
                    resolve({
                        errCode: 2,
                    });
                }
            }
            else {
                resolve({
                    errCode: 3,
                });
            }


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
                    attributes: ["id", "status", "email", "password", "roleID", "jwtToken"],
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
    if (token) {
        try {
            let encoded = jwt.verify(token, key);
            data = encoded;
        } catch (error) {
            console.log(error)
        }
    }
    return data;
}
let handleUserInfo = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = verifyToken(token)
            if (data.id) {
                let user = await db.User.findOne({ where: { id: data.id }, raw: true });
                if (user) {
                    delete user.password;
                    resolve(user);
                } else {
                    resolve({});
                }
            }
            else {
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
    getHealthInfo,
    getAllExerciseCa,
    getAllExercise,
    getAllFoodCa,
    getAllFood,
    createNewAbsorb,
    getAbsorbInfo,
    getStatusUser,
    getSickIngredient,
    getFieldIngredient,
    getCaloById,
    translateLang,
    updateUserInfo
}