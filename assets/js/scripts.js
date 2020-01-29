//Function to dynamically create the list of races and give each button a unique ID
function populateRaceList(listRaces) {
    listRaces.forEach(element => {
        $(`#race_list`).append(`<li><button type="button" class="btn btn_race btn-primary" id="${element.index}">${element.name}</button></li>`)
    })
}

fetchRaceList()

//Function to use the data retrieved on click of btn_race (prototype just to make sure that the data can be sent to the DOM) 
function currentRaceInformation(currentRace) {
    $(`#race_alignment`).text(`Alignment: ${currentRace.alignment}`);
    $(`#race_age`).text(`Age: ${currentRace.age}`);
    $(`#race_size_description`).text(`Size:${currentRace.size_description}`);
    $(`#race_speed`).text(`Speed: ${currentRace.speed}`);

}

//Function to dynamically create the list of classes and give each button a unique ID
function populateClassList(listClasses) {
    listClasses.forEach(element => {
        $(`#class_list`).append(`<li><button type="button" class="btn btn_class btn-primary" id="${element.index}">${element.name}</button></li>`)
    });
}

fetchClassList()

