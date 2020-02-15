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
                Name: 'Athletics',
                Value: modifierAbility[0] + proficiencySkill[3]
            },
        ],

        //Dexterity Skills
        [
            {
                Name: 'Acrobatics',
                Value: modifierAbility[1] + proficiencySkill[0]
            },
            {
                Name: 'Sleight Of Hand',
                Value: modifierAbility[1] + proficiencySkill[15]
            },
            {
                Name: 'Stealth',
                Value: modifierAbility[1] + proficiencySkill[16]
            },
        ],

        //Constitution Skills (There are none ingame, still here so the counters will work properly as everything is based on 6 ingame abilities.)
        [
        ],

        //Intelligence Skills
        [
            {
                Name: 'Arcana',
                Value: modifierAbility[3] + proficiencySkill[2],
            },
            {
                Name: 'History',
                Value: modifierAbility[3] + proficiencySkill[5],
            },
            {
                Name: 'Investigation',
                Value: modifierAbility[3] + proficiencySkill[8],
            },
            {
                Name: 'Nature',
                Value: modifierAbility[3] + proficiencySkill[10],
            },
            {
                Name: 'Religion',
                Value: modifierAbility[3] + proficiencySkill[14],
            },
        ],

        //Wisdom Skills
        [
        {
            Name: 'Animal Handling',
            Value: modifierAbility[4] + proficiencySkill[1],
        },
        {
            Name: 'Insight',
            Value: modifierAbility[4] + proficiencySkill[6],
        },
        {
            Name: 'Medicine',
            Value: modifierAbility[4] + proficiencySkill[9],
        },
        {
            Name: 'Perception',
            Value: modifierAbility[4] + proficiencySkill[11],
        },
        {
            Name: 'Survival',
            Value: modifierAbility[4] + proficiencySkill[17],
        }
        ],

        //Charisma Skills
        [
            {
                Name: 'Deception',
                Value: modifierAbility[5] + proficiencySkill[4],
            },
            {
                Name: 'Intimidation',
                Value: modifierAbility[5] + proficiencySkill[7],
            },
            {
                Name: 'Performance',
                Value: modifierAbility[5] + proficiencySkill[12],
            },
            {
                Name: 'Persuasion',
                Value: modifierAbility[5] + proficiencySkill[13],
            },
        ],
    ]
}

