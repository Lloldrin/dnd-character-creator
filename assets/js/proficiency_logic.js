let sortedProficiencies = [
    [
        "Alchemist's supplies",
        "Brewer's supplies",
        "Calligrapher's supplies",
        "Carpenter's tools",
        "Cartographer's tools",
        "Cobbler's tools",
        "Cook's utensils",
        "Glassblower's tools",
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
        "Simple Weapons",
        "Martial Weapons",
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
        "Warhammers,"
    ],

    [
        "Light armor",
        "Medium armor",
        "Heavy armor",
        "All armor",
        "Shields"
    ],

    [
        "Acrobatics",
        "Animal Handling",
        "Arcana",
        "Athletics",
        "Deception",
        "History",
        "Insight",
        "Intimidation",
        "Investigation",
        "Medicine",
        "Nature",
        "Perception",
        "Performance",
        "Persuasion",
        "Religion",
        "Sleight of Hand",
        "Stealth",
        "Survival"
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

let proficiencySkill = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function characterSkills() {
    characterSummary.proficienciesSkills = [

        //Strength Skills
        [
            {
                name: 'Athletics',
                value: modifierAbility[0] + proficiencySkill[3]
            },
        ],

        //Dexterity Skills
        [
            {
                name: 'Acrobatics',
                value: modifierAbility[1] + proficiencySkill[0]
            },
            {
                name: 'Sleight Of Hand',
                value: modifierAbility[1] + proficiencySkill[15]
            },
            {
                name: 'Stealth',
                value: modifierAbility[1] + proficiencySkill[16]
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
            },
            {
                name: 'History',
                value: modifierAbility[3] + proficiencySkill[5],
            },
            {
                name: 'Investigation',
                value: modifierAbility[3] + proficiencySkill[8],
            },
            {
                name: 'Nature',
                value: modifierAbility[3] + proficiencySkill[10],
            },
            {
                name: 'Religion',
                value: modifierAbility[3] + proficiencySkill[14],
            },
        ],

        //Wisdom Skills
        [
            {
                name: 'Animal Handling',
                value: modifierAbility[4] + proficiencySkill[1],
            },
            {
                name: 'Insight',
                value: modifierAbility[4] + proficiencySkill[6],
            },
            {
                name: 'Medicine',
                value: modifierAbility[4] + proficiencySkill[9],
            },
            {
                name: 'Perception',
                value: modifierAbility[4] + proficiencySkill[11],
            },
            {
                name: 'Survival',
                value: modifierAbility[4] + proficiencySkill[17],
            }
        ],

        //Charisma Skills
        [
            {
                name: 'Deception',
                value: modifierAbility[5] + proficiencySkill[4],
            },
            {
                name: 'Intimidation',
                value: modifierAbility[5] + proficiencySkill[7],
            },
            {
                name: 'Performance',
                value: modifierAbility[5] + proficiencySkill[12],
            },
            {
                name: 'Persuasion',
                value: modifierAbility[5] + proficiencySkill[13],
            },
        ],
    ]
}

