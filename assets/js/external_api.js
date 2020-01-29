//Api Url
const dnd_api = `http://www.dnd5eapi.co/api/`;

/* ------------ Ingame Races ---------- */

//Fetches  data to populate the race list 
async function fetchRaceList() {
    let availableRaces = await fetch(dnd_api + `races/`);
    let playerRace = await availableRaces.json();
    populateRaceList(playerRace.results);
    console.log(playerRace.results);
}

//Listens for the user to make a race selection and displays the correct data
$(`body`).on(`click`, `.btn_race`, async function () {
    let clickedRace = await fetch(dnd_api + `races/` + $(this).attr(`id`))
    let currentRace = await clickedRace.json();
    currentRaceInformation(currentRace);
    console.log(currentRace);
})

/* ------------ Ingame Classes ---------- */

//Fetches  data to populate the class list 
async function fetchClassList() {
    let availableClasses = await fetch(dnd_api + `classes/`)
    let playerClass = await availableClasses.json()
    populateClassList(playerClass.results)
    console.log(playerClass.results)
}

//Listens for the user to make a (game)class  selection and displays the correct data
$(`body`).on(`click`, `.btn_class`, async function () { 
    let clickedClass = await fetch(dnd_api + `classes/` + $(this).attr(`id`))
    let currentClass = await clickedClass.json();
    console.log(currentClass);
})