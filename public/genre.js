/*********************************************************************
** Program Filename:genre.js
** Author: Jongwon An
** Date: 6/9/2023
** Description: Contains Script code for the genre page
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
    // gets all of the songs
    const response = await fetch("/api/songs");
    const songs = await response.json();
    list = [];
    // stores all of the genres in the list
    for (let song of songs){
        // gets rid of extra spaces and the comma
        list_of_genre = song.genre.trim();
        list_of_genre = list_of_genre.split(",");
        // doesn't append to list if it already exists
        for (let item of list_of_genre){
            if (!list.includes(item)){
                list.push(item);
            }
        }
    }

    // adds all of the genres to the selection 
    const select_item = document.getElementById("listItems");
    select_item.innerHTML = "";
    for (let item of list){
        select_item.innerHTML += `<option value="${item}">${item}</option>`;
    }

    // activates the drop down table after search button is pressed
    document.getElementById("searchBut").addEventListener("click", buttonPressed);
}

/*********************************************************************
** Function: buttonPressed
** Description: runs once genre search button is pressed
** Parameters: none
*********************************************************************/
async function buttonPressed(){
    // adds a title for the table
    document.getElementById("text").innerHTML = "List of Selected Genre : ";
    // unhides the table and adds the respective header
    table = document.getElementById("tabOfCont");
    table.classList.remove("hide");
    table.innerHTML = "<tr><th>ID</th><th>Title</th><th>Artist</th><th>Released</th><th>Popularity</th><th>Genre</th></tr>";
    // gets all of the songs
    const response2 = await fetch(`/api/retrieve`);
    const songs2 = await response2.json();
    // loops through each of the songs
    for (let song of songs2){
        // get rid of comma and extra spaces
        list_of_genre = song.genre.trim();
        list_of_genre = list_of_genre.split(",");
        // checks to see if that specific genre exists
        if (list_of_genre.includes(document.getElementById("listItems").value)){
            let date = song.released.slice(0,10);   // get rid of extra stuff ater the date
            // adds a row of a osong with the specific genre
            table.innerHTML += `<tr><td>${song._id}</td><td>${song.title}</td><td>${song.artist}</td><td>${date}</td><td>${song.popularity}</td><td>${song.genre}</td></tr>`;
        }
    }
}