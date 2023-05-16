import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashUserPasswordFrom = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashUserPasswordFrom,
                fullName: data.fullName,
                // address: data.address,
                // phoneNumber: data.phoneNumber,
                gender: data.gender === "1" ? true : false,
                // image: DataTypes.STRING,
                roleId: data.roleId,
                // positionId: DataTypes.STRING,
            });
            resolve("OK create new user");
        } catch (error) {
            reject(error)
        }
    })

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
module.exports = {
    createNewUser,
}