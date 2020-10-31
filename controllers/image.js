const Clarifai = require('clarifai');

const app = new Clarifai.App({});

const handleApiCall = (req, res, db) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data =>{
        res.json(data);
    })
    .catch(err=>res.status(400).json('unable to work with api'));
}

const handleImage = (req, res, db) => {
    const { id } = req.params;
    let found = false;

    // where {id: id} - no need as it is the same one from the get
    db.select('*').from('users')
        .where({ id })
        .then(user => {
            //console.log(user);
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))

    //---- NO NEED WITH KNEX AND REAL DB
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         return res.json(user);
    //     }
    // })
    if (!found) {
        res.status(400).json('not found');
    }
}

module.exports = {
    handleImage,
    handleApiCall
};