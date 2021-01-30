var playerClass = "";
var playerSpec = "";
var dungeon = "";
var feint = false;
var elusiveness = false;
var fortified = false;
var tyrannical = false;
var raging = false;
var playerMainStat = 0;
var playerArmor = 0;
var avoidance = 0;
var playerVers = 0;
var playerMastery = 0;
var playerStamina = 0;
var playerHealth = 0;
var playerAbsorb = 0;
var level = 2;
var recentInput = "";
var bfaScaling = [1, 1.1, 1.21, 1.33, 1.46, 1.61, 1.77, 1.95, 2.14, 2.36, 2.59, 2.85, 3.14, 3.45, 3.8, 4.18, 4.59, 5.05, 5.56, 6.12, 6.73, 7.4, 8.14, 8.95, 9.85, 10.83, 11.92, 13.11, 14.42, 15.86, 17.58];
var prepatchscaling = [1.065, 1.065, 1.134, 1.208, 1.286, 1.37, 1.459, 1.554, 1.655, 1.763, 1.877, 1.999, 2.13, 2.27, 2.45, 2.64, 2.86, 3.08, 3.33, 3.6, 3.89, 4.2, 4.53, 4.9, 5.29, 5.71, 6.17, 6.66, 7.19, 7.77, 8.39, 9.06];
var scaling = [1, 1.08, 1.17, 1.26, 1.36, 1.47, 1.59, 1.71, 1.85, 2, 2.16, 2.33, 2.52, 2.72, 2.94, 3.17, 3.43, 3.7, 4, 4.32, 4.66, 5.03, 5.44, 5.87, 6.34, 6.85, 7.4, 7.99, 8.63]
var slider = document.getElementById("myRange");
var output = document.getElementById("keyLevel");
slider.oninput = function () {
    level = this.value;
    output.innerHTML = "Key Level: " + this.value;
    $("#percentValue").html("+" + Math.round((scaling[level - 2] - 1) * 100) + "%");
    dungeons.forEach(dung => {
        dung.bossAbilities.forEach(ability => {
            ability.damage = Math.round(ability.baseDamage * scaling[level - 2]);
        });
    });
    calcDamage();
}
$('[data-toggle="tooltip"]').tooltip({ 'placement': 'top' });

function displayDungeons() {
    if (dungeon !== "") {
        $("#dungeonInput").empty();
        for (i = 0; i < dungeons.length; i++) {
            if (dungeons[i].name === dungeon) {
                $("#dungeonInput").append(`<h2>Boss Abilities</h2>`);
                for (k = 0; k < dungeons[i].bossAbilities.length; k = k + 2) {
                    if (k === dungeons[i].bossAbilities.length - 1) {
                        $("#dungeonInput").append(`
                    <div class="row">
                        <div class="col-md-2">
                            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${dungeons[i].bossAbilities[k].name.replace("_", " ").replace("_", " ").replace("_", " ")}</h6>${dungeons[i].bossAbilities[k].description}" class="abilityImage" src="${dungeons[i].bossAbilities[k].image}" alt="${dungeons[i].bossAbilities[k].name}">
                        </div>
                        <div class="col-md-1">
                        `);
                    } else {
                        $("#dungeonInput").append(`
                    <div class="row">
                        <div class="col-md-2">
                            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${dungeons[i].bossAbilities[k].name.replace("_", " ").replace("_", " ").replace("_", " ")}</h6>${dungeons[i].bossAbilities[k].description}" class="abilityImage" src="${dungeons[i].bossAbilities[k].image}" alt="${dungeons[i].bossAbilities[k].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].bossAbilities[k].damage.toLocaleString()}</p>
                        </div>
                        <div class="col-md-2">
                        </div>
                        <div class="col-md-2">
                            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${dungeons[i].bossAbilities[k + 1].name.replace("_", " ").replace("_", " ").replace("_", " ")}</h6>${dungeons[i].bossAbilities[k + 1].description}" class="abilityImage" src="${dungeons[i].bossAbilities[k + 1].image}" alt="${dungeons[i].bossAbilities[k + 1].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].bossAbilities[k + 1].damage.toLocaleString()}</p>
                        </div>
                    </div>
                    `);
                    }
                }                
                $("#dungeonInput").append(`<h2>Trash Abilities</h2>`);
                for (k = 0; k < dungeons[i].trashAbilities.length; k = k + 2) {
                    if (k === dungeons[i].trashAbilities.length - 1) {
                        $("#dungeonInput").append(`
                    <div class="row">
                        <div class="col-md-2">
                            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${dungeons[i].trashAbilities[k].name.replace("_", " ").replace("_", " ").replace("_", " ")}</h6>${dungeons[i].trashAbilities[k].description}" class="abilityImage" src="${dungeons[i].trashAbilities[k].image}" alt="${dungeons[i].trashAbilities[k].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].trashAbilities[k].damage.toLocaleString()}</p>
                        </div>
                    </div>
                    `);
                    } else {
                        $("#dungeonInput").append(`
                    <div class="row">
                        <div class="col-md-2">
                            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${dungeons[i].trashAbilities[k].name.replace("_", " ").replace("_", " ").replace("_", " ")}</h6>${dungeons[i].trashAbilities[k].description}" class="abilityImage" src="${dungeons[i].trashAbilities[k].image}" alt="${dungeons[i].trashAbilities[k].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].trashAbilities[k].damage.toLocaleString()}</p>
                        </div>
                        <div class="col-md-2">
                        </div>
                        <div class="col-md-2">
                            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${dungeons[i].trashAbilities[k + 1].name.replace("_", " ").replace("_", " ").replace("_", " ")}</h6>${dungeons[i].trashAbilities[k + 1].description}" class="abilityImage" src="${dungeons[i].trashAbilities[k + 1].image}" alt="${dungeons[i].trashAbilities[k + 1].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].trashAbilities[k + 1].damage.toLocaleString()}</p>
                        </div>
                    </div>
                    `);
                    }
                }
            }
        }
        $(".slidecontainer").removeClass("hide");
        $("#tyrannical").removeClass("hide");
        $("#fortified").removeClass("hide");
        $("#raging").removeClass("hide");
        $("#dungeonInput").append("<button type=\"button\" id=\"changeDungeon\" class=\"btn btn-primary\">Choose Another Dungeon</button>");
        $('[data-toggle="tooltip"]').tooltip({ 'placement': 'top' });
    }
    $('[data-toggle="tooltip"]').tooltip({ 'placement': 'top' });
}
function calcDamage() {
    var health = playerStamina * 20;
    var vers = playerVers;
    var magic = [];
    var physical = [];
    var armorPercent = [];
    var armor = playerArmor;
    var absorbAmount = 0;
    var absorbsArray = [];
    var healthArray = [];
    var endurance = false;
    var aspect = false;
    var shadow = false;
    var frost = false;
    var holy = false;
    var fire = false;
    var arcane = false;
    var nature = false;
    personals.forEach(personal => {
        if (personal.selected) {
            if (personal.magicDR > 0) {
                magic.push(personal.magicDR);
            }
            if (personal.physicalDR > 0) {
                physical.push(personal.physicalDR);
            }
            armor = armor + personal.armorIncrease;
            if (personal.armorPercentIncrease > 0) {
                armorPercent.push(personal.armorPercentIncrease);
            }
            if (personal.absorb > 0) {
                absorbsArray.push(personal.absorb);
            }
            if (personal.name === "Aspect_of_the_Beast" || personal.name === "Endurance_Training") {
                if (personal.name === "Endurance_Training") {
                    endurance = true;
                } else if (personal.name === "Aspect_of_the_Beast"){
                    aspect = true;
                }
                if (endurance && aspect) {
                    healthArray.push(.075);
                } else if (endurance && !aspect) {
                    healthArray.push(0.05);
                }
            } else if (personal.healthPercentIncrease > 0) {
                healthArray.push(personal.healthPercentIncrease);
            }
            health = health + personal.healthIncrease;
            vers = vers + personal.versIncrease;
        }
    });
    externals.forEach(external => {
        if (external.selected) {
            if (external.magicDR === .01) {
                if (external.name === "Shadow_Resistance") {
                    shadow = true;
                }
                if (external.name == "Fire_Resistance") {
                    fire = true;
                }
                if (external.name == "Holy_Resistance") {
                    holy = true;
                }
                if (external.name == "Frost_Resistance") {
                    frost = true;
                }
                if (external.name == "Arcane_Resistance") {
                    arcane = true;
                }
                if (external.name == "Nature_Resistance") {
                    nature = true;
                }
                if (external.name == "Rime_Of_The_Ancient_Mariner") {
                    frost = true;
                    nature = true;
                }
            }
            if (external.magicDR > .01) {
                magic.push(external.magicDR);
            }
            if (external.physicalDR > 0) {
                physical.push(external.physicalDR);
            }
            armor = armor + external.armorIncrease;
            if (external.armorPercentIncrease > 0) {
                armorPercent.push(external.armorPercentIncrease);
            }
            if (external.absorb > 0) {
                absorbsArray.push(external.absorb);
            }
            health = health + external.healthIncrease;
            vers = vers + external.versIncrease;
            if (external.healthPercentIncrease > 0) {
                healthArray.push(external.healthPercentIncrease);
            }
        }
    });
    absorbs.forEach(item => {
        if (item.selected) {
            absorbAmount = absorbAmount + item.amount;
        }
    });
    versTrinkets.forEach(trinket => {
        if (trinket.selected) {
            vers = vers + trinket.amount;
        }
    });
    absorbsArray.forEach(item => {
        absorbAmount = absorbAmount + item * health;
    });
    armorPercent.forEach(item => {
        armor = armor * item;
    });
    healthArray.forEach(hp => {
        health *= 1 + hp;
    });
    dungeons.forEach(dung => {
        dung.bossAbilities.forEach(ability => {
            var damage = ability.baseDamage;
            damage = damage * scaling[level - 2];
            if (ability.scaling === "default") {
                if (tyrannical) {
                    damage = damage * 1.15;
                }
            } else if (ability.scaling === "fortified") {
                if (fortified) {
                    damage = damage * 1.3;
                }
            }
            if (ability.name === "Conduction") {
                damage = damage + (damage * 0.01 * (vers * (1 / 85)));
            }
            damage = damage - (damage * 0.01 * (vers * (.5 / 85)));
            if (ability.type === "physical") {
                physical.forEach(item => {
                    damage = damage - damage * item;
                });
                if (!ability.bleed) {
                    var physicalDR = 0.01 * ((armor / (armor + 1021)) * 100);
                    if (physicalDR > .85) {
                        physicalDR = .85;
                    }
                    damage = damage - (damage * physicalDR);
                }
            } else {
                magic.forEach(item => {
                    damage = damage - damage * item;
                });
                if (ability.type === "shadow" && shadow) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "shadowfrost" && shadow) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "shadowfrost" && frost) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "arcane" && arcane) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "nature" && nature) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "fire" && fire) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "holy" && holy) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "frost" && frost) {
                    damage = damage - (damage * .01);
                }
            }
            if (ability.aoe) {
                damage = damage - (damage * 0.01 * (avoidance * (1 / 28)));
            }
            if (ability.aoe && feint) {
                damage = damage - (damage * .4);
            }
            if (!ability.aoe && elusiveness) {
                damage = damage - (damage * .3);
            }
            externals.forEach(external => {
                if (external.name === "Rugged_Tenacity" && external.selected) {
                    damage = damage - (playerStamina * 20 * .0003);
                }
                if (external.name === "Nose_For_Trouble" && external.selected) {
                    damage = damage - (playerStamina * .05);
                }
            });
            ability.damage = Math.round(damage);
            if (ability.damage < 0) { 
                ability.damage = 0;
            }
        });

    });
    dungeons.forEach(dung => {
        dung.trashAbilities.forEach(ability => {
            var damage = ability.baseDamage;
            damage = damage * scaling[level - 2];
            if (fortified) {
                damage = damage * 1.3;
            }
            if (raging) {
                damage = damage * 2;
            }
            damage = damage - (damage * 0.01 * (vers * (.5 / 85)));
            if (ability.type === "physical") {
                physical.forEach(item => {
                    damage = damage - damage * item;
                });
                if (!ability.bleed) {
                    var physicalDR = 0.01 * ((armor / (armor + 1021)) * 100);
                    if (physicalDR > .85) {
                        physicalDR = .85;
                    }
                    damage = damage - (damage * physicalDR);
                }
            } else {
                magic.forEach(item => {
                    damage = damage - damage * item;
                });
                if (ability.type === "shadow" && shadow) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "shadowfrost" && shadow) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "shadowfrost" && frost) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "arcane" && arcane) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "nature" && nature) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "fire" && fire) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "holy" && holy) {
                    damage = damage - (damage * .01);
                }
                if (ability.type === "frost" && frost) {
                    damage = damage - (damage * .01);
                }
            }
            if (ability.aoe) {
                damage = damage - (damage * 0.01 * (avoidance * (1 / 28)));
            }
            if (ability.aoe && feint) {
                damage = damage - (damage * .4);
            }
            if (!ability.aoe && elusiveness) {
                damage = damage - (damage * .3);
            }
            externals.forEach(external => {
                if (external.name === "Rugged_Tenacity" && external.selected) {
                    damage = damage - (playerStamina * 20 * .0003);
                }
                if (external.name === "Nose_For_Trouble" && external.selected) {
                    damage = damage - (playerStamina * .05);
                }
            });
            ability.damage = Math.round(damage);
            if (ability.damage < 0) { 
                ability.damage = 0;
            }
        });
    });
    
    if (vers > 0) {
        absorbAmount = absorbAmount + (absorbAmount * (0.01 * (vers/485)));
    }
    playerAbsorb = absorbAmount;
    playerAbsorb = health;
    $(".totalHealth").html(`<span style="font-size: 23px">Total Health: ${Math.round(health)}</span>`);
    $(".totalAbsorb").html(`<span style="font-size: 23px">Total Absorb: ${Math.round(absorbAmount)}</span>`);
    $(".effectiveHealth").html(`<span style="font-size: 23px">Effective Health: ${Math.round(health + absorbAmount)}</span>`);
    displayDungeons();
}

