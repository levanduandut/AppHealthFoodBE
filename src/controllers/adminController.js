import adminService from "../services/adminService";

let handleCreateNewIngredient = async (req, res) => {
    let message = await adminService.createNewIngredient(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleDeleteAllIngredient = async (req, res) => {
    let message = await adminService.deleteAllIngredient(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleDeleteOneIngredient = async (req, res) => {
    let idIngre = req.body.id;
    if (idIngre) {
        let mes = await adminService.deleteOneIngredient(idIngre);
        return res.status(200).json(mes);
    } else {
        return res.status(200).json({
            mes: "Fall",
        });
    }
}

let handleCreateNewUser = async (req, res) => {
    let message = await adminService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // All, id
    let users = await adminService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users,
    });
};
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await adminService.updateUserData(data);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    let idUser = req.body.id;
    if (idUser) {
        let mes = await adminService.deleteUserData(idUser);
        return res.status(200).json(mes);
    } else {
        return res.status(200).json({
            mes: "Fall",
        });
    }
}
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(200).json({
            errCode: 1,
            message: "Email or Password missing !"
        })
    }
    let userData = await adminService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errmessage,
        token: userData.jwtToken,
    })
}
module.exports = {
    handleCreateNewUser,
    handleGetAllUsers,
    handleEditUser,
    handleDeleteUser,
    handleLogin,
    handleCreateNewIngredient,
    handleDeleteAllIngredient,
    handleDeleteOneIngredient,
}