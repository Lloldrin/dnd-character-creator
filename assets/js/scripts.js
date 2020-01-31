/* ---------- Dynamically Created Content on Page Load ---------*/

//Function to dynamically create the list of races and give each button a unique ID
function populateRaceList(listRaces) {
    listRaces.forEach(element => {
        $(`#race_list`).append(`<li><button type="button" class="btn btn_race btn-primary" id="${element.index}">${element.name}</button></li>`)
    })
}

fetchRaceList()

//Function to dynamically create the list of classes and give each button a unique ID
function populateClassList(listClasses) {
    listClasses.forEach(element => {
        $(`#class_list`).append(`<li><button type="button" class="btn btn_class btn-primary" id="${element.index}">${element.name}</button></li>`)
    });
}

fetchClassList()

//Function to dynamically create the list of skills
function populateSkillList(listSkills) {
    listSkills.forEach(element => {
        $(`#skill_list`).append(`<li>${element.name}</li>`)
    });
}

fetchSkillList()

/* ---------- Race Logic ---------- */

let base_ability = [8, 8, 8, 8, 8, 8,];
let character_ability = base_ability;
let chosenLanguages, raceTraits = {};

function printBaseStats() {
    $(`.ability_str`).text(base_ability[0]);
    $(`.ability_dex`).text(base_ability[1]);
    $(`.ability_con`).text(base_ability[2]);
    $(`.ability_int`).text(base_ability[3]);
    $(`.ability_wis`).text(base_ability[4]);
    $(`.ability_cha`).text(base_ability[5]);
    $('.ability_bonus').empty();
}

function currentRaceInformation(currentRace) {

    currentRace.ability_bonuses.forEach(element => {
        if (element.name === `STR`) {
            character_ability[0] = element.bonus + base_ability[0];
            $(`.ability_str`).text(character_ability[0]);
        } else if (element.name === `DEX`) {
            character_ability[1] = element.bonus + base_ability[1];
            $(`.ability_dex`).text(character_ability[1]);
        } else if (element.name === `CON`) {
            character_ability[2] = element.bonus + base_ability[2];
            $(`.ability_con`).text(character_ability[2]);
        } else if (element.name === `INT`) {
            character_ability[3] = element.bonus + base_ability[3];
            $(`.ability_int`).text(character_ability[3]);
        } else if (element.name === `WIS`) {
            character_ability[4] = element.bonus + base_ability[4];
            $(`.ability_wis`).text(character_ability[4]);
        } else if (element.name === `CHA`) {
            character_ability[5] = element.bonus + base_ability[5];
            $(`.ability_cha`).text(character_ability[5]);
        }
    });

    if (currentRace.ability_bonus_options === undefined) {
        $(`.ability_bonus`).text("0");
    } else {
        $(`.ability_bonus`).text(currentRace.ability_bonus_options.choose);
    }

    Object.keys(currentRace).forEach(element => {
        //This looks through the array, and if the current element key is part of the array it runs "return". This is to only get the correct div's created.
        if (["_id", "index", "ability_bonuses", "ability_bonus_options", "starting_proficiencies", "starting_proficiency_options", "size", "languages", "language_options", "traits", "trait_options", "subraces", "url"].indexOf(element) >= 0) {
            return;
        }
        $(`#race_info_container`).append(`<div class="race_info_container" id="race_${element}_container">
            <p id="race_${element}">${currentRace[element]}</p></div>`);
    });

    if (currentRace.language_options !== undefined) {

        $('#race_info_container').append(`<div class="race_info_container" id="race_languages"><p>You can choose ${currentRace.language_options.choose} languages from this list</div>`)

        currentRace.language_options.from.forEach(element => {
            $('#race_languages').append(`<div class="race_info_container">
            <input type="checkbox" class="race_language" value="${element.name}"><span> ${element.name}</span></div>`);
        });

        $('.race_language').on('change', function () {
            if ($(`.race_language:checked`).length > currentRace.language_options.choose) {
                this.checked = false;
            } else {
                if (this.checked === true) {
                    if (chosenLanguages[`chosenLanguages`] === undefined) {
                        chosenLanguages[`chosenLanguages`] = {}
                    }
                    chosenLanguages[`chosenLanguages`][this.value] = [this.value];
                } else {
                    delete chosenLanguages[`chosenLanguages`][this.value];
                }
                console.log(chosenLanguages);
            }
        })
    }

    if (currentRace.starting_proficiencies.length > 0) {
        $(`#race_info_container`).append(`<div class="race_proficency_list" id="race_proficiencies"><p>You start with these proficiencies:</p></div>`);
        currentRace.starting_proficiencies.forEach(element => {
            $(`#race_info_container`).append(`<div class="race_info_container" id="race_${element.name}_proficency">
             <p id="race_proficency_${element.name}">${element.name}</p></div>`);
            if (raceProficiencies[`race_proficiencies_0`] === undefined) {
                raceProficiencies[`race_proficiencies_0`] = {}
            }
            raceProficiencies[`race_proficiencies_0`][`${element.name}`] = " ";
        });
    }

    if (currentRace.traits.length > 0) {
        $(`#race_info_container`).append(`<div class="race_trait_list" id="race_traits"><p>You start with these traits:</p></div>`);
        currentRace.traits.forEach(element => {
            $(`#race_info_container`).append(`<div class="race_info_container" id="race_${element.name}_trait">
             <p id="race_trait_${element.name}">${element.name}</p></div>`);
            if (raceTraits[`race_traits_0`] === undefined) {
                raceTraits[`race_traits_0`] = {}
            }
            raceTraits[`race_traits_0`][`${element.name}`] = [`${element.name}`];
        });
    }

    if (currentRace.trait_options !== undefined) {

        $('#race_info_container').append(`<div class="race_info_container" id="race_trait_options"><p>You can choose ${currentRace.trait_options.choose} traits from this list</div>`)

        currentRace.trait_options.from.forEach(element => {
            $('#race_trait_options').append(`<div class="race_info_container">
            <input type="checkbox" class="race_trait_option" value="${element.name}"><span> ${element.name}</span></div>`);
        });

        $('.race_trait_option').on('change', function () {
            if ($(`.race_trait_option:checked`).length > currentRace.trait_options.choose) {
                this.checked = false;
            } else {
                if (this.checked === true) {
                    if (raceTraits['race_traits_1'] === undefined) {
                        raceTraits[`race_traits_1`] = {}
                    }
                    raceTraits[`race_traits_1`][this.value] = [this.value];
                } else {
                    delete raceTraits[`race_traits_1`][this.value];
                }
                console.log(raceTraits);
            }
        });

}
}

