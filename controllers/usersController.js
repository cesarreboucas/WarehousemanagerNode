const mysql = require('../services/mysql');
const bcrypt = require('bcryptjs');
const validationHelper = require('../helpers/ValidationHelper');

exports.listUsers = async (req, res) => {
    try {
        let result = await mysql.query('select * from users');
        res.send(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.authenticateUser = async (req, res) => {
    try {
        let user = await module.exports.checkUser(req.body);
        console.log(user != null);
        if(user != null) {
            res.send(user);
        } else {
            res.status(401).send({"auth":0});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.checkUser = async (user) => {
    try {
        let [rows, columns] = await mysql.query('select * from users where username = ?', [user.username]);
        if(bcrypt.compareSync(user.password, rows[0].password)) {
            return rows[0];
        }
        return null;
    } catch (error) {
        return null;
    }
}

exports.addUser = async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    console.log('[EDIT]', `[USERNAME]=${email} | [ROLE]=${password}`);
    try {
        if(validationHelper.checkAuth(email, password)) {
            let user = await module.exports.mySqlCreateUser(req.body);
            res.send(user);
        } else {
            res.status(400).send('Email and Password are not valid');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
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
        res.send();
    } catch (error) {
        res.status(500).send(error.message);
    }                   
}

exports.forgotPassword = async (req, res) => {
    try {
        const username  = req.body.username;
        const password  = req.body.password;
        const question  = req.body.question;
        const answer    = req.body.answer;
        const [rows, columns] = await mysql.query("SELECT * FROM users WHERE username = ?", [username]);
        const user = rows[0];
        if(question === user.question && answer === user.answer) {
            const hashPassword = bcrypt.hashSync(password, 8);
            await mysql.query('UPDATE users SET password = ? WHERE username = ?', [hashPassword, username]);
            res.send();
        } else {
            res.status(400).send('Quesntions or answer is wrong');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.removeUser = async (req, res) => {
    const username = req.body.username;
    try {
        const result = mysql.query('delete from users where username = ?', [username]);
        res.send({ user_deleted: result[0] });
    } catch (error) {
        res.status(500).send(error.message);
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
    const favourite_warehouse = jsonUser.favourite_warehouse;
    try {
        password = bcrypt.hashSync(password, 8);
        const query = 'INSERT INTO users (name, username, password, role, favourite_warehouse, question, answer) \
                       VALUES (?, ?, ?, ?, ?, ?, ?);';
        const fieldValues = [name, username, password, role, favourite_warehouse, question, answer];
        const [rows, fields] = await mysql.query(query, fieldValues);
        return {"id" : rows.insertId};
    } catch (error) {
        throw error;
    }
}