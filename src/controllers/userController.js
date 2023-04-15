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
    let user1 = userData.user ? userData.user : {};
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errmessage,
        token: userData.jwtToken,
    })
}
module.exports = {
    handleLogin,
}