/*********************************************************************
** Program Filename:delete.js
** Author: Jongwon An
** Date: 6/9/2023
** Description: Contains code to for the delete page
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
    // fills in the table with title, artist, and some extra space as header
    table = document.getElementById("tabOfCont");
    table.innerHTML = "<tr><th>Title</th><th>Artist</th><th>   </th>";

    // gets all of the songs and store it in songs
    let response = await fetch("/api/songs");
    let songs = await response.json();
    
    // creates rows for each song with button id being the same as the song id
    for (let song of songs){
        table.innerHTML += `<tr><td>${song.title}</td><td>${song.artist}</td><td><button type = "button" id = "${song._id}">Delete</button></td></tr>`;
    }

    // creates an event for each button
    for (let song of songs){
        document.getElementById(song._id).addEventListener("click", async function(){
            // deletes the song using the id and GET
            let response2 = await fetch(`/api/delete?_id=${song._id}`);
            // reloads to update the available songs to delete
            window.location.reload();
        });
    }
}