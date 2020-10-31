const { response, request } = require('express');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: Register } = require('../SmartBrain-Front-End/src/components/Register/Register');
const knex = reqire('knex')
const register=require('./controllers/register')
const signin=require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'smart-brain'
    }
});
knex.select('*').from('users').then(data => {
    console.log(data)
});

const app = express(); //create app by running express

//FAKE DB
// const database = {
//     users: [
//         {
//             'id': '123',
//             'name': 'John',
//             'email': 'john@email.com',
//             'password': 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             'id': '124',
//             'name': 'Sally',
//             'email': 'sally@email.com',
//             'password': 'cooki',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [
//         {
//             'id': '987',
//             'has': '',
//             'email': 'john@email.com'
//         },
//     ]
// }

app.use(bodyParser.json()); //just USE as it is a mw accessible like this

app.use(cors()); //mw for securing web app communication, error 'Access-Control-Allow-Origin'
//add basic get route to root
//calling in postman localhost:3000 will write below
app.get('/', (req, res) => {
    res.send(database.users);
})

//signin example with one version of js advanced func where one func gets exec and then calls the other(req,res), and the register with a simpler one
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.post('/signin', (req, res) => {signin.handleSignin(db, bcrypt)})
app.get('/profile/:id', (req, res)=> {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.put('/imageurl', (req, res) => { image.handleApiCall(req, res)})

// app.post(()=>{'/signin', (req, res) =>{

//------THIS HAS BEEN REFACTORED TO DEP INJ above
// USE LOGIN FROM REGISTER NOW
// app.post('/signin', (req, res) => {
//     //  bcrypt.compare("apples", '$2a$10$zQCMHiyz5fyGNwv/gBZRpOEVVMOZ2IDYFO6h2sbStcGJ5xpSVCb.S', function(err, res) {
//     //      console.log('first ', res)
//     // });
//     // bcrypt.compare("bacon", '$2a$10$zQCMHiyz5fyGNwv/gBZRpOEVVMOZ2IDYFO6h2sbStcGJ5xpSVCb.S', function(err, res) {
//     //     console.log('second ', res)
//     // });
//     if (req.body.email === database.users[0].email &&
//         req.body.password === database.users[0].password) {
//         //res.json('success')
//         res.json(database.users[0]);
//     } else {
//         res.status(400).json('error logging in')
//     }
// })

//------THIS HAS BEEN REFACTORED TO DEP INJ above
// app.post('/register', (req, res) => {
//     const { email, name, password } = req.body;
//     const hash = bcrypt.hashSync(password);
//     db.transaction(trx => {
//         trx.insert({
//             hash: hash,
//             email: email
//         })
//             .into('login')
//             .returning('email')
//             .then(loginEmail => {
//                 trx('users')
//                     .returning('*') //knex doing a return of below command so we send it to response autamatically without doing new command for select
//                     .insert({
//                         email: loginEmail[0],
//                         name: name,
//                         joined: new Date()
//                     })
//                     .then(user => {
//                         res.json(user[0]);
//                     })
//             })
//             .then(trx.commit)
//             .catch(trx.rollback)
//     })
//         .catch(err => res.status(400).json(err))

    //------DO WITH TRANSACTION AS THERE ARE 2TRX, ONE TO INSERT USER, ANOTHER TO TAKE PASSWORD
    // db('users')
    //     .returning('*') //knex doing a return of below command so we send it to response autamatically without doing new command for select
    //     .insert({
    //         email: email,
    //         name: name,
    //         joined: new Date()
    //     })
    //     .then(user => {
    //         res.json(user[0]);
    //     })
    //     .catch(err => res.status(400).json(err))
    //.then(console.log);
    // then(response =>{
    //     res.json(database.users[database.users.length - 1])

    //------NO NEED FOR THIS WHEN DB IS THERE
    // bcrypt.hash(password, null, null, function (err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    // });
    // database.users.push(
    //     {
    //         'id': '125',
    //         'name': name,
    //         'email': email,
    //         'password': password,
    //         entries: 0,
    //         joined: new Date()
    //     }
    // )


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3001, () => {
    //func will run after server started on 3000
    console.log('app is running on port 3000')
})

//PLANNING API BELOW
/*
/signin  --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/