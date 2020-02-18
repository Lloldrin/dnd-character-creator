$(`body`).on(`click`, `.btn_race`, async function () {
    selectRace($(this).attr(`id`));
    activeRace($(this));
});

$(`body`).on(`change`, `#race_list_xs`, async function () {
    selectRace($(this).children('option:selected').val());
});

//Function to dynamically create the list of races and give each button a unique ID
function populateRaceList(listRaces) {
    listRaces.forEach(element => {
        $(`#race_list_md`).append(`<div><button type="button" class="btn btn_race" id="${element.url}">${element.name}</button></div>`)
        $(`#race_list_xs`).append(`<option value="${element.url}">${element.name}</option>)</div>`)
    })
}

//Sets the current race to show and the previous choice to hidden
function activeRace(clickedRace) {
    $('.current_race').removeClass('current_race');
    $(clickedRace).addClass('current_race');
}

//Runs the functions to update the current race in characterSummary and the DOM. 
function currentRaceInformation(currentRace) {
    $('#race_info_container_left').append('<div class="general_info_styling" id="race_info_left"></div>');
    $('#race_info_container_right').append('<div class="general_info_styling" id="race_info_right"></div>');
    raceName(currentRace.name);
    raceAlignment(currentRace.alignment);
    raceAge(currentRace);
    raceSize(currentRace);
    raceLanguageDesc(currentRace);
    raceLanguage(currentRace);
    raceLanguageOptions(currentRace);
    raceProficiencies(currentRace);
    raceProficienciesOptions(currentRace);
    raceTraits(currentRace);
    raceTraitOptions(currentRace);
    raceAbilityBonus(currentRace);
    summarySpeed(currentRace)
}

function raceName(name) {
    $('#race_info_left').append(`<div class="info_style" id"race_${name}_container>
    <h4>${name}</h4></div>`);
    characterSummary.race = name;
}

function raceAlignment(alignment) {
    $('#race_info_left').append(`<div class="info_style" id"race_${alignment}_container>
    <h6>Alignment</h6>
    <p>${alignment}</p></div>`);
}

function raceAge(currentRace) {
    $('#race_info_left').append(`<div class="info_style" id"race_${currentRace.age}_container>
    <h6>Age</h6>
    <p>${currentRace.age}</p></div>`);
}

function raceSize(currentRace) {
    $('#race_info_left').append(`<div class="info_style" id"race_${currentRace.size_description}_container>
    <h6>Size</h6>
    <p>${currentRace.size_description}</p></div>`);
}

function raceLanguageDesc(currentRace) {
    $('#race_info_left').append(`<div class="info_style" id"race_${currentRace.language_desc}_container>
    <h6>Languages</h6>
    <p>${currentRace.language_desc}</p></div>`);
}

function raceLanguage(currentRace) {
    $('#race_info_right').append(`<div class="info_style" id="race_languages"><h6>Languages:</h6><div>`)
    currentRace.languages.forEach(element => {
        characterSummary.languages.push(element.name);
        $('#race_languages').append(`<div class="race_list">${element.name}<div>`);
    });
}

function raceLanguageOptions(currentRace) {
    let i = 0
    if (currentRace.language_options !== undefined) {
        if (currentRace.language_options.choose > 1) {
            $('#race_languages').append(`<div class="race_info_container_right" id="race_languages">
            <p>You can choose ${currentRace.language_options.choose} languages from this list</div>`);
            currentRace.language_options.from.forEach(element => {
                $('#race_languages').append(`<div class="race_info race_list">
            <input type="checkbox" class="race_language" value="${element.name}"><span> ${element.name}</span></div>`);
            });
            $('.race_language').on('change', function () {
                if ($(`.race_language:checked`).length > currentRace.language_options.choose) {
                    this.checked = false;
                }
                else {
                    characterSummary.languages.push(this.value);
                }
            });
        }
        else {
            $('#race_languages').append(`<div class="race_info race_list" id="race_languages">
            <p>You can choose ${currentRace.language_options.choose} language from this list</p>
            <div><select id="race_languages_list"></select></div>
            </div>`);
            currentRace.language_options.from.forEach(element => {
                $('#race_languages_list').append(`<option value="${element.name}">${element.name}</option>)`);
            });
            $('#race_languages_list').on('change', function () {
                if (i > 0) {
                    console.log(i)
                    characterSummary.languages.pop()
                } else {
                    i++;
                }
                characterSummary.languages.push($('#race_languages_list').children("option:selected").val());
            });
        }
    }
}

function raceProficiencies(currentRace) {
    if (currentRace.starting_proficiencies.length > 0) {
        $(`#race_info_right`).append(`<div class="info_style" id="race_proficiencies"><h6>Race Proficencies:</h6></div>`);
        currentRace.starting_proficiencies.forEach(element => {
            $(`#race_proficiencies`).append(`<div class="race_list" id="race_${element.name}_proficency">${element.name}</div>`);
            addProficiencySkill(element.name)
            addProficiency(element.name)
            addRaceProficiency(element.name)
        });
    }
}

