import db from "../models/index";
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

module.exports = {
    getHomePage,
    getAboutPage,
}