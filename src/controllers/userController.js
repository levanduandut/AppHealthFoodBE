import userService from "../services/userService";
require('dotenv').config();

// Instantiates a client
// const XTRAN = JSON.parse(process.env.CODETRANSLATE)
// const translate = new Translate({
//     credentials: XTRAN,
//     projectId: XTRAN.project_id
// });
let handleEditInfo = async (req, res) => {
    let data = req.body;
    let token = req.body.token;
    let message = await userService.updateUserInfo(data, token);
    return res.status(200).json(message);
}

let handleGetCalo = async (req, res) => {// All, id
    let calo = await userService.getCaloById(req.body.token);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        calo,
    });
}

let handleGetField = async (req, res) => {// All, id
    let field = await userService.getFieldIngredient();
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        field,
    });
}

let handleSickIngredient = async (req, res) => {
    let id = req.body.id; // All, id
    let ingre = await userService.getSickIngredient(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        ingre,
    });
}

let handleGetStatus = async (req, res) => {
    let data = req.body.token;
    let status = await userService.getStatusUser(data);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        status,
    });
};
let handleCreateAbsorb = async (req, res) => {
    let mes = '';
    console.log(req.body);
    if (req.body) {
        mes = await userService.createNewAbsorb(req.body.data, req.body.token, req.body.eat);
    }
    else {
        mes = "Fail";
    }
    return res.status(200).json(mes);
}
let handleGetAbsorb = async (req, res) => {
    let info = await userService.getAbsorbInfo(req.body.token, req.body.limit);
    return res.status(200).json({
        errCode: 0,
        info
    });
};
let handleGetFood = async (req, res) => {
    let data = req.body;
    let food = await userService.getAllFood(data);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        food,
    });
};
let handleGetFoodCa = async (req, res) => {
    let categoryId = req.body.categoryId;
    // All, id
    let foodCa = await userService.getAllFoodCa(categoryId);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        foodCa,
    });
};
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
    let categoryId = req.body;
    // All, id
    let exercise = await userService.getAllExercise(categoryId);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        exercise,
    });
};

let handleTransale = async (req, res) => {
    let data = await userService.translateLang(req.body.text, req.body.lang);
    return res.status(500).json({
        errCode: 0,
        data: data,
    })
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
        sickId: userData.sickId,
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
    let info = await userService.getHealthInfo(req.body.token, req.body.limit);
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
    handleGetExercise,
    handleGetFoodCa,
    handleGetFood,
    handleCreateAbsorb,
    handleGetAbsorb,
    handleGetStatus,
    handleSickIngredient,
    handleGetField,
    handleGetCalo,
    handleEditInfo
}