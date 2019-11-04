const mysql = require('../services/mysql');
const bcrypt = require('bcryptjs');
const validationHelper = require('../helpers/ValidationHelper');

exports.listUsers = async (req, res) => {
    try {
        let result = await mysql.query('select * from users');
        res.send(result[0]);
    } catch (error) {
        res.send(error);
    }
};

exports.authenticateUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if(validationHelper.checkAuth(email, password)) {
            let result = await mysql.query('select * from users where email = ?', req.body.email);
            if(result[0].length>0 && bcrypt.compareSync(req.body.password, result[0].password)) {
                res.send(result[0]);
            } else {
                res.send({"auth":0});
            }
        } else {
            throw new Error('Email and Password are not valid');
        }
    } catch (error) {
        res.send(error)
    }
};

exports.addUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if(validationHelper.checkAuth(email, password)) {
            let user = await module.exports.mySqlcreateUser(req.body);
            res.send(r);
        } else {
            throw new Error('Email and Password are not valid');
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }    
};

exports.mySqlCreateUser = async (jsonUser) => {
    try {
        jsonUser.password = bcrypt.hashSync(jsonUser.password, 8);
        let result = await mysql.query('insert into users set ?', jsonUser);
        return {"id":result.insertId}
    } catch (error) {
        throw error;
    }
}