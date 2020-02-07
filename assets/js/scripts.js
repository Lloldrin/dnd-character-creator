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

let characterLanguages = {};
let characterTraits = {};
let characterProficiencies = {};
let characterSaves = {};

$(`body`).on(`click`, `.btn_race`, async function () {
    selectRace($(this).attr(`id`));
});

selectRace('/api/races/dragonborn')

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

function resetRaceStats() {
    $(`#race_str`).empty().append(0);
    $(`#race_dex`).empty().append(0);
    $(`#race_con`).empty().append(0);
    $(`#race_int`).empty().append(0);
    $(`#race_wis`).empty().append(0);
    $(`#race_cha`).empty().append(0);
    $('#race_bonus').empty();
    raceAbility = [0, 0, 0, 0, 0, 0,];
}

/* ---------- Class Logic ---------- */

$(`body`).on(`click`, `.btn_class`, function () {
    selectClass($(this).attr(`id`));
    activeClass(this);
});

selectClass('/api/classes/barbarian')

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
    $(`#class_info_left`).append(`<div><h6>Proficencies</h6></div><div class="class_info class_prof_container" id="proficiencies"></div>`);
    currentClass.proficiencies.forEach(element => {
        $(`#proficiencies`).append(`<div class="class_list class_prof">
             <span id="class_${element.name}">${element.name}</span></div>`);
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

let nameAbility = ['str', 'dex', 'con', 'int', 'wis', 'cha']
let baseAbility = [8, 8, 8, 8, 8, 8,];
let raceAbility = [0, 0, 0, 0, 0, 0,];
let boughtAbility = [0, 0, 0, 0, 0, 0];
let characterAbility = [8, 8, 8, 8, 8, 8];
let availableAbility = 27;
let bonusAbility = 0;

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

    bonusAbilities(currentRace.ability_bonus_options);

    for (let i = 0; i < raceAbility.length; i++) {
        setAbility(i);
    }
}

function bonusAbilities(bonus) {
    if (bonus !== undefined) {
        bonusAbility = bonus.choose;
        $('#race_bonus_points').text(bonusAbility)
        nameAbility.forEach((element, i) => {
            if (raceAbility[i] > 0) {
                return
            } else {
                $(`#race_${element}`).empty().append(`<button class="ability_buy_race" id="race_${element}_down">-</button> <span id="current_bought_race_${element}">0</span> <button class="ability_buy_race" id="race_${element}_up">+</button></div>`)
            }
        });
    }
}

function printAbilities() {
    nameAbility.forEach((element, i) => {
        $(`#char_${element}`).text(characterAbility[i]);
        $(`#current_bought_${element}`).text(boughtAbility[i]);
        $(`#current_bought_race_${element}`).text(raceAbility[i]);
        $('#ability_points').text(availableAbility);
        $('#race_bonus_points').text(bonusAbility);
    });
};

function setAbility(i) {
    characterAbility[i] = boughtAbility[i] + baseAbility[i] + raceAbility[i];
};

function upBoughtAbility(i) {
    if (boughtAbility[i] <= 4 && availableAbility > 0) {
        boughtAbility[i] += 1;
        availableAbility -= 1;
        setAbility(i)
        printAbilities();
    } else if (boughtAbility[i] < 7 && availableAbility > 1) {
        boughtAbility[i] += 1;
        availableAbility -= 2;
        setAbility(i)
        printAbilities();
    }
}

function downBoughtAbility(i) {
    if (boughtAbility[i] <= 5 && boughtAbility[i] != 0) {
        boughtAbility[i] -= 1;
        availableAbility += 1;
        setAbility(i)
        printAbilities();
    } else if (boughtAbility[i] <= 7 && boughtAbility[i] != 0) {
        boughtAbility[i] -= 1;
        availableAbility += 2;
        setAbility(i)
        printAbilities();
    }
}

function upBonusAbility(i) {
    if (raceAbility[i] === 0 && bonusAbility != 0) {
        raceAbility[i] += 1;
        bonusAbility -= 1;
        setAbility(i);
        printAbilities();
    }
}

function downBonusAbility(i) {
    if (raceAbility[i] != 0) {
        raceAbility[i] -= 1;
        bonusAbility += 1;
        setAbility(i);
        printAbilities();
    }
}

$('.ability_buy').on('click', function () {
    nameAbility.forEach((element, i) => {
        if (this.id === `bought_${element}_up`) {
            upBoughtAbility(i)
        } else if (this.id === `bought_${element}_down`) {
            downBoughtAbility(i)
        }
    });
});

$('body').on('click', '.ability_buy_race', function () {
    nameAbility.forEach((element, i) => {
        if (this.id === `race_${element}_up`) {
            upBonusAbility(i)
        } else if (this.id === `race_${element}_down`) {
            downBonusAbility(i)
        }
    });
});

$('.ability_header').on('click', function () {
    fetchAbilityDescription(this.textContent.toLowerCase());
});

fetchAbilityDescription('str');

function abilityDescriptor(element) {
    $('#abilities_desc_container').empty().append(`<div class="abilities_header"><h4>${element.full_name}</h4></div><div id="ability_description">${element.desc}</div>`)
};