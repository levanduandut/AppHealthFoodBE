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
    router.post("/api/user/translate", userController.handleTransale)
    router.post("/api/user/getInfo", userController.handleInfo)
    router.get("/api/user/get-all-ingredient", userController.handleGetIngredient)
    router.get("/api/user/get-all-blog", userController.handleGetBlog)

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

    router.post("/api/admin/create-new-blog", multer.single('image'), adminController.handleCreateNewBlog)
    router.post("/api/admin/delete-all-blog", adminController.handleDeleteAllBlog)
    router.post("/api/admin/delete-blog", adminController.handleDeleteOneBlog)
    router.put("/api/admin/edit-blog", multer.single('image'), adminController.handleEditBlog)


    return app.use("/", router)
};

module.exports = initWebRoutes;
