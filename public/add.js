/*********************************************************************
** Program Filename:add.js
** Author: Jongwon An
** Date: 6/9/2023
** Description: Contains script for the add page
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
    // initializes the submit button
    submit_but = document.getElementById("sub");
    // gets all of the elements that are inputs
    titled = document.getElementById("titleInput");
    artistd = document.getElementById("artistInput");
    dated = document.getElementById("calendarInput");
    popularityd = document.getElementById("popularityInput");
    genred = document.getElementById("genreInput");

    message = "";   // adds error messages
    // if the button is pressed for submission
    submit_but.addEventListener("click", async function(){
        // makes to see if any of the inputs are empty
        // if it is, appends to error message
        if (!titled.value){
            message += "Title is missing \n";
        }
        if (!artistd.value){
            message += "Artist is missing \n";
        }
        if (!dated.value){
            message += "Date is missing \n"; 
        }
        if (!popularityd.value){
            message += "Popularity is missing \n"
        }
        if (!genred.value){
            message += "Genre is missing"
        }
        // gives alert message if anything has been added
        if (message != ""){
            alert(message);

        // otherwise, adds the song to the database
        } else{
            // Uses the POST method shown in textbook
            
            // gives song all the write values
            const song = {
                title : titled.value,
                artist : artistd.value,
                popularity : popularityd.value,
                released : dated.value,
                genre : genred.value
            }
            // create a POST method and send song to get created
            const response = await fetch("/api/create",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(song)
            });
        }

    });
}