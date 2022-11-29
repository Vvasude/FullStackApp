const router = require('express').Router();

//Test Route for establishing backend connection with Postman for API testing
router.get("/getAll", async (req, res) => {
    return res.json("getting all albums")
})

module.exports = router;