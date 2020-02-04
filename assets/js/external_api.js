//Api Url
const dnd_api = `http://www.dnd5eapi.co`;

/* ------------ Ingame Races ---------- */

//Fetches data to populate the race list and runs the function to populate the list
async function fetchRaceList() {
    let apiRaces = await fetch(dnd_api + `/api/races/`);
    let playerRace = await apiRaces.json();
    populateRaceList(playerRace.results);
    console.log(playerRace.results);
}

//Listens for the user to make a race selection and displays the correct data
$(`body`).on(`click`, `.btn_race`, async function () {
    let clickedRace = await fetch(dnd_api + $(this).attr(`id`))
    let currentRace = await clickedRace.json();
    activeRace(this);
    resetRace();
    currentRaceInformation(currentRace);
    currentAbilities(currentRace)
    console.log(currentRace);
})

/* ------------ Ingame Classes ---------- */

//Fetches data to populate the class list  and runs the function to populate the list
async function fetchClassList() {
    let apiClasses = await fetch(dnd_api + `/api/classes/`)
    let playerClass = await apiClasses.json()
    populateClassList(playerClass.results)
    console.log(playerClass.results)
}

//Listens for the user to make a (game)class  selection and displays the correct data
$(`body`).on(`click`, `.btn_class`, async function () {
    let clickedClass = await fetch(dnd_api + $(this).attr(`id`))
    let currentClass = await clickedClass.json();
    activeClass(this);
    let spellCasting;
    if (currentClass.spellcasting !== undefined) {
        spellCasting = await spellCasterClass(currentClass.spellcasting.url)
    }
    resetClass();
    currentClassInformation(currentClass, spellCasting);

    console.log(currentClass);
})

async function spellCasterClass(url) {
    let spellCaster = await fetch(dnd_api + url)
    let spellCasting = await spellCaster.json();
    return spellCasting;
}

/* ------------ Ingame Skills ---------- */

//Fetches data to populate the skill list  and runs the function to populate the list
async function fetchSkillList() {
    let apiSkills = await fetch(dnd_api + `/api/skills/`)
    let skills = await apiSkills.json()
    populateSkillList(skills.results)
    console.log(skills.results)
}