const User = require('../models/User');
const express = require('express');
const router = express.Router();


router.get('/:id', async(req,res) => {
    const { id } = req.params;

    User.findById(id)
    .then(user => {

        if(!user){
            res.json({msg: 'Could not find the user!'});
        }

        else if (user && !user.confirmed) {
            User.findByIdAndUpdate(id, {confirmed:true})
            .then(() => res.json({msg: 'Your email is confirmed! '}))
            .catch(err => console.log(err));
        }
        else{
            res.json({msg: 'Your email was already confirmed! '});
        }
    }).catch(err => console.log(err));
});

module.exports = router;