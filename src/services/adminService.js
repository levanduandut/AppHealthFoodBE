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
                        // ['age', 'DESC'],
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
module.exports = {
    createNewUser,
    getAllUser,
    updateUserData,
    deleteUserData,
}