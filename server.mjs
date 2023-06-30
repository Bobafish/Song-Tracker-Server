/*********************************************************************
** Program Filename:server.mjs
** Author: Jongwon An
** Date: 6/9/2023
** Description: Contains code to create an express server
** Course : WEB DEVELOPMENT (CS_290_001_S2023)
** Input: None
** Output: None
*********************************************************************/

import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as songs from './songs_model.mjs';
import bodyParser from 'body-parser';

// HEAVILY USED THE FORMAT GIVEN TO US IN MONGOOSE PT 3 TUTORIAL
// https://canvas.oregonstate.edu/courses/1914610/pages/exploration-using-mongoose-to-implement-crud-operations?module_item_id=23189011
// CHANGED MOVIE TO MUSIC
// I Changed some of the get methods to PUT and POST as it was required
// As the body was being passed in instead of query, req.query was changed to req.body for those two cases

// sets up router
const app = express();
const router = express.Router();
app.use("/api", router);
// app.use(express.urlencoded({extended:false}));

// I didn't need to add this function, as findSongs actually does the same thing if there 
// are no filters. However, I didn't know at the time and I implemented it
// finds all of the songs in the list
router.get("/songs", asyncHandler(async (req,res) => {
    const result = await songs.findAllSongs();
    res.json(result)
 }));

// creates a song using post
router.post("/create", bodyParser.json(), function(req,res){
    const result = songs.createSong(req.body.title, req.body.artist, req.body.popularity, req.body.released, req.body.genre);
    console.log("Song has been added"); // confirmation message
});

// song filters that was given in module 3
function songFilter(req){
    let filter = {};
    // checks if any filters aren't empty. If it isn't, add it to filter
    if (req.query._id !== undefined){
        filter._id = req.query._id;
    } if (req.query.title !== undefined) {
         filter.title = req.query.title;
    } if (req.query.artist !== undefined) {
         filter.artist = req.query.artist;
    } if (req.query.released !== undefined) {
        filter.released = req.query.released ;
    } if (req.query.genre !== undefined) {
        filter.genre = req.query.genre ;
    } 
    return filter;
}

// Gets values with certain filters
router.get ('/retrieve', asyncHandler(async (req,res) => { 
    const filter = songFilter(req);
    const result = await songs.findSongs(filter);
    res.send(result);   // sends result to the js file 
}));


// updates using the put method
router.put('/update', bodyParser.json(), (req, res) => {
    // first finds the song with the id
    songs.findById(req.body._id)
        .then(song => {
            // if the song exists
            if (song !== null) {
                // gets a list of things that changed
                const update = {};
                if (req.body.title !== undefined) {
                    update.title = req.body.title;
                }
                if (req.body.artist !== undefined) {
                    update.artist = req.body.artist;
                }
                if (req.body.released !== undefined) {
                    update.released = req.body.released;
                }
                if (req.body.genre !== undefined) {
                    update.genre = req.body.genre;
                }
                // updates the song
                songs.updateSong({ _id: req.body._id }, update)
                    // Not really used for my purpose as it is assumed that there
                    // are no error checking to be done as the inputs should be perfect
                    .then(updateCount => {
                        res.send({ updateCount: updateCount });
                    })
                    // checks if nothing was updated
                    .catch(error => {
                        console.error(error);
                        res.send({ Error: 'The document was not updated.'});
                    });
            // checks if id wasn't found
            } else {
                res.send({ Error: 'The document was not found.' });
            }
        })
        // checks for any other errors (ex. date is in wrong format)
        .catch(error => {
            console.error(error);
            res.json({ Error: error });
        });
});

// deletes by using the id
function deleteById(req, res) {
    songs.deleteById(req.query._id)
        // confirms item got deleted
        .then(deletedCount => {
            res.send({ deletedCount: deletedCount });
        })
        // error message saying that delete failed
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
}

// Delete based on the filter
function deleteByProperty(req, res) {
    // gets filter
    const filters = songFilter(req);
    songs.deleteByProperty(filters)
        // confirmation that something got deleted
        .then(deletedCount => {
            res.send({ deletedCount: deletedCount });
        })
        // error message and nothing got deleted
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
}

// deleting using get method
router.get('/delete', (req, res) => {

    // if id is identified, deletes by id
    if (req.query._id !== undefined) {
        deleteById(req, res);

    // otherwise, deletes by filter
    } else {
        deleteByProperty(req, res);
    }
});

// sets localhost:3000. Copied from Textbook
app.use(express.static("public"));
app.use(express.json())
app.listen(3000);
