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
    const email = req.body.username;
    const password = req.body.password;
    console.log('[EDIT]', `[USERNAME]=${email} | [ROLE]=${password}`);
    try {
        if(validationHelper.checkAuth(email, password)) {
            let user = await module.exports.mySqlCreateUser(req.body);
            res.send(user);
        } else {
            throw new Error('Email and Password are not valid');
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }    
};

exports.editUser = async (req, res) => {
    const username = req.body.username;
    const role = req.body.role;

    console.log('[EDIT]', `[USERNAME]=${username} | [ROLE]=${role}`);

    const fieldValues = [role, username];
    const query = 'UPDATE users SET role = ? \
                   WHERE username = ?';
    try {
        let result = await mysql.query(query, fieldValues);
        res.send({ user: result[0] });
    } catch (error) {
        res.send({ error });
    }                   
}

exports.removeUser = async (req, res) => {
    const username = req.body.username;
    try {
        const result = mysql.query('delete from users where username = ?', [username]);
        res.send({ user_deleted: result[0] });
    } catch (error) {
        res.send({ error });
    }
}

/**
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
| name     | varchar(255) | NO   |     | NULL    |                |
| username | varchar(255) | NO   |     | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |
| role     | varchar(255) | NO   |     | NULL    |                |
| question | varchar(255) | NO   |     | NULL    |                |
| answer   | varchar(255) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
 */
exports.mySqlCreateUser = async (jsonUser) => {
    const name = jsonUser.name;
    const username = jsonUser.username;
    let password = jsonUser.password;
    const role = jsonUser.role.toLowerCase();
    const question = jsonUser.question;
    const answer = jsonUser.answer;
    try {
        password = bcrypt.hashSync(password, 8);
        const query = 'INSERT INTO users (name, username, password, role, question, answer) \
                       VALUES (?, ?, ?, ?, ?, ?);';
        const fieldValues = [name, username, password, role, question, answer];
        const [rows, fields] = await mysql.query(query, fieldValues);
        return {"id" : rows.insertId};
    } catch (error) {
        throw error;
    }
}