require("dotenv").config(); //Env Variables

const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");

//Open Server Connection on Port 3000
const cors = require("cors");
//app.use(cors({ origin: true }));
mongoose.connect(process.env.REACT_APP_DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.listen(4000, () => console.log("Server Started on 4000"));

app.use(express.json()); //JSON data for backend

app.get("/", (req, res) => {
  return res.json("Hello World");
});

const authRoutes = require("./routes/users");
app.use("/users/", authRoutes);

const localUserRoutes = require("./routes/localUsers");
app.use("/localusers", localUserRoutes);
//Genre Routes
const genresRoutes = require("./routes/genres");
app.use("/genres/", genresRoutes);

//Album Routes
const albumsRoutes = require("./routes/albums");
app.use("/albums/", albumsRoutes);

//Artist Routes
const artistsRoutes = require("./routes/artists");
app.use("/artists/", artistsRoutes);

//Track Routes
const tracksRoutes = require("./routes/tracks");
app.use("/tracks/", tracksRoutes);

//List Routes
const listsRoutes = require("./routes/lists");
app.use("/lists/", listsRoutes);
