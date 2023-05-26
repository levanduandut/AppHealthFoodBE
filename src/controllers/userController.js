import userService from "../services/userService";
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Email Or Password Missing"
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errmessage,
        token: userData.jwtToken,
    })
}
let handleInfo = async (req, res) => {
    let token = req.body.jwtToken;
    if (!token) {
        return res.status(500).json({
            errCode: 2,
            message: "No jwt token"
        })
    }
    let user = await userService.handleUserInfo(token)
    return res.status(200).json({
        user
    })
}
let handleGetIngredient = async (req, res) => {
    let id = req.query.id; // All, id
    let ingre = await userService.getAllIngredient(id);
    console.log(ingre.length);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        ingre,
    });
}
module.exports = {
    handleLogin,
    handleInfo,
    handleGetIngredient
}