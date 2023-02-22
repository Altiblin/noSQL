const path = require('path')
const Category = require('../../models/category')
const mongoose = require('mongoose')

module.exports = (req, res) => {
    const {image} = req.files

    image.mv(path.resolve(__dirname, '..', '../public/img/category', image.name), (error) => {
        Category.create({...req.body, image: `/img/category/${image.name}`}, async (error, category) => {
            if (error) {
                console.log(error);
                return res.redirect("/");
            }
        });
    })
}