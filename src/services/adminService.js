import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import jwt from 'jsonwebtoken';
const fs = require('fs')
require("dotenv").config()
const salt = bcrypt.genSaltSync(10);
const Multer = require("multer");

const { Storage } = require('@google-cloud/storage');
const path = require("path");
const multerx = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
    },
});
const storage = new Storage({
    keyFilename: path.join(__dirname, "../fiery-atlas-388115-cbec4b777bcb.json"),
    projectId: 'fiery-atlas-388115',
})
const buckket = storage.bucket('healthfood-do');

//Sick
let createNewSick = (data, urlImage, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            try {
                if (req.file) {
                    const blob = buckket.file(req.file.originalname);
                    const blobStream = blob.createWriteStream();
                    await blobStream.on('finish', () => {
                    })
                    blobStream.end(req.file.buffer);
                }
            } catch (error) {
                console.log(error)
            }
            await db.Sick.create({
                name: data.name,
                tag: data.tag,
                detail: data.detail,
                image: req.file.originalname,
            });
            resolve({
                errCode: 0,
                message: "Save Ok",
            });
        } catch (error) {
            reject(error);
        }
    });
};

//Blog
let deleteOneBlog = (idBlog) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = await db.Blog.findOne({ where: { id: idBlog } });
            if (!blog) {
                resolve({
                    errCode: 1,
                    message: "Khong ton tai",
                    idBlog,
                });
            }
            await db.Blog.destroy({
                where: { id: idBlog },
            });
            resolve({
                errCode: 0,
                message: "Delete OK",
                idBlog,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let createExcelBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            data.forEach(async (value, index) => {
                await db.Blog.create({
                    title: value.title,
                    categoryId: Number(value.categoryId),
                    tag: value.tag,
                    star: Number(value.star),
                    detail: value.detail,
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
let createNewBlog = (data, urlImage, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            try {
                if (req.file) {
                    const blob = buckket.file(req.file.originalname);
                    const blobStream = blob.createWriteStream();
                    await blobStream.on('finish', () => {
                    })
                    blobStream.end(req.file.buffer);
                }
            } catch (error) {
                console.log(error)
            }

            await db.Blog.create({
                title: data.title,
                categoryId: data.categoryId,
                tag: data.tag,
                star: Number(data.star),
                detail: data.detail,
                image: req.file.originalname,
            });
            resolve({
                errCode: 0,
                message: "Save Ok",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let updateBlogData = (data, urlImage, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            try {
                if (req.file) {
                    console.log(req.file)
                    const blob = buckket.file(req.file.originalname);
                    const blobStream = blob.createWriteStream();
                    await blobStream.on('finish', () => {
                    })
                    blobStream.end(req.file.buffer);
                }
            } catch (error) {
                console.log(error)
            }
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: "Khong co id Blog",
                    data,
                });
            } else {
                let blog = await db.Blog.findOne({
                    where: {
                        id: data.id,
                    },
                });
                if (blog) {
                    blog.title = data.title,
                        blog.categoryId = Number(data.categoryId),
                        blog.tag = data.tag,
                        blog.star = Number(data.star),
                        blog.detail = data.detail,
                        blog.image = req.file.originalname,
                        await blog.save();
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
let deleteAllBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = "";
            if (data.Delete === 1) {
                message = "Done Delete"
                await db.Blog.destroy({
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

//Ingredient
let createNewIngredient = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
                    ingredient.category = data.category,
                        ingredient.unit = data.unit,
                        ingredient.calo = Number(data.calo),
                        ingredient.protein = Number(data.protein),
                        ingredient.fat = Number(data.fat),
                        ingredient.carb = Number(data.carb),
                        ingredient.fiber = Number(data.fiber),
                        ingredient.cholesterol = Number(data.cholesterol),
                        ingredient.canxi = Number(data.canxi),
                        ingredient.photpho = Number(data.photpho),
                        ingredient.fe = Number(data.fe),
                        ingredient.natri = Number(data.natri),
                        ingredient.kali = Number(data.kali),
                        ingredient.betacaroten = Number(data.betacaroten),
                        ingredient.vita = Number(data.vita),
                        ingredient.vitb1 = Number(data.vitb1),
                        ingredient.vitc = Number(data.vitc),

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

//User & Login
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
                    gender: data.gender,
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
                    user.address = data.address;
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
    deleteOneIngredient,
    updateIngredientData,
    createNewBlog,
    deleteOneBlog,
    deleteAllBlog,
    updateBlogData,
    createExcelBlog,
    createNewSick,
}