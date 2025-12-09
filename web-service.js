const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/movieApp");

const movieSchema = new mongoose.Schema({
    movieid: Number,
    title: String,
    description: String,
    date: Date
});

const Movie = mongoose.model("Movie", movieSchema, "movies"); 

app.post("/movies", async (req, res) => {
    const movie = new Movie(req.body);
    await movie.save();
    res.json({ message: "Movie added", movie });
});

app.get("/movies", async (req, res) => {
    const movies = await Movie.find({});
    res.json(movies);
});

app.get("/movies/:id", async (req, res) => {
    const movie = await Movie.findOne({ movieid: parseInt(req.params.id) });
    res.json(movie);
});

app.put("/movies/:id", async (req, res) => {
    const movie = await Movie.findOneAndUpdate(
        { movieid: parseInt(req.params.id) },
        req.body,
        { new: true }
    );
    res.json({ message: "Movie updated", movie });
});

app.delete("/movies/:id", async (req, res) => {
    await Movie.deleteOne({ movieid: parseInt(req.params.id) });
    res.json({ message: "Movie deleted" });
});

app.listen(3000, () => {
    console.log("Movie Watchlist API running on http://localhost:3000");
});