var dungeons = [
    {
        name: "De_Other_Side",
        bossAbilities: [
            {
                name: "Blood_Barrier",
                baseDamage: 3662,
                damage: 3662,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Violently erupts in shadow magic, inflicting 3,662 Shadow damage to all enemies, forming a protective barrier and becoming immune to interrupt effects.",
                image: "images/Blood_Barrier.jpg"
            }, {
                name: "Experimental_Squirrel_Bomb",
                baseDamage: 9667,
                damage: 9667,
                type: "fire",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The Squirrel Bomb charges up and then explodes, inflicting 9,667 Fire damage to all players.",
                image: "images/Experimental_Squirrel_Bomb.jpg"
            }, {
                name: "Shadowfury",
                baseDamage: 5858,
                damage: 5858,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Shadowfury is unleashed, inflicting 5,858 Shadow damage and stunning all players within 8 yds for 2 sec.",
                image: "images/Shadowfury.jpg"
            }, {
                name: "Explosive_Contrivance",
                baseDamage: 11718,
                damage: 11718,
                type: "arcane",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Dealer Xy'exa unleashes a blast of energy inflicting 11,718 Arcane damage and an additional 586 Arcane damage every 2 sec for 1 min to all players that remain on the ground with her.",
                image: "images/Explosive_Contrivance.jpg"
            }, {
                name: "Localized_Explosive_Contrivance",
                baseDamage: 5859,
                damage: 5859,
                type: "arcane",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Dealer Xy'exa places a broker device on a random player that explodes after 5 sec, inflicting 5,859 Arcane damage and an additional 586 Arcane damage every 2 sec for 1 min to all players at the same level as the target.",
                image: "images/Localized_Explosive_Contrivance.jpg"
            }, {
                name: "Cosmic_Collapse",
                baseDamage: 8788,
                damage: 8788,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The distortion detonates after 9 sec, inflicting 8,788 Shadow damage to players within 10 yards.",
                image: "images/Cosmic_Collapse.jpg"
            }, {
                name: "Master_of_Death",
                baseDamage: 10546,
                damage: 10546,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Expels shadow, blood, and necromantic magic in a direction, inflicting 10,546 Shadow damage and an additional 1,758 Shadow damage every 3 sec for 15 sec to targets hit by Master of Death.",
                image: "images/Master_of_Death.jpg"
            }, {
                name: "Soulcrusher",
                baseDamage: 20506,
                damage: 20506,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Slams his primary target, inflicting 20,506 Physical damage. This applies Crushed Soul, inflicting the damage taken from Soulcrusher over 9 sec.",
                image: "images/Soul_Split.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Rage",
                baseDamage: 2344,
                damage: 2344,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Enters an intense Rage, inflicting 2,344 Shadow damage to all enemies every 1 sec for 6 sec.",
                image: "images/Rage.jpg"
            }, {
                name: "Haywire",
                baseDamage: 5859,
                damage: 5859,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Do you see that?! That drill is drilling into the metal floor! It's inflicting 5,859 Nature damage every second for 4 sec!",
                image: "images/Haywire.jpg"
            }, {
                name: "Discharge",
                baseDamage: 4394,
                damage: 4394,
                type: "nature",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 4,394 Nature damage to an enemy.",
                image: "images/Discharge.jpg"
            }, {
                name: "Lubricate",
                baseDamage: 4394,
                damage: 4394,
                type: "frost",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Sprays a bucket-full of lubricant all over the place, inflicting 4,394 Frost damage to enemies within 30 yards.",
                image: "images/Lubricate.jpg"
            }, {
                name: "W-00F",
                baseDamage: 2929,
                damage: 2929,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Sends a sonic bark to a targeted location, inflicting 2,929 Physical damage, knocking back, and stunning targets within 8 yards.",
                image: "images/W-00F.jpg"
            }, {
                name: "Essential_Oil",
                baseDamage: 3735,
                damage: 3735,
                type: "nature",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Lobs a glob of all organic, naturally-expressed essential oil at a target, inflicting 3,735 Nature damage.",
                image: "images/Essential_Oil.jpg"
            }
        ]
    }, {
        name: "Halls_Of_Atonement",
        bossAbilities: [
            {
                name: "Heave_Debris",
                baseDamage: 8788,
                damage: 8788,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The Goliath hurls a chunk of debris at a random enemy, inflicting 8,788 Physical damage to enemies within 6 yards of the impact, and leaving behind Glass Shards.",
                image: "images/Heave_Debris.jpg"
            }, {
                name: "Crumbling_Slam",
                baseDamage: 14647,
                damage: 14647,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The Goliath brings down his massive stone arms and slams the ground in front of him, inflicting 14,647 Physical damage to enemies within 6 yards and leaving behind Glass Shards.",
                image: "images/Crumbling_Slam.jpg"
            }, {
                name: "Stone_Shattering_Leap",
                baseDamage: 8788,
                damage: 8788,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Echelon shatters the earth around him, inflicting 8,788 Nature damage to all players within 8 yards.",
                image: "images/Dive_Bomb.jpg"
            }, {
                name: "Volley_of_Power",
                baseDamage: 5273,
                damage: 5273,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 5,273 Shadow damage to three random players.",
                image: "images/Volley_of_Power.jpg"
            }, {
                name: "Anima_Fountain",
                baseDamage: 8788,
                damage: 8788,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "The anima fountain boils over, inflicting 8,788 Shadow damage to all players within 5 yards of each impact.",
                image: "images/Anima_Fountain.jpg"
            }, {
                name: "Telekenetic_Toss",
                baseDamage: 10253,
                damage: 10253,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Lord Chamberlain throws a Sinstone Statue at a nearby player, inflicting 10,253 Physical damage and knocking back anyone in its path.",
                image: "images/Telekenetic_Toss.jpg"
            }
        ], 
        trashAbilities: [
            {
                name: "Deadly_Thrust",
                baseDamage: 10253,
                damage: 10253,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Inflicts 10,253 Physical damage to all enemies in front of the caster.",
                image: "images/Deadly_Thrust.jpg"
            }, {
                name: "Wicked_Bolt",
                baseDamage: 3222,
                damage: 3222,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 3,222 Shadow damage to an enemy.",
                image: "images/Rage.jpg"
            }, {
                name: "Curse_of_Obliteration",
                baseDamage: 7324,
                damage: 7324,
                type: "shdaow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The caster applies a curse that inflicts 7,324 Shadow damage to all players within 8 yards of the target after 6 sec.",
                image: "images/Curse_of_Obliteration.jpg"
            }, {
                name: "Thrash",
                baseDamage: 1904,
                damage: 1904,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The thrashing of the golem inflicts 1,904 Physical damage to enemies within 40 yards every 1 sec for 8 sec.",
                image: "images/Thrash.jpg"
            }
        ]
    }, {
        name: "Mists_Of_Tirna_Scithe",
        bossAbilities: [
            {
                name: "Spirit_Bolt",
                baseDamage: 4834,
                damage: 4834,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Maloch fires a bolt of deathly energy that inflicts 4,834 Shadow damage.",
                image: "images/Spirit_Bolt.jpg"
            }, {
                name: "Dodge_Ball",
                baseDamage: 11717,
                damage: 11717,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "none",
                description: "Mistcaller wants to play Dodge Ball and throws an anima ball at players, inflicting 11,717 Nature damage to all enemies in a line.",
                image: "images/Dodge_Ball.jpg"
            }, {
                name: "Anima_Shedding",
                baseDamage: 8791,
                damage: 8791,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Tred’ova unleashes a blast of anima that impacts at a random location nearby, inflicting 8,791 Nature damage to all players within 8 yards of the impact.",
                image: "images/Anima_Shedding.jpg"
            }, {
                name: "Acid_Expulsion",
                baseDamage: 9377,
                damage: 9377,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Tred'ova spits a glob of acid at all nearby players' location, inflicting 9,377 Nature damage to any player within 4 yards of impact.",
                image: "images/Acid_Expulsion.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Soul_Split",
                baseDamage: 5859,
                damage: 5859,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "A deathly strike that inflicts 5,859 Shadow damage and increases damage taken by 20% for 8 sec.",
                image: "images/Soul_Split.jpg"
            }, {
                name: "Spirit_Bolt",
                baseDamage: 5273,
                damage: 5273,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Fire a bolt of deathly energy that inflicts 5,273 Shadow damage.",
                image: "images/Spirit_Bolt.jpg"
            }, {
                name: "Furious_Thrashing",
                baseDamage: 1758,
                damage: 1758,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Thrash violently upon reaching 50% health, inflicting 1,758 Physical damage to players within 50 yds every 1 sec for 6 sec.",
                image: "images/thrash.jpg"
            }, {
                name: "Volatile_Acid",
                baseDamage: 3515,
                damage: 3515,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Launches a glob of exploding acid at a random player, inflicting 3,515 Nature damage to all players in 5 yard radius every 2 sec for 8 sec.",
                image: "images/Acid_Expulsion.jpg"
            }
        ]
    }, {
        name: "Plaguefall",
        bossAbilities: [
            {
                name: "Plaguestomp",
                baseDamage: 7031,
                damage: 7031,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Globgrog's plagued mass stomps the ground and inflicts 7,031 Physical damage to all players, knocking them away and applying Debilitating Plague.",
                image: "images/Plaguestomp.jpg"
            }, {
                name: "Slime_Wave",
                baseDamage: 11718,
                damage: 11718,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Globgrog slams his plagued fist, creating a frontal slime wave inflicting 11718 Nature damage to players.",
                image: "images/Acid_Expulsion.jpg"
            }, {
                name: "Oozing_Outbreak",
                baseDamage: 9374,
                damage: 9374,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Doctor Ickus amps his slime pack, radiating waves of filth in four directions that inflict 9,374 Nature damage to players within 3 yards of the impact.",
                image: "images/Oozing_Outbreak.jpg"
            }, {
                name: "Shadow_Ambush",
                baseDamage: 8788,
                damage: 8788,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Domina appears behind a marked player, ambushing all players within 10 yds of her target. Players affected by this ambush suffer 8,788 Shadow damage and are stunned for 3 sec.",
                image: "images/Shadow_Ambush.jpg"
            }, {
                name: "Touch_of_Slime",
                baseDamage: 5859,
                damage: 5859,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The Malignant Spawn slams the ground, inflicting 5,859 Nature damage to players within 4 yards of impact.",
                image: "images/Touch_of_Slime.jpg"
            }, {
                name: "Plague_Crash",
                baseDamage: 21971,
                damage: 21971,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "none",
                description: "Stradama sinks beneath the slime and causes tentacles to erupt in a pattern, inflicting 21971 Nature damage to players caught in the blast.",
                image: "images/Plague_Crash.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Bursting_Oooze",
                baseDamage: 5859,
                damage: 5859,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "The ooze bursts underfoot, inflicting 5,859 Physical damage to the player who stepped on it.",
                image: "images/Bursting_Ooze.jpg"
            }, {
                name: "Festering_Belch",
                baseDamage: 13182,
                damage: 13182,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Knocks all enemies in front of the caster back. Inflicts 13,182 Nature damage to all enemies in front of the caster.",
                image: "images/Acid_Expulsion.jpg"
            }, {
                name: "Corroded_Claws",
                baseDamage: 5859,
                damage: 5859,
                type: "nature",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 5,859 Nature damage on impact and reduces all stats by 5% for 30 sec.",
                image: "images/Corroded_Claws.jpg"
            }, {
                name: "Wrethced_Phlegm",
                baseDamage: 4867,
                damage: 4867,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Bites the enemy, inflicting 4,687 Nature damage and reducing their movement speed by 65% for 6 sec.",
                image: "images/Acid_Expulsion.jpg"
            }, {
                name: "Withering_Filth",
                baseDamage: 7324,
                damage: 7324,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The slime lunges at a player, inflicting 7,324 Nature damage and reducing haste by 45% to all players within 5 yards of the impact.",
                image: "images/Withering_Filth.jpg"
            }, {
                name: "Plague_Bomb",
                baseDamage: 11718,
                damage: 11718,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Violently explode, inflicting 11,718 Nature damage plus 4,687 Nature damage every 1 sec for 10 sec to everyone within 10 yards.",
                image: "images/Plague_Bomb.jpg"
            }
        ]
    }, {
        name: "Sanguine_Depths",
        bossAbilities: [
            {
                name: "Severing_Smash",
                baseDamage: 3662,
                damage: 3662,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "At 100 Energy, Kryxis the Voracious emits a massive wave of force outwards, inflicting 3,662 Shadow damage and knocking back all players.",
                image: "images/Severing_Smash.jpg"
            }, {
                name: "Castigate",
                baseDamage: 2930,
                damage: 2930,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Executor Tarvold torments a player causing waves of energy to emanate from them, inflicting 2,930 Shadow damage to all players within 8 yards of the target.",
                image: "images/Castigate.jpg"
            }, {
                name: "Growing_Pride",
                baseDamage: 1465,
                damage: 1465,
                type: "shadow",
                bleed: true,
                aoe: true,
                scaling: "default",
                description: "While alive, each Fleeting Manifestation inflicts 1,465 Shadow damage to all players every 1 sec.",
                image: "images/Growing_Pride.jpg"
            }, {
                name: "Rite_of_Supremacy",
                baseDamage: 20506,
                damage: 20506,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Grand Proctor Beryllia unleashes a blast of stored anima inflicting 20,506 Shadow damage and applying Agonize to all players.",
                image: "images/Rite_of_Supremacy.jpg"
            },{
                name: "Iron_Spikes",
                baseDamage: 13359,
                damage: 13359,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Grand Proctor Beryllia summons forth 4 Iron Spikes that impale her current target over 2 sec.  Each spike inflicts 13,359 Physical damage.",
                image: "images/Iron_Spikes.jpg"
            }, {
                name: "Gloom_Squall",
                baseDamage: 11718,
                damage: 11718,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "At 100 Energy, General Kaal releases a large powerful blast of anima-infused wind, inflicting 11,718 Shadow damage and knocking all enemies back.",
                image: "images/Gloom_Squall.jpg"
            }, {
                name: "Wicked_Gash",
                baseDamage: 7324,
                damage: 7324,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "none",
                description: "General Kaal tears in to the player, inflicting 7,324 Physical damage and causes them to bleed for 879 Physical damage every 1 sec until the end of the encounter.",
                image: "images/Wicked_Gash.jpg"
            }, {
                name: "Piercing_Blur",
                baseDamage: 8788,
                damage: 8788,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "General Kaal creates an afterimage of herself which rushes forward with preternatural speed, Inflicting 8,788 Physical damage to all players in a line in front of them.",
                image: "images/Piercing_Blur.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Volatile_Trap",
                baseDamage: 8788,
                damage: 8788,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The caster throws a series of traps at a random enemies, inflicting 8,788 Shadow damage to all enemies within 3.5 yards of the trap when it is triggered.",
                image: "images/Volatile_Trap.jpg"
            }, {
                name: "Echoing_Thrust",
                baseDamage: 8788,
                damage: 8788,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The caster thrusts their weapon outwards, inflicting 8,788 Shadow damage to all enemies in a line in front of the caster.",
                image: "images/Echoing_Thrust.jpg"
            }, {
                name: "Gloom_Burst",
                baseDamage: 3662,
                damage: 3662,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Blasts the enemy with Shadow energy, inflicting 3,662 Shadow damage",
                image: "images/Gloom_Burst.jpg"
            }, {
                name: "Wrack_Soul",
                baseDamage: 2490,
                damage: 2490,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Burdens the target's soul with sin, inflicting 2,490 Shadow damage and additional 1465 Shadow damage every 3 sec for 15 sec.",
                image: "images/Wrack_Soul.jpg"
            }, {
                name: "Sweeping_Slash",
                baseDamage: 10253,
                damage: 10253,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The caster makes a wide swing, knocking dust away, creating a dust tornado, which inflicts 10,253 Physical damage to all enemies hit and knocks them back.",
                image: "images/Sweeping_Slash.jpg"
            }, {
                name: "Throw_Research",
                baseDamage: 2929,
                damage: 2929,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Throws a book at an enemy, inflicting 2,929 Physical damage.",
                image: "images/Throw_Research.jpg"
            }
        ]
    }, {
        name: "Temple_of_Sethraliss",
        bossAbilities: [
            {
                name: "Charged_Spear",
                baseDamage: 4394,
                damage: 4394,
                type: "arcane",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Kin-Tara hurls a charged spear at the target that inflicts 4,394 Arcane damage to all players within 5 yards of the impact and creates a zone of Ionized Plasma.",
                image: "images/Charged_Spear.jpg"
            }, {
                name: "Dark_Stride",
                baseDamage: 2344,
                damage: 2344,
                type: "physical",
                bleed: true,
                aoe: false,
                scaling: "default",
                description: "Moving with incredible speed, Ventunax appears behind a player and inflicts 2,344 Physical damage every second for 20 sec.",
                image: "images/Dark_Stride.jpg"
            }, {
                name: "Dark_Bolt",
                baseDamage: 10253,
                damage: 10253,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Each Dark Bolt from a Shadowhirl inflicts 10,253 Shadow damage and knocks up any players they touch.",
                image: "images/Dark_Bolt.jpg"
            }, {
                name: "Purifying_Blast",
                baseDamage: 7324,
                damage: 7324,
                type: "arcane",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Oryphrion fires their cannon towards a player, inflicting 7,324 Arcane damage on impact, and 2,344 Arcane damage every 1.5 sec. for 12 sec to players within 8 yards of the impact.",
                image: "images/Purifying_Blast.jpg"
            }, {
                name: "Abyssal_Detonation",
                baseDamage: 58588,
                damage: 58588,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Devos creates a concentrated nexus of maw anima that explodes after 4 sec, inflicting 58,588 Arcane damage to all players within 200 yards.",
                image: "images/Abyssal_Detonation.jpg"
            }, {
                name: "Lost_Confidence",
                baseDamage: 3515,
                damage: 3515,
                type: "arcane",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Devos infects a random player's mind with doubt for 3515 Arcane damage every 3 sec. for 15 sec.  When this effect ends, a pool of Lingering Doubt forms at the victim's feet.",
                image: "images/Lost_Confidence.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Burden_of_Knowledge",
                baseDamage: 4980,
                damage: 4980,
                type: "arcane",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 4,980 Arcane damage to a random enemy within 60 yards. The victim takes an additional 10,230 Arcane damage over 6 sec.",
                image: "images/Burden_of_Knowledge.jpg"
            }, {
                name: "Rebellious_Fist",
                baseDamage: 8788,
                damage: 8788,
                type: "arcane",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The caster slams the ground, inflicting 8,788 Arcane damage to all enemies within 30 yards.",
                image: "images/Rebellious_Fist.jpg"
            }, {
                name: "Hurl",
                baseDamage: 4687,
                damage: 4687,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 4,687 Physical damage to a random target within 40 yards.",
                image: "images/Hurl.jpg"
            }, {
                name: "Internal_Strife",
                baseDamage: 4394,
                damage: 4394,
                type: "nature",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 4,394 Arcane damage to 2 enemies within 60 yards. Victims inflict 2,929 damage to all allies within 3 yards every 2 sec.",
                image: "images/Internal_Strife.jpg"
            }
        ]
    }, {
        name: "The_Necrotic_Wake",
        bossAbilities: [
            {
                name: "Heaving_Retch",
                baseDamage: 8788,
                damage: 8788,
                type: "nature",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Blightbone hurls a toxic spew at all players in a cone in front of him, inflicting 8,788 Nature damage.",
                image: "images/Static_Pulse.jpg"
            }, {
                name: "Frostbolt_Volley",
                baseDamage: 2929,
                damage: 2929,
                type: "frost",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Sends shards of ice at nearby enemies, inflicting 2,929 Frost damage and applying Chilled.",
                image: "images/Frostbolt_Volley.jpg"
            }, {
                name: "Necrotic_Bolt",
                baseDamage: 2051,
                damage: 2051,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Amarth inflicts 2,051 Shadow damage to an enemy and causes them to absorb the next 1,685 healing.",
                image: "images/Necrotic_Bolt.jpg"
            }, {
                name: "Mutilate",
                baseDamage: 14647,
                damage: 14647,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 14,647 Physical damage to an enemy.",
                image: "images/Mutilate.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Throw_Flesh",
                baseDamage: 4394,
                damage: 4394,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 4,394 Physical damage to the enemy target.",
                image: "images/Throw_Flesh.jpg"
            }, {
                name: "Necrotic_Bolt",
                baseDamage: 3515,
                damage: 3515,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 3,515 Shadow damage to an enemy and absorbs the next 2,888 healing.",
                image: "images/Necrotic_Bolt.jpg"
            }, {
                name: "Grim_Fate",
                baseDamage: 5859,
                damage: 5859,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "The caster condemns a player to a Grim Fate, causing them to inflict 5,859 Shadow damage to allies within 6 yds after 4 sec.",
                image: "images/Grim_Fate.jpg"
            }, {
                name: "Mutilate",
                baseDamage: 14647,
                damage: 14647,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 14,647 Physical damage to an enemy.",
                image: "images/Mutilate.jpg"
            }, {
                name: "Tenderize",
                baseDamage: 7324,
                damage: 7324,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 7,324 Physical damage to an enemy and increases their Physical damage taken by 12% for 16 sec.",
                image: "images/Tenderize.jpg"
            }, {
                name: "Spew_Disease",
                baseDamage: 5859,
                damage: 5859,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "The caster spews filth on an enemy player, inflicting 5,859 Plague damage on impact and creating a Disease Cloud at their location.",
                image: "images/Heaving_Retch.jpg"
            }
        ]
    }, {
        name: "Theater_Of_Pain",
        bossAbilities: [
            {
                name: "Hateful_Strike",
                baseDamage: 23436,
                damage: 23436,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Gorechop strikes his target, inflicting 23,436 Physical damage.",
                image: "images/Mutilate.jpg"
            }, {
                name: "Might_of_Maldraxxus",
                baseDamage: 7324,
                damage: 7324,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Xav leaps to the center of the arena inflicting 7,324 Physical damage to all players and performs a random combination of attacks.",
                image: "images/Might_of_Maldraxxus.jpg"
            }, {
                name: "Phantasmal_Parasite",
                baseDamage: 2344,
                damage: 2344,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Kul'tharok attaches a phantasm to random players that inflicts 2,344 Shadow damage to the target and all players within 3.5 yards every 1 sec. for 10 sec.",
                image: "images/Phantasmal_Parasite.jpg"
            }, {
                name: "Soulless",
                baseDamage: 2344,
                damage: 2344,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "While separated from their soul, the player's body suffers 2,344 Shadow damage every 1 sec. and prevents all actions and spellcasting.",
                image: "images/Soulless.jpg"
            }, {
                name: "Ghostly_Charge",
                baseDamage: 11718,
                damage: 11718,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Ghostly riders charge across the arena, inflicting 11,718 Shadow damage and knocking back players caught in their path.",
                image: "images/Ghostly_Charge.jpg"
            }, {
                name: "Echo_of_Battle",
                baseDamage: 11718,
                damage: 11718,
                type: "shadow",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Ghostly combatants clash, inflicting 11,718 Shadow damage to players within 8 yards.",
                image: "images/Severing_Smash.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Raging_Tantrum",
                baseDamage: 2929,
                damage: 2929,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "The caster goes into a Tantrum, inflicitng 2,929 Physical damage to all eneimes every 2 for 4 sec.",
                image: "images/Raging_Tantrum.jpg"
            }, {
                name: "Chop",
                baseDamage: 1025,
                damage: 1025,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 1,025 Physical damage to an enemy every 1 sec for 3 sec.",
                image: "images/Chop.jpg"
            }, {
                name: "Bone_Spear",
                baseDamage: 11718,
                damage: 11718,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "The caster impales the target, inflicting 11,718 Physical damage and an additionl 2490 Physical damage damage every 2 for 4 sec.",
                image: "images/Bone_Spear.jpg"
            }, {
                name: "Soulstorm",
                baseDamage: 2556,
                damage: 2556,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 2,556 Shadow damage to all players every 2 sec for 8 sec.",
                image: "images/Soulstorm.jpg"
            }, {
                name: "Soul_Corruption",
                baseDamage: 1988,
                damage: 1988,
                type: "shadow",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 1,988 Shadow damage to an enemy every 2 sec for 16 sec.",
                image: "images/Soul_Corruption.jpg"
            }, {
                name: "Jagged_Quarrel",
                baseDamage: 4394,
                damage: 4394,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 4,394 Physical damage to an enemy and an 1,611 Physical damage additional  every 2 sec for 8 sec.",
                image: "images/Jagged_Quarrel.jpg"
            }, {
                name: "Interrupting_Roar",
                baseDamage: 4394,
                damage: 4394,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Interrupts spell casting and inflicts 4,394 Physical damage to all players.",
                image: "images/Interruption_Roar.jpg"
            }, {
                name: "Ricocheting_Blade",
                baseDamage: 5113,
                damage: 5113,
                type: "physical",
                bleed: false,
                aoe: false,
                scaling: "default",
                description: "Inflicts 5,113 Physical damage to an additional 1,705 Physical damage to an enemy every 2 sec for 6 sec.",
                image: "images/Ricocheting_Blade.jpg"
            }, {
                name: "Seismic_Stomp",
                baseDamage: 4261,
                damage: 4261,
                type: "physical",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Inflicts 4,261 Physical damage to enemies within 60 yards.",
                image: "images/Seismic_Stomp.jpg"
            }, {
                name: "Withering_Discharge",
                baseDamage: 5493,
                damage: 5493,
                type: "plague",
                bleed: false,
                aoe: true,
                scaling: "default",
                description: "Inflicts 5,493 Plague damage to all players and afflicts them with Withering Blight.",
                image: "images/Withering_Discharge.jpg"
            }
        ]
    }
];
var personals = [
    {
        class: "Demon Hunter",
        specs: ["Havoc"],
        name: "Demonic_Wards",
        magicDR: .1,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Your tattoos reduce magic damage taken by 10%.",
        image: "images/Demonic_Wards.jpg"
    }, {
        class: "Demon Hunter",
        specs: ["Havoc"],
        name: "Blur",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Increases your chance to dodge by 50% and reduces all damage taken by 20% for 10 sec.",
        image: "images/Blur.jpg"
    }, {
        class: "Demon Hunter",
        specs: ["Havoc", "Vengeance"],
        name: "Fodder_to_the_Flame",
        magicDR: .15,
        physicalDR: .15,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Call forth and defeat a demon from the Theater of Pain to release an Empowered Demon Soul, increasing your damage done by 30% and reducing all damage taken by 15% for 20 sec.",
        image: "images/Fodder_to_the_Flame.jpg"
    }, {
        class: "Demon Hunter",
        specs: ["Havoc"],
        name: "Desperate_Instincts",
        magicDR: .3,
        physicalDR: .3,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Blur now reduces damage taken by an additional 10%. Additionally, you automatically trigger Blur when you fall below 35% health. This effect can only occur when Blur is not on cooldown.",
        image: "images/Desperate_Instincts.jpg"
    }, {
        class: "Demon Hunter",
        specs: ["Vengeance"],
        name: "Demonic_Wards",
        magicDR: .1,
        physicalDR: .1,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Your tattoos reduce all damage taken by 10%, and increase your Stamina by 65% and your Armor by 80%.",
        image: "images/Demonic_Wards.jpg"
    }, {
        class: "Demon Hunter",
        specs: ["Vengeance"],
        name: "Demon_Spikes",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: (85 * (playerMainStat / 100)) * (1 + (0.000347 * playerMastery)),
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Surge with fel power, increasing your Parry chance by 20% and reducing Physical damage taken by 10% for 6 sec.",
        image: "images/Demon_Spikes.jpg"
    }, {
        class: "Demon Hunter",
        specs: ["Vengeance"],
        name: "Metamorphosis",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 2,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .5,
        versIncrease: 0,
        selected: false,
        description: "Transform to demon form for 15 sec, increasing current and maximum health by 50% and Armor by 200%.",
        image: "images/Metamorphosis.jpg"
    }, {
        class: "Demon Hunter",
        specs: ["Vengeance"],
        name: "Fiery_Brand",
        magicDR: .4,
        physicalDR: .4,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Brand an enemy with a demonic symbol, instantly dealing (720% of attack power) Fire damage and reducing the damage they do to you by 40% for 8 sec.",
        image: "images/Fiery_Brand.jpg"
    }, {
        class: "Death Knight",
        specs: ["Blood", "Frost", "Unholy"],
        name: "Icebound_Fortitude",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Your blood freezes, granting immunity to Stun effects and reducing all damage you take by 30% for 8 sec.",
        image: "images/Icebound_Fortitude.jpg"

    }, {
        class: "Death Knight",
        specs: ["Blood"],
        name: "Bone_Shield",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 40 * (playerMainStat / 100),
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Surrounds you with a barrier of whirling bones, increasing Armor by (40 * Strength / 100), and your Haste by 10%. Each melee attack against you consumes a charge. Lasts 30 sec or until all charges are consumed.",
        image: "images/Bone_Shield.jpg"
    }, {
        class: "Druid",
        specs: ["Guardian"],
        name: "Pulverize",
        magicDR: .09,
        physicalDR: .09,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "A devastating blow that consumes 2 stacks of your Thrash on the target to deal [ 96.93% of Attack Power ] Physical damage, and reduces all damage you take by 9% for 20 sec.",
        image: "images/Pulverize.jpg"
    }, {
        class: "Druid",
        specs: ["Guardian"],
        name: "Rend_and_Tear",
        magicDR: .06,
        physicalDR: .06,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "While in Bear Form, Thrash also increases your damage dealt to the target, and reduces your damage taken from the target by 2% per application of Thrash.",
        image: "images/Rend_and_Tear.jpg"
    }, {
        class: "Druid",
        specs: ["Guardian"],
        name: "Ironfur",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: (.75 * playerMainStat),
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Increases armor by [ 75% of Agility ] for 7 sec. Multiple uses of this ability may overlap.",
        image: "images/Ironfur.jpg"
    }, {
        class: "Druid",
        specs: ["Balance", "Restoration", "Feral"],
        name: "Guardian_Affinity",
        magicDR: .06,
        physicalDR: .06,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage taken by 6%.",
        image: "images/Guardian_Affinity.jpg"
    }, {
        class: "Druid",
        specs: ["Guardian"],
        name: "Thick_Hide",
        magicDR: .06,
        physicalDR: .06,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage taken by 6%.",
        image: "images/Thick_Hide.jpg"
    }, {
        class: "Druid",
        specs: ["Guardian", "Feral"],
        name: "Survival_Instincts",
        magicDR: .5,
        physicalDR: .5,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you take by 50% for 6 sec.",
        image: "images/Survival_Instincts.jpg"
    }, {
        class: "Druid",
        specs: ["Balance"],
        name: "Moonkin_Form",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 1.25,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Shapeshift into Moonkin Form, increasing the damage of your spells by 10% and your armor by 125%, and granting protection from Polymorph effects.",
        image: "images/Moonkin_Form.jpg"
    }, {
        class: "Druid",
        specs: ["Balance", "Guardian", "Restoration"],
        name: "Barkskin",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Your skin becomes as tough as bark, reducing all damage you take by 20% and preventing damage from delaying your spellcasts. Lasts 12 sec.",
        image: "images/Barkskin.jpg"
    }, {
        class: "Druid",
        specs: ["Balance", "Restoration", "Feral"],
        name: "Bear_Form",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 2.2,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .25,
        versIncrease: 0,
        selected: false,
        description: "Shapeshift into Bear Form, increasing armor by 220% and Stamina by 25%, granting protection from Polymorph effects, and increasing threat generation.",
        image: "images/Bear_Form.jpg"
    }, {
        class: "Druid",
        specs: ["Guardian"],
        name: "Bear_Form",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 2.2,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .45,
        versIncrease: 0,
        selected: false,
        description: "Shapeshift into Bear Form, increasing armor by 220% and Stamina by 45%, granting protection from Polymorph effects, and increasing threat generation.",
        image: "images/Bear_Form.jpg"
    }, {
        class: "Hunter",
        specs: ["Marksmanship", "Survival", "Beast Mastery"],
        name: "Aspect_of_the_Turtle",
        magicDR: .3,
        physicalDR: .3,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Deflects all attacks and reduces all damage you take by 30% for 8 sec, but you cannot attack.",
        image: "images/Aspect_of_the_Turtle.jpg"
    }, {
        class: "Hunter",
        specs: ["Marksmanship", "Survival", "Beast Mastery"],
        name: "Survival_of_the_Fittest",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you and your pet take by 20% for 6 sec.",
        image: "images/Survival_of_the_Fittest.jpg"
    }, {
        class: "Hunter",
        specs: ["Beast Mastery"],
        name: "Aspect_of_the_Beast",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .075,
        versIncrease: 0,
        selected: false,
        description: "Increases the effectiveness of your pet's Predator's Thirst, Endurance Training, and Pathfinding passives by 50%.",
        image: "images/Aspect_of_the_Beast.jpg"
    }, {
        class: "Hunter",
        specs: ["Marksmanship", "Survival", "Beast Mastery"],
        name: "Endurance_Training",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .05,
        versIncrease: 0,
        selected: false,
        description: "You and your pet gain 5% increased maximum health.",
        image: "images/Endurance_Training.jpg"
    }, {
        class: "Mage",
        specs: ["Frost"],
        name: "Glacial_Insulation",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 2,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Ice Barrier increases your armor by 200% while active, and Ice Block applies Ice Barrier to you when it fades.",
        image: "images/Glacial_Insulation.jpg"
    }, {
        class: "Mage",
        specs: ["Frost", "Fire", "Arcane"],
        name: "Mirror_Image",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "While your images are active damage taken is reduced by 20%, taking direct damage will cause one of your images to dissipate.",
        image: "images/Mirror_Image.jpg"
    }, {
        class: "Mage",
        specs: ["Arcane"],
        name: "Prismatic_Barrier",
        magicDR: .15,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: .2,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Shields you with an arcane force, absorbing [ 20% of Total Health ] damage and reducing magic damage taken by 15% for 60 sec.",
        image: "images/Prismatic_Barrier.jpg"
    }, {
        class: "Mage",
        specs: ["Frost"],
        name: "Ice_Barrier",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: .2,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Shields you with an arcane force, absorbing [ 20% of Total Health ] damage.",
        image: "images/Ice_Barrier.jpg"
    }, {
        class: "Mage",
        specs: ["Fire"],
        name: "Blazing_Barrier",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: .2,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Shields you in flame, absorbing [ 20% of Total Health ] damage for 60 sec.",
        image: "images/Blazing_Barrier.jpg"
    }, {
        class: "Paladin",
        specs: ["Protection"],
        name: "Seraphim",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 1007,
        selected: false,
        description: "The Light temporarily magnifies your power, increasing your Haste, Critical Strike, Mastery, and Versatility by 1,007.",
        image: "images/Seraphim.jpg"
    }, {
        class: "Paladin",
        specs: ["Protection"],
        name: "Last_Defender",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Each enemy within 8 yards reduces the damage that you take and increases the damage that you deal by up to 3%.",
        image: "images/Last_Defender.jpg"
    }, {
        class: "Paladin",
        specs: ["Protection"],
        name: "Mastery:_Divine_Bulwark",
        magicDR: .028 + (.004 * playerMastery),
        physicalDR: .028 + (.004 * playerMastery),
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage taken while inside your Consecration by 2.8%. Increases your chance to block melee attacks by 8.0%.",
        image: "images/Divine_Bulwark.jpg"
    }, {
        class: "Paladin",
        specs: ["Retribution"],
        name: "Eye_for_an_Eye",
        magicDR: 0,
        physicalDR: .35,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Surround yourself with a bladed bulwark, reducing Physical damage taken by 35% and dealing [ 35.3% of Attack Power ] Physical damage to any melee attackers for 10 sec.",
        image: "images/Eye_for_an_Eye.jpg"
    }, {
        class: "Paladin",
        specs: ["Retribution"],
        name: "Shield_of_Vengeance",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: .3,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Creates a barrier of holy light that absorbs (30 / 100 * Total health) damage for 15 sec.",
        image: "images/Shield_of_Vengeance.jpg"
    }, {
        class: "Paladin",
        specs: ["Protection"],
        name: "Guardian_of_Ancient_Kings",
        magicDR: .5,
        physicalDR: .5,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Empowers you with the spirit of ancient kings, reducing all damage you take by 50% for 8 sec.",
        image: "images/Guardian_of_Ancient_Kings.jpg"
    }, {
        class: "Paladin",
        specs: ["Protection"],
        name: "Ardent_Defender",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you take by 20% for 8 sec. While Ardent Defender is active, the next attack that would otherwise kill you will instead bring you to 20% of your maximum health.",
        image: "images/Ardent_Defender.jpg"
    }, {
        class: "Paladin",
        specs: ["Protection"],
        name: "Shield_of_the_Righteous",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 1.5 * playerMainStat,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Slams enemies in front of you with your shield, causing [ 33% of Attack Power ] Holy damage, and increasing your Armor by 150% of Strength for 4.5 sec.",
        image: "images/Shield_of_the_Righteous.jpg"
    }, {
        class: "Paladin",
        specs: ["Holy"],
        name: "Divine_Protection",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you take by 20% for 8 sec.",
        image: "images/Divine_Protection.jpg"
    }, {
        class: "Priest",
        specs: ["Discipline"],
        name: "Masochism",
        magicDR: .1,
        physicalDR: .1,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "When you cast Shadow Mend on yourself, its damage over time effect heals you instead, and reduces all damage you take by 10%.",
        image: "images/Masochism.jpg"
    }, {
        class: "Priest",
        specs: ["Shadow"],
        name: "Dispersion",
        magicDR: .75,
        physicalDR: .75,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Disperse into pure shadow energy, reducing all damage taken by 75% for 6 sec, but you are unable to attack or cast spells.",
        image: "images/Dispersion.jpg"
    }, {
        class: "Priest",
        specs: ["Shadow", "Holy", "Discipline"],
        name: "Desperate_Prayer",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .25,
        versIncrease: 0,
        selected: false,
        description: "Increases maximum health by 25% for 10 sec, and instantly heals you for that amount.",
        image: "images/Desperate_Prayer.jpg"
    }, {
        class: "Rogue",
        specs: ["Assassination", "Subtlety", "Outlaw"],
        name: "Elusiveness",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Feint also reduces all damage you take from non-area-of-effect attacks by 30% for 5 sec.",
        image: "images/Elusiveness.jpg"
    }, {
        class: "Rogue",
        specs: ["Assassination", "Subtlety", "Outlaw"],
        name: "Feint",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Performs an evasive maneuver, reducing damage taken from area-of-effect attacks by 40% for 5 sec.",
        image: "images/Feint.jpg"
    }, {
        class: "Shaman",
        specs: ["Enhancement", "Elemental", "Restoration"],
        name: "Astral_Shift",
        magicDR: .4,
        physicalDR: .4,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Shift partially into the elemental planes, taking 40% less damage for 8 sec.",
        image: "images/Astral_Shift.jpg"
    }, {
        class: "Shaman",
        specs: ["Enhancement", "Elemental", "Restoration"],
        name: "Harden_Skin",
        magicDR: .4,
        physicalDR: .4,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "The Primal Earth Elemental hardens its own skin and the Shaman's skin into pure granite, reducing all damage taken by 40% for 10 sec.",
        image: "images/Harden_Skin.jpg"
    }, {
        class: "Shaman",
        specs: ["Enhancement", "Elemental", "Restoration"],
        name: "Spirit_Wolf",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "While transformed into a Ghost Wolf, you gain 5% increased movement speed and 5% damage reduction every 1 sec, stacking up to 4 times.",
        image: "images/Spirit_Wolf.jpg"
    }, {
        class: "Warlock",
        specs: ["Destruction", "Affliction", "Demonology"],
        name: "Unending_Resolve",
        magicDR: .4,
        physicalDR: .4,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "While transformed into a Ghost Wolf, you gain 5% increased movement speed and 5% damage reduction every 1 sec, stacking up to 4 times.",
        image: "images/Unending_Resolve.jpg"
    }, {
        class: "Warlock",
        specs: ["Demonology"],
        name: "Soul_Link",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "20% of all damage you take is taken by your demon pet instead.",
        image: "images/Soul_Link.jpg"
    }, {
        class: "Warlock",
        specs: ["Destruction", "Affliction", "Demonology"],
        name: "Dark_Pact",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: .5,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Sacrifices 20% of your current health to shield you for 250% of the sacrificed health for 20 sec. Usable while suffering from control impairing effects.",
        image: "images/Dark_Pact.jpg"
    }, {
        class: "Warlock",
        specs: ["Destruction", "Affliction", "Demonology"],
        name: "Soul_Leech",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: .1,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "All single-target damage done by you and your minions grants you and your pet shadowy shields that absorb 8% of the damage dealt for 15 sec, up to 10% of maximum health.",
        image: "images/Soul_Leech.jpg"
    }, {
        class: "Warlock",
        specs: ["Destruction", "Affliction", "Demonology"],
        name: "Demon_Skin",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: .15,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Your Soul Leech absorption now passively recharges at a rate of 0.5% of maximum health every 1 sec, and may now absorb up to 15% of maximum health.",
        image: "images/Demon_Skin.jpg"
    }, {
        class: "Warlock",
        specs: ["Destruction"],
        name: "Demon_Armor",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 1.5,
        absorb: .0,
        healthIncrease: 0,
        healthPercentIncrease: .1,
        versIncrease: 0,
        selected: false,
        description: "Protects the caster, increasing maximum health by 10% and increases armor by 150%.",
        image: "images/Demon_Armor.jpg"
    }, {
        class: "Warrior",
        specs: ["Protection", "Arms", "Fury"],
        name: "Spell_Reflection",
        magicDR: .2,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Raise your shield, reflecting spells cast on you and reducing magical damage you take by 20%. Lasts 5 sec or until a spell is reflected.",
        image: "images/Spell_Reflection.jpg"
    }, {
        class: "Warrior",
        specs: ["Arms"],
        name: "Defensive_Stance",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "A defensive combat state that reduces all damage you take by 20%, and all damage you deal by 10%. Lasts 0 sec.",
        image: "images/Defensive_Stance.jpg"
    }, {
        class: "Warrior",
        specs: ["Protection"],
        name: "Indomitable",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .1,
        versIncrease: 0,
        selected: false,
        description: "Increases your maximum health by 10%.",
        image: "images/Indomitable.jpg"
    }, {
        class: "Warrior",
        specs: ["Fury"],
        name: "Warpaint",
        magicDR: .1,
        physicalDR: .1,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "You take 10% reduced damage while Enrage is active.",
        image: "images/Warpaint.jpg"
    }, {
        class: "Warrior",
        specs: ["Protection"],
        name: "Shield_Wall",
        magicDR: .4,
        physicalDR: .4,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you take by 40% for 8 sec.",
        image: "images/Shield_Wall.jpg"
    }, {
        class: "Warrior",
        specs: ["Protection"],
        name: "Demoralizing_Shout",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Demoralizes all enemies within 10 yards, reducing the damage they deal to you by 20% for 8 sec.",
        image: "images/Demoralizing_Shout.jpg"
    }, {
        class: "Warrior",
        specs: ["Arms"],
        name: "Die_by_the_Sword",
        magicDR: .3,
        physicalDR: .3,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Increases your parry chance by [ 100 + 25% of Spell Power ]% and reduces all damage you take by 30% for 8 sec.",
        image: "images/Die_by_the_Sword.jpg"
    }, {
        class: "Warrior",
        specs: ["Fury"],
        name: "Enraged_Regeneration",
        magicDR: .3,
        physicalDR: .3,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces damage taken by 30%, and Bloodthirst restores an additional 20% health. Usable while stunned. Lasts 8 sec.",
        image: "images/Enraged_Regeneration.jpg"
    }, {
        class: "Warrior",
        specs: ["Protection"],
        name: "Last_Stand",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .3,
        versIncrease: 0,
        selected: false,
        description: "Increases maximum health by 30% for 15 sec, and instantly heals you for that amount.",
        image: "images/Last_Stand.jpg"
    }, {
        class: "Monk",
        specs: ["Windwalker", "Brewmaster", "Mistweaver"],
        name: "Dampen_Harm",
        magicDR: .5,
        physicalDR: .5,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you take by 20% to 50% for 10 sec, with larger attacks being reduced by more.",
        image: "images/Dampen_Harm.jpg"
    }, {
        class: "Monk",
        specs: ["Windwalker"],
        name: "Inner_Strength",
        magicDR: .1,
        physicalDR: .1,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Each Chi you spend reduces damage taken by 2% for 5 sec, stacking up to 5 times.",
        image: "images/Inner_Strength.jpg"
    }, {
        class: "Monk",
        specs: ["Brewmaster"],
        name: "Zen_Meditation",
        magicDR: .6,
        physicalDR: .6,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage taken by 60% for 8 sec. Moving, being hit by a melee attack, or taking another action will cancel this effect.",
        image: "images/Zen_Meditation.jpg"
    }, {
        class: "Monk",
        specs: ["Windwalker", "Mistweaver"],
        name: "Diffuse_Magic",
        magicDR: 0.6,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces magic damage you take by 60% for 6 sec, and transfers all currently active harmful magical effects on you back to their original caster if possible.",
        image: "images/Diffuse_Magic.jpg"
    }, {
        class: "Monk",
        specs: ["Windwalker"],
        name: "Touch_of_Karma",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: .5,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Absorbs all damage taken for 10 sec, up to 50% of your maximum health, and redirects 70% of that amount to the enemy target as Nature damage over 6 sec.",
        image: "images/Touch_of_Karma.jpg"
    }, {
        class: "Monk",
        specs: ["Mistweaver", "Windwalker"],
        name: "Fortifying_Brew",
        magicDR: .15,
        physicalDR: .15,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .15,
        versIncrease: 0,
        selected: false,
        description: "Turns your skin to stone, increasing your current and maximum health by 15%, and reducing damage taken by 15% for 15 sec.",
        image: "images/Fort_Brew.jpg"
    }, {
        class: "Monk",
        specs: ["Brewmaster"],
        name: "Breath_of_Fire",
        magicDR: .05,
        physicalDR: .05,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Breathe fire on targets in front of you, causing [23.75% of Attack Power] Fire damage. Targets affected by Keg Smash will also burn, taking [19.66% of Attack Power] Fire damage and dealing 5% reduced damage to you for 12 sec.",
        image: "images/Breath_of_Fire.jpg"
    }, {
        class: "Monk",
        specs: ["Brewmaster"],
        name: "Stagger",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "You shrug off attacks, delaying a portion of Physical damage based on your Agility, instead taking it over 10 sec. Affects magical attacks at 35% effectiveness.",
        image: "images/Stagger.jpg"
    }, {
        class: "Monk",
        specs: ["Brewmaster"],
        name: "Fortifying_Brew",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .2,
        versIncrease: 0,
        selected: false,
        description: "Turns your skin to stone for 15 sec, increasing your current and maximum health by 20%, increasing the effectiveness of Stagger by 10%, and reducing all damage you take by 20%.",
        image: "images/Fort_Brew.jpg"
    }
];
var absorbs = [
    {
        class: "all",
        specs: "all",
        name: "Other_Absorb",
        amount: 0,
        selected: false,
        description: "Other Absorbs.",
        image: "images/Resounding_Protection.jpg"
    }, {
        class: "all",
        specs: "all",
        name: "Power_Word-_Shield",
        amount: 0,
        selected: false,
        description: "Reduces all damage taken by a friendly target by 40% for 8 sec. Castable while stunned.",
        image: "images/Power_Word_Shield.jpg"
    }, {
        class: "Warrior",
        specs: ["Protection"],
        name: "Ignore_Pain",
        amount: 0,
        selected: false,
        description: "Fight through the pain, ignoring 50% of damage taken, up to [ 700% of Attack Power ] total damage prevented.",
        image: "images/Ignore_Pain.jpg"
    }
];
var externals = [
    {
        name: "Ironbark",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "The target's skin becomes as tough as Ironwood, reducing all damage taken by 20% for 12 sec.",
        image: "images/Ironbark.jpg"
    },{
        name: "Aegis_of_Light",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Channels an Aegis of Light that protects you and all allies standing within 10 yards behind you for 6 sec, reducing all damage taken by 20%.",
        image: "images/Aegis_of_Light.jpg"
    }, {
        name: "Aura_Mastery",
        magicDR: .15,
        physicalDR: .15,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Devotion Aura: all affected allies gain 15% damage reduction.",
        image: "images/Aura_Mastery.jpg"
    }, {
        name: "Devotion_Aura",
        magicDR: 0.03,
        physicalDR: 0.03,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Damage dealt to allies within 10 yards is reduced by 3%.",
        image: "images/Devotion_Aura.jpg"
    }, {
        name: "Blessing_of_Sacrifice",
        magicDR: .3,
        physicalDR: .3,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Blesses a party or raid member, reducing their damage taken by 30%, but you suffer 100% of damage prevented. Lasts 12 sec, or until transferred damage would cause you to fall below 20% health.",
        image: "images/Blessing_of_Sacrifice.jpg"
    }, {
        name: "Anti-Magic_Zone",
        magicDR: .2,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Places an Anti-Magic Zone for 10 sec that reduces spell damage taken by party or raid members by 20%.",
        image: "images/Anti_Magic_Zone.jpg"
    }, {
        name: "Lenience",
        magicDR: .03,
        physicalDR: .03,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Atonement reduces damage taken by 3%.",
        image: "images/Lenience.jpg"
    }, {
        name: "Power_Word:_Barrier",
        magicDR: .25,
        physicalDR: .25,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Summons a holy barrier to protect all allies at the target location for 10 sec, reducing all damage taken by 25% and preventing damage from delaying spellcasting.",
        image: "images/Power_Word_Barrier.jpg"
    }, {
        name: "Pain_Suppression",
        magicDR: .4,
        physicalDR: .4,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage taken by a friendly target by 40% for 8 sec. Castable while stunned.",
        image: "images/Pain_Suppression.jpg"
    }, {
        name: "Uwavering_Ward",
        magicDR: .03,
        physicalDR: .03,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Targets protected by Unwavering Ward take 3% reduced damage.",
        image: "images/Unwavering_Ward.webp"
    },{
        name: "Spirit_Link_Totem",
        magicDR: .1,
        physicalDR: .1,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Summons a totem at the target location for 6 sec, which reduces damage taken by all party and raid members within 10 yards by 10%. Every 1 sec the health of all affected players is redistributed, such that all players are at the same percentage of maximum health.",
        image: "images/Spirit_Link_Totem.jpg"
    }, {
        name: "Potion_of_Spectral_Stamina",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 5700,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Use: Increases your Stamina by 285 for 25 sec. (5 Min Cooldown)",
        image: "images/Potion_of_Spectral_Stamina.jpg"
    }, {
        name: "Steak_a_la_Mode",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 30,
        selected: false,
        description: "Use: Restores 30000 health and 40000 mana over 20 sec.  Must remain seated while eating.  If you spend at least 10 seconds eating you will become well fed and gain 30 Versatility for 1 hour.",
        image: "images/Steak_a_la_Mode.jpg"
    }, {
        name: "Spectral_Flask_of_Stamina",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 2100,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Use: Increases Stamina by 105 for 1 hour. Counts as both a Battle and Guardian elixir.  This effect persists through death. (3 Sec Cooldown)",
        image: "images/Spectral_Flask_of_Stamina.jpg"
    }, {
        name: "Banana_Beef_Pudding",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 440,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Use: Restores 30000 health and 40000 mana over 20 sec.  Must remain seated while eating.  If you spend at least 10 seconds eating you will become well fed and gain 22 Stamina for 1 hour.",
        image: "images/Banana_Beef_Pudding.jpg"
    }, {
        name: "Ancestral_Protection_Totem",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .1,
        versIncrease: 0,
        selected: false,
        description: "Summons a totem at the target location for 30 sec. All allies within 20 yards of the totem gain 10% increased health. If an ally dies, the totem will be consumed to allow them to Reincarnate with 20% health and mana.",
        image: "images/Ancestral_Protection_Totem.jpg"
    }, {
        name: "Rallying_Cry",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .15,
        versIncrease: 0,
        selected: false,
        description: "Lets loose a rallying cry, granting all party or raid members within 40 yards 15% temporary and maximum health for 10 sec.",
        image: "images/Rallying_Cry.jpg"
    }, {
        name: "Power_Word:_Fortitude",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .05,
        versIncrease: 0,
        selected: false,
        description: "Infuses the target with vitality, increasing their Stamina by 5% for 60 min.",
        image: "images/Power_Word_Fortitude.jpg"
    }, {
        name: "Stoneform",
        magicDR: 0,
        physicalDR: .1,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Removes all poison, disease and bleed effects and reduces all physical damage taken by 10% for 8 sec.",
        image: "images/Rearm.jpg"
    }, {
        name: "Shadow_Resistance",
        magicDR: .01,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces Shadow damage taken by 1%.",
        image: "images/Shadow_Resistance.jpg"
    }, {
        name: "Frost_Resistance",
        magicDR: .01,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces Frost damage taken by 1%.",
        image: "images/Frost_Resistance.jpg"
    }, {
        name: "Arcane_Resistance",
        magicDR: .01,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces Arcane damage taken by 1%.",
        image: "images/Arcane_Resistance.jpg"
    }, {
        name: "Nature_Resistance",
        magicDR: .01,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces Nature damage taken by 1%.",
        image: "images/Nature_Resistance.jpg"
    }, {
        name: "Fire_Resistance",
        magicDR: .01,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces Fire damage taken by 1%.",
        image: "images/Fire_Resistance.jpg"
    }, {
        name: "Holy_Resistance",
        magicDR: .01,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces Holy damage taken by 1%.",
        image: "images/Holy_Resistance.jpg"
    }, {
        name: "Rime_Of_The_Ancient_Mariner",
        magicDR: .01,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces Frost and Nature damage taken by 1%.",
        image: "images/Rime.jpg"
    }, {
        name: "Forged_In_The_Flames",
        magicDR: 0,
        physicalDR: .01,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces damage taken from Physical attacks by 1%.",
        image: "images/Forged_In_The_Flames.jpg"
    }, {
        name: "Rugged_Tenacity",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces damage taken by (Stamina * 0.0003 * 20).",
        image: "images/Rugged_Tenacity.jpg"
    }, {
        name: "Nose_For_Trouble",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "When you first take damage from an enemy, reduce that damage by 5% of your maximum health.",
        image: "images/Nose_For_Trouble.jpg"
    }
];
var versTrinkets = [
    {
        name: "Lustruous_Golden_Plumage",
        selected: false,
        amount: 0,
        description: "Use: Increase your Versatility for 20 sec. (2 Min Cooldown)",
        image: "images/Lustruous_Golden_Plumage.jpg"
    }, {
        name: "Dread_Gladiators_Medallion",
        selected: false,
        amount: 0,
        description: "Use: Increases Versatility for 20 sec. (2 Min Cooldown)",
        image: "images/Dread_Gladiators_Medallion.jpg"
    }
];

