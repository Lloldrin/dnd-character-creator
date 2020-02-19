//Api Url
const dnd_api = `https://www.dnd5eapi.co`;

/* ------------ Ingame Races ---------- */

//Fetches data to populate the race list and runs the function to populate the list
async function fetchRaceList() {
    let apiRaces = await fetch(dnd_api + `/api/races/`);
    let playerRace = await apiRaces.json();
    populateRaceList(playerRace.results);
    console.log(playerRace.results);
}

fetchRaceList()

//Listens for the user to make a race selection and displays the correct data
let currentRace
async function selectRace(url) {
    let clickedRace = await fetch(dnd_api + url);
    currentRace = await clickedRace.json();
    resetRace();
    currentRaceInformation(currentRace);
    currentAbilities(currentRace);
}

/* ------------ Ingame Classes ---------- */

//Fetches data to populate the class list  and runs the function to populate the list
async function fetchClassList() {
    let apiClasses = await fetch(dnd_api + `/api/classes/`)
    let playerClass = await apiClasses.json()
    populateClassList(playerClass.results)
    console.log(playerClass.results)
}

fetchClassList()

//Listens for the user to make a (game)class  selection and displays the correct data
let currentClass
async function selectClass(url) {
    let clickedClass = await fetch(dnd_api + url);
    currentClass = await clickedClass.json();
    let spellCasting;
    if (currentClass.spellcasting !== undefined) {
        spellCasting = await spellCasterClass(currentClass.spellcasting.url);
    }
    resetClass();
    currentClassInformation(currentClass, spellCasting);
    printCurrentCharacter();
};

async function spellCasterClass(url) {
    let spellCaster = await fetch(dnd_api + url)
    let spellCasting = await spellCaster.json();
    return spellCasting;
}

/* ------------ Ingame Skills ---------- */

//Fetches data to populate the skill list  and runs the function to populate the list
async function fetchSkillInformation(url) {
    let apiSkills = await fetch(dnd_api + `/api/skills/` + url)
    let skillDescription = await apiSkills.json()
    populateSkillDescriptions(skillDescription.desc[0]);
}

/* --------- Ingame Abilities --------- */

async function fetchAbilityDescription(url) {
    let apiAbilities = await fetch(dnd_api + `/api/ability-scores/` + url)
    let currentAbility = await apiAbilities.json()
    abilityDescriptor(currentAbility);
}
