const handleProfileGet = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(rr => res.status(400).json('unable to get entries'))
    //---NO NEED WITH DB KNEX
    // let found = false;
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     }

    // })
    // if (!found) {
    //     res.status(400).json('not found');
    // }
}

module.exports = {
    handleProfileGet: handleProfileGet};