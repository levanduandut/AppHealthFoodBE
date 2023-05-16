import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: "Trung email",
                });
            }
            else {
                let hashPassword = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    fullName: data.fullName,
                    // lastName: data.lastName,
                    // address: data.address,
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
module.exports = {
    createNewUser,
    getAllUser,
}