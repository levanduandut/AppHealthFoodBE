import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import adminController from "../controllers/adminController";
const Multer = require('multer')
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
    },
});
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/about", homeController.getAboutPage)
    router.get("/crud", homeController.getCRUD)
    router.post("/post-crud", homeController.postCRUD)

    //User Router
    router.post("/api/user/login", userController.handleLogin)
    router.post("/api/user/register", userController.handleRegister)
    router.post("/api/user/translate", userController.handleTransale)
    router.post("/api/user/getInfo", userController.handleInfo)
    router.get("/api/user/get-all-ingredient", userController.handleGetIngredient)
    router.post("/api/user/get-all-blog", userController.handleGetBlog)
    router.post("/api/user/get-all-sick", userController.handleGetSick)

    // User Health 
    router.post("/api/user/health-create", userController.handleCreateHealth)
    router.post("/api/user/health-info", userController.handleGetHealth)

    //User Exercise
    router.post("/api/user/get-exercise-category", userController.handleGetExerciseCa)
    router.post("/api/user/get-exercise", userController.handleGetExercise)



    //Admin Router
    // router.post("/api/admin/login",userController.handleLogin)
    router.post("/api/admin/create-new-user", adminController.handleCreateNewUser)
    router.get("/api/admin/get-all-user", adminController.handleGetAllUsers)
    router.put('/api/admin/edit-user', adminController.handleEditUser);
    router.post('/api/admin/delete-user', adminController.handleDeleteUser);
    router.post("/api/admin/login", adminController.handleLogin)

    //Public
    //// Admin Ingredient
    router.post("/api/admin/create-new-ingredient", adminController.handleCreateNewIngredient)
    router.post("/api/admin/delete-all-ingredient", adminController.handleDeleteAllIngredient)
    router.post("/api/admin/delete-ingredient", adminController.handleDeleteOneIngredient)
    router.put("/api/admin/edit-ingredient", adminController.handleEditIngredient)
    //// Admin Blog
    router.post("/api/admin/create-new-blog", multer.single('image'), adminController.handleCreateNewBlog)
    router.post("/api/admin/create-excel-blog", adminController.handleCreateExcelBlog)
    router.post("/api/admin/delete-all-blog", adminController.handleDeleteAllBlog)
    router.post("/api/admin/delete-blog", adminController.handleDeleteOneBlog)
    router.put("/api/admin/edit-blog", multer.single('image'), adminController.handleEditBlog)

    //// Admin Sick
    router.post("/api/admin/create-new-sick", multer.single('image'), adminController.handleCreateNewSick)
    router.post("/api/admin/create-excel-sick", adminController.handleCreateExcelSick)
    router.put("/api/admin/edit-sick", multer.single('image'), adminController.handleEditSick)
    router.post("/api/admin/delete-sick", adminController.handleDeleteOneSick)
    router.post("/api/admin/delete-all-sick", adminController.handleDeleteAllSick)

    //Admin Exercise Category
    router.post("/api/admin/create-new-exercise-category", adminController.handleCreateExerciseCa)
    router.post("/api/admin/delete-exercise-category", adminController.handleDeleteExerciseCa)
    router.put("/api/admin/edit-exercise-category", adminController.handleEditExerciseCa)

    router.post("/api/admin/create-new-exercise", multer.single('image'), adminController.handleCreateNewExe)
    router.post("/api/admin/delete-exercise", adminController.handleDeleteExe)

    return app.use("/", router)
};

module.exports = initWebRoutes;
