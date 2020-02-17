/* ---------- Dynamically Created Content on Page Load ---------*/

fetchRaceList()
fetchClassList()

//Loads a default race, class & ability description
selectRace('/api/races/dragonborn');
selectClass('/api/classes/barbarian');
fetchAbilityDescription('str');

let unsortedProficiencies = {};

/* ---------- Navigation Logic ---------- */

let currentPage = 0;

function turnPage(i) {
    if (currentPage + i === -1 || currentPage + i === 5) {
        return;
    }
    $(`#nav_page_${currentPage}`).removeClass('current_page').addClass('hidden_page');
    currentPage = currentPage + i
    $(`#nav_page_${currentPage}`).removeClass('hidden_page').addClass('current_page');
    characterSkills();
    printCurrentCharacter();
    printAbilities();
    summarySkills()
}

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
    proficency: 2,
    passivePerception: 1,
    passiveInsight: 1,
    saves: {},
    languages: {},
    traits: {},
    proficienciesInstruments: [],
    proficienciesSkills: [],
    proficienciesWeapons: [],
    proficienciesArmor: [],
    proficienciesTools: [],
    saves: {},
}


$('#submit_name').on('click', function () {
    characterSummary.name = $('#name_field').val();
    pageUp = 1;
    turnPage(pageUp);
});




/* ---------- Ability Page ---------- */

let nameAbility = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
let fullNameAbility = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
let baseAbility = [8, 8, 8, 8, 8, 8,];
let raceAbility = [0, 0, 0, 0, 0, 0,];
let modifierAbility = [-1, -1, -1, -1, -1, -1];
let boughtAbility = [0, 0, 0, 0, 0, 0];
let characterAbility = [8, 8, 8, 8, 8, 8];
let availableAbility = 27;
let bonusAbility = 0;

function populateAbilityPage() {
    $('#abilities_container').append(`
        <div class="abilities_header">
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

function printAbilities() {
    nameAbility.forEach((element, i) => {
        $(`#char_${element}`).empty().append(characterAbility[i]);
        $(`#current_bought_${element}`).empty().append(boughtAbility[i]);
        $(`#current_bought_race_${element}`).empty().append(raceAbility[i]);
        $('#ability_points').empty().append(availableAbility);
        $('#race_bonus_points').empty().append(bonusAbility);
        $(`#character_${element}`).empty().append(`<div class="character_ability_header">${element}</div><div class="character_ability_score">${characterAbility[i]}</div><div class="character_ability_bonus">(${modifierAbility[i]})</div>`);
        $(`#ability_modifier_${element}`).empty().text(modifierAbility[i]);
    });
};

function setAbility(i) {
    characterAbility[i] = boughtAbility[i] + baseAbility[i] + raceAbility[i];
    modifierAbility[i] = Math.floor((characterAbility[i] - 10) / 2)
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

$('body').on('click', '.ability_header', function () {
    fetchAbilityDescription(this.textContent.toLowerCase());
});

function abilityDescriptor(element) {
    $('#abilities_desc_container').empty().append(`<div class="abilities_header"><h4>${element.full_name}</h4></div><div id="ability_description">${element.desc}</div>`)
};



/* ---------- Character Summary ---------- */

function summaryHitDice(currentClass) {
    characterSummary.hitDice = currentClass.hit_die;
};

function summaryHitPoints() {
    characterSummary.hitPoints = characterSummary.hitDice + modifierAbility[2];
};

function summaryArmorClass() {
    characterSummary.armorClass = 10 + modifierAbility[1];
};

function summaryInitiative() {
    characterSummary.initative = modifierAbility[1];
}

function summarySpeed(currentRace) {
    characterSummary.speed = currentRace.speed;
}

function summarySkills() {
    $('#character_proficiencies').empty().append(`<div class="summary_skill_header"><h5>Skills</h5></div>`)
    fullNameAbility.forEach((element, i) => {
        if (characterSummary.proficienciesSkills[i].length > 0) {
            $('#character_proficiencies').append(`<div class="summary_skill_header" id="character_skill_summary_${nameAbility[i]}">
            <h6>${element} Skills</h6>
            </div>`)
            characterSummary.proficienciesSkills[i].forEach(skill => {
                $(`#character_skill_summary_${nameAbility[i]}`).append(`
                <div class="row summary_skill_list" id="character_skill_${skill.name}">
                <div class="summary_skill_list_prof" id="prof_${skill.name}"></div>
                <div class="col-8 summary_skill_list_name">${skill.name}</div>
                <div class="col-2 summary_skill_list_value">${skill.value}</div>
                </div>`)
            })
        }
    });
};

function summarizeCharacter() {
    summaryHitPoints()
    summaryArmorClass()
    summaryInitiative()
}

async function printCurrentCharacter() {
    summarizeCharacter()
    $('#character_name').empty().append(`<div><h5>${characterSummary.name} the ${characterSummary.race} ${characterSummary.characterClass}</h5></div>`);

    $('#hit_points').empty().append(`<div class="summary_styling"><span class="summary_header">Hit Points:</span><br><span class="summary_value">${characterSummary.hitPoints}</span></div`);
    $('#hit_dice').empty().append(`<div class="summary_styling">Hit Dice:<br><span class="summary_value">d${characterSummary.hitDice}</span></div>`);

    $('#armor_class').empty().append(`<div class="summary_styling">AC:<br><span class="summary_value">${characterSummary.armorClass}</span></div`);
    $('#initiative').empty().append(`<div class="summary_styling">Initiative:<br><span class="summary_value">${characterSummary.initative}</span></div>`);
    $('#speed').empty().append(`<div class="summary_styling">Speed:<br><span class="summary_value">${characterSummary.speed}</span></div>`);
};

populateAbilityPage();
