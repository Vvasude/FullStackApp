const artist = require('../models/artist');

const router = require('express').Router();

//Test Route for establishing Postman
router.get("/getAll/", async (req, res) => {
    return res.json("getting all artists");
})

//Artist Get One 
router.get("/getOne/:id", async (req, res) => {
    const filter = {artist_id: req.params.id};

    const data = await artist.findOne(filter);

    if(data) {
        return res.json(data);
    } else {
        return res.json('Could not be Found');
    }
})

//Artist search by name
router.get("/search/:id", async (req, res) => {
    const searchRequest = req.params.id;
    const filterArtist = 
        {"artist_name": {$regex: searchRequest, $options: "i"}}
    const select = {artist_id: 1, artist_name: 1, _id: 0}; //Filter resulting data for desired fields (ID and Name)

    const data = 
        await artist.find(filterArtist, select);

    if(data){
        return res.json(data);
    } else{
        return res.json('Could not be Found');
    }
})

module.exports = router;
