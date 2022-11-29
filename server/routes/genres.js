const genre = require('../models/genre');

const router = require('express').Router();

//Get all genres with specified fields
router.get("/getAll", async (req, res) => {
    const filter = {};
    const select = {genre_id: 1, parent: 1, title: 1, _id: 0};

    const data = await genre.find(filter, select);
        
        if(data){
        return res.json(data);
    } else{
        return res.json('Could not be Found');
    }
})

module.exports = router;