$.ajax({
    type: "GET",
    url: "https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en"
}).then(function (result) {
    result.affix_details.forEach(affix => {
        if (affix.name === "Tyrannical") {
            if (tyrannical) {
                tyrannical = false;
                fortified = true;
                $("#tyrannical").removeClass("selected");
                $("#fortified").addClass("selected");
            } else {
                tyrannical = true;
                fortified = false;
                $("#tyrannical").addClass("selected");
                $("#fortified").removeClass("selected");
            }
        } else if (affix.name === "Fortified") {
            if (fortified) {
                fortified = false;
                tyrannical = true;
                $("#fortified").removeClass("selected");
                $("#tyrannical").addClass("selected");
            } else {
                fortified = true;
                tyrannical = false;
                $("#fortified").addClass("selected");
                $("#tyrannical").removeClass("selected");
            }
        } else if (affix.name === "Raging") {
            raging = true;
            $("#raging").addClass("selected");
        }
    });
});

$(document).on("mouseenter", ".personalImage", function () {
    $(this).addClass("hovering");
});

$(document).on("mouseleave", ".personalImage", function () {
    $(this).removeClass("hovering");
});

$(document).on("mouseenter", ".externalImage", function () {
    $(this).addClass("hovering");
});

$(document).on("mouseleave", ".externalImage", function () {
    $(this).removeClass("hovering");
});

