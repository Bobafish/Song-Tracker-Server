/*********************************************************************
** Program Filename:songs_model.js
** Author: Jongwon An
** Date: 6/9/2023
** Description: Contains code to utilize the MONGOOSE database
** Course : WEB DEVELOPMENT (CS_290_001_S2023)
** Input: None
** Output: None
*********************************************************************/

import mongoose from "mongoose";
import "dotenv/config"

// HEAVILY USED THE FORMAT GIVEN TO US IN MONGOOSE PT 3 TUTORIAL
// CHANGED MOVIE TO MUSIC
// https://canvas.oregonstate.edu/courses/1914610/pages/exploration-using-mongoose-to-implement-crud-operations?module_item_id=23189011
// copied the format given to us in the mongoose part 3 tutorial

// connects to mongoose. Username/passcode in env file
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    {useNewUrlParser: true}
);

// calls the connection db
const db = mongoose.connection;

// creates the basic song schematic
const songSchema = mongoose.Schema({
    title : {type: String, required: true},
    artist : {type: String, required: true},
    popularity : {type: Number, required: true},
    released : {type: Date, required: true},
    genre : {type: String, required: true}
});

// Creates a var based on the song schematic
const Song = mongoose.model("Song", songSchema);

// creates a new song
const createSong = function(title,artist,popularity, released, genre){
    const song = new Song({title: title, artist: artist, popularity: popularity, released: released, genre: genre});
    return song.save()
};

// I didn't need to add this function, as findSongs actually does the same thing if there 
// are no filters. However, I didn't know at the time and I implemented it
// finds all songs in the data base
const findAllSongs = async() => {
    const query = Song.find();
    return query.exec();
};

// finds all song with a filter
const findSongs = async(filter) => {
    const query = Song.find(filter);
    return query.exec();
};

// finds by id
const findById = async(_id) => {
    const query = Song.findById(_id);
    return query.exec()
};

// updates a song given a filter as well as stuff to update
const updateSong = async (filter, update) => {
    const result = await Song.updateOne(filter, update);
    return result.modifiedCount;
 };

// Opens the database and confirms connection
db.once("open", () =>{
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Delete based on the ID.
const deleteById = async (_id) => {
    const result = await Song.deleteOne({_id: _id});
    return result.deletedCount;
};

// Delete based on filter.
const deleteByProperty = async (filter) => {
    const result = await Song.deleteMany(filter);
    return result.deletedCount;
}

// exports all of the functions to be used
export { createSong, findSongs, findById, updateSong, deleteById, deleteByProperty, findAllSongs};
