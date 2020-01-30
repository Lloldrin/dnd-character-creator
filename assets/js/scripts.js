let base_stats = [8, 8, 8, 8, 8, 8];

$(`#base_stat_str`).text(base_stats[0]);
$(`#base_stat_dex`).text(base_stats[1]);
$(`#base_stat_con`).text(base_stats[2]);
$(`#base_stat_int`).text(base_stats[3]);
$(`#base_stat_wis`).text(base_stats[4]);
$(`#base_stat_cha`).text(base_stats[5]);


//Function to dynamically create the list of races and give each button a unique ID
function populateRaceList(listRaces) {
    listRaces.forEach(element => {
        $(`#race_list`).append(`<li><button type="button" class="btn btn_race btn-primary" id="${element.index}">${element.name}</button></li>`)
    })
}

fetchRaceList()

//Function to use the data retrieved on click of btn_race (prototype just to make sure that the data can be sent to the DOM) 
function currentRaceInformation(currentRace) {
    /*$(`#race_alignment`).text(`${currentRace.alignment}`);
     $(`#race_age`).text(`${currentRace.age}`);
     $(`#race_size_description`).text(`${currentRace.size_description}`);
     $(`#race_speed`).text(`${currentRace.speed}`);*/
    currentRace.ability_bonuses.forEach(element => {
        if (element.name === `STR`) {
            var base_stat_str = element.bonus + base_stats[0];
        } else if (element.name === `DEX`) {
            var base_stat_dex = element.bonus + base_stats[1];
        } else if (element.name === `CON`) {
            var base_stat_con = element.bonus + base_stats[2];
        } else if (element.name === `INT`) {
            var base_stat_int = element.bonus + base_stats[3];
        } else if (element.name === `WIS`) {
            var base_stat_wis = element.bonus + base_stats[4];
        } else if (element.name === `CHA`) {
            var base_stat_cha = element.bonus + base_stats[5];
        }
        $(`#base_stat_str`).text(base_stat_str);
        $(`#base_stat_dex`).text(base_stat_dex);
        $(`#base_stat_con`).text(base_stat_con);
        $(`#base_stat_int`).text(base_stat_int);
        $(`#base_stat_wis`).text(base_stat_wis);
        $(`#base_stat_cha`).text(base_stat_cha);
    });

}



//Function to dynamically create the list of classes and give each button a unique ID
function populateClassList(listClasses) {
    listClasses.forEach(element => {
        $(`#class_list`).append(`<li><button type="button" class="btn btn_class btn-primary" id="${element.index}">${element.name}</button></li>`)
    });
}

fetchClassList()