$(document).on("mouseenter", ".absorbImage", function () {
    $(this).addClass("hovering");
});

$(document).on("mouseleave", ".absorbImage", function () {
    $(this).removeClass("hovering");
});

$(document).on("mouseenter", ".imgContainer", function () {
    $(this).children("img").addClass("hovering")
});

$(document).on("mouseleave", ".imgContainer", function () {
    $(this).children("img").removeClass("hovering")
});

function displaySpecs() {
    $("#classEmpty").empty();
    if (playerClass === "Demon Hunter") {
        $("#classEmpty").append(`
        <div class="row">                            
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Havoc</h6>" class="specImage" data-spec="Havoc"
                src="images/Havoc.jpg" alt="Havoc">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Vengeance</h6>" class="specImage" data-spec="Vengeance"
                src="images/Vengeance.jpg" alt="Vengeance">
        </div>    
        `);
    } else if (playerClass === "Death Knight") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Blood</h6>" class="specImage" data-spec="Blood"
                src="images/Blood.png" alt="Blood">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Frost</h6>" class="specImage" data-spec="Frost"
                src="images/Frost.png" alt="Frost">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Unholy</h6>" class="specImage" data-spec="Unholy"
                src="images/Unholy.png" alt="Unholy">
        </div>    
        `);
    } else if (playerClass === "Druid") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Feral</h6>" class="specImage" data-spec="Feral"
                src="images/Feral.png" alt="Feral">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Balance</h6>" class="specImage" data-spec="Balance"
                src="images/Balance.png" alt="Balance">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Restoration</h6>" class="specImage" data-spec="Restoration"
                src="images/Restoration.png" alt="Restoration">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Guardian</h6>" class="specImage" data-spec="Guardian"
                src="images/Guardian.png" alt="Guardian">
        </div>    
        `);
    } else if (playerClass === "Hunter") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Beast Mastery</h6>" class="specImage" data-spec="Beast Mastery"
                src="images/Beast Mastery.png" alt="Beast Mastery">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Marksmanship</h6>" class="specImage" data-spec="Marksmanship"
                src="images/Marksmanship.png" alt="Marksmanship">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Survival</h6>" class="specImage" data-spec="Survival"
                src="images/Survival.png" alt="Survival">
        </div>    
        `);
    } else if (playerClass === "Mage") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Frost</h6>" class="specImage" data-spec="Frost"
                src="images/Frost Mage.png" alt="Frost">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Fire</h6>" class="specImage" data-spec="Fire"
                src="images/Fire.png" alt="Fire">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Arcane</h6>" class="specImage" data-spec="Arcane"
                src="images/Arcane.png" alt="Arcane">
        </div>    
        `);
    } else if (playerClass === "Monk") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Brewmaster</h6>" class="specImage" data-spec="Brewmaster"
                src="images/Brewmaster.png" alt="Brewmaster">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Mistweaver</h6>" class="specImage" data-spec="Mistweaver"
                src="images/Mistweaver.png" alt="Mistweaver">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Windwalker</h6>" class="specImage" data-spec="Windwalker"
                src="images/Windwalker.png" alt="Windwalker">
        </div>    
        `);
    } else if (playerClass === "Paladin") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Protection</h6>" class="specImage" data-spec="Protection"
                src="images/Protection Paladin.png" alt="Protection">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Retribution</h6>" class="specImage" data-spec="Retribution"
                src="images/Retribution.png" alt="Retribution">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Holy</h6>" class="specImage" data-spec="Holy"
                src="images/Holy.png" alt="Holy">
        </div>    
        `);
    } else if (playerClass === "Priest") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Shadow</h6>" class="specImage" data-spec="Shadow"
                src="images/Shadow.png" alt="Shadow">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Holy</h6>" class="specImage" data-spec="Holy"
                src="images/Holy Priest.png" alt="Holy">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Discipline</h6>" class="specImage" data-spec="Discipline"
                src="images/Discipline.png" alt="Discipline">
        </div>    
        `);
    } else if (playerClass === "Rogue") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Assassination</h6>" class="specImage" data-spec="Assassination"
                src="images/Assassination.png" alt="Assassination">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Outlaw</h6>" class="specImage" data-spec="Outlaw"
                src="images/Outlaw.png" alt="Outlaw">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Subtlety</h6>" class="specImage" data-spec="Subtlety"
                src="images/Subtlety.png" alt="Subtlety">
        </div>    
        `);
    } else if (playerClass === "Shaman") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Restoration</h6>" class="specImage" data-spec="Restoration"
                src="images/Restoration Shaman.png" alt="Restoration">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Elemental</h6>" class="specImage" data-spec="Elemental"
                src="images/Elemental.png" alt="Elemental">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Enhancement</h6>" class="specImage" data-spec="Enhancement"
                src="images/Enhancement.png" alt="Enhancement">
        </div>    
        `);
    } else if (playerClass === "Warlock") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Demonology</h6>" class="specImage" data-spec="Demonology"
                src="images/Demonology.png" alt="Demonology">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Destruction</h6>" class="specImage" data-spec="Destruction"
                src="images/Destruction.png" alt="Destruction">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Affliction</h6>" class="specImage" data-spec="Affliction"
                src="images/Affliction.png" alt="Affliction">
        </div>    
        `);
    } else if (playerClass === "Warrior") {
        $("#classEmpty").append(`
        <div class="row">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Protection</h6>" class="specImage" data-spec="Protection"
                src="images/Protection.png" alt="Protection">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Arms</h6>" class="specImage" data-spec="Arms"
                src="images/Arms.png" alt="Arms">
            <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>Fury</h6>" class="specImage" data-spec="Fury"
                src="images/Fury.png" alt="Fury">
        </div>    
        `);
    }
    $("#classEmpty").append(`<button type="button" id="changeClass" class="btn btn-primary">Choose Another Class</button>`);
    $('[data-toggle="tooltip"]').tooltip({ 'placement': 'top' });
}

