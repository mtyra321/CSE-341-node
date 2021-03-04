function math(req, res) {

    const mail = req.body.mailType;
    const weight = req.body.weight;
    var price = 0;
    var param = {
        mail: mail,
        weight: weight,
        price: price
    };
    res.render('pages/w09Results', param);
}

module.exports = { math: math };