function raceProficienciesOptions(currentRace) {
    let previousProficiency
    if (currentRace.starting_proficiency_options !== undefined) {
        if (currentRace.starting_proficiency_options.choose > 1) {
            $('#race_proficiencies').append(`<div class="race_list" id="race_proficiencies_options"><p>Choose ${currentRace.proficiencies_options.choose} proficencies from this list</div>`);
            currentRace.starting_proficiency_options.from.forEach(element => {
                $('#race_proficiencies_options').append(`<div class="race_info race_list">
            <input type="checkbox" class="race_proficiencies_options" value="${element.name}"><span> ${element.name}</span></div>`);
            });
            $('.race_proficiencies_options').on('change', function () {
                if ($(`.race_proficiencies_options:checked`).length > currentRace.starting_proficiency_options.choose) {
                    this.checked = false;
                }
                else {
                    if (this.checked === true) {
                        addProficiency(this.value)
                        addRaceProficiency(this.value)
                    }
                    else {
                        removeProficiency(this.value)
                    }
                }
            });
        }
        else {
            $('#race_proficiencies').append(`<div class="race_list" id="race_proficiencies_options">
            <p>Choose ${currentRace.starting_proficiency_options.choose} proficency from this list</p>
            <div><select id="race_proficiencies_options_list"></select></div>
            </div>`);
            currentRace.starting_proficiency_options.from.forEach(element => {
                $('#race_proficiencies_options_list').append(`<option value="${element.name}">${element.name}</option>)`);
            });

            $('#race_proficiencies_options_list').on('focus', function () {
                previousProficiency = $('#race_proficiencies_options_list').children("option:selected").val()
            }).change(function () {
                removeProficiency(previousProficiency);
                addProficiency($('#race_proficiencies_options_list').children("option:selected").val())
                addRaceProficiency($('#race_proficiencies_options_list').children("option:selected").val())
                previousProficiency = $('#race_proficiencies_options_list').children("option:selected").val()
            })
        }
    }
}

function raceTraits(currentRace) {
    if (currentRace.traits.length > 0) {
        $(`#race_info_right`).append(`<div class="info_style" id="race_traits"><h6>Race Traits:</h6></div>`);
        currentRace.traits.forEach(element => {
            $(`#race_traits`).append(`<div class="race_list" id="race_${element.name}_trait">${element.name}</div>`);
            characterSummary.traits.push(element.name)
        });
    }
}

function raceTraitOptions(currentRace) {
    let previousTraitCounter = 0
    if (currentRace.trait_options !== undefined) {
        if (`${currentRace.trait_options.choose}` > 1) {
            $('#race_traits').append(`<div class="race_list" id="race_trait_options">
            <div class="list_header">You can choose ${currentRace.trait_options.choose} traits from this list</div>
            <div><select id="race_trait_list"></select></div>
            </div>`);
            currentRace.trait_options.from.forEach(element => {
                $('#race_trait_options').append(`<div class="race_list">
                <input type="checkbox" class="race_trait_option" value="${element.name}"><span> ${element.name}</span>
                </div>`);
            });
            $('.race_trait_option').on('change', function () {
                if ($(`.race_trait_option:checked`).length > currentRace.trait_options.choose) {
                    this.checked = false;
                } else if (this.checked === true) {
                    characterSummary.traits.push(element.name)
                } else {
                    characterSummary.traits.forEach((trait, n) => {
                        if (element.name === trait)
                            currentClassProficiencies.splice(n);
                    });
                }
            });
        } else {

            $('#race_traits').append(`<div class="list" id="race_trait_options">
            <div class="list_header">Choose ${currentRace.trait_options.choose} trait from this list</div>
            <div><select id="race_trait_list"></select></div>
            </div>`);

            currentRace.trait_options.from.forEach(element => {
                $('#race_trait_list').append(`<option value="${element.name}">${element.name}</option>`);
            });

            $('#race_trait_list').on('change', function () {
                if (previousTraitCounter > 0) {
                    characterSummary.traits.pop();
                } else {
                    previousTraitCounter ++;
                }
                characterSummary.traits.push($('#race_trait_list').children("option:selected").val());
            });
        }
    }
}

function raceAbilityBonus(currentRace) {
    if (currentRace.ability_bonus_options === undefined) {
        $(`.ability_bonus`).empty().append("0");
    }
    else {
        $(`.ability_bonus`).empty().append(currentRace.ability_bonus_options.choose);
    }
}

function resetRace() {
    resetRaceStats()
    resetRaceProficiencies()
    characterSummary.languages = [];
    characterSummary.traits = [];
    $(`#race_info_container_left`).empty();
    $(`#race_info_container_right`).empty();
}

function resetRaceStats() {
    nameAbility.forEach((element, i) => {
        $(`#race_${element[i]}`).empty().append(0);
    })
    $('#race_bonus').empty();
    $('#race_bonus_points').empty().append(0);
    raceAbility = [0, 0, 0, 0, 0, 0,];
    bonusAbility = 0;
}

function resetRaceProficiencies() {
    sortedProficienciesOrder.forEach((element) => {
        characterSummary[`proficiencies${element}`].forEach(proficiency => {
        });
    })
}