$(document).on("click", ".classImage", function (event) {
    event.preventDefault();
    playerClass = $(this).attr("data-class");
    $(".classImage").removeClass("selectedClass");
    $(this).addClass("selectedClass");
    $('#classInput [data-toggle="tooltip"]').tooltip('dispose');
    displaySpecs();
});

$(document).on("click", "#changeClass", function (event) {
    event.preventDefault();
    $("#classEmpty").empty();
    $("#classEmpty").append(`
        <div class="row">
        <img class="classImage" data-class="Death Knight" src="images/deathKnight.svg"
            alt="Death Knight">
        <img class="classImage" data-class="Demon Hunter" src="images/demonHunter.svg"
            alt="Demon Hunter">
        <img class="classImage" data-class="Druid" src="images/druid.svg"
            alt="Druid">
        <img class="classImage" data-class="Hunter" src="images/hunter.svg"
            alt="Hunter">
    </div>
    <div class="row">
        <img class="classImage" data-class="Mage" src="images/mage.svg" alt="Mage">
        <img class="classImage" data-class="Monk" src="images/monk.svg" alt="Monk">
        <img class="classImage" data-class="Paladin" src="images/paladin.svg"
            alt="Paladin">
        <img class="classImage" data-class="Priest" src="images/priest.svg"
            alt="Priest">
    </div>
    <div class="row">
        <img class="classImage" data-class="Rogue" src="images/rogue.svg"
            alt="Rogue">
        <img class="classImage" data-class="Shaman" src="images/shaman.svg"
            alt="Shaman">
        <img class="classImage" data-class="Warlock" src="images/warlock.svg"
            alt="Warlock">
        <img class="classImage" data-class="Warrior" src="images/warrior.svg"
            alt="Warrior">
    </div>
    `);
});

