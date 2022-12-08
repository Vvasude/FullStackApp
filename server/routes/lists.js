const list = require("../models/list");

const router = require("express").Router();

//Get All Lists
router.get("/getLimitAny/", async (req, res) => {
  const filter = {};

  const data = await list.find(filter).limit(20);
  if (data.length > 0) {
    return res.status(200).send(data);
  } else {
    return res.status(400).send({ success: false, msg: "Nothing Found" });
  }
});

router.get("/getAll/", async (req, res) => {
  const filter = {};

  const data = await list.find(filter);
  if (data.length > 0) {
    return res.status(200).send(data);
  } else {
    return res.status(400).send({ success: false, msg: "Nothing Found" });
  }
});

//Get all public lists
router.get("/getLimitPublic/", async (req, res) => {
  const filter = { visibility: "true" };
  const sort = { updatedAt: -1 };

  const data = await list.find(filter).limit(10).sort(sort);
  if (data.length > 0) {
    return res.status(200).send(data);
  } else {
    return res.status(400).send({ success: false, msg: "Nothing Found" });
  }
});

router.get("/getAllPublic/", async (req, res) => {
  const filter = { visibility: "true" };
  const sort = { updatedAt: -1 };

  const data = await list.find(filter).sort(sort);
  if (data.length > 0) {
    return res.status(200).send(data);
  } else {
    return res.status(400).send({ success: false, msg: "Nothing Found" });
  }
});

//Save New List with Name, also save with tracks if desireds
router.post("/save", async (req, res) => {
  const filter = { list_title: req.body.list_title };
  const trackArray = req.body.list_trackIDS;

  //Check if name already exists in lists
  const checkExists = await list.countDocuments(filter);
  if (checkExists > 0) {
    return res
      .status(404)
      .send({ success: "false", msg: "List already exists" });
  } else if (trackArray.length == 0 || trackArray.includes(null)) {
    return res
      .status(404)
      .send({ success: "false", msg: "List must contain Track IDS" });
  } else {
    //Establish new object to be saved as list
    const newList = list({
      list_title: req.body.list_title,
      list_trackIDS: req.body.list_trackIDS,
      description: req.body.description,
      visibility: req.body.visibility,
      email: req.body.email,
    });
    try {
      const savedList = await newList.save();
      return res.status(200).send({ success: "true", list: savedList });
    } catch (error) {
      return res.status(400).send({ success: "false", msg: error });
    }
  }
});

//Update existing list by name, track IDS, or both depending on input
router.put("/update/:id", async (req, res) => {
  const filter = { list_title: req.params.id };

  const checkExists = await list.countDocuments(filter);
  if (checkExists == 0) {
    return res
      .status(400)
      .send({ success: false, msg: "Requested List does not exist" });
  } else if (req.body.list_title.length == 0) {
    return res
      .status(400)
      .send({ success: false, msg: "Updated Title Cannot Be Empty" });
  } else {
    const updateFields = {
      list_title: req.body.list_title,
      list_trackIDS: req.body.list_trackIDS,
      description: req.body.description,
      visibility: req.body.visibility,
    };
    //Insert as new list to be sent back as response
    const options = {
      new: true,
    };
    try {
      const resultList = await list.findOneAndUpdate(
        filter,
        updateFields,
        options
      );
      return res.status(200).send(resultList);
    } catch (error) {
      return res.status(400).send({ success: false, msg: error });
    }
  }
});

//Delete requested list if it exists
router.delete("/delete/:id", async (req, res) => {
  const filter = { list_title: decodeURI(req.params.id) };

  //Check if it exists within collection
  const checkExists = await list.countDocuments(filter);
  if (checkExists == 0) {
    return res
      .status(400)
      .send({ success: false, msg: "Requested List does not exist" });
  } else {
    const data = await list.deleteOne(filter);
    if (data) {
      return res.status(200).send(data); //Data shows how many items were deleted along with timestamps
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "Requested List not Found" });
    }
  }
});

//Update existing list by name, track IDS, or both depending on input
router.put("/addRating/:id", async (req, res) => {
  const filter = { list_title: decodeURI(req.params.id) };

  const checkExists = await list.countDocuments(filter);
  if (checkExists == 0) {
    return res
      .status(400)
      .send({ success: false, msg: "Requested List does not exist" });
  } else {
    const foundList = await list.findOne(filter);
    let ratingArray = foundList.rating;
    let commentArray = foundList.comment;

    ratingArray.push(req.body.rating);
    commentArray.push(req.body.description);

    const updateFields = {
      rating: ratingArray,
      comment: commentArray,
    };
    //Insert as new list to be sent back as response
    const options = {
      new: true,
    };
    try {
      const resultList = await list.findOneAndUpdate(
        filter,
        updateFields,
        options
      );
      return res.status(200).send(resultList);
    } catch (error) {
      return res.status(400).send({ success: false, msg: error });
    }
  }
});

//Search for one list based on request
router.get("/getOne/:id", async (req, res) => {
  const filter = { list_title: req.params.id };

  const data = await list.findOne(filter);

  if (data) {
    return res.status(200).send(data);
  } else {
    return res.status(400).send({ success: "false", msg: "List Not Found" });
  }
});

module.exports = router;
