/* ---------- Dynamically Created Content on Page Load ---------*/

//Function to dynamically create the list of races and give each button a unique ID
function populateRaceList(listRaces) {
    listRaces.forEach(element => {
        $(`#race_list`).append(`<div><button type="button" class="btn btn_race" id="${element.url}">${element.name}</button></div>`)
    })
}

fetchRaceList()

//Function to dynamically create the list of classes and give each button a unique ID
function populateClassList(listClasses) {
    listClasses.forEach(element => {
        $(`#class_list`).append(`<div><button type="button" class="btn btn_class" id="${element.url}">${element.name}</button></div>`)
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

let baseAbility = [8, 8, 8, 8, 8, 8,];
let raceAbility = [0, 0, 0, 0, 0, 0,];
let characterAbility;
let characterLanguages = {};
let characterTraits = {};
let characterProficiencies = {};
let characterSaves = {};

function resetRaceStats() {
    $(`#race_str`).empty().append(0);
    $(`#race_dex`).empty().append(0);
    $(`#race_con`).empty().append(0);
    $(`#race_int`).empty().append(0);
    $(`#race_wis`).empty().append(0);
    $(`#race_cha`).empty().append(0);
    $('#race_bonus').empty();
}

resetRaceStats()

function activeRace(clickedRace) {
    $('.current_race').removeClass("current_race");
    $(clickedRace).addClass('current_race');
}

function currentRaceInformation(currentRace) {

    if (currentRace.ability_bonus_options === undefined) {
        $(`.ability_bonus`).empty().append("0");
    } else {
        $(`.ability_bonus`).empty().append(currentRace.ability_bonus_options.choose);
    }

    $('#race_info_container_left').append('<div class="general_info_styling" id="race_info_left"></div>');
    $('#race_info_container_right').append('<div class="general_info_styling" id="race_info_right"></div>');

    $('#race_info_left').append(`<div class="race_info" id"race_${currentRace.name}_container>
    <h4>${currentRace.name}</h4></div>`);

    $('#race_info_left').append(`<div class="race_info" id"race_${currentRace.alignment}_container>
    <h6>Alignment</h6>
    <p>${currentRace.alignment}</p></div>`);

    $('#race_info_left').append(`<div class="race_info" id"race_${currentRace.age}_container>
    <h6>Age</h6>
    <p>${currentRace.age}</p></div>`);

    $('#race_info_left').append(`<div class="race_info" id"race_${currentRace.size_description}_container>
    <h6>Size</h6>
    <p>${currentRace.size_description}</p></div>`);

    $('#race_info_left').append(`<div class="race_info" id"race_${currentRace.language_desc}_container>
    <h6>Languages</h6>
    <p>${currentRace.language_desc}</p></div>`);


    // Object.keys(currentRace).forEach(element => {
    //     //This looks through the array, and if the current element key is part of the array it runs "return". This is to only get the correct div's created.
    //     if (["_id", "index", "name", "ability_bonuses", "ability_bonus_options", "starting_proficiencies", "starting_proficiency_options", "size", "languages", "language_options", "traits", "trait_options", "subraces", "url"].indexOf(element) >= 0) {
    //         return;
    //     }
    //     $('#race_info_left').append(`<div class="race_info" id="race_${element}_container">
    //         <p id="race_${element}">${currentRace[element]}</p></div>`);
    // });

    $('#race_info_right').append(`<div class="race_info" id="race_languages"><h6>Languages:</h6><div>`)
    currentRace.languages.forEach(element => {
        if (characterLanguages[`race_languages_0`] === undefined) {
            characterLanguages[`race_languages_0`] = {}
        }
        characterLanguages[`race_languages_0`][element.name] = element.name;
        $('#race_languages').append(`<div class="race_list">${element.name}<div>`)
    });

    if (currentRace.language_options !== undefined) {
        if (currentRace.language_options.choose > 1) {

            $('#race_languages').append(`<div class="race_info_container_right" id="race_languages">
            <p>You can choose ${currentRace.language_options.choose} languages from this list</div>`)

            currentRace.language_options.from.forEach(element => {
                $('#race_languages').append(`<div class="race_info race_list">
            <input type="checkbox" class="race_language" value="${element.name}"><span> ${element.name}</span></div>`);
            });

            $('.race_language').on('change', function () {
                if ($(`.race_language:checked`).length > currentRace.language_options.choose) {
                    this.checked = false;
                } else {
                    if (this.checked === true) {
                        if (characterLanguages[`race_languages_1`] === undefined) {
                            characterLanguages[`race_languages_1`] = {}
                        }
                        characterLanguages[`race_languages_1`][this.value] = [this.value];
                    } else {
                        delete characterLanguages[`race_languages_1`][this.value];
                    }
                    console.log(characterLanguages);
                }
            })
        } else {
            $('#race_languages').append(`<div class="race_info race_list" id="race_languages">
            <p>You can choose ${currentRace.language_options.choose} language from this list</p>
            <div><select id="race_languages_list"></select></div>
            </div>`)

            currentRace.language_options.from.forEach(element => {
                $('#race_languages_list').append(`<option value="${element.name}">${element.name}</option>)`)
                console.log(element.name)
            });

            $('#race_languages_list').on('change', function () {
                characterLanguages[`race_languages_1`] = {};
                characterLanguages[`race_languages_1`][$('#race_languages_list').children("option:selected").val()] = $('#race_languages_list').children("option:selected").val()
                console.log(characterLanguages)
            });
        }
    }

    if (currentRace.starting_proficiencies.length > 0) {
        $(`#race_info_right`).append(`<div class="race_info" id="race_proficiencies"><h6>Race Proficencies:</h6></div>`);
        currentRace.starting_proficiencies.forEach(element => {
            $(`#race_proficiencies`).append(`<div class="race_list" id="race_${element.name}_proficency">
             <p id="race_proficency_${element.name}">${element.name}</p></div>`);
            characterProficiencies[`race_proficiencies_0`][element.name] = element.name;
        });
    }

    if (currentRace.starting_proficiency_options !== undefined) {
        if (currentRace.starting_proficiency_options.choose > 1) {

            $('#race_proficiencies').append(`<div class="race_list" id="race_proficiencies_options"><p>Choose ${currentRace.language_options.choose} proficencies from this list</div>`)

            currentRace.starting_proficiency_options.from.forEach(element => {
                $('#race_proficiencies_options').append(`<div class="race_info race_list">
            <input type="checkbox" class="race_proficiencies_options" value="${element.name}"><span> ${element.name}</span></div>`);
            });

            $('.race_proficiencies_options').on('change', function () {
                if ($(`.race_proficiencies_options:checked`).length > currentRace.starting_proficiency_options.choose) {
                    this.checked = false;
                } else {
                    if (this.checked === true) {
                        if (characterProficiencies[`race_proficiencies_1`] === undefined) {
                            characterProficiencies[`race_proficiencies_1`] = {}
                        }
                        characterProficiencies[`race_proficiencies_1`][this.value] = [this.value];
                    } else {
                        delete characterProficiencies[`race_proficiencies_1`][this.value];
                    }
                    console.log(characterProficiencies);
                }
            })
        } else {
            $('#race_proficiencies').append(`<div class="race_list" id="race_proficiencies_options">
            <p>Choose ${currentRace.starting_proficiency_options.choose} proficency from this list</p>
            <div><select id="race_proficiencies_options_list"></select></div>
            </div>`)

            currentRace.starting_proficiency_options.from.forEach(element => {
                $('#race_proficiencies_options_list').append(`<option value="${element.name}">${element.name}</option>)`)
                console.log(element.name)
            });

            $('#race_proficiencies_options_list').on('change', function () {
                characterProficiencies[`race_proficiencies_1`] = {};
                characterProficiencies[`race_proficiencies_1`][$('#race_proficiencies_options_list').children("option:selected").val()] = $('#race_proficiencies_options_list').children("option:selected").val()
                console.log(characterProficiencies)
            });
        }
    }

    if (currentRace.traits.length > 0) {
        $(`#race_info_right`).append(`<div class="race_info" id="race_traits"><h6>Race Traits:</h6></div>`);
        currentRace.traits.forEach(element => {
            $(`#race_traits`).append(`<div class="race_list" id="race_${element.name}_trait">${element.name}</div>`);
            if (characterTraits[`race_traits_0`] === undefined) {
                characterTraits[`race_traits_0`] = {}
            }
            characterTraits[`race_traits_0`][`${element.name}`] = [`${element.name}`];
        });
    }

    if (currentRace.trait_options !== undefined) {

        if (`${currentRace.trait_options.choose}` > 1) {
            $('#race_traits').append(`<div class="race_list" id="race_trait_options">
            <div class="list_header">You can choose ${currentRace.trait_options.choose} traits from this list</div>
            <div><select id="race_trait_list"></select></div>
            </div>`)

            currentRace.trait_options.from.forEach(element => {
                $('#race_trait_options').append(`<div class="race_list">
                <input type="checkbox" class="race_trait_option" value="${element.name}"><span> ${element.name}</span>
                </div>`);
            });
            $('.race_trait_option').on('change', function () {
                if ($(`.race_trait_option:checked`).length > currentRace.trait_options.choose) {
                    this.checked = false;
                } else {
                    if (this.checked === true) {
                        if (characterTraits['race_traits_1'] === undefined) {
                            characterTraits[`race_traits_1`] = {}
                        }
                        characterTraits[`race_traits_1`][this.value] = [this.value];
                    } else {
                        delete characterTraits[`race_traits_1`][this.value];
                    }
                    console.log(characterTraits);
                }
            });
        } else {
            $('#race_traits').append(`<div class="list" id="race_trait_options">
        <div class="list_header">Choose ${currentRace.trait_options.choose} trait from this list</div>
        <div><select id="race_trait_list"></select></div>
        </div>`)

            currentRace.trait_options.from.forEach(element => {
                $('#race_trait_list').append(`<option value="${element.name}">${element.name}</option>`)
            });

            $('#race_trait_list').on('change', function () {
                characterTraits[`race_traits_1`] = {}
                characterTraits[`race_traits_1`][$('#race_trait_list').children("option:selected").val()] = [$('#race_trait_list').children("option:selected").val()];

                console.log(characterTraits);
            });
        }
    }
}

function resetRace() {
    baseAbility = [8, 8, 8, 8, 8, 8,];
    resetRaceStats()
    characterProficiencies['race_proficiencies_0'] = {};
    characterProficiencies['race_proficiencies_1'] = {};
    characterLanguages['race_languages_0'] = {};
    characterLanguages['race_languages_1'] = {};
    characterTraits['race_traits_0'] = {};
    characterTraits['race_traits_1'] = {};
    $(`#race_info_container_left`).empty();
    $(`#race_info_container_right`).empty();
}

/* ---------- Class Logic ---------- */

function activeClass(clickedClass) {
    $('.current_class').removeClass("current_class");
    $(clickedClass).addClass('current_class');
}

function currentClassInformation(currentClass, spellCasting) {

    $('#class_info_container_left').append('<div class="general_info_styling" id="class_info_left"></div>');

    Object.keys(currentClass).forEach(element => {
        // //This looks through the array, and if the current element key is part of the array it runs "return". This is to only get the correct div's created.
        // if (["_id", "index", "subclasses", "proficiencies", "proficiency_choices", "saving_throws", "starting_equipment", "class_levels", "spellcasting", "url"].indexOf(element) >= 0) {
        //     return;
        // }
        // $(`#class_info_container`).append(`<div class="class_info_container" id="class_${element}_container">
        //     <p id="class_${element}">${currentClass[element]}</p>`);
    });

    $('#class_info_left').append(`<div class="class_info">
    <h4>${currentClass.name}</h4></div>`);

    $('#class_info_left').append(`<div class="class_info" id="class_info_hd_save"></div>`);

    $('#class_info_hd_save').append(`<div class="class_info_inline">
    <h6>Hit Dice:</h6>
    <h6>d${currentClass.hit_die}</h6></div>`);

    $('#class_info_hd_save').append(`<div id="borderline"></div`);

    $('#class_info_hd_save').append(`<div class="class_info_inline" id="class_saving_throws">
    <h6>Saving Throws:</h6>`);
    currentClass.saving_throws.forEach(element => {
        if (characterSaves[`class_saves_0`] === undefined) {
            characterSaves[`class_saves_0`] = {};
        }
        characterSaves[`class_saves_0`][element.name] = element.name;
        $('#class_saving_throws').append(`<div class="class_save_list"><h6>${element.name}</h6><div>`)
    });

    //Populate the proficency list and add values to characterProficencies Object
    $(`#class_info_left`).append(`<div class="class_info" id="proficiencies"><h6>Proficencies</h6></div>`);
    currentClass.proficiencies.forEach(element => {
        $(`#proficiencies`).append(`<div class="class_list" id="class_${element.name}_container">
             <p id="class_${element.name}">${element.name}</p></div>`);
        if (characterProficiencies[`class_proficiencies_0`] === undefined) {
            characterProficiencies[`class_proficiencies_0`] = {}
        } else {
            characterProficiencies[`class_proficiencies_0`] = {};
        }
        characterProficiencies[`class_proficiencies_0`][`${element.name}`] = element.name;
    });

    console.log(spellCasting)

    //Populate and create forms for proficency choices and add values to characterProficencies Object
    $(`#class_info_left`).append(`<div class="class_info">
    <h6>Optional Class Proficencies</h6><div id="class_proficiencies"></div></div>`);
    currentClass.proficiency_choices.forEach((element, i) => {
        if (element.choose > 1) {
            $('#class_proficiencies').append(`<div class="class_prof_container" id="class_prof_list${i}">
            <p>Choose ${element.choose} proficiencies from this list</p></div>`);

            element.from.forEach(element => {
                $(`#class_prof_list${i}`).append(`<div class="class_list">
            <input type="checkbox" class="class_proficiencies_${i} checkbox_styling" value="${element.name}"><span> ${element.name}</span></div>`);
            });

            $(`.class_proficiencies_${i}`).on('change', function () {
                if ($(`.class_proficiencies_${i}:checked`).length > element.choose) {
                    this.checked = false;
                } else {
                    if (this.checked === true) {
                        if (characterProficiencies[`class_proficiencies_${i + 1}`] === undefined) {
                            characterProficiencies[`class_proficiencies_${i + 1}`] = {}
                        }
                        characterProficiencies[`class_proficiencies_${i + 1}`][this.value] = this.value;
                    } else {
                        delete characterProficiencies[`class_proficiencies_${i + 1}`][this.value];
                    }

                    console.log(characterProficiencies);
                }
            })
        } else {
            $('#class_proficiencies').append(`<div class="class_prof_container" id="class_prof_options${i}">
        <div class="list_header">Choose ${element.choose} proficency from this list</div>
        <div><select id="class_prof_list${i}"></select></div>
        </div>`)

            element.from.forEach(element => {
                $(`#class_prof_list${i}`).append(`<option value="${element.name}">${element.name}</option>`)
            });

            $(`#class_prof_list${i}`).on('change', function () {
                characterProficiencies[`class_proficiencies_${i + 1}`] = {}
                characterProficiencies[`class_proficiencies_${i + 1}`][$(`#class_prof_list${i}`).children("option:selected").val()] = $(`#class_prof_list${i}`).children("option:selected").val();

                console.log(characterProficiencies);
            });
        }
    });
    console.log(currentClass.spellcasting);
    if (currentClass.spellcasting !== undefined) {

        $('#class_info_container_right').append('<div class="general_info_styling" id="class_info_right"></div>');

        $('#class_info_right').append(`<div class="class_info" id="class_spellcasting">
    <h5>${currentClass.name} Spellcasting:</h5>`);

        spellCasting.info.forEach(element => {
            if (characterTraits[`class_traits_spellcasting`] === undefined) {
                characterTraits[`class_traits_spellcasting`] = {};
            }
            characterTraits[`class_traits_spellcasting`][element.name] = element.name;
            $('#class_info_right').append(`<div class="class_info"><h6> ${element.name}</h6><p>${element.desc}</p></div>`)
        });
    }
}

function resetClass() {
    $(`#class_info_container_left`).empty();
    $(`#class_info_container_right`).empty();
    characterProficiencies['class_proficiencies_0'] = {};
    characterProficiencies['class_proficiencies_1'] = {};
    characterProficiencies['class_proficiencies_2'] = {};
    characterProficiencies['class_proficiencies_3'] = {};
}

/* ---------- Navigation Logic ---------- */

let currentPage = 0;

function turnPage(i) {
    if (currentPage + i === -1 || currentPage + i === 5) {
        return;
    }
    $(`#nav_page_${currentPage}`).removeClass('current_page').addClass('hidden_page');
    currentPage = currentPage + i
    $(`#nav_page_${currentPage}`).removeClass('hidden_page').addClass('current_page');
}

$('#btn_prev').on('click', function () {
    pageDown = -1;
    turnPage(pageDown);
});

$('#btn_next').on('click', function () {
    pageUp = 1;
    turnPage(pageUp);
});


/* ---------- Ability Page ---------- */

function currentAbilities(currentRace) {
    currentRace.ability_bonuses.forEach(element => {
        if (element.name === `STR`) {
            raceAbility[0] = element.bonus;
            $(`#race_str`).empty().append(raceAbility[0]);
        } else if (element.name === `DEX`) {
            raceAbility[1] = element.bonus;
            $(`#race_dex`).empty().append(raceAbility[1]);
        } else if (element.name === `CON`) {
            raceAbility[2] = element.bonus;
            $(`#race_con`).empty().append(raceAbility[2]);
        } else if (element.name === `INT`) {
            raceAbility[3] = element.bonus;
            $(`#race_int`).empty().append(raceAbility[3]);
        } else if (element.name === `WIS`) {
            raceAbility[4] = element.bonus;
            $(`#race_wis`).empty().append(raceAbility[4]);
        } else if (element.name === `CHA`) {
            raceAbility[5] = element.bonus;
            $(`#race_cha`).empty().append(raceAbility[5]);
        }
    });
}

function printAbilities () {
    $('#char_str').text(boughtAbility[0] + baseAbility[0] + raceAbility[0]);
    $('#char_dex').text(boughtAbility[1] + baseAbility[1] + raceAbility[1]);
    $('#char_con').text(boughtAbility[2] + baseAbility[2] + raceAbility[2]);
    $('#char_int').text(boughtAbility[3] + baseAbility[3] + raceAbility[3]);
    $('#char_wis').text(boughtAbility[4] + baseAbility[4] + raceAbility[4]);
    $('#char_cha').text(boughtAbility[5] + baseAbility[5] + raceAbility[5]);
    $('#ability_points').text(availableAbility);
}

let availableAbility = 27;
let boughtAbility = [0, 0, 0, 0, 0, 0];

$('.ability_buy').on('click', function () {

    if (this.id === 'str_up') {
        if (boughtAbility[0] <= 4 && availableAbility > 0) {
            boughtAbility[0] += 1;
            availableAbility -= 1;
            characterAbility[0] = boughtAbility[0] + baseAbility[0] + raceAbility[0];
            $('#current_bought_str').text(boughtAbility[0]);
            printAbilities();
            console.log(availableAbility);
        } else if (boughtAbility[0] < 7 && availableAbility > 1) {
            boughtAbility[0] += 1;
            availableAbility -= 2;
            characterAbility[] = boughtAbility[0] + baseAbility[0] + raceAbility[0];
            $('#current_bought_str').text(boughtAbility[0]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'str_down') {
        if (boughtAbility[0] <= 5 && boughtAbility[0] != 0) {
            boughtAbility[0] -= 1;
            availableAbility += 1;
            characterAbility[0] = boughtAbility[0] + baseAbility[0] + raceAbility[0];
            $('#current_bought_str').text(boughtAbility[0]);
            printAbilities();

            console.log(availableAbility);
        } else if (boughtAbility[0] <= 7 && boughtAbility[0] != 0) {
            boughtAbility[0] -= 1;
            availableAbility += 2;
            characterAbility[0] = boughtAbility[0] + baseAbility[0] + raceAbility[0];
            $('#current_bought_str').text(boughtAbility[0]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'dex_up') {
        if (boughtAbility[1] <= 4 && availableAbility > 0) {
            boughtAbility[1] += 1;
            availableAbility -= 1;
            characterAbility[] = ;
            $('#current_bought_dex').text(boughtAbility[1]);
            printAbilities();
            console.log(availableAbility);
        } else if (boughtAbility[1] < 7 && availableAbility > 1) {
            boughtAbility[1] += 1;
            availableAbility -= 2;
            characterAbility[] =
            $('#current_bought_dex').text(boughtAbility[1]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'dex_down') {
        if (boughtAbility[1] <= 5 && boughtAbility[1] != 0) {
            boughtAbility[1] -= 1;
            availableAbility += 1;
            characterAbility[] = ;
            $('#current_bought_dex').text(boughtAbility[1]);
            printAbilities();

            console.log(availableAbility);
        } else if (boughtAbility[1] <= 7 && boughtAbility[1] != 0) {
            boughtAbility[1] -= 1;
            availableAbility += 2;
            characterAbility[] = ;
            $('#current_bought_dex').text(boughtAbility[1]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'con_up') {
        if (boughtAbility[2] <= 4 && availableAbility > 2) {
            boughtAbility[2] += 1;
            availableAbility -= 1;
            characterAbility[] = ;
            $('#current_bought_con').text(boughtAbility[2]);
            printAbilities();
            console.log(availableAbility);
        } else if (boughtAbility[2] < 7 && availableAbility > 1) {
            boughtAbility[2] += 1;
            availableAbility -= 2;
            characterAbility[] =
            $('#current_bought_con').text(boughtAbility[2]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'con_down') {
        if (boughtAbility[2] <= 5 && boughtAbility[2] != 0) {
            boughtAbility[2] -= 1;
            availableAbility += 1;
            characterAbility[] = ;
            $('#current_bought_con').text(boughtAbility[2]);
            printAbilities();

            console.log(availableAbility);
        } else if (boughtAbility[2] <= 7 && boughtAbility[2] != 0) {
            boughtAbility[2] -= 1;
            availableAbility += 2;
            characterAbility[] = ;
            $('#current_bought_con').text(boughtAbility[2]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'int_up') {
        if (boughtAbility[3] <= 4 && availableAbility > 0) {
            boughtAbility[3] += 1;
            availableAbility -= 1;
            characterAbility[] = ;
            $('#current_bought_int').text(boughtAbility[3]);
            printAbilities();
            console.log(availableAbility);
        } else if (boughtAbility[3] < 7 && availableAbility > 1) {
            boughtAbility[3] += 1;
            availableAbility -= 2;
            characterAbility[] =
            $('#current_bought_int').text(boughtAbility[3]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'int_down') {
        if (boughtAbility[3] <= 5 && boughtAbility[3] != 0) {
            boughtAbility[3] -= 1;
            availableAbility += 1;
            characterAbility[] = ;
            $('#current_bought_int').text(boughtAbility[3]);
            printAbilities();

            console.log(availableAbility);
        } else if (boughtAbility[3] <= 7 && boughtAbility[3] != 0) {
            boughtAbility[3] -= 1;
            availableAbility += 2;
            characterAbility[] = ;
            $('#current_bought_int').text(boughtAbility[3]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'wis_up') {
        if (boughtAbility[4] <= 4 && availableAbility > 0) {
            boughtAbility[4] += 1;
            availableAbility -= 1;
            characterAbility[] = ;
            $('#current_bought_wis').text(boughtAbility[4]);
            printAbilities();
            console.log(availableAbility);
        } else if (boughtAbility[4] < 7 && availableAbility > 1) {
            boughtAbility[4] += 1;
            availableAbility -= 2;
            characterAbility[] =
            $('#current_bought_wis').text(boughtAbility[4]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'wis_down') {
        if (boughtAbility[4] <= 5 && boughtAbility[4] != 0) {
            boughtAbility[4] -= 1;
            availableAbility += 1;
            characterAbility[] = ;
            $('#current_bought_wis').text(boughtAbility[4]);
            printAbilities();

            console.log(availableAbility);
        } else if (boughtAbility[4] <= 7 && boughtAbility[4] != 0) {
            boughtAbility[4] -= 1;
            availableAbility += 2;
            characterAbility[] = ;
            $('#current_bought_wis').text(boughtAbility[4]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'cha_up') {
        if (boughtAbility[5] <= 4 && availableAbility > 0) {
            boughtAbility[5] += 1;
            availableAbility -= 1;
            characterAbility[] = ;
            $('#current_bought_cha').text(boughtAbility[5]);
            printAbilities();
            console.log(availableAbility);
        } else if (boughtAbility[5] < 7 && availableAbility > 1) {
            boughtAbility[5] += 1;
            availableAbility -= 2;
            characterAbility[] =
            $('#current_bought_cha').text(boughtAbility[5]);
            printAbilities();
            console.log(availableAbility);
        }
    } else if (this.id === 'cha_down') {
        if (boughtAbility[5] <= 5 && boughtAbility[5] != 0) {
            boughtAbility[5] -= 1;
            availableAbility += 1;
            characterAbility[] = ;
            $('#current_bought_cha').text(boughtAbility[5]);
            printAbilities();

            console.log(availableAbility);
        } else if (boughtAbility[5] <= 7 && boughtAbility[5] != 0) {
            boughtAbility[5] -= 1;
            availableAbility += 2;
            characterAbility[] = ;
            $('#current_bought_cha').text(boughtAbility[5]);
            printAbilities();
            console.log(availableAbility);
        }
    } 
});