$(document).on("click", "#changeDungeon", function (event) {
    event.preventDefault();
    dungeon = "";
    $("#dungeonInput").empty();
    $(".slidecontainer").addClass("hide");
    $(".affix").addClass("hide");
    $("#dungeonInput").append(`
        <div class="row">
        <div class="imgContainer col-md-6" data-dungeon="De_Other_Side">
            <img class="dungeonImage" data-dungeon="De_Other_Side" src="images/De_Other_Side.jpg" alt="De_Other_Side">
            <div class="overlay">
                <div class="text">De Other Side</div>
            </div>
            <div class="hide imgText">
                <div class="text">De Other Side</div>
            </div>
        </div>
        <div class="imgContainer col-md-6" data-dungeon="Halls_Of_Atonement">
            <img class="dungeonImage" data-dungeon="Halls_Of_Atonement" src="images/Halls_Of_Atonement.jpg" alt="Halls_Of_Atonement">
            <div class="overlay">
                <div class="text">Halls of Atonement</div>
            </div>
            <div class="hide imgText">
                <div class="text">Halls of Atonement</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="imgContainer col-md-6" data-dungeon="Mists_Of_Tirna_Scithe">
            <img class="dungeonImage" data-dungeon="Mists_Of_Tirna_Scithe" src="images/Mists_Of_Tirna_Scithe.jpg" alt="Mists_Of_Tirna_Scithe">
            <div class="overlay">
                <div class="text">Mists of Tirna Scithe</div>
            </div>
            <div class="hide imgText">
                <div class="text">Mists of Tirna Scithe</div>
            </div>
        </div>
        <div class="imgContainer col-md-6" data-dungeon="Plaguefall">
            <img class="dungeonImage" data-dungeon="Plaguefall" src="images/Plaguefall.jpg" alt="Plaguefall">
            <div class="overlay">
                <div class="text">Plaguefall</div>
            </div>
            <div class="hide imgText">
                <div class="text">Plaguefall</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="imgContainer col-md-6" data-dungeon="Sanguine_Depths">
            <img class="dungeonImage" data-dungeon="Sanguine_Depths" src="images/Sanguine_Depths.jpg" alt="Sanguine_Depths">
            <div class="overlay">
                <div class="text">Sanguine Depths</div>
            </div>
            <div class="hide imgText">
                <div class="text">Sanguine Depths</div>
            </div>
        </div>
        <div class="imgContainer col-md-6" data-dungeon="Spires_Of_Ascension">
            <img class="dungeonImage" data-dungeon="Spires_Of_Ascension" src="images/Spires_Of_Ascension.jpg" alt="Spires_Of_Ascension">
            <div class="overlay">
                <div class="text">Spires of Ascension</div>
            </div>
            <div class="hide imgText">
                <div class="text">Spires of Ascension</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="imgContainer col-md-6" data-dungeon="The_Necrotic_Wake">
            <img class="dungeonImage" data-dungeon="The_Necrotic_Wake" src="images/The_Necrotic_Wake.jpg" alt="The_Necrotic_Wake">
            <div class="overlay">
                <div class="text">The Necrotic Wake</div>
            </div>
            <div class="hide imgText">
                <div class="text">The Necrotic Wake</div>
            </div>
        </div>
        <div class="imgContainer col-md-6" data-dungeon="Theater_Of_Pain">
            <img class="dungeonImage" data-dungeon="Theater_Of_Pain" src="images/Theater_Of_Pain.jpg" alt="Theater_Of_Pain">
            <div class="overlay">
                <div class="text">Theater of Pain</div>
            </div>
            <div class="hide imgText">
                <div class="text">Theater of Pain</div>
            </div>
        </div>
    </div>
</div>
    `);
});

$(document).on("click", "#changeSpec", function (event) {
    event.preventDefault();
    displaySpecs();
    personals.forEach(personal => {
        personal.selected = false;
    });
    absorbs.forEach(absorb => {
        absorb.selected = false;
    });
    externals.forEach(external => {
        external.selected = false;
    });
    feint = false;
    aspect = false;
    endurance = false;
    elusiveness = false;
    playerMainStat = 0;
    playerArmor = 0;
    avoidance = 0;
    playerVers = 0;
    playerMastery = 0;
    playerStamina = 0;
    playerHealth = 0;
    playerAbsorb = 0;
    calcDamage();
});

