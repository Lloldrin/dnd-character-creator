/* ---------- Dynamically Created Content ---------*/

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



/* ---------- Character Logic ---------- */


let base_stats = [8, 8, 8, 8, 8, 8];

function baseStats(element) {
    $(`#base_stat_str`).text(base_stats[0]);
    $(`#base_stat_dex`).text(base_stats[1]);
    $(`#base_stat_con`).text(base_stats[2]);
    $(`#base_stat_int`).text(base_stats[3]);
    $(`#base_stat_wis`).text(base_stats[4]);
    $(`#base_stat_cha`).text(base_stats[5]);
};

baseStats();

//Function to use the data retrieved on click of btn_race (prototype just to make sure that the data can be sent to the DOM)
function currentRaceStats(currentRace) {
    currentRace.ability_bonuses.forEach(element => {
        if (element.name === `STR`) {
            var base_stats_str = element.bonus + base_stats[0];
            $(`#base_stat_str`).text(base_stats_str);
        } else if (element.name === `DEX`) {
            var base_stats_dex = element.bonus + base_stats[1];
            $(`#base_stat_dex`).text(base_stats_dex);
        } else if (element.name === `CON`) {
            var base_stats_con = element.bonus + base_stats[2];
            $(`#base_stat_con`).text(base_stats_con);
        } else if (element.name === `INT`) {
            var base_stats_int = element.bonus + base_stats[3];
            $(`#base_stat_int`).text(base_stats_int);
        } else if (element.name === `WIS`) {
            var base_stats_wis = element.bonus + base_stats[4];
            $(`#base_stat_wis`).text(base_stats_wis);
        } else if (element.name === `CHA`) {
            var base_stats_cha = element.bonus + base_stats[5];
            $(`#base_stat_cha`).text(base_stats_cha);
        }
    });

    $('#base_stat_bonus').empty();
    try {
        if (currentRace.ability_bonus_options.choose >= 1) {
            $(`#base_stat_bonus`).text(currentRace.ability_bonus_options.choose);
        }
    } catch {
        console.log("This Race does not have an ability bonus");
    }
}

function currentRaceInformation(currentRace) {
    Object.keys(currentRace).forEach(element => {
        //This looks through the array, and if the current element key is part of the array it runs "return". This is to only get the correct div's created.
        if (["_id", "index", "ability_bonuses", "ability_bonus_options", "starting_proficiencies", "starting_proficiency_options", "size", "languages", "language_options", "traits", "trait_options", "subraces", "url"].indexOf(element) >= 0) {
            return;
        }
        $(`#race_info_container`).append(`<div class="race_info_container" id="race_${element}_container">
            <p id="race_${element}">${currentRace[element]}</p>`);
    });


    console.log(Object.keys(currentRace));
}
// $(`#race_proficiencies`)}.text(`${currentRace.starting_proficiencies.`)

function currentClassInformation(currentClass) {
    Object.keys(currentClass).forEach(element => {
        //This looks through the array, and if the current element key is part of the array it runs "return". This is to only get the correct div's created.
        if (["_id", "index", "url"].indexOf(element) >= 0) {
            return;
        }
        $(`#class_info_container`).append(`<div class="class_info_container" id="class_${element}_container">
            <p id="class_${element}">${currentClass[element]}</p>`);
    });

    //Populate the proficencyList
    $(`#class_info_container`).append(`<div class="class_skill_list" id="proficencies"><p>You start with these proficencies:</p></div>`);
    currentClass.proficiencies.forEach(element => {
        $(`#proficencies`).append(`<div class="class_info_container" id="class_${element.name}_container">
             <p id="class_${element.name}">${element.name}</p></div>`);
    });

    //Populate and create forms for proficencyChoices
    currentClass.proficiency_choices.forEach((element, i) => {
        $(`#class_info_container`).append(`<div class="class_skill_list" id="proficency_${i}"></div>`);
        $(`#proficency_${i}`).append(`<div class="class_info_container" id="class_${element.name}_container">
            <p>You can choose ${element.choose} from this list</p></div>`);

        element.from.forEach(element => {
            $(`#proficency_${i}`).append(`<div class="class_info_container">
            <input type="checkbox" class="proficency_class_${i}"><span> ${element.name}</span></div>`);
        });

        $(`.proficency_class_${i}`).on('change', function(){
            if ($(`.proficency_class_${i}:checked`).length > element.choose) {
                this.checked = false; 
            }
        })

    });
}