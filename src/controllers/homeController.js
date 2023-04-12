let getHomePage = (req, res) => {
    return res.render('homePage.ejs')
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

module.exports = {
    getHomePage,
    getAboutPage,
}