$(document).on("click", ".specImage", function (event) {
    event.preventDefault();
    playerSpec = $(this).attr("data-spec");
    $('#classInput [data-toggle="tooltip"]').tooltip('dispose');
    if (playerSpec !== "") {
        $("#classEmpty").empty();
        $("#classEmpty").append(`
        <div class="row personalRow">
            <div class="col-md-6 personalCol">
                <h2>Personals:</h2>
            </div>
            <div class="col-md-6 healthCol">
                <h4 class="totalHealth" style="font-size: 23px">Total Health: 0</h4>
                <h4 class="totalAbsorb" style="font-size: 23px">Total Absorb: 0</h4>
                <h4 class="effectiveHealth" style="font-size: 23px">Effective Health: 0</h4>
            </div>
        </div>    
        `);
        personals.forEach(personal => {
            if (personal.class === playerClass && personal.specs.includes(playerSpec)) {
                $(".personalCol").append(`<img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${personal.name.replace("_", " ").replace("_", " ").replace("_", " ")}</h6>${personal.description}" class="personalImage" data-name=${personal.name} src=${personal.image} alt=${personal.name}>`);
            }
        });
        $("#classEmpty").append(`
        <button style="width: 280px; margin-bottom: 10px" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#externals" aria-expanded="false" aria-controls="externals">
        Externals Show/Hide
        </button></br>
        <div class="collapse" id="externals">
        `);
        externals.forEach(external => {
            $("#externals").append(`<img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${external.name.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ")}</h6>${external.description}"class="externalImage" data-name=${external.name} src=${external.image} alt=${external.name}>`);
        });
        $("#classEmpty").append(`<button style="width: 280px; margin-bottom: 10px" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#absorbs" aria-expanded="false" aria-controls="absorbs">
        Absorbs Show/Hide
        </button></br>
        <div class="collapse" id="absorbs">`);
        for (i = 0; i < 4; i++) {
            $("#absorbs").append(`
            <div class="row absorbRow">
                <div class="col-md-3">
                    <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${absorbs[i].name.replace("_", " ").replace("_", " ").replace("_", " ").replace("-", ":")}</h6>${absorbs[i].description}"class="absorbImage" data-name=${absorbs[i].name} src=${absorbs[i].image} alt=${absorbs[i].name}>
                </div>
                <div class="col-md-5">
                    <div class="input-group mb-3 absorbInput" style="margin-top: 9px">
                        <input type="text" class="form-control" data-name=${absorbs[i].name} placeholder="Amount" aria-label="Shield Amount" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary shieldOkay" data-name=${absorbs[i].name} type="button">OK</button>
                        </div>
                    </div>
                </div
            </div>
            `);
        }
        if (playerClass === "Warrior" && playerSpec === "Protection") {
            $("#absorbs").append(`
            <div class="row absorbRow">
                <div class="col-md-3">
                    <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${absorbs[4].name.replace("_", " ").replace("_", " ").replace("_", " ")}</h6>${absorbs[4].description}"class="absorbImage" data-name=${absorbs[4].name} src=${absorbs[4].image} alt=${absorbs[4].name}>
                </div>
                <div class="col-md-5">
                    <div class="input-group mb-3 absorbInput" style="margin-top: 9px">
                        <input type="text" class="form-control" data-name=${absorbs[4].name} placeholder="Amount" aria-label="Shield Amount" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary shieldOkay" data-name=${absorbs[4].name} type="button">OK</button>
                        </div>
                    </div>
                </div
            </div>
            `);
        }
        $("#absorbs").append(`
            <div class="row absorbRow">
                <div class="col-md-3">
                    <p style="margin-top: 15px">Other: </p>
                </div>
                <div class="col-md-5">
                    <div class="input-group mb-3 absorbInput" style="margin-top: 9px">
                        <input type="text" class="form-control" data-name="otherAbsorb" placeholder="Amount" aria-label="Shield Amount" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary shieldOkay" data-name="otherAbsorb" type="button">OK</button>
                        </div>
                    </div>
                </div
            </div>
            `);
        $("#classEmpty").append(`</div>`);
        $("#classEmpty").append(`<button style="width: 280px; margin-bottom: 10px" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#versCollapse" aria-expanded="false" aria-controls="versCollapse">
        Vers Trinkets Show/Hide
        </button></br>
        <div class="collapse" id="versCollapse">`);
        versTrinkets.forEach(trinket => {
            $("#versCollapse").append(`
            <div class="row absorbRow">
                <div class="col-md-6">
                    <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${trinket.name.replace("_", " ").replace("_", " ")}</h6>${trinket.description}"class="absorbImage" data-name=${trinket.name} src=${trinket.image} alt=${trinket.name}>
                </div>
                <div class="col-md-5">
                    <div class="input-group mb-3" style="margin-top: 9px">
                        <input type="text" class="form-control" data-name=${trinket.name} placeholder="Amount" aria-label="Vers Amount" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary versOkay" data-name=${trinket.name} type="button">OK</button>
                        </div>
                    </div>
                </div
            </div>
            `);
        });
        $("#classEmpty").append(`
        <h2>Stats:</h2>
        <div class="row">
            <div class="col-md-6">
            <p class="playerInput" style="margin-top: 4px">Stamina (no buffs):</p>
            </div>
            <div class="col-md-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" data-name="stamina" placeholder="Amount" aria-label="Stamina Amount" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary stamOkay" data-name="stamina" type="button">OK</button>
                </div>
            </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
            <p class="playerInput" style="margin-top: 4px">Versatility (no buffs):</p>
            </div>
            <div class="col-md-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" data-name="vers" placeholder="Amount" aria-label="Vers Amount" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary versatilityOkay" data-name="vers" type="button">OK</button>
                </div>
            </div>
            </div>
        </div>
        <div class="row">
        <div class="col-md-6">
        <p class="playerInput" style="margin-top: 4px">Armor (no buffs):</p>
        </div>
        <div class="col-md-5">
        <div class="input-group mb-3">
            <input type="text" class="form-control" data-name="armor" placeholder="Amount" aria-label="Armor Amount" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary armorOkay" data-name="armor" type="button">OK</button>
            </div>
        </div>
        </div>
    </div>
    <div class="row">
    <div class="col-md-6">
    <p class="playerInput" style="margin-top: 4px">Avoidance (with procs):</p>
    </div>
    <div class="col-md-5">
    <div class="input-group mb-3">
        <input type="text" class="form-control" data-name="avoidance" placeholder="Amount" aria-label="Avoidance Amount" aria-describedby="basic-addon2">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary avoidanceOkay" data-name="avoidance" type="button">OK</button>
        </div>
    </div>
    </div>
</div>
        `);
        if (playerSpec === "Vengeance" || playerSpec === "Blood" || playerSpec === "Guardian" || (playerSpec === "protection" && playerClass === "Paladin")) {
            $("#classEmpty").append(`
            <div class="row">
            <div class="col-md-6">
            <p class="playerInput" style="margin-top: 4px">Main stat (no buffs):</p>
            </div>
            <div class="col-md-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" data-name="mainStat" placeholder="Amount" aria-label="Main Stat Amount" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary mainStatOkay" data-name="mainStat" type="button">OK</button>
                </div>
            </div>
            </div>
        </div>
            `);
        }
        if (playerSpec === "Vengeance" || (playerClass === "Paladin" && playerSpec === "Protection")) {
            $("#classEmpty").append(`
            <div class="row">
            <div class="col-md-6">
            <p class="playerInput">Mastery (no buffs):</p>
            </div>
            <div class="col-md-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" data-name="mastery" placeholder="Amount" aria-label="Mastery Amount" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary masteryOkay" data-name="mastery" type="button">OK</button>
                </div>
            </div>
            </div>
        </div>
            `);
        }
        if (playerSpec === "Brewmaster") {
            $("#classEmpty").append(`
            <div class="row">
            <div class="col-md-6">
            <p class="playerInput">Stagger (with buffs):</p>
            </div>
            <div class="col-md-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" data-name="stagger" placeholder="Amount" aria-label="Stagger Amount" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary staggerOkay" data-name="stagger" type="button">OK</button>
                </div>
            </div>
            </div>
        </div>
            `);
            personals.forEach(personal => {
                if (personal.name === "Stagger") {
                    personal.selected = true;
                    $(`[data-name="Stagger"`).addClass("selected");
                }
            });
            calcDamage();
        }
        if (playerSpec === "Havoc") {
            personals.forEach(personal => {
                if (personal.name === "Demonic_Wards" && personal.specs.includes("Havoc")) {
                    personal.selected = true;
                    $(`[data-name="Demonic_Wards"`).addClass("selected");
                }
            });
            calcDamage();
        }
        if (playerSpec === "Vengeance") {
            personals.forEach(personal => {
                if (personal.name === "Demonic_Wards" && personal.specs.includes("Vengeance")) {
                    personal.selected = true;
                    $(`[data-name="Demonic_Wards"`).addClass("selected");
                }
            });
            calcDamage();
        }
    };
    $("#classEmpty").append("<button type=\"button\" id=\"changeSpec\" class=\"btn btn-primary\">Choose Another Spec</button>");
    $('[data-toggle="tooltip"]').tooltip({ 'placement': 'top' });
});

$(document).on("click", ".imgContainer", function (event) {
    event.preventDefault();
    dungeon = $(this).attr("data-dungeon");
    $(".dungeonImage").removeClass("selected");
    $(this).addClass("selected");
    if (dungeon !== "Tol_Dagor") {
        externals.forEach(external => {
            if (external.name === "Infusion:_Fortitude" && external.selected) {
                external.selected = false;
                $(`[data-name="Infusion:_Fortitude"`).removeClass("selected");
            }
        });
    }
    if (dungeon !== "Mechagon_Junkyard") {
        externals.forEach(external => {
            if (external.name === "Reinforced" && external.selected) {
                external.selected = false;
                $(`[data-name="Reinforced"`).removeClass("selected");
            }
        });
    }
    calcDamage();
});

$(document).on("click", "#tyrannical", function (event) {
    event.preventDefault();
    if (tyrannical) {
        tyrannical = false;
        fortified = true;
        $("#tyrannical").removeClass("selected");
        $("#fortified").addClass("selected");
    } else {
        tyrannical = true;
        fortified = false;
        $("#tyrannical").addClass("selected");
        $("#fortified").removeClass("selected");
    }
    calcDamage();
});

$(document).on("click", "#fortified", function (event) {
    event.preventDefault();
    if (fortified) {
        fortified = false;
        tyrannical = true;
        $("#fortified").removeClass("selected");
        $("#tyrannical").addClass("selected");
    } else {
        fortified = true;
        tyrannical = false;
        $("#fortified").addClass("selected");
        $("#tyrannical").removeClass("selected");
    }
    calcDamage();
});

$(document).on("click", "#raging", function (event) {
    event.preventDefault();
    if (raging) {
        $("#raging").removeClass("selected");
        raging = false;
    } else {
        $("#raging").addClass("selected");
        raging = true;
    }
    calcDamage();
});

$(document).on("click", ".stamOkay", function (event) {
    event.preventDefault();
    var stamAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (stamAmount === "") {
        stamAmount = 0;
    }
    if (Number.isInteger(stamAmount)) {
        playerStamina = stamAmount;
        calcDamage();
    }
});

$(document).on("click", ".versatilityOkay", function (event) {
    event.preventDefault();
    var versAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (versAmount === "") {
        versAmount = 0;
    }
    if (Number.isInteger(versAmount)) {
        playerVers = versAmount;
        calcDamage();
    }
});

$(document).on("click", "input", function (event) {
    event.preventDefault();
    recentInput = $(this).attr("data-name");
})

$(document).keypress(function (keyPressed) {
    if (keyPressed.which === 13) {
        var amount = Number($(`input[type=text][data-name=${recentInput}]`).val());
        if (amount === "") {
            amount = 0;
        }
        if (Number.isInteger(amount)) {
            if (recentInput === "stamina") {
                playerStamina = amount;
            } else if (recentInput === "vers") {
                playerVers = amount;
            } else if (recentInput === "armor") {
                playerArmor = amount;
            } else if (recentInput === "avoidance") {
                avoidance = amount;
                if (avoidance > 560) {
                    avoidance = 560;
                }
            } else if (recentInput === "mainStat") {
                playerMainStat = amount;
            } else if (recentInput === "Lustruous_Golden_Plumage" || recentInput === "Dread_Gladiators_Medallion") {
                versTrinkets.forEach(trinket => {
                    if (trinket.name === trinketName) {
                        trinket.amount = amount;
                        if (trinket.selected && amount === 0) {
                            trinket.selected = false;
                            $(`img[data-name=${recentInput}]`).removeClass("selected");
                        } else if (amount > 0) {
                            trinket.selected = true;
                            $(`img[data-name=${recentInput}]`).addClass("selected");
                        }
                    }
                });
                if (amount === 0) {
                    $(`img[data-name=${recentInput}]`).removeClass("selected");
                }
            } else if (recentInput === "Miniaturized_Plasma_Shield" || recentInput === "Resounding_Protection" || recentInput === "Power_Word-_Shield" || recentInput === "Luminous_Barrier" || recentInput === "Ignore_Pain" || recentInput === "otherAbsorb") {
                absorbs.forEach(absorb => {
                    if (absorb.name === recentInput) {
                        absorb.amount = amount;
                        if (absorb.selected && amount === 0) {
                            $(`img[data-name=${recentInput}]`).removeClass("selected");
                            absorb.selected = false;
                        } else if (amount > 0) {
                            absorb.selected = true;
                            $(`img[data-name=${recentInput}]`).addClass("selected");
                        }
                    }
                });
                if (amount === 0) {
                    $(`img[data-name=${recentInput}]`).removeClass("selected");
                }
            }
        }
        calcDamage();
    }
});

$(document).on("click", ".avoidanceOkay", function (event) {
    event.preventDefault();
    var avoidanceAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (avoidanceAmount === "") {
        avoidanceAmount = 0;
    }
    if (Number.isInteger(avoidanceAmount)) {
        avoidance = avoidanceAmount;
        if (avoidance > 560) {
            avoidance = 560;
        }
        calcDamage();
    }
});

$(document).on("click", ".armorOkay", function (event) {
    event.preventDefault();
    var armorAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (armorAmount === "") {
        armorAmount = 0;
    }
    if (Number.isInteger(armorAmount)) {
        playerArmor = armorAmount;
        calcDamage();
    }
});

$(document).on("click", ".mainStatOkay", function (event) {
    event.preventDefault();
    var mainStatAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (mainStatAmount === "") {
        mainStatAmount = 0;
    }
    if (Number.isInteger(mainStatAmount)) {
        playerMainStat = mainStatAmount;
        calcDamage();
    }
});

$(document).on("click", ".masteryOkay", function (event) {
    event.preventDefault();
    var masteryAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (masteryAmount === "") {
        masteryAmount = 0;
    }
    if (Number.isInteger(masteryAmount)) {
        playerMastery = masteryAmount;
        calcDamage();
    }
});

$(document).on("click", ".staggerOkay", function (event) {
    event.preventDefault();
    var staggerAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (staggerAmount === "") {
        staggerAmount = 0;
    } else if (staggerAmount > 100) {
        staggerAmount = 100;
    }
    if (Number.isInteger(staggerAmount)) {
        personals.forEach(personal => {
            if (personal.name === "Stagger") {
                personal.physicalDR = staggerAmount / 100;
                personal.magicDR = (staggerAmount / 100) * .35;
            }
        });
        calcDamage();
    }
});

$(document).on("click", ".shieldOkay", function (event) {
    event.preventDefault();
    var shieldName = $(this).attr("data-name");
    var shieldAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (shieldAmount === "") {
        shieldAmount = 0;
    }
    if (Number.isInteger(shieldAmount)) {
        absorbs.forEach(absorb => {
            if (absorb.name === shieldName) {
                absorb.amount = shieldAmount;
                if (absorb.selected && shieldAmount === 0) {
                    $(`img[data-name=${$(this).attr("data-name")}]`).removeClass("selected");
                    absorb.selected = false;
                } else if (shieldAmount > 0) {
                    absorb.selected = true;
                    $(`img[data-name=${$(this).attr("data-name")}]`).addClass("selected");
                }
            }
        });
        if (shieldAmount === 0) {
            $(`img[data-name=${$(this).attr("data-name")}]`).removeClass("selected");
        }
    }
    calcDamage();
});

