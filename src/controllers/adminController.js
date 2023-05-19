import adminService from "../services/adminService";
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
module.exports = {
    handleCreateNewUser,
    handleGetAllUsers,
    handleEditUser,
    handleDeleteUser,
}