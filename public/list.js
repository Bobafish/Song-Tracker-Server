/*********************************************************************
** Program Filename:list.js
** Author: Jongwon An
** Date: 6/9/2023
** Description: contains script for the list page
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
    // creates header for the table
    table = document.getElementById("tabOfCont");
    table.innerHTML = "<tr><th>ID</th><th>Title</th><th>Artist</th><th>Released</th><th>Popularity</th><th>Genre</th></tr>";
    // gets all of the songs
    const response = await fetch("/api/songs");
    const songs = await response.json();
    // loops through all of the songs
    for (let song of songs){
        let date = song.released.slice(0,10);   // gets rid of stuff after the date
        // adds a row for the song with all of its data
        table.innerHTML += `<tr><td>${song._id}</td><td>${song.title}</td><td>${song.artist}</td><td>${date}</td><td>${song.popularity}</td><td>${song.genre}</td></tr>`;
    }
}