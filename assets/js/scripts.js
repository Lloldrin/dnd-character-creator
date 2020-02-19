/* ---------- Dynamically Created Content on Page Load ---------*/

//Loads a default race, class & ability description
selectRace('/api/races/dragonborn');
selectClass('/api/classes/barbarian');
fetchAbilityDescription('str');

/* ---------- Navigation Logic ---------- */

let currentPage = 0;

//This is run by the navigation buttons to either increase or decrease the nav_page. It does decrease on the first or increase on the last.
function turnPage(i) {
    if (currentPage + i === -1 || currentPage + i === 5) {
        return;
    }
    $(`#nav_page_${currentPage}`).removeClass('current_page').addClass('hidden_page');
    currentPage = currentPage + i
    $(`#nav_page_${currentPage}`).removeClass('hidden_page').addClass('current_page');
    summarizeSkills();
    summarizeProficiencies();
    printCurrentCharacter();
    printAbilities();
}

//These are the event listeners for navigation button presses.
$('#btn_prev_xs').on('click', function () {
    pageDown = -1;
    turnPage(pageDown);
});

$('#btn_next_xs').on('click', function () {
    pageUp = 1;
    turnPage(pageUp);
});

$('#btn_prev_md').on('click', function () {
    pageDown = -1;
    turnPage(pageDown);
});

$('#btn_next_md').on('click', function () {
    pageUp = 1;
    turnPage(pageUp);
});

// This is all the information the character will contain and summarize in the end. I load it with some initial values (corresponding to the default race/class). But it's not necessary. Just for aesthetics. 
let characterSummary = {
    name: 'Lloldrin',
    race: 'Dragonborn',
    characterClass: 'Barbarian',
    speed: 30,
    hitPoints: 12,
    hitDice: 12,
    armorClass: 10,
    initative: -1,
    proficiency: 2,
    passivePerception: 1,
    passiveInsight: 1,
    saves: [],
    languages: [],
    traits: [],
    proficienciesInstruments: [],
    proficienciesSkills: [],
    proficienciesWeapons: [],
    proficienciesArmor: [],
    proficienciesTools: [],
    saves: {},
}

//Updates characterSummary with the chosen name and brings the user to the next page.
$('#submit_name').on('click', function () {
    characterSummary.name = $('#name_field').val();
    pageUp = 1;
    turnPage(pageUp);
});

/* ---------- Ability Page ---------- */

//This sets the base abilities as well as name the abbreviated and full names of the abilities
let nameAbility = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
let fullNameAbility = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
let baseAbility = [8, 8, 8, 8, 8, 8,];
let raceAbility = [0, 0, 0, 0, 0, 0,];
let modifierAbility = [-1, -1, -1, -1, -1, -1];
let boughtAbility = [0, 0, 0, 0, 0, 0];
let characterAbility = [8, 8, 8, 8, 8, 8];
let availableAbility = 27;
let bonusAbility = 0;

//Populates the DOM with everything regarding the abilities page. This was a part of the HTML, but with namAbility.forEach it was easier to move here to make changes to it. 
function populateAbilityPage() {
    $('#abilities_container').append(`
        <div class="summary_top_header">
            <h4>Abilities</h4>
        </div>

        <div class="row base_abilities_container">
            <div class="col-2 ability_styling ability_top "></div>
            <div class="col ability_styling ability_top">Base</div>
            <div class="col ability_styling ability_top"></div>
            <div class="col-2 ability_styling ability_top">Bought</div>
            <div class="col ability_styling ability_top"></div>
            <div class="col-2 ability_styling ability_top">Race</div>
            <div class="col ability_styling ability_top"></div>
            <div class="col ability_styling ability_top">Total</div>
            <div class="d-none d-md-block col col-md-2 ability_styling ability_top">Modifier</div>
        </div>`)

    nameAbility.forEach(element => {
        $('#abilities_container').append(`
        <div class="row base_abilities_container">
            <div class="col-2 ability_styling ability_header">${element.toUpperCase()}</div>
            <div class="col ability_styling" id="base_${element}">8</div>
            <div class="col ability_styling">+</div>
            <div class="col-2 ability_styling" id="bought_${element}">
            <button class="ability_buy" id="bought_${element}_down">-</button>
            <span id="current_bought_${element}">0</span>
            <button class="ability_buy" id="bought_${element}_up">+</button>
            </div>
            <div class="col ability_styling">+</div>
            <div class="col-2 ability_styling" id="race_${element}">0</div>
            <div class="col ability_styling">=</div>
            <div class="col ability_styling" id="char_${element}">8</div>
            <div class="d-none d-md-block col col-md-2 ability_styling" id="ability_modifier_${element}"></div>
        </div>`)
    });

    $('#abilities_container').append(`
    <div class="row base_abilities_container_footer">
        <div class="abilities_styling_footer_text">Ability Points:</div>
        <div class="abilities_styling_footer_value" id="ability_points">27</div>
        <div class="abilities_styling_footer_text">Racial Points:</div>
        <div class="abilities_styling_footer_value" id="race_bonus_points">0</div>
    </div>
    `)
};

