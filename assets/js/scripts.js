async function populateRaceList(raceList) {
    raceList.forEach(element => {
        $(`#race_list`).append(`<li><button type="button" class="btn btn_race btn-primary" id="${element.index}">${element.name}</button></li>`)
    })
}

fetchRaceList()

async function populateClassList(classList) {
    classList.forEach(element => {
        $(`#class_list`).append(`<li><button type="button" class="btn btn_class btn-primary" id="${element.index}">${element.name}</button></li>`)
    });
}

fetchClassList()

