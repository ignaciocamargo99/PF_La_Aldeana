const db = require("../../config/connection");
const bcryptjs = require('bcryptjs');

const { logIn, getUser, logInDesktop } = require('../services/logInService')

// [HTTP:GET]
async function getUsers(req, res) {

    const sqlSelect = "SELECT u.id_user, u.nick_user, u.first_name, u.last_name, u.password, u.active " + 
    "FROM USERS u  WHERE u.active = 1";

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
};

// [HTTP:GET:nick]
async function getUsersByNick(req, res) {
    try {
        let rest = await logIn(req.params.nick);
        
        if(rest.length > 0){
            res.json({
                Ok: true,
                Message: 'Validando usuario.',
                token: rest[0].password,
                
            });
        } else {
            let random = Math.round(Math.random()* (1000 - 1) + 1).toString();
            let notIsAToken = await bcryptjs.hash(random, 8);
            res.json({
                Ok: true,
                Message: 'Validando usuario.',
                token: notIsAToken
            });
        }
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    };
};

async function getDataUsersByNick(req, res) {
    try {
        let rest = await getUser(req.params.nick);
        if(rest.length > 0 && rest[0].active[0] === 0){
            res.json({
                Ok:false,
                Message: 'Usuario dado de baja, comuníquese con el administrador...'
            });
        }
        else if(rest.length > 0 && rest[0].active[0] === 1){
            res.json({
                Ok: true,
                Message: 'Validando usuario.',
                nick_user: rest[0].nick_user,
                first_name: rest[0].first_name,
                last_name: rest[0].last_name,
            });
        } else {
            res.json({
                Ok: true,
                Message: 'Validando usuario.',
                Data: rest[0].active[0]
            });
        }
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    };
};

async function postUser(req, res) {
    const nick = req.body.nick_user;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;
    let passwordHash = await bcryptjs.hash(password, 8)

    const sqlInsert =
        "INSERT INTO USERS (nick_user, first_name, last_name, password, id_rol) " +
        "VALUES ('"+ nick +"','"+ first_name +"','"+ last_name +"','"+ passwordHash + ")";
        //"VALUES (?)";

    await db.query(sqlInsert, [req.body], (err, result) => {
        if (result != null) res.send(result);
        else res.send(err);
})
};

async function getLogin(req, res) {

    const sqlSelect =
        "SELECT nick_user, password, id_rol " +
        "FROM USERS " + 
        "WHERE condicion AND condicion";


}

async function logDesktop(req, res) {
    try {
        await logInDesktop(req.body);
        res.json({
            Ok: true,
            Message: 'Sesion iniciada correctamente'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}



module.exports = { getUsers, getUsersByNick, postUser, getDataUsersByNick, logDesktop };