$(document).on("click", ".versOkay", function (event) {
    event.preventDefault();
    var trinketName = $(this).attr("data-name");
    var versAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (versAmount === "") {
        versAmount = 0;
    }
    if (Number.isInteger(versAmount)) {
        versTrinkets.forEach(trinket => {
            if (trinket.name === trinketName) {
                trinket.amount = versAmount;
                if (trinket.selected && versAmount === 0) {
                    trinket.selected = false;
                    $(`img[data-name=${$(this).attr("data-name")}]`).removeClass("selected");
                } else if (versAmount > 0) {
                    trinket.selected = true;
                    $(`img[data-name=${$(this).attr("data-name")}]`).addClass("selected");
                }
            }
        });
        if (versAmount === 0) {
            $(`img[data-name=${$(this).attr("data-name")}]`).removeClass("selected");
        }
    }
    calcDamage();
});

$(document).on("click", ".personalImage", function (event) {
    event.preventDefault();
    var personalName = $(this).attr("data-name");
    if (personalName !== "Demonic_Wards" && personalName !== "Stagger") {
        if (personalName === "Feint" && !feint) {
            feint = true;
        } else if (personalName === "Feint" && feint) {
            feint = false;
        }
        if (personalName === "Elusiveness" && !elusiveness) {
            elusiveness = true;
        } else if (personalName === "Elusiveness" && elusiveness) {
            elusiveness = false;
        }
        if (personalName === "Desperate_Instincts") {
            personals.forEach(personal => {
                if (personal.name === "Blur" && personal.selected) {
                    personal.selected = false;
                    $(`img[data-name=Blur]`).removeClass("selected");
                }
            });
        }
        if (personalName === "Blur") {
            personals.forEach(personal => {
                if (personal.name === "Desperate_Instincts" && personal.selected) {
                    personal.selected = false;
                    $(`img[data-name=Desperate_Instincts]`).removeClass("selected");
                }
            });
        }
        if (personalName === "Bear_Form") {
            personals.forEach(personal => {
                if (personal.name === "Moonkin_Form" && personal.selected) {
                    personal.selected = false;
                    $(`img[data-name=Moonkin_Form]`).removeClass("selected");
                }
            });
        }
        if (personalName === "Moonkin_Form") {
            personals.forEach(personal => {
                if (personal.name === "Bear_Form" && personal.selected) {
                    personal.selected = false;
                    $(`img[data-name=Bear_Form]`).removeClass("selected");
                }
            });
        }
        if (personalName === "Dampen_Harm") {
            personals.forEach(personal => {
                if (personal.name === "Inner_Strength" && personal.selected) {
                    personal.selected = false;
                    $(`img[data-name=Inner_Strength]`).removeClass("selected");
                }
                if (personal.name === "Diffuse_Magic" && personal.selected) {
                    personal.selected = false;
                    $(`img[data-name=Diffuse_Magic]`).removeClass("selected");
                }
            });
        }
        if (personalName === "Inner_Strength") {
            personals.forEach(personal => {
                if (personal.name === "Dampen_Harm" && personal.selected) {
                    personal.selected = false;
                    $(`img[data-name=Dampen_Harm]`).removeClass("selected");
                }
                if (personal.name === "Diffuse_Magic" && personal.selected) {
                    personal.selected = false;
                    $(`img[data-name=Diffuse_Magic]`).removeClass("selected");
                }
            });
        }
        if (personalName === "Diffuse_Magic") {
            personals.forEach(personal => {
                if (personal.name === "Inner_Strength" && personal.selected) {
                    personal.selected = false;
                    $(`img[data-name=Inner_Strength]`).removeClass("selected");
                }
                if (personal.name === "Dampen_Harm" && personal.selected) {
                    personal.selected = false;
                    $(`img[data-name=Dampen_Harm]`).removeClass("selected");
                }
            });
        }
        personals.forEach(personal => {
            if (personal.name === personalName && personal.class === playerClass && personal.specs.includes(playerSpec)) {
                if (personal.selected) {
                    personal.selected = false;
                    $(this).removeClass("selected");
                } else {
                    personal.selected = true;
                    $(this).addClass("selected");
                }
            }
        });
        calcDamage();
    }
});

$(document).on("click", ".externalImage", function (event) {
    event.preventDefault();
    var externalName = $(this).attr("data-name");
    if (externalName === "Stoneform") {
        externals.forEach(external => {
            if ((external.name === "Shadow_Resistance" && external.selected) || (external.name === "Nature_Resistance" && external.selected) || (external.name === "Arcane_Resistance" && external.selected) || (external.name === "Fire_Resistance" && external.selected) || (external.name === "Holy_Resistance" && external.selected) || (external.name === "Rime_Of_The_Ancient_Mariner" && external.selected) || (external.name === "Forged_In_The_Flames" && external.selected) || (external.name === "Rugged_Tenacity" && external.selected) || (external.name === "Nose_For_Trouble" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
        externals.forEach(external => {
            if (external.name === "Frost_Resistance" && !external.selected) {
                external.selected = true;
                $(`img[data-name='${external.name}']`).addClass("selected");
            }
        });
    } else if (externalName === "Shadow_Resistance") {
        externals.forEach(external => {
            if ((external.name === "Frost_Resistance" && external.selected) || (external.name === "Nature_Resistance" && external.selected) || (external.name === "Arcane_Resistance" && external.selected) || (external.name === "Fire_Resistance" && external.selected) || (external.name === "Holy_Resistance" && external.selected) || (external.name === "Rime_Of_The_Ancient_Mariner" && external.selected) || (external.name === "Forged_In_The_Flames" && external.selected) || (external.name === "Rugged_Tenacity" && external.selected) || (external.name === "Nose_For_Trouble" && external.selected) || (external.name === "Stoneform" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
    } else if (externalName === "Frost_Resistance") {
        externals.forEach(external => {
            if ((external.name === "Shadow_Resistance" && external.selected) || (external.name === "Nature_Resistance" && external.selected) || (external.name === "Arcane_Resistance" && external.selected) || (external.name === "Fire_Resistance" && external.selected) || (external.name === "Holy_Resistance" && external.selected) || (external.name === "Rime_Of_The_Ancient_Mariner" && external.selected) || (external.name === "Forged_In_The_Flames" && external.selected) || (external.name === "Rugged_Tenacity" && external.selected) || (external.name === "Nose_For_Trouble" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
    } else if (externalName === "Arcane_Resistance") {
        externals.forEach(external => {
            if ((external.name === "Shadow_Resistance" && external.selected) || (external.name === "Nature_Resistance" && external.selected) || (external.name === "Frost_Resistance" && external.selected) || (external.name === "Fire_Resistance" && external.selected) || (external.name === "Holy_Resistance" && external.selected) || (external.name === "Rime_Of_The_Ancient_Mariner" && external.selected) || (external.name === "Forged_In_The_Flames" && external.selected) || (external.name === "Rugged_Tenacity" && external.selected) || (external.name === "Nose_For_Trouble" && external.selected) || (external.name === "Stoneform" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
    } else if (externalName === "Nature_Resistance") {
        externals.forEach(external => {
            if ((external.name === "Shadow_Resistance" && external.selected) || (external.name === "Arcane_Resistance" && external.selected) || (external.name === "Frost_Resistance" && external.selected) || (external.name === "Fire_Resistance" && external.selected) || (external.name === "Holy_Resistance" && external.selected) || (external.name === "Rime_Of_The_Ancient_Mariner" && external.selected) || (external.name === "Forged_In_The_Flames" && external.selected) || (external.name === "Rugged_Tenacity" && external.selected) || (external.name === "Nose_For_Trouble" && external.selected) || (external.name === "Stoneform" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
    } else if (externalName === "Fire_Resistance") {
        externals.forEach(external => {
            if ((external.name === "Shadow_Resistance" && external.selected) || (external.name === "Arcane_Resistance" && external.selected) || (external.name === "Frost_Resistance" && external.selected) || (external.name === "Nature_Resistance" && external.selected) || (external.name === "Holy_Resistance" && external.selected) || (external.name === "Rime_Of_The_Ancient_Mariner" && external.selected) || (external.name === "Forged_In_The_Flames" && external.selected) || (external.name === "Rugged_Tenacity" && external.selected) || (external.name === "Stoneform" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
    } else if (externalName === "Holy_Resistance") {
        externals.forEach(external => {
            if ((external.name === "Shadow_Resistance" && external.selected) || (external.name === "Arcane_Resistance" && external.selected) || (external.name === "Frost_Resistance" && external.selected) || (external.name === "Fire_Resistance" && external.selected) || (external.name === "Nature_Resistance" && external.selected) || (external.name === "Rime_Of_The_Ancient_Mariner" && external.selected) || (external.name === "Forged_In_The_Flames" && external.selected) || (external.name === "Rugged_Tenacity" && external.selected) || (external.name === "Nose_For_Trouble" && external.selected) || (external.name === "Stoneform" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
    } else if (externalName === "Rime_Of_The_Ancient_Mariner") {
        externals.forEach(external => {
            if ((external.name === "Shadow_Resistance" && external.selected) || (external.name === "Arcane_Resistance" && external.selected) || (external.name === "Frost_Resistance" && external.selected) || (external.name === "Fire_Resistance" && external.selected) || (external.name === "Nature_Resistance" && external.selected) || (external.name === "Holy_Resistance" && external.selected) || (external.name === "Forged_In_The_Flames" && external.selected) || (external.name === "Rugged_Tenacity" && external.selected) || (external.name === "Nose_For_Trouble" && external.selected) || (external.name === "Stoneform" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
    } else if (externalName === "Forged_In_The_Flames") {
        externals.forEach(external => {
            if ((external.name === "Shadow_Resistance" && external.selected) || (external.name === "Arcane_Resistance" && external.selected) || (external.name === "Frost_Resistance" && external.selected) || (external.name === "Fire_Resistance" && external.selected) || (external.name === "Nature_Resistance" && external.selected) || (external.name === "Holy_Resistance" && external.selected) || (external.name === "Rime_Of_The_Ancient_Mariner" && external.selected) || (external.name === "Rugged_Tenacity" && external.selected) || (external.name === "Nose_For_Trouble" && external.selected) || (external.name === "Stoneform" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
    } else if (externalName === "Rugged_Tenacity") {
        externals.forEach(external => {
            if ((external.name === "Shadow_Resistance" && external.selected) || (external.name === "Arcane_Resistance" && external.selected) || (external.name === "Frost_Resistance" && external.selected) || (external.name === "Fire_Resistance" && external.selected) || (external.name === "Nature_Resistance" && external.selected) || (external.name === "Holy_Resistance" && external.selected) || (external.name === "Rime_Of_The_Ancient_Mariner" && external.selected) || (external.name === "Forged_In_The_Flames" && external.selected) || (external.name === "Nose_For_Trouble" && external.selected) || (external.name === "Stoneform" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
    } else if (externalName === "Nose_For_Trouble") {
        externals.forEach(external => {
            if ((external.name === "Shadow_Resistance" && external.selected) || (external.name === "Arcane_Resistance" && external.selected) || (external.name === "Frost_Resistance" && external.selected) || (external.name === "Nature_Resistance" && external.selected) || (external.name === "Holy_Resistance" && external.selected) || (external.name === "Rime_Of_The_Ancient_Mariner" && external.selected) || (external.name === "Forged_In_The_Flames" && external.selected) || (external.name === "Rugged_Tenacity" && external.selected) || (external.name === "Stoneform" && external.selected)) {
                external.selected = false;
                $(`img[data-name='${external.name}']`).removeClass("selected");
            }
        });
        externals.forEach(external => {
            if (external.name === "Fire_Resistance" && !external.selected) {
                external.selected = true;
                $(`img[data-name='${external.name}']`).addClass("selected");
            }
        });
    }
    if (externalName === "Steak_a_la_Mode") {
        externals.forEach(external => {
            if (external.name === "Banana_Beef_Pudding" && external.selected) {
                external.selected = false;
                $(`img[data-name=Banana_Beef_Pudding]`).removeClass("selected");
            }
        });
    }
    if (externalName === "Aura_Mastery") {
        externals.forEach(external => {
            if (external.name === "Devotion_Aura" && external.selected) {
                external.selected = false;
                $(`img[data-name=Devotion_Aura]`).removeClass("selected");
            }
        });
    }
    if (externalName === "Devotion_Aura") {
        externals.forEach(external => {
            if (external.name === "Aura_Mastery" && external.selected) {
                external.selected = false;
                $(`img[data-name=Aura_Mastery]`).removeClass("selected");
            }
        });
    }
    if (externalName === "Banana_Beef_Pudding") {
        externals.forEach(external => {
            if (external.name === "Steak_a_la_Mode" && external.selected) {
                external.selected = false;
                $(`img[data-name=Steak_a_la_Mode]`).removeClass("selected");
            }
        });
    }
    if (externalName === "Devotion_Aura") {
        externals.forEach(external => {
            if (external.name === "Aura_of_Sacrifice" && external.selected) {
                external.selected = false;
                $(`img[data-name=Aura_of_Sacrifice]`).removeClass("selected");
            }
        });
    }
    if (externalName === "Aura_of_Sacrifice") {
        externals.forEach(external => {
            if (externals[i].name === "Devotion_Aura" && externals[i].selected) {
                externals[i].selected = false;
                $(`img[data-name=Devotion_Aura]`).removeClass("selected");
            }
        });
    }
    if (externalName !== "Infusion:_Fortitude" && externalName !== "Reinforced") {
        externals.forEach(external => {
            if (external.name === externalName) {
                if (external.selected) {
                    external.selected = false;
                    $(this).removeClass("selected");
                } else {
                    external.selected = true;
                    $(this).addClass("selected");
                }
            }
        });
        calcDamage();
    } else if (externalName === "Infusion:_Fortitude" && dungeon === "Tol_Dagor") {
        externals.forEach(external => {
            if (external.name === externalName) {
                if (external.selected) {
                    external.selected = false;
                    $(this).removeClass("selected");
                } else {
                    external.selected = true;
                    $(this).addClass("selected");
                }
            }
        });
        calcDamage();
    } else if (externalName === "Reinforced" && dungeon === "Mechagon_Junkyard") {
        externals.forEach(external => {
            if (external.name === externalName) {
                if (external.selected) {
                    external.selected = false;
                    $(this).removeClass("selected");
                } else {
                    external.selected = true;
                    $(this).addClass("selected");
                }
            }
        });
        calcDamage();
    }
});