import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/about", homeController.getAboutPage)
    router.get("/crud", homeController.getCRUD)
    router.post("/post-crud", homeController.postCRUD)

    //User Router
    router.post("/api/user/login",userController.handleLogin)
    router.post("/api/user/getInfo",userController.handleInfo)

    return app.use("/", router)
};

module.exports = initWebRoutes;
