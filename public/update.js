/*********************************************************************
** Program Filename:update.js
** Author: Jongwon An
** Date: 6/9/2023
** Description: Contains script for update page
** Course : WEB DEVELOPMENT (CS_290_001_S2023)
** Input: None
** Output: None
*********************************************************************/

window.addEventListener("DOMContentLoaded", domLoaded); // loads the javascript once domcontent is loaded

/*********************************************************************
** Function: domLoaded
** Description: runs once the web loads in
** Parameters: none
*********************************************************************/
async function domLoaded(){
    // intializes the table with title, artist, and some extra space as header
    table = document.getElementById("tabOfCont");
    table.innerHTML = "<tr><th>Title</th><th>Artist</th><th>   </th>";
    // gets all of the songs in json format using GET
    let response = await fetch("/api/songs");
    let songs = await response.json();
    // creates rows for each table : Title | Artist | Button
    // Button ID is the id of the song
    for (let song of songs){
        table.innerHTML += `<tr><td>${song.title}</td><td>${song.artist}</td><td><button type = "button" id = "${song._id}">Select</button></td></tr>`;
    }
    // creates an event for each of the buttons
    for (let song of songs){
        document.getElementById(song._id).addEventListener("click", async function(){
            // retrieves the song with a specific id
            let response2 = await fetch(`/api/retrieve?_id=${song._id}`);
            let songs2 = await response2.json();
            // gets remove all of the stuff after the date
            let date = songs2[0].released.slice(0,10);
            // fills in all of the input values with their respective values
            document.getElementById("titleInput").value = songs2[0].title;
            document.getElementById("idInput").value = song._id;
            document.getElementById("artistInput").value = songs2[0].artist;
            document.getElementById("calendarInput").value = date;
            document.getElementById("genreInput").value = songs2[0].genre;
            document.getElementById("popularityInput").value = songs2[0].popularity;
        });
    }
    // adds event to the update button
    document.getElementById("up").addEventListener("click", async function(){
        // uses POST format given in textbook, just replaced it with PUT
        const song = {
            _id : document.getElementById("idInput").value, // ID Is needed to identify what to find and update
            title : document.getElementById("titleInput").value,
            artist : document.getElementById("artistInput").value,
            popularity : document.getElementById("popularityInput").value,
            released : document.getElementById("calendarInput").value,
            genre : document.getElementById("genreInput").value
        }
        // uses PUT method
        const responseb = await fetch("/api/update",{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(song)
        });
    });

}