//Clears previous race ability bonuses and adds the new ones. Run when the a new race is fetched. 
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

//If the race has bonus ability points to spend this is run to add buttons to the ability page
function bonusAbilities(bonus) {
    if (bonus !== undefined) {
        bonusAbility = bonus.choose;
        $('#race_bonus_points').empty().text(bonusAbility)
        nameAbility.forEach((element, i) => {
            if (raceAbility[i] > 0) {
                return
            } else {
                $(`#race_${element}`).empty().append(`
                <button class="ability_buy_race" id="race_${element}_down">-</button>
                <span id="current_bought_race_${element}">0</span>
                <button class="ability_buy_race" id="race_${element}_up">+</button>`)
            }
        });
    }
}

//Updates the DOM with the correct, current values of all the ability points, including currently bought points, points remaining and current modifier.
function printAbilities() {
    nameAbility.forEach((element, i) => {
        $(`#char_${element}`).empty().append(characterAbility[i]);
        $(`#current_bought_${element}`).empty().append(boughtAbility[i]);
        $(`#current_bought_race_${element}`).empty().append(raceAbility[i]);
        $('#ability_points').empty().append(availableAbility);
        $('#race_bonus_points').empty().append(bonusAbility);
        $(`#character_${element}`).empty().append(`<div class="character_ability_header">${element}</div><div class="character_ability_score">${characterAbility[i]}</div><div class="character_ability_bonus">${(modifierAbility[i] <= 0 ? "" : "+") + modifierAbility[i]}</div>`);
        $(`#ability_modifier_${element}`).empty().text((modifierAbility[i] <= 0 ? "" : "+") + modifierAbility[i]);
    });
};

//Sets current characterAbility and the current modifier
function setAbility(i) {
    characterAbility[i] = boughtAbility[i] + baseAbility[i] + raceAbility[i];
    modifierAbility[i] = Math.floor((characterAbility[i] - 10) / 2)
};


//The logic to increase and decrease abilities and bonus abilities on the ability page. Also has logic to charge more for higher values.
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

