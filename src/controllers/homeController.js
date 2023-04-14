import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll({
            raw: true,
        });
        console.log("-------------------------");
        console.log(data);
        console.log("-------------------------");
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
    }
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let mes = await CRUDService.createNewUser(req.body);
    return res.send("POst ok")
}
module.exports = {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
}