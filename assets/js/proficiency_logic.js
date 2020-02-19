let proficiencySkill = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let skills = [
    "Skill: Acrobatics",
    "Skill: Animal Handling",
    "Skill: Arcana",
    "Skill: Athletics",
    "Skill: Deception",
    "Skill: History",
    "Skill: Insight",
    "Skill: Intimidation",
    "Skill: Investigation",
    "Skill: Medicine",
    "Skill: Nature",
    "Skill: Perception",
    "Skill: Performance",
    "Skill: Persuasion",
    "Skill: Religion",
    "Skill: Sleight of Hand",
    "Skill: Stealth",
    "Skill: Survival"
]

function addProficiencySkill(skill) {
    skills.forEach((element, i) => {
        if (skill === element) {
            proficiencySkill[i] = 2;
        }
    });
}

function removeProficiencySkill(skill) {
    skills.forEach((element, i) => {
        if (skill === element) {
            proficiencySkill[i] = 0;
        }
    });
}

let skillDescriptions = [];

async function fetchSkillDescription() {
    for (const skill of skills) {
            await fetchSkillInformation(skill.replace('Skill: ', '').toLowerCase().split(' ').join('-'))
    }
}

function populateSkillDescriptions(skills) {
        skillDescriptions.push(skills);
}

fetchSkillDescription()


function characterSkillValues() {

    characterSummary.proficienciesSkills = [
        //Strength Skills
        [
            {
                name: 'Athletics',
                value: modifierAbility[0] + proficiencySkill[3],
                desc: skillDescriptions[3],
            },
        ],

        //Dexterity Skills
        [
            {
                name: 'Acrobatics',
                value: modifierAbility[1] + proficiencySkill[0],
                desc: skillDescriptions[0]
            },
            {
                name: 'Sleight Of Hand',
                value: modifierAbility[1] + proficiencySkill[15],
                desc: skillDescriptions[15]
            },
            {
                name: 'Stealth',
                value: modifierAbility[1] + proficiencySkill[16],
                desc: skillDescriptions[16]
            },
        ],

        //Constitution Skills (There are none ingame, still here so the counters will work properly as everything is based on 6 ingame abilities.)
        [
        ],

        //Intelligence Skills
        [
            {
                name: 'Arcana',
                value: modifierAbility[3] + proficiencySkill[2],
                desc: skillDescriptions[2]
            },
            {
                name: 'History',
                value: modifierAbility[3] + proficiencySkill[5],
                desc: skillDescriptions[5]
            },
            {
                name: 'Investigation',
                value: modifierAbility[3] + proficiencySkill[8],
                desc: skillDescriptions[8]
            },
            {
                name: 'Nature',
                value: modifierAbility[3] + proficiencySkill[10],
                desc: skillDescriptions[10]
            },
            {
                name: 'Religion',
                value: modifierAbility[3] + proficiencySkill[14],
                desc: skillDescriptions[14]
            },
        ],

        //Wisdom Skills
        [
            {
                name: 'Animal Handling',
                value: modifierAbility[4] + proficiencySkill[1],
                desc: skillDescriptions[1]
            },
            {
                name: 'Insight',
                value: modifierAbility[4] + proficiencySkill[6],
                desc: skillDescriptions[6]
            },
            {
                name: 'Medicine',
                value: modifierAbility[4] + proficiencySkill[9],
                desc: skillDescriptions[9]
            },
            {
                name: 'Perception',
                value: modifierAbility[4] + proficiencySkill[11],
                desc: skillDescriptions[11]
            },
            {
                name: 'Survival',
                value: modifierAbility[4] + proficiencySkill[17],
                desc: skillDescriptions[17]
            }
        ],

        //Charisma Skills
        [
            {
                name: 'Deception',
                value: modifierAbility[5] + proficiencySkill[4],
                desc: skillDescriptions[4]
            },
            {
                name: 'Intimidation',
                value: modifierAbility[5] + proficiencySkill[7],
                desc: skillDescriptions[7]
            },
            {
                name: 'Performance',
                value: modifierAbility[5] + proficiencySkill[12],
                desc: skillDescriptions[12]
            },
            {
                name: 'Persuasion',
                value: modifierAbility[5] + proficiencySkill[13],
                desc: skillDescriptions[13]
            },
        ],
    ]
}

let proficiencyNames = [
    'Weapons',
    'Armor',
    'Tools',
    'Instruments',
];

let sortedProficiencies = [

    [
        "Simple weapons",
        "Martial weapons",
        "Longswords",
        "Shortswords",
        "Rapiers",
        "Crossbows, hand",
        "Clubs",
        "Daggers",
        "Javelins",
        "Maces",
        "Quarterstaffs",
        "Sickles",
        "Spears",
        "Darts",
        "Slings",
        "Scimitars",
        "Battleaxes",
        "Handaxes",
        "Light hammers",
        "Warhammers",
    ],

    [
        "Light armor",
        "Medium armor",
        "Heavy armor",
        "All armor",
        "Shields",
    ],

    [
        "Alchemist's supplies",
        "Brewer's supplies",
        "Calligrapher's supplies",
        "Carpenter's tools",
        "Cartographer's tools",
        "Cobbler's tools",
        "Cook's utensils",
        "Glassblower's tools",
        "Herbalism Kit",
        "Jeweler's tools",
        "Leatherworker's tools",
        "Mason's tools",
        "Painter's supplies",
        "Potter's tools",
        "Smith's tools",
        "Tinker's tools",
        "Weaver's tools",
        "Woodcarver's tools",
        "Disguise kit",
        "Forgery kit"
    ],

    [
        "Bagpipes",
        "Drum",
        "Dulcimer",
        "Flute",
        "Lute",
        "Lyre",
        "Horn",
        "Pan flute",
        "Shawm",
        "Viol"
    ],
]

let currentRaceProficiencies = [[], [], [], []];
let currentClassProficiencies = [[], [], [], []];
let summaryProficiencies = [[], [], [], []]

function addProficiencies(type, value) {
    sortedProficiencies.forEach((element, i) => {
        element.forEach(skill => {
            if (skill === value) {
                type[i].push(value)
            }
        })
    })
}

function removeProficiencies(type, value) {
    type.forEach((element, i) => {
        element.forEach((skill, n) => {
            if (skill === value) {
                type[i].splice(n);
            }
        })
    })
}

function summarizeProficiencies() {
    for (let i = 0; i < summaryProficiencies.length; i++) {
        summaryProficiencies[i] = currentRaceProficiencies[i].concat(currentClassProficiencies[i])
        summaryProficiencies[i].sort();
    }
}