function resetRace() {
    base_ability, character_ability = [8, 8, 8, 8, 8, 8,];
    printBaseStats()
    raceProficiencies = {};
    raceTraits = {};
    $(`#race_info_container`).empty()
}

/* ---------- Class Logic ---------- */

function currentClassInformation(currentClass) {
    Object.keys(currentClass).forEach(element => {
        //This looks through the array, and if the current element key is part of the array it runs "return". This is to only get the correct div's created.
        if (["_id", "index", "subclasses", "proficiencies", "proficiency_choices", "saving_throws", "starting_equipment", "class_levels", "spellcasting", "url"].indexOf(element) >= 0) {
            return;
        }
        $(`#class_info_container`).append(`<div class="class_info_container" id="class_${element}_container">
            <p id="class_${element}">${currentClass[element]}</p>`);
    });

    //Populate the proficencyList
    $(`#class_info_container`).append(`<div class="class_skill_list" id="proficiencies"><p>You start with these proficiencies:</p></div>`);
    currentClass.proficiencies.forEach(element => {
        $(`#proficiencies`).append(`<div class="class_info_container" id="class_${element.name}_container">
             <p id="class_${element.name}">${element.name}</p></div>`);
        if (classProficiencies[`proficency_class_0`] === undefined) {
            classProficiencies[`proficency_class_0`] = {}
        }
        classProficiencies[`proficency_class_0`][`${element.name}`] = " ";
    });

    //Populate and create forms for proficencyChoices
    currentClass.proficiency_choices.forEach((element, i) => {
        $(`#class_info_container`).append(`<div class="class_skill_list" id="proficency_${i}"></div>`);
        $(`#proficency_${i}`).append(`<div class="class_info_container" id="class_${element.name}_container">
            <p>You can choose ${element.choose} from this list</p></div>`);

        element.from.forEach(element => {
            $(`#proficency_${i}`).append(`<div class="class_info_container">
            <input type="checkbox" class="proficency_class_${i}" value="${element.name}"><span> ${element.name}</span></div>`);
        });

        $(`.proficency_class_${i}`).on('change', function () {
            if ($(`.proficency_class_${i}:checked`).length > element.choose) {
                this.checked = false;
            } else {
                if (this.checked === true) {
                    if (classProficiencies[`proficency_class_${i + 1}`] === undefined) {
                        classProficiencies[`proficency_class_${i + 1}`] = {}
                    }
                    classProficiencies[`proficency_class_${i + 1}`][this.value] = [this.value];
                } else {
                    delete classProficiencies[`proficency_class_${i + 1}`][this.value];
                }
                console.log(classProficiencies);
            }
        })
    });
}

function resetClass() {
    $(`#class_info_container`).empty();
    classProficiencies = {};
}