//Event handlers for when the user increases/decreases abilities
$('body').on('click', '.ability_buy', function () {
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

//Lets the user click on the header of the ability to get an explanation of the ability
$('body').on('click', '.ability_header', function () {
    fetchAbilityDescription(this.textContent.toLowerCase());
});

function abilityDescriptor(element) {
    $('#abilities_desc_container').empty().append(`<div class="summary_top_header"><h4>${element.full_name}</h4></div><div class="summary_sub_header">${element.desc}</div>`)
};



/* ---------- Character Summary ---------- */

//Gets data from currentClass and updates the characterSummary.HitDice
function summaryHitDice(currentClass) {
    characterSummary.hitDice = currentClass.hit_die;
};

//Sets characterSummary.hitpointes based on the current HitDice and Constitution Modifier
function summaryHitPoints() {
    characterSummary.hitPoints = characterSummary.hitDice + modifierAbility[2];
};

//Sets the characterSummary.ArmorClass based on 10 + Dexterity Modifier
function summaryArmorClass() {
    characterSummary.armorClass = 10 + modifierAbility[1];
};

//Sets the characterSummary.Initiative based on the Dexterity modifier
function summaryInitiative() {
    characterSummary.initative = modifierAbility[1];
}

//Sets the characterSummary.Speed based on the currentRace 
function summarySpeed(currentRace) {
    characterSummary.speed = currentRace.speed;
}

function summarizeCharacter() {
    summaryHitPoints()
    summaryArmorClass()
    summaryInitiative()
}

//Runs through the current skill values and updates the DOM with the correct numbers
async function summarizeSkills() {
    characterSkillValues();
    $('#summary_container_middle').empty().append('<div class="general_info_styling" id="summary_middle"></div>');
    $('#summary_middle').empty().append(`<div class="summary_top_header"><h5>Skills</h5></div><div class="info_sub_container" id="summary_skills"></div>`)

    fullNameAbility.forEach((element, i) => {
        if (characterSummary.proficienciesSkills[i].length > 0) {
            $('#summary_skills').append(`<div class="summary_sub_header summary_skills_list" id="character_skill_summary_${nameAbility[i]}">
            <h6>${element} Skills</h6>
            </div>`)
            characterSummary.proficienciesSkills[i].forEach(skill => {
                $(`#character_skill_summary_${nameAbility[i]}`).append(`
                <div class="row summary_skill_list" id="character_skill_${skill.name}">
                <div class="summary_skill_list_prof" id="prof_${skill.name}"></div>
                <div class="col-8 summary_skill_list_name hover_info_container">${skill.name}<div class="hover_info">${skill.desc}</div></div>
                <div class="col-2 summary_skill_list_value">${(skill.value <= 0 ? '' : '+') + skill.value}</div>
                </div>`)
            });
        };
    });
};

//Populates the summary page
async function printCurrentCharacter() {
    summarizeCharacter()
    $('#character_name').empty().append(`<div><h5>${characterSummary.name} the ${characterSummary.race} ${characterSummary.characterClass}</h5></div>`);

    $('#hit_points').empty().append(`<span class="summary_normal_header">Hit Points:</span><br><span class="summary_value">${characterSummary.hitPoints}</span></div`);
    $('#hit_dice').empty().append(`<span class="summary_normal_header">Hit Dice:</span><br><span class="summary_value">d${characterSummary.hitDice}</span></div>`);

    $('#armor_class').empty().append(`<span class="summary_normal_header">AC:</span><br><span class="summary_value">${characterSummary.armorClass}</span></div`);
    $('#initiative').empty().append(`<span class="summary_normal_header">Initiative:</span><br><span class="summary_value">${characterSummary.initative}</span></div>`);
    $('#speed').empty().append(`<span class="summary_normal_header">Speed:</span><br><span class="summary_value">${characterSummary.speed}</span>`);

    $('#proficiency').empty().append(`<span class="summary_normal_header">Proficiency:</span><br><span class="summary_value">${characterSummary.proficiency}</span></div`);
    $('#passive_perception').empty().append(`<span class="summary_small_header">Passive Perception</span><br><span class="summary_value">${characterSummary.passivePerception}</span>`);
    $('#passive_insight').empty().append(`<span class="summary_small_header">Passive Insight</span><br><span class="summary_value">${characterSummary.passiveInsight}</span>`);

    $('#summary_container_right').empty()
    $('#summary_container_right').append('<div class="general_info_styling" id="summary_right"></div>');
    $('#summary_right').append(`<div class="summary_top_header"><h5>Proficiencies</h5></div><div class="info_sub_container" id="summary_proficiencies"></div>`)
    summaryProficiencies.forEach((element, i) => {
        if (summaryProficiencies[i].length > 0) {
            $('#summary_proficiencies').append(`<div class="summary_sub_header summary_proficiencies_list" id="summary_list_${proficiencyNames[i]}"><h6>${proficiencyNames[i]}</h6></div>`)
        }
        element.forEach(skill => {
            $(`#summary_list_${proficiencyNames[i]}`).append(`<div>${skill}</div>`)
        });
    });

    $('#summary_right').append(`<div class="summary_header info_sub_container"><h5>Languages</h5><div class="summary_list_container" id="summary_languages"></div></div>`)
    characterSummary.languages.forEach((element) => {
        $(`#summary_languages`).append(`<div>${element}</div>`)
    });

    $('#summary_right').append(`<div class="summary_header info_sub_container"><h5>Traits</h5><div class="summary_list_container" id="summary_traits"></div></div>`)
    characterSummary.traits.forEach((element) => {
        $(`#summary_traits`).append(`<div>${element}</div>`)
    });

    $('#summary_right').append(`<div class="summary_header info_sub_container"><h5>Saving Throws</h5><div class="summary_list_container" id="summary_saves"></div></div>`)
    nameAbility.forEach((element, i) => {
        characterSummary.saves.forEach(save => {
            if (element === save.toLowerCase()) {
                $(`#summary_saves`).append(`<div>${fullNameAbility[i]}</div>`)
            };
        });
    });
};

populateAbilityPage();

//This displays a hover window when hovering over skills etc on the page.
$('body').on('mouseover', '.hover_info_container', function () { $(this).children('.hover_info').show(); });
$('body').on('mouseout', '.hover_info_container', function () { $(this).children('.hover_info').hide(); });