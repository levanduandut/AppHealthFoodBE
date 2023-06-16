import adminService from "../services/adminService"


//Food Category

let handleCreateFoodCa = async (req, res) => {
    let message = await adminService.createNewFoodCa(req.body);
    return res.status(200).json(message);
}
let handleDeleteFoodCa = async (req, res) => {
    let id = req.body.id;
    if (id) {
        let mes = await adminService.deleteFoodCa(id);
        return res.status(200).json(mes);
    } else {
        return res.status(200).json({
            mes: "Fall",
        });
    }
}
let handleEditFoodCa = async (req, res) => {
    let data = req.body;
    let message = await adminService.updateFoodCaData(data);
    return res.status(200).json(message);
}

//Food
let handleCreateNewFood = async (req, res) => {
    let message = await adminService.createNewFood(req.body, req);
    return res.status(200).json(message);
}
let handleDeleteFood = async (req, res) => {
    let id = req.body.id;
    if (id) {
        let mes = await adminService.deleteOneFood(id);
        return res.status(200).json(mes);
    } else {
        return res.status(200).json({
            mes: "Fall",
        });
    }
}
let handleEditFood = async (req, res) => {
    let data = req.body;
    let message = await adminService.updateFoodData(data, req);
    return res.status(200).json(message);
}
let handleDeleteAllFood = async (req, res) => {
    let message = await adminService.deleteAllFood(req.body);
    return res.status(200).json(message);
}
let handleCreateExcelFood = async (req, res) => {
    let message = await adminService.createExcelFood(req.body);
    return res.status(200).json(message);
}



//Exercise Category
let handleCreateExerciseCa = async (req, res) => {
    let message = await adminService.createNewExerciseCa(req.body);
    return res.status(200).json(message);
}
let handleDeleteExerciseCa = async (req, res) => {
    let id = req.body.id;
    if (id) {
        let mes = await adminService.deleteOneExerciseCa(id);
        return res.status(200).json(mes);
    } else {
        return res.status(200).json({
            mes: "Fall",
        });
    }
}
let handleEditExerciseCa = async (req, res) => {
    let data = req.body;
    let message = await adminService.updateExeCaData(data);
    return res.status(200).json(message);
}

// Exercise
let handleCreateNewExe = async (req, res) => {
    let message = await adminService.createNewExe(req.body, req);
    return res.status(200).json(message);
}
let handleDeleteExe = async (req, res) => {
    let id = req.body.id;
    if (id) {
        let mes = await adminService.deleteOneExercise(id);
        return res.status(200).json(mes);
    } else {
        return res.status(200).json({
            mes: "Fall",
        });
    }
}
let handleEditExe = async (req, res) => {
    let data = req.body;
    let message = await adminService.updateExeData(data, req);
    return res.status(200).json(message);
}
let handleCreateExcelExe = async (req, res) => {
    console.log(req);
    let message = await adminService.createExcelExe(req.body);
    return res.status(200).json(message);
}
let handleDeleteAllExe = async (req, res) => {
    let message = await adminService.deleteAllExe(req.body);
    return res.status(200).json(message);
}

//Sick
let handleCreateNewSick = async (req, res) => {
    let message = await adminService.createNewSick(req.body, req.file.filename, req);
    return res.status(200).json(message);
}
let handleCreateExcelSick = async (req, res) => {
    let message = await adminService.createExcelSick(req.body);
    return res.status(200).json(message);
}
let handleDeleteOneSick = async (req, res) => {
    let idSick = req.body.id;
    if (idSick) {
        let mes = await adminService.deleteOneSick(idSick);
        return res.status(200).json(mes);
    } else {
        return res.status(200).json({
            mes: "Fall",
        });
    }
}
let handleEditSick = async (req, res) => {
    let data = req.body;
    let message = await adminService.updateSickData(data, req);
    return res.status(200).json(message);
}
let handleDeleteAllSick = async (req, res) => {
    let message = await adminService.deleteAllSick(req.body);
    return res.status(200).json(message);
}

//Blog
let handleCreateNewBlog = async (req, res) => {
    let message = await adminService.createNewBlog(req.body, req.file.filename, req);
    return res.status(200).json(message);
}
let handleCreateExcelBlog = async (req, res) => {
    let message = await adminService.createExcelBlog(req.body);
    return res.status(200).json(message);
}
let handleDeleteAllBlog = async (req, res) => {
    let message = await adminService.deleteAllBlog(req.body);
    return res.status(200).json(message);
}
let handleDeleteOneBlog = async (req, res) => {
    let idBlog = req.body.id;
    if (idBlog) {
        let mes = await adminService.deleteOneBlog(idBlog);
        return res.status(200).json(mes);
    } else {
        return res.status(200).json({
            mes: "Fall",
        });
    }
}
let handleEditBlog = async (req, res) => {
    let data = req.body;
    let message = await adminService.updateBlogData(data, req.file.filename, req);
    return res.status(200).json(message);
}

//Ingredient
let handleEditIngredient = async (req, res) => {

    let data = req.body;
    console.log(data)
    let message = await adminService.updateIngredientData(data);
    return res.status(200).json(message);
}
let handleCreateNewIngredient = async (req, res) => {
    let message = await adminService.createNewIngredient(req.body);
    return res.status(200).json(message);
}
let handleDeleteAllIngredient = async (req, res) => {
    let message = await adminService.deleteAllIngredient(req.body);
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

//User
let handleCreateNewUser = async (req, res) => {
    let message = await adminService.createNewUser(req.body);
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
    handleEditIngredient,
    handleCreateNewBlog,
    handleDeleteAllBlog,
    handleDeleteOneBlog,
    handleEditBlog,
    handleCreateExcelBlog,
    handleCreateNewSick,
    handleCreateExcelSick,
    handleDeleteOneSick,
    handleEditSick,
    handleDeleteAllSick,
    handleCreateExerciseCa,
    handleDeleteExerciseCa,
    handleEditExerciseCa,
    handleCreateNewExe,
    handleDeleteExe,
    handleEditExe,
    handleCreateExcelExe,
    handleDeleteAllExe,
    handleCreateFoodCa,
    handleDeleteFoodCa,
    handleEditFoodCa,
    handleCreateNewFood,
    handleDeleteFood,
    handleEditFood,
    handleDeleteAllFood,
    handleCreateExcelFood
}