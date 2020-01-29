const dnd_api_url = `http://www.dnd5eapi.co/api/`;

//Fetches  data to populate the race list 
async function fetchRaceList() {
    let availableRaces = await fetch(dnd_api_url + `races/`);
    let playerRace = await availableRaces.json();
    populateRaceList(playerRace.results);
    console.log(playerRace.results);
}

//Listens for the user to make a race selection and displays the correct data
$(`body`).on(`click`, `.btn_race`, async function () {
    let clickedRace = await fetch(dnd_api_url + `races/` + $(this).attr(`id`) + `/`)
    let currentRace = await clickedRace.json();
    console.log(currentRace);
})

//Fetch race information based upon the click event
async function fetchRaceInformation() {
    let 
}

//Fetches  data to populate the class list 
async function fetchClassList() {
    let availableClasses = await fetch(dnd_api_url + `classes/`)
    let playerClass = await availableClasses.json()
    populateClassList(playerClass.results)
    console.log(playerClass.results)
}

//Listens for the user to make a class selection and displays the correct data
$(`body`).on(`click`, `.btn_class`, async function () { 
    let clickedClass = await fetch(dnd_api_url + `classes/` + $(this).attr(`id`) + `/`)
    let currentClass = await clickedClass.json();
    console.log(currentClass);
})