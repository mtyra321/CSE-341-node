function math(req, res) {

    const mail = req.body.mailType;
    var weight = req.body.weight;
    const weightType = req.body.weightType;
    //make all weight be in ounces
    if (weightType == "pound") {
        weight *= 16;
    }
    var price = 0.0;
    //do calculations for price by weight and mail type
    if (mail == "Stamped Letter") {
        if (between(weight, 0, 1.9999)) {
            price = 0.55;


        } else if (between(weight, 2, 2.9999)) {
            price = 0.75;

        } else if (between(weight, 3, 3.4999)) {
            price = 0.95;

        } else {
            price = 1.15;
        }
    }
    if (mail == "Metered Letter") {
        if (between(weight, 0, 1.9999)) {
            price = 0.51;


        } else if (between(weight, 2, 2.9999)) {
            price = 0.71;

        } else if (between(weight, 3, 3.4999)) {
            price = 0.91;

        } else {
            price = 1.11;
        }
    }
    if (mail == "Large Envelope") {
        if (between(weight, 0, 1.9999)) {
            price = 1.00;

        } else if (between(weight, 2, 2.9999)) {
            price = 1.20;

        } else if (between(weight, 3, 3.9999)) {
            price = 1.40;

        } else if (between(weight, 4, 4.9999)) {
            price = 1.60;

        } else if (between(weight, 5, 5.9999)) {
            price = 1.80;

        } else if (between(weight, 6, 6.9999)) {
            price = 2.00;

        } else if (between(weight, 7, 7.9999)) {
            price = 2.20;

        } else if (between(weight, 8, 8.9999)) {
            price = 2.40;

        } else if (between(weight, 9, 9.9999)) {
            price = 2.60;

        } else if (between(weight, 10, 10.9999)) {
            price = 2.80;

        } else if (between(weight, 11, 11.9999)) {
            price = 3.00;

        } else if (between(weight, 12, 12.9999)) {
            price = 3.20;

        } else {
            price = 3.40;
        }
    }
    if (mail == "First-Class Package Service—Retail") {
        if (between(weight, 0, 4.9999)) {
            price = 4.00;

        } else if (between(weight, 5, 8.9999)) {
            price = 4.80;

        } else if (between(weight, 9, 12.9999)) {
            price = 5.50;

        } else {
            price = 6.25;
        }
    }

    var param = {
        mail: mail,
        weight: weight,
        weightType: weightType,
        price: price
    };
    res.render('pages/w09Results', param);
}

function between(x, min, max) {
    return x >= min && x <= max;
}

module.exports = { math: math };