import userService from "../services/userService";
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

// Instantiates a client
const XTRAN = JSON.parse(process.env.CODETRANSLATE)
const translate = new Translate({
    credentials: XTRAN,
    projectId: XTRAN.project_id
});

let handleGetExerciseCa = async (req, res) => {
    let categoryId = req.body.categoryId;
    // All, id
    let exerciseCa = await userService.getAllExerciseCa(categoryId);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        exerciseCa,
    });
};
let handleGetExercise = async (req, res) => {
    let categoryId = req.body.categoryId;
    // All, id
    let exercise = await userService.getAllExercise(categoryId);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        exercise,
    });
};

let handleTransale = async (req, res) => {
    try {
        let data = await translate.translate(req.body.text, req.body.lang);
        return res.status(500).json({
            errCode: 0,
            data: data[0],
        })
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
        });
    }
}
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
        status: userData.status,
        sickId:userData.sickId,
    })
}
let handleRegister = async (req, res) => {
    let mes = await userService.createNewUser(req.body);
    console.log(mes);
    return res.status(200).json(mes);
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
let handleCreateHealth = async (req, res) => {
    let message = await userService.createNewHealth(req.body);
    return res.status(200).json(message);
}
let handleGetHealth = async (req, res) => {
    let info = await userService.getHealthInfo(req.body.token,req.body.limit);
    return res.status(200).json({
        errCode: 0,
        info
    });
}

let handleGetIngredient = async (req, res) => {
    let id = req.query.id; // All, id
    let ingre = await userService.getAllIngredient(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        ingre,
    });
}
let handleGetBlog = async (req, res) => {
    let categoryId = req.body.categoryId;
    // All, id
    let blog = await userService.getAllBlog(categoryId);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        blog,
    });
}
let handleGetSick = async (req, res) => {
    let sickId = req.body.id;
    let info = req.body.info;
    // All, id
    let sick = await userService.getAllSick(sickId, info);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        sick,
    });
}

module.exports = {
    handleLogin,
    handleInfo,
    handleGetIngredient,
    handleTransale,
    handleGetBlog,
    handleRegister,
    handleGetSick,
    handleCreateHealth,
    handleGetHealth,
    handleGetExerciseCa,
    handleGetExercise
}