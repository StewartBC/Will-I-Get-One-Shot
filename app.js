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
var scaling = [1, 1.1, 1.21, 1.33, 1.46, 1.61, 1.77, 1.95, 2.14, 2.36, 2.59, 2.85, 3.14, 3.45, 3.8, 4.18, 4.59, 5.05, 5.56, 6.12, 6.73, 7.4, 8.14, 8.95, 9.85, 10.83, 11.92, 13.11, 14.42, 15.86, 17.58];
var slider = document.getElementById("myRange");
var output = document.getElementById("keyLevel");
slider.oninput = function () {
    level = this.value;
    output.innerHTML = "Key Level: " + this.value;
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
                        if (dungeons[i].bossAbilities[k].damage > playerHealth + playerAbsorb - 1) {
                            $("#dungeonInput").append(`
                                <p class="abilityDamage red">${dungeons[i].bossAbilities[k].damage.toLocaleString()}</p>
                                </div>
                                </div>
                            `);
                        } else {
                            $("#dungeonInput").append(`
                            <p class="abilityDamage red">${dungeons[i].bossAbilities[k].damage.toLocaleString()}</p>
                        </div>
                    </div>
                    `);
                        }

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
            if (external.magicDR > 0) {
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
            if (tyrannical) {
                damage = damage * 1.15;
            }
            damage = damage - (damage * 0.01 * (vers * (.5 / 85)));
            if (ability.type === "physical") {
                physical.forEach(item => {
                    damage = damage - damage * item;
                });
                if (!ability.bleed) {
                    damage = damage - (damage * 0.01 * ((armor / (armor + 14282)) * 100));
                }
            } else {
                magic.forEach(item => {
                    damage = damage - damage * item;
                });
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
                damage = damage * 1.15;
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
                    damage = damage - (damage * 0.01 * ((armor / (armor + 8467)) * 100));
                }
            } else {
                magic.forEach(item => {
                    damage = damage - damage * item;
                });
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
        name: "Atal'Dazar",
        bossAbilities: [
            {
                name: "Toxic_Pool",
                baseDamage: 60520,
                damage: 60520,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Creates a pool of noxious fumes at random locations, that inflict 60,520 Nature damage every 2 sec to players standing within the pool.",
                image: "images/Toxic_Pool.jpg"
            }, {
                name: "Corrupted_Gold",
                baseDamage: 120688,
                damage: 120688,
                type: "fire",
                bleed: false,
                aoe: false,
                description: "The player is splashed with corrupted gold, burning them for 120,688 Fire damage and lowering their damage dealt by 30% for 10 sec.",
                image: "images/Corrupted_Gold.jpg"
            }, {
                name: "Molten_Gold",
                baseDamage: 54310,
                damage: 54310,
                type: "fire",
                bleed: false,
                aoe: false,
                description: "Priestess Alun'za agitates a pool of molten gold, splattering a player at random. The victim burns for 54,310 Fire damage every 3 sec for 30 sec.",
                image: "images/Molten_Gold.jpg"
            }, {
                name: "Tainted_Blood",
                baseDamage: 21120,
                damage: 21120,
                type: "shadow",
                bleed: false,
                aoe: false,
                description: "The victim's blood is tainted, inflicting 21,120 Shadow damage every 3 sec.",
                image: "images/Tainted_Blood.jpg"
            }, {
                name: "Toxic_Leap",
                baseDamage: 86745,
                damage: 86745,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Vol'kaal leaps towards a random player inflicting 86,745 Nature to players within 8 yards of the impact, knocking them back.",
                image: "images/Toxic_Leap.jpg"
            }, {
                name: "Echoes_of_Shadra",
                baseDamage: 120698,
                damage: 120698,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Summons forth several shadowy spider images. Touching an Echo of Shadra causes it to burst inflicting 120,698 Shadow damage to players within 3 yards, creating a pool of Shadowy Remains at the location.",
                image: "images/Echoes_of_Shadra.jpg"
            }, {
                name: "Shadowy_Remains",
                baseDamage: 77901,
                damage: 77901,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Inflicts 77,901 Shadow damage every 2 sec and reduces the target's movement speed by 30% while within the effect.",
                image: "images/Shadowy_Remains.jpg"
            }, {
                name: "Soulrend",
                baseDamage: 55094,
                damage: 55094,
                type: "shadow",
                bleed: false,
                aoe: false,
                description: "Upon reaching 100 Energy, Yazma inflicts 55,094 Shadow damage to all players. The impact rips a piece of the target's soul free, creating a Soulspawn at the target's location.",
                image: "images/Soulrend.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Merciless_Assault",
                baseDamage: 75431,
                damage: 75431,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Charges to an area, inflicting 75,431 Physical damage to all enemies within 8 yards.",
                image: "images/Merciless_Assault.jpg"
            }, {
                name: "Wildfire",
                baseDamage: 35156,
                damage: 35156,
                type: "fire",
                bleed: false,
                aoe: false,
                description: "Launches a bolt of fire at a random target inflicting 35,156 Fire damage and an additional 7,295 Fire damage every 2 sec for 8 sec.",
                image: "images/Wildfire.jpg"
            }, {
                name: "Fervent_Strike",
                baseDamage: 120689,
                damage: 120689,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "The caster slashes out, inflicting 120,689 Physical damage.",
                image: "images/Fervent_Strike.jpg"
            }, {
                name: "Leaping_Thrash",
                baseDamage: 7245,
                damage: 7245,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Leap to the target area, inflicting 7,245 Physical damage to all enemies and causing them to bleed.",
                image: "images/Leaping_Thrash.jpg"
            }, {
                name: "Venom_Blast",
                baseDamage: 52802,
                damage: 52802,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Toxic vapors assault the target inflicting 52,802 Nature damage.",
                image: "images/Venom_Blast.jpg"
            }, {
                name: "Rending_Maul",
                baseDamage: 90517,
                damage: 90517,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Inflicts 90,517 Physical damage and additional 6,034 Physical damage every 2 sec for 20 sec. This effect stacks.",
                image: "images/Rending_Maul.jpg"
            }
        ]
    }, {
        name: "Freehold",
        bossAbilities: [
            {
                name: "Pistol_Shot",
                baseDamage: 45258,
                damage: 45258,
                type: "fire",
                bleed: false,
                aoe: false,
                description: "The caster draws a concealed pistol and fires a quick shot at an enemy, dealing 45,258 Fire damage.",
                image: "images/Pistol_Shot.jpg"
            }, {
                name: "Azerite_Powder_Shot",
                baseDamage: 90516,
                damage: 90516,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "Inflicts 90,516, Fire damage to all enemies in a cone 30 yds. long in front of the caster.",
                image: "images/Azerite_Powder_Shot.jpg"
            }, {
                name: "Dive_Bomb",
                baseDamage: 90516,
                damage: 90516,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Sharkbait charges across the battlefield, inflicting 90,516 Nature damage and knocking back all players in the way.",
                image: "images/Dive_Bomb.jpg"
            }, {
                name: "Powder_Shot",
                baseDamage: 87499,
                damage: 87499,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Eudora fires a heavy powder shot at a random enemy, inflicting 87,499 Physical damage.",
                image: "images/Powder_Shot.jpg"
            }, {
                name: "Grapeshot",
                baseDamage: 77712,
                damage: 77712,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "Eudora leaps to a new location and fires wide blasts of grapeshot from her rifle across the arena. Each blast deals 77,712 Fire damage in a cone.",
                image: "images/Grapeshot.jpg"
            }, {
                name: "Rearm",
                baseDamage: 77712,
                damage: 77712,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Trothak charges a nearby shark, inflicting 77,712 Physical damage to anyone in the way. Upon reaching the shark, Trothak reattaches the shark to his arm.",
                image: "images/Rearm.jpg"
            }, {
                name: "Shark_Tornado",
                baseDamage: 51808,
                damage: 51808,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Trothak holds his shark by the tail and spins in a circle, inflicting 51,808 Physical damage every 1 sec to all enemies within 9 yards.",
                image: "images/Shark_Tornado.jpg"
            }, {
                name: "Swiftwind_Saber",
                baseDamage: 66378,
                damage: 66378,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "With a flick of his saber, Harlan bends the tradewinds to his will and sends them flying forward. Enemies that collide with the winds are knocked back and suffer 66,378 Nature damage.",
                image: "images/Swiftwind_Saber.jpg"
            }
        ], 
        trashAbilities: [
            {
                name: "Crippling_Bite",
                baseDamage: 36961,
                damage: 36961,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Inflicts 36,961 Physical damage and reduces enemy movement speed by 50% for 5 sec.",
                image: "images/Crippling_Bite.jpg"
            }, {
                name: "Brutal_Backhand",
                baseDamage: 108888,
                damage: 108888,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Swings a backhand, inflicting 108,888 Physical damage and knocking back all nearby enemies in a cone.",
                image: "images/Brutal_Backhand.jpg"
            }, {
                name: "Rat_Traps",
                baseDamage: 30181,
                damage: 30181,
                type: "physical",
                bleed: true,
                aoe: false,
                description: "The caster hurls steel traps at nearby targets. When triggered, the traps root the target and inflict 30,181 Physical damage every 1 sec for 5 sec.",
                image: "images/Rat_Traps.jpg"
            }, {
                name: "Frost_Blast",
                baseDamage: 51808,
                damage: 51808,
                type: "frost",
                bleed: false,
                aoe: true,
                description: "Inflicts 51,808 Frost damage to all enemies in a cone 30 yds. long in front of the caster.",
                image: "images/Frost_Blast.jpg"
            }, {
                name: "Dragging_Harpoon",
                baseDamage: 35665,
                damage: 35665,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Throws a harpoon at an enemy, inflicting 35,665 Physical damage and pulling the enemy to the caster.",
                image: "images/Dragging_Harpoon.jpg"
            }, {
                name: "Shell_Bounce",
                baseDamage: 67364,
                damage: 67364,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Throws a shell that bounces around the arena, inflicting 67,364 Nature damage to anyone hit.",
                image: "images/Shell_Bounce.jpg"
            }
        ]
    }, {
        name: "Kings'_Rest",
        bossAbilities: [
            {
                name: "Spit_Gold",
                baseDamage: 54310,
                damage: 54310,
                type: "fire",
                bleed: false,
                aoe: false,
                description: "Spits molten gold at a player, inflicting 54,310 Fire damage every 3 sec. for 9 sec, and creating a pool of Molten Gold at the player's location afterwards.",
                image: "images/Spit_Gold.jpg"
            }, {
                name: "Drain_Fluids",
                baseDamage: 49060,
                damage: 49060,
                type: "fire",
                bleed: false,
                aoe: false,
                description: "Prepares the target for mummification by draining their fluids, inflicting 49,060 Nature damage every 2 sec. for 8 sec. If the effect lasts the full duration, it applies Dessication to the target.",
                image: "images/Drain_Fluids.jpg"
            }, {
                name: "Burning_Ground",
                baseDamage: 110350,
                damage: 110350,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "Inflicts 110,350 Fire damage every 2 sec. to any players inside a patch of Burning Ground.",
                image: "images/Burning_Ground.jpg"
            }, {
                name: "Severing_Axe",
                baseDamage: 43750,
                damage: 43750,
                type: "physical",
                bleed: true,
                aoe: false,
                description: "Inflicts 43,750 Physical damage every 2 sec. for 20 sec.",
                image: "images/Severing_Axe.jpg"
            }, {
                name: "Whirling_Axes",
                baseDamage: 33803,
                damage: 33803,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Unleashes a whirling attack that inflicts 105,602 Physical damage to players within 10 yards, knocking them back. Also, she throws two whirling axes which iflict 33,803 Physical damage every 2 sec. for 6 sec to players who come into contact with them.",
                image: "images/Whirling_Axes.jpg"
            }, {
                name: "Quaking_Leap",
                baseDamage: 122651,
                damage: 122651,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Dazar leaps at the targeted player, inflicting up to 122,651 Physical damage to all players. This damage is reduced the further players are from the targeted location.",
                image: "images/Quaking_Leap.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Suppression_Slam",
                baseDamage: 159446,
                damage: 159446,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Disperses electric energy in a cone, inflicting 159,446 Nature damage to all affected players and stunning them for 2.5 sec.",
                image: "images/Suppression_Slam.jpg"
            }, {
                name: "Deathly_Chill",
                baseDamage: 51293,
                damage: 51293,
                type: "shadowfrost",
                bleed: false,
                aoe: false,
                description: "Inflicts 51,293 Shadowfrost damage.",
                image: "images/Deathly_Chill.jpg"
            }, {
                name: "Axe_Barrage",
                baseDamage: 24530,
                damage: 24530,
                type: "physical",
                bleed: true,
                aoe: true,
                description: "Throws a whirl of axes at players, inflicting 24,530 Physical damage every 2 sec. for 6 sec.",
                image: "images/Axe_Barrage.jpg"
            }, {
                name: "Bladestorm",
                baseDamage: 51293,
                damage: 51293,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Moves towards a targeted player in a whirl of blades, inflicting 51,293 Physical damage every 0.5 sec. to nearby players.",
                image: "images/Bladestorm.jpg"
            }, {
                name: "Spectral_Bolt",
                baseDamage: 49061,
                damage: 49061,
                type: "shadow",
                bleed: false,
                aoe: false,
                description: "Inflicts 49,061 Shadow damadge to an enemy.",
                image: "images/Spectral_Bolt.jpg"
            }, {
                name: "Severing_Blade",
                baseDamage: 30172,
                damage: 30172,
                type: "physical",
                bleed: true,
                aoe: false,
                description: "Slashes the target, inflicting 30,172 Physical damage every 2 sec. for 10 sec. This effect stacks.",
                image: "images/Severing_Blade.jpg"
            }, {
                name: "Frost_Shock",
                baseDamage: 37716,
                damage: 37716,
                type: "frost",
                bleed: false,
                aoe: false,
                description: "Freezes the target, inflicting 37,716 Frost damage and reducing their movement speed by 50% for 15 sec.",
                image: "images/Frost_Shock.jpg"
            }, {
                name: "Shadow_Barrage",
                baseDamage: 45258,
                damage: 45258,
                type: "shadow",
                bleed: false,
                aoe: false,
                description: "Inflicts 45,258 Shadow damage to an enemy. Inflicts 30,172 Shadow damage to an enemy every 2 sec for 8 sec.",
                image: "images/Shadow_Barrage.jpg"
            }
        ]
    }, {
        name: "Shrine_of_the_Storm",
        bossAbilities: [
            {
                name: "Undertow",
                baseDamage: 24424,
                damage: 24424,
                type: "frost",
                bleed: false,
                aoe: false,
                description: "Channels dark waters into a player, inflicting 24,424 Frost damage every 1 sec for 6 sec, pushing them back.",
                image: "images/Undertow.jpg"
            }, {
                name: "Slicing_Blast",
                baseDamage: 27155,
                damage: 27155,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Inflicts 27,155 Nature damage to all enemies and increases Nature damage taken by 15% for 30 sec. This effect stacks.",
                image: "images/Slicing_Blast.jpg"
            }, {
                name: "Blowback",
                baseDamage: 69396,
                damage: 69396,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Interrupts while affected by Blessing of the Tempest create a Blowback at a nearby location which inflicts 69,396 Nature damage and kocks back enemies that come in contact with it.",
                image: "images/Blowback.jpg"
            }, {
                name: "Hindering_Cleave",
                baseDamage: 144826,
                damage: 144826,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Inflicts 144,826 Physical damage to enemies in front of the caster and reduces movement speed by 70% for 10 sec.",
                image: "images/Hindering_Cleave.jpg"
            }, {
                name: "Mind_Rend",
                baseDamage: 54310,
                damage: 54310,
                type: "shadow",
                bleed: false,
                aoe: false,
                description: "The Mind Rend inflicts 54,310 Shadow damage and an additional 6,083 Shadow damage every 2 sec and reduces speed by 50% for 10 sec.",
                image: "images/Mind_Rend.jpg"
            }, {
                name: "Consume_Essence",
                baseDamage: 65088,
                damage: 65088,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "The Forgotten Denizen tears a fragment from the minds of all players, inflicting 65,088 Shadow damage to them and restoring health to the caster.",
                image: "images/Consume_Essence.jpg"
            }, {
                name: "Abyssal_Eruption",
                baseDamage: 9655,
                damage: 9655,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Manifestations of the Deep explode upon death, inflicting 9,655 Shadow damage to all players. This effect grants Vol'zith the Whisperer energy if the manifestation reaches it.",
                image: "images/Abyssal_Eruption.jpg"
            }, {
                name: "Tentacle_Slam",
                baseDamage: 149508,
                damage: 149508,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "A shadowy tentacle rises from the deep, slamming the ground and inflicting 149,508 Shadow damage to targets struck.",
                image: "images/Tentacle_Slam.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Water_Blast",
                baseDamage: 54954,
                damage: 54954,
                type: "frost",
                bleed: false,
                aoe: false,
                description: "Inflicts 54,954 Frost damage to an enemy.",
                image: "images/Water_Blast.jpg"
            }, {
                name: "Gale_Shear",
                baseDamage: 40706,
                damage: 40706,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Disrupts the target's concentration with a gale of wind, knocking the target back and inflicting 40,706 Nature damage.",
                image: "images/Gale_Shear.jpg"
            }, {
                name: "Gale_Winds",
                baseDamage: 15086,
                damage: 15086,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Channels the fierce power of the winds, inflicting 15,086 Nature damage to all players every 1 sec for 4 sec.",
                image: "images/Gale_Winds.jpg"
            }, {
                name: "Whirling_Slam",
                baseDamage: 120689,
                damage: 120689,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Inflicts 120,689 Physical damage to enemies within 8 yards.",
                image: "images/Whirling_Slam.jpg"
            }, {
                name: "Unending_Darkness",
                baseDamage: 54310,
                damage: 54310,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Unending Darkness engulfs players, inflicting 54,310 Shadow damage and increasing Shadow damage taken by 25% for 20 sec. This effect stacks.",
                image: "images/Unending_Darkness.jpg"
            }, {
                name: "Void_Seed",
                baseDamage: 123055,
                damage: 123055,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Inflicts 123,055 Shadow damage to enemies within 6 yards when the Void Seed expires.",
                image: "images/Void_Seed.jpg"
            }, {
                name: "Void_Bolt",
                baseDamage: 122119,
                damage: 122119,
                type: "shadow",
                bleed: false,
                aoe: false,
                description: "Deals 122,119 Shadow damage.",
                image: "images/Void_Bolt.jpg"
            }, {
                name: "Deep_Smash",
                baseDamage: 73272,
                damage: 73272,
                type: "frost",
                bleed: false,
                aoe: false,
                description: "Inflicts 73,272 Frost damage to an enemy. Globules of water erupt from the target, additionally inflicting 32,924 Frost damage to targets they land upon.",
                image: "images/Deep_Smash.jpg"
            }
        ]
    }, {
        name: "Siege_of_Boralus",
        bossAbilities: [
            {
                name: "Steel_Tempest",
                baseDamage: 150861,
                damage: 150861,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Smashes the ground, inflicting 150,861 Physical damage and knocking back enemies within 10 yards and 24332 Physical damage to everyone.",
                image: "images/Steel_Tempest.jpg"
            }, {
                name: "Clear_The_Deck",
                baseDamage: 122118,
                damage: 122118,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Sends the targets in a cone in front of the caster flying, inflicting 122,118 Physical damage on impact and knocking them back.",
                image: "images/Clear_The_Deck.jpg"
            }, {
                name: "Gut_Shot",
                baseDamage: 48847,
                damage: 48847,
                type: "nature",
                bleed: true,
                aoe: false,
                description: "When not being melee attacked, shoots at random enemies inflicting 48,847 Physical damage on impact and an additional 22,305 Physical damage every 2 sec for 8 sec.",
                image: "images/Gut_Shot.jpg"
            }, {
                name: "Break_Water",
                baseDamage: 59739,
                damage: 59739,
                type: "frost",
                bleed: false,
                aoe: true,
                description: "Roiling water erupts under random enemy destinations, inflicting 97,695 Frost damage to enemies within 5 yards and knocks them into the air as well as inflicting 9,919 Frost damage to everyone.",
                image: "images/Break_Water.jpg"
            }, {
                name: "Putrid_Waters",
                baseDamage: 45258,
                damage: 45258,
                type: "frost",
                bleed: false,
                aoe: false,
                description: "Spits putrid water at random enemies that inflicts 45,258 Frost damage on impact and 22,629 Frost damage every 2 sec for 30 sec. If dispelled, water erupts and inflicts 38157 Frost damage to nearby allies and knocks them back.",
                image: "images/Putrid_Waters.jpg"
            }, {
                name: "Call_of_the_Deep",
                baseDamage: 162825,
                damage: 162825,
                type: "frost",
                bleed: false,
                aoe: true,
                description: "Belches a torrent of water that inflicts 162,825 Frost damage on impact to nearby enemies.",
                image: "images/Call_of_the_Deep.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Brackish_Bolt",
                baseDamage: 48848,
                damage: 48848,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Fires a bolt of foul water at the target that inflicts 48,848 Nature damage.",
                image: "images/Brackish_Bolt.jpg"
            }, {
                name: "Molten_Slug",
                baseDamage: 36779,
                damage: 36779,
                type: "fire",
                bleed: false,
                aoe: false,
                description: "Shoots at a random enemy, inflicting 36,779 Fire damage.",
                image: "images/Molten_Slug.jpg"
            }, {
                name: "Trample",
                baseDamage: 56989,
                damage: 56989,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Charges towards a random enemy, inflicting 56,989 Shadow damage to all players caught in the path.  Victims are stunned for 2 sec.",
                image: "images/Trample.jpg"
            }, {
                name: "Broadside",
                baseDamage: 107033,
                damage: 107033,
                type: "arcane",
                bleed: false,
                aoe: true,
                description: "Fires a cannon that inflicts 107,033 Arcane damage to all enemies caught in the path.",
                image: "images/Broadside.jpg"
            }, {
                name: "Banana_Rampage",
                baseDamage: 34885,
                damage: 34885,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Enters a rampage, inflicting 34,885 Physical damage to all nearby enemies. Also, launches bananas at random enemy targets that inflict 17,633 to nearby enemies and leaves bananas on the ground that stun enemies that move over them for 2 sec.",
                image: "images/Banana_Rampage.jpg"
            }, {
                name: "Viscous_Slobber",
                baseDamage: 48848,
                damage: 48848,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Hurls slobber in a frontal cone that inflicts 48,848 Nature damage to enemies and reduces their movement speed by 65% for 6 sec.",
                image: "images/Viscous_Slobber.jpg"
            }, {
                name: "Ricochet",
                baseDamage: 39224,
                damage: 39224,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Fires at an enemy, inflicting 39,224 Physical damage.",
                image: "images/Ricochet.jpg"
            }, {
                name: "Shoot",
                baseDamage: 24138,
                damage: 24138,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Shoots an enemy, inflicting 24,138 Physical damage.",
                image: "images/Shoot.jpg"
            }
        ]
    }, {
        name: "Temple_of_Sethraliss",
        bossAbilities: [
            {
                name: "Conduction",
                baseDamage: 90516,
                damage: 90516,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Aspix charges the air around the victim, causing them to release a sudden burst of 90,516 Nature damage after 5 sec. Any allies within 8 yards of the victim will take Nature damage when this effect expires.",
                image: "images/Conduction.jpg"
            }, {
                name: "Static_Shock",
                baseDamage: 67887,
                damage: 67887,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Aspix unleashes a burst of electricity that inflicts 67,887 Nature damage.",
                image: "images/Static_Shock.jpg"
            }, {
                name: "Jolt",
                baseDamage: 45258,
                damage: 45258,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Aspix jolts the target for 45,258 Nature damage.",
                image: "images/Jolt.jpg"
            }, {
                name: "Burrow",
                baseDamage: 90516,
                damage: 90516,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Merektha burrows through floor, inflicting 90,516 Physical damage to any players caught in her path. Victims are knocked back.",
                image: "images/Burrow.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Power_Shot",
                baseDamage: 65130,
                damage: 65130,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "The caster fires an bolt of lightning through the target, inflicting 65,130 Nature damage to all enemies caught in its path.",
                image: "images/Power_Shot.jpg"
            }, {
                name: "Lightning_Bolt",
                baseDamage: 66379,
                damage: 66379,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Shocks the target with a bolt of lightning, inflicting 66,379 Nature damage.",
                image: "images/Lightning_Bolt.jpg"
            }, {
                name: "Venomous_Spit",
                baseDamage: 24424,
                damage: 24424,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "The caster spits venom at the target, poisoning them for 24,424 Nature damage every 3 sec for 9 sec.",
                image: "images/Venomous_Spit.jpg"
            }, {
                name: "Lightning_in_a_Bottle",
                baseDamage: 24424,
                damage: 24424,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "The caster hurls a vial that unleashes an electric field on the ground.  Players who stand in the field suffer 24,424 Nature damage every 3 sec.",
                image: "images/Lightning_in_a_Bottle.jpg"
            }, {
                name: "Release_Charge",
                baseDamage: 24424,
                damage: 24424,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Releases all stored charge, inflicting 24,424 Nature damage to all enemies within 40 yards. Consumes all applications of Accumulate Charge.",
                image: "images/Release_Charge.jpg"
            }, {
                name: "Spark",
                baseDamage: 32557,
                damage: 32557,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Leaps to a target location, inflicting 32,557 Nature damage to all targets within 5 yards of the impact.",
                image: "images/Spark.jpg"
            }, {
                name: "Electrocute",
                baseDamage: 16283,
                damage: 16283,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Electrocutes a random enemy for 16,283 Nature damage.",
                image: "images/Electrocute.jpg"
            }, {
                name: "Lava_Burst",
                baseDamage: 60345,
                damage: 60345,
                type: "fire",
                bleed: false,
                aoe: false,
                description: "Hurls molten lava at an enemy, inflicting 60,345 Fire damage.",
                image: "images/Lava_Burst.jpg"
            },
        ]
    }, {
        name: "The_Motherlode",
        bossAbilities: [
            {
                name: "Static_Pulse",
                baseDamage: 54309,
                damage: 54309,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Emits a pulse of electricity, inflicting 54,309 Nature damage instantly and 4,509 Nature damage every 2 sec for 6 sec. Also knocks back all enemies.",
                image: "images/Static_Pulse.jpg"
            }, {
                name: "Chemical_Burn",
                baseDamage: 36636,
                damage: 36636,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Sprays up to 2 players with a nasty chemical, inflicting 36,636 Nature damage every 2 sec for 10 sec.",
                image: "images/Chemical_Burn.jpg"
            }, {
                name: "Gatling_Gun",
                baseDamage: 33675,
                damage: 33675,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Spins in place and fires a hail of bullets, inflicting 33,675 Physical damage every 0.3 sec to all players in front of Mogul Razdunk.",
                image: "images/Gatling_Gun.jpg"
            }, {
                name: "Homing_Missile",
                baseDamage: 97695,
                damage: 97695,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "Fires a homing missile that chases a player. On impact, or after 10 sec, the missile explodes, inflicting 97,695 Fire damage immediately and 9,217 Fire damage every 2 sec for 6 sec to all players within 20 yards of the missile. The missile's speed increases as it travels.",
                image: "images/Homing_Missile.jpg"
            }, {
                name: "Micro_Missiles",
                baseDamage: 99568,
                damage: 99568,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "A B.O.O.M.B.A. drone launches a salvo of Micro Missiles, inflicting 99,568 Fire damage to players within 6 yards of each missile's impact.",
                image: "images/Micro_Missiles.jpg"
            }, {
                name: "Drill_Smash",
                baseDamage: 81412,
                damage: 81412,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Flies through the air and impacts a player's location, inflicting 162,825 Physical damage to targets within 8 yards, and 81,412 Physical damage to all targets beyond 8 yards.",
                image: "images/Drill_Smash.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Grease_Gun",
                baseDamage: 49463,
                damage: 49463,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Shoot the current threat target for 49,463 Physical damage.",
                image: "images/Grease_Gun.jpg"
            }, {
                name: "Clothesline",
                baseDamage: 48848,
                damage: 48848,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Charges a random player, inflicting 48,848 Physical damage and stunning them for 2 sec.",
                image: "images/Clothesline.jpg"
            }, {
                name: "Iced_Spritzer",
                baseDamage: 20353,
                damage: 20353,
                type: "frost",
                bleed: false,
                aoe: false,
                description: "Blasts an enemy with a jet of icy cold spritzer, inflicting 20,353 Frost damage every 1 sec and reducing movement speed by 15% for 6 sec. The final tick of Iced Spritzer will trigger Brain Freeze.",
                image: "images/Iced_Spritzer.jpg"
            }, {
                name: "Hail_of_Flechettes",
                baseDamage: 17990,
                damage: 17990,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Hurls flechettes at enemies within 45 yards, inflicting 17,990 Physical damage. If the caster has Toxic Blades, affected targets will also be poisoned by the Widomaker Toxin.",
                image: "images/Hail_of_Flechettes.jpg"
            }, {
                name: "Throw_Wrench",
                baseDamage: 92514,
                damage: 92514,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Throws a heavy wrench at a random enemy's head, inflicting 92,514 Physical damage. Ouch!",
                image: "images/Throw_Wrench.jpg"
            }, {
                name: "Charged_Claw",
                baseDamage: 34065,
                damage: 34065,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Strikes a player with a lightning bolt that inflicts 34,065 Nature damage. The lightning chains to up to 3 targets.",
                image: "images/Charged_Claw.jpg"
            }, {
                name: "Throw_Rock",
                baseDamage: 55508,
                damage: 55508,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Throws a rock at a player, inflicting 55,508 Physical damage.",
                image: "images/Throw_Rock.jpg"
            }, {
                name: "Rock_Lance",
                baseDamage: 61060,
                damage: 61060,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Blasts a player with a magical stone lance, inflicting 61,060 Nature damage instantly and 24,138 Nature damage every 2 sec for 6 sec.",
                image: "images/Rock_Lance.jpg"
            },
        ]
    }, {
        name: "The_Underrot",
        bossAbilities: [
            {
                name: "Blood_Bolt",
                baseDamage: 75430,
                damage: 75430,
                type: "shadow",
                bleed: false,
                aoe: false,
                description: "Elder Leaxa blasts a player, inflicting 75,430 Shadow damage.",
                image: "images/Blood_Bolt.jpg"
            }, {
                name: "Tantrum",
                baseDamage: 36414,
                damage: 36414,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Throws a tantrum upon reaching 100 energy, periodically inflicts 36,414 Physical damage to all enemies.",
                image: "images/Tantrum.jpg"
            }, {
                name: "Festering_Harvest",
                baseDamage: 60344,
                damage: 60344,
                type: "plague",
                bleed: false,
                aoe: true,
                description: "Upon reaching 100 energy, Zancha forces all remaining spore pods to burst. Inflicts 60,344 Plague damage to all players and applies Decaying Spores to all players for each active spore pod.",
                image: "images/Festering_Harvest.jpg"
            }, {
                name: "Rotting_Spore",
                baseDamage: 150860,
                damage: 150860,
                type: "shadow",
                bleed: false,
                aoe: false,
                description: "Pools of Vile Expulsion periodically coalesce into Rotting Spores that move towards players. Each spore inflicts 150,860 Shadow damage to any player it comes into contact with, instantly killing the spore.",
                image: "images/Rotting_Spore.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Blood_Burst",
                baseDamage: 16664,
                damage: 16664,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Explodes on death, inflicting 16,664 Shadow damage to all enemies.",
                image: "images/Blood_Burst.jpg"
            }, {
                name: "Blood_Harvest",
                baseDamage: 73272,
                damage: 73272,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Charges to a random enemy, inflicting 73,272 Physical damage.",
                image: "images/Blood_Harvest.jpg"
            }, {
                name: "Barbed_Spear",
                baseDamage: 45258,
                damage: 45258,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Inflicts 45,258 Physical damage to an enemy.",
                image: "images/Barbed_Spear.jpg"
            }, {
                name: "Hooked_Snare",
                baseDamage: 28494,
                damage: 28494,
                type: "nature",
                bleed: true,
                aoe: true,
                description: "Inflicts 28,494 Physical damage to an enemy every 2 sec for 4 sec. Immobilizes an enemy for up to 4 sec.",
                image: "images/Hooked_Snare.jpg"
            }, {
                name: "Wicked_Assault",
                baseDamage: 28211,
                damage: 28211,
                type: "shadow",
                bleed: false,
                aoe: false,
                description: "Inflicts 28,211 Shadow damage to an enemy every 1 sec for 10 sec.",
                image: "images/Wicked_Assault.jpg"
            }, {
                name: "Abyssal_Reach",
                baseDamage: 99568,
                damage: 995681,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Summons tendrils from the void that inflict 99,568 Shadow damage to all enemies in front of them.",
                image: "images/Abyssal_Reach.jpg"
            }
        ]
    }, {
        name: "Tol_Dagor",
        bossAbilities: [
            {
                name: "Upheaval",
                baseDamage: 90516,
                damage: 90516,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Disappears beneath the sand, exploding up underneath a player. This eruption inflicts 90,516 Nature damage and knocks all targets upwards.",
                image: "images/Upheaval.jpg"
            }, {
                name: "Sand_Trap",
                baseDamage: 74570,
                damage: 74570,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Calls forth sand traps beneath all players for 4 sec. Coming into contact with a sand trap inflicts 74,570 Nature damage, knocking the target into the air and stunning them for 4 sec.",
                image: "images/Sand_Trap.jpg"
            }, {
                name: "Deadeye",
                baseDamage: 66969,
                damage: 66969,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Aims at a player, firing a precise round after 4 sec and striking the first player in the line. This shot inflicts 66,969 Physical damage and increases damage taken from Deadeye by 500% for 1.3 min.",
                image: "images/Deadeye.jpg"
            }, {
                name: "Explosive_Burst",
                baseDamage: 69396,
                damage: 69396,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "Marks player for Explosive Burst. After 4 sec, shots ring out and inflict 69,396 Fire damage to all players within 5 yds.",
                image: "images/Explosive_Burst.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Salt_Blast",
                baseDamage: 65944,
                damage: 65944,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Inflicts 65,944 Nature damage to an enemy.",
                image: "images/Salt_Blast.jpg"
            }, {
                name: "Blaze",
                baseDamage: 71440,
                damage: 71440,
                type: "fire",
                bleed: false,
                aoe: false,
                description: "Inflicts 71,440 Fire damage to an enemy.",
                image: "images/Blaze.jpg"
            }
        ]
    }, {
        name: "Waycrest_Manor",
        bossAbilities: [
            {
                name: "Unstable_Runic_Mark",
                baseDamage: 53103,
                damage: 53103,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Marks all nearby enemies with cursed runes, inflicting 7,543 Shadow damage every 1 sec for 6 sec. Upon expiration, or if the mark is dispelled, the rune explodes, inflicting an additional 53,103 Shadow damage to all allies within 6 yards.",
                image: "images/Unstable_Runic_Mark.jpg"
            }, {
                name: "Dire_Ritual",
                baseDamage: 122801,
                damage: 122801,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Releases a bust of dark energy, inflicting 122,801 Shadow damage to all enemies.",
                image: "images/Dire_Ritual.jpg"
            }, {
                name: "Rotten_Expulsion",
                baseDamage: 58081,
                damage: 58081,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Raal the Gluttonous expels a wave of rancid food, inflicting 58,081 Nature damage at each impact. Each expulsion remains at the impact point, inflicting 29,879 Nature damage every 1 sec and reducing movement speed by 60%.",
                image: "images/Rotten_Expulsion.jpg"
            }, {
                name: "Virulent_Pathogen",
                baseDamage: 15090,
                damage: 15090,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Infects the target with a highly infectious plague, inflicting 7,517 Nature damage every 1 sec and reducing movement speed by 50% for 5 sec. Upon expiration or being dispelled, the target explodes, infecting nearby allies with Virulent Pathogen.",
                image: "images/Virulent_Pathogen.jpg"
            }, {
                name: "Wasting_Strike",
                baseDamage: 66379,
                damage: 66379,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Claws at the enemy with rotten claws, inflicting 66,379 Nature damage and additional 16,595 Nature damage every 1 sec for 5 sec.",
                image: "images/Wasting_Strike.jpg"
            }, {
                name: "Dread_Essence",
                baseDamage: 49784,
                damage: 49784,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "At 100 energy, the caster releases a torrent of dark energy, inflicting 49,784 Shadow damage to all enemies. Additionally, all Deathtouched Slavers are resurrected, brought back to their maximum health, and any crowd control effects on them are dispelled.",
                image: "images/Dread_Essence.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Shadow_Cleave",
                baseDamage: 36508,
                damage: 36508,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Strikes in a wide arc with a rune-inscribed weapon, inflicting 36,508 Shadow damage to all enemies in a cone in front of the caster.",
                image: "images/Shadow_Cleave.jpg"
            }, {
                name: "Infected_Thorn",
                baseDamage: 28211,
                damage: 28211,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Hurls a plagued thorn at the enemy, inflicting 28,211 Nature damage and an additional 8,297 Nature damage every 1 sec for 8 sec.",
                image: "images/Infected_Thorn.jpg"
            }, {
                name: "Spit",
                baseDamage: 14935,
                damage: 14935,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Spits a caustic fluid at an enemy, inflicting 14,935 Nature damage and additional 3,701 Nature damage every 1 sec for 10 sec.",
                image: "images/Spit.jpg"
            }, {
                name: "Ravaging_Leap",
                baseDamage: 19914,
                damage: 19914,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Leaps to the furthest target and attacks all nearby enemies within 5 yards, inflicting 19,914 Physical damage and additional Physical damage every 1 sec for 5 sec.",
                image: "images/Ravaging_Leap.jpg"
            }, {
                name: "Retch",
                baseDamage: 33305,
                damage: 33305,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "The caster retches forth acidic bile, inflicting 33,305 Nature damage to all enemies in a cone in front of the caster.",
                image: "images/Retch.jpg"
            }, {
                name: "Soul_Bolt",
                baseDamage: 44806,
                damage: 44806,
                type: "shadow",
                bleed: false,
                aoe: false,
                description: "Fires a bolt of crippling energy, inflicting 44,806 Shadow damage to the target.",
                image: "images/Soul_Bolt.jpg"
            }, {
                name: "Soul_Volley",
                baseDamage: 24892,
                damage: 24892,
                type: "shadow",
                bleed: false,
                aoe: true,
                description: "Expels twisted souls at each enemy, inflicting 24,892 Shadow damage.",
                image: "images/Soul_Volley.jpg"
            }, {
                name: "Dark_Leap",
                baseDamage: 19914,
                damage: 19914,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Leaps to the furthest target and attacks all nearby enemies within 5 yards, inflicting 19,914 Physical damage and additional Physical damage every 1 sec for 5 sec.",
                image: "images/Dark_Leap.jpg"
            }
        ]
    }, {
        name: "Mechagon_Junkyard",
        bossAbilities: [
            {
                name: "Toxic_Fumes",
                baseDamage: 16133,
                damage: 16133,
                type: "plague",
                bleed: false,
                aoe: false,
                description: "Gunker emits Toxic Fumes throughout the encounter, inflicting 16,133 Plague damage to all players every 3 sec.",
                image: "images/Toxic_Fumes.jpg"
            }, {
                name: "Taze",
                baseDamage: 35851,
                damage: 35851,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Inflicts 35,851 Nature damage instantly, and 23,303 Nature damage every 2 sec for 20 sec.",
                image: "images/Taze.jpg"
            }, {
                name: "Turbo_Boost",
                baseDamage: 46606,
                damage: 46606,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "When defeated, Trixie uses Turbo Boost on Naeno causing his successful melee attacks to inflict 46607 Nature damage to all players for the remainder of the encounter.",
                image: "images/Turbo_Boost.jpg"
            }, {
                name: "Charged_Smash",
                baseDamage: 286810,
                damage: 286810,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Upon reaching 100 energy, Gobbamak smashes his primary target inflicting 179,256 Physical damage. Additionally, Charged Smash inflicts 286,810 Nature damage split evenly among all players within 8 yards of the primary target and knocks them back.",
                image: "images/Charged_Smash.jpg"
            }, {
                name: "Rumble",
                baseDamage: 16133,
                damage: 16133,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Gobbamak bounces up and down, inflicting 16,133 Physical damage to all players every 1 sec and causing Cave In.",
                image: "images/Rumble.jpg"
            }, {
                name: "Fulminating_Zap",
                baseDamage: 35851,
                damage: 35851,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Inflicts 35,851 Nature damage and an additional 43,021 Nature damage every 3 sec for 9 sec.",
                image: "images/Fulminating_Zap.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "B.O.R.K.",
                baseDamage: 53777,
                damage: 53777,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Fires a sonic wave in front of the caster. Enemies struck suffer 53,777 Nature damage and have their Haste and movement speed reduced by 50% for 10 sec.",
                image: "images/bork.jpg"
            }, {
                name: "Shock_Coil",
                baseDamage: 17926,
                damage: 17926,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Inflicts 17,926 Nature damage to all enemies every 1 sec.",
                image: "images/Shock_Coil.jpg"
            }, {
                name: "Scrap_Cannon",
                baseDamage: 60947,
                damage: 60947,
                type: "fire",
                bleed: false,
                aoe: false,
                description: "Inflicts 60,947 Fire damage to enemies within 45 yards of the impact.",
                image: "images/Scrap_Cannon.jpg"
            }, {
                name: "Pounce",
                baseDamage: 35851,
                damage: 35851,
                type: "physical",
                bleed: false,
                aoe: false,
                description: "Leaps at an enemy, inflicting 35,851 Physical damage and causing 28,681 Physical damage every 2 sec for 8 sec.",
                image: "images/Pounce.jpg"
            }, {
                name: "Slimebolt",
                baseDamage: 46607,
                damage: 46607,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Inflicts 46,607 Plague damage to a target and reduces their movement speed by 50% for 8 sec.",
                image: "images/Slimebolt.jpg"
            }, {
                name: "Consuming_Slime",
                baseDamage: 53777,
                damage: 53777,
                type: "plague",
                bleed: false,
                aoe: false,
                description: "53,777 Plague damage inflicted every 3 sec. Absorbs up to 146,093 of all healing received.",
                image: "images/Consuming_Slime.jpg"
            }
        ]
    }, {
        name: "Mechagon_Workshop",
        bossAbilities: [
            {
                name: "Whirling_Edge",
                baseDamage: 143405,
                damage: 143405,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Inflicts 143405 Physical damage to enemies within 8 yards of the bot.",
                image: "images/Whirling_Edge.jpg"
            }, {
                name: "Vent_Jets",
                baseDamage: 21511,
                damage: 21511,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "Vents around the bot unleash gouts of flame, slowing the bot's movement speed by 60% and inflicting 107,554 Fire damage to enemies within 9 yards of the bot's front, and 21,511 Fire damage to all enemies every 1 sec for 8 sec.",
                image: "images/Vent_Jets.jpg"
            }, {
                name: "Explosive_Leap",
                baseDamage: 46606,
                damage: 46606,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "The caster leaps towards random players, heating Junk Cubes and inflicting 78,873 Fire damage to all enemies within 8 yards of the impact.",
                image: "images/Explosive_Leap.jpg"
            }, {
                name: "Venting_Flames",
                baseDamage: 107554,
                damage: 107554,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "The caster vents massive jets of flame from their core, inflicting 107,554 Fire damage to all players outside of cover every 1 sec for 5 sec.",
                image: "images/Venting_Flames.jpg"
            }, {
                name: "Self-Trimming_Hedge",
                baseDamage: 71758,
                damage: 71758,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Launches a blade that bounces around the garden, inflicting 71,758 Physical damage.",
                image: "images/Hedge.jpg"
            }, {
                name: "Blossom_Blast",
                baseDamage: 9859,
                damage: 9859,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Unleashes bolts of lightning at a target, inflicting 9,859 Nature damage every 0.5 sec for 6 sec.",
                image: "images/Blossom_Blast.jpg"
            }, {
                name: "Giga-Zap",
                baseDamage: 89628,
                damage: 89628,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Unleashes a bolt of energy towards a player, inflicting 89628 Nature damage and an additional 17,939 Nature damage every 2 sec for 12 sec to all players in a line from the caster.  In addition, the target takes 100% increased damage from Giga-Zap for 12 sec.",
                image: "images/Zap.jpg"
            }, {
                name: "Plasma_Orb",
                baseDamage: 53585,
                damage: 53585,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Touching an orb inflicts 53,585 Nature damage, and knocks the player back.",
                image: "images/Zap.jpg"
            }, {
                name: "Recalibrate",
                baseDamage: 107554,
                damage: 107554,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Adjusts the location of all Plasma Orbs.  Upon arriving at their new location each orb unleashes a blast of energy, inflicting 107,554 Nature damage to all players within 6 yards.",
                image: "images/Recalibrate.jpg"
            }, {
                name: "Giga-Zap",
                baseDamage: 71702,
                damage: 71702,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Unleashes 3 bolts of energy towards a random players. Each bolt inflicts 71,702 Nature damage and an additional 17,926 Nature damage every 2 sec for 12 sec.  In addition, the target takes 100% increased damage from Giga-Zap for 12 sec.",
                image: "images/Zap.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Detonate",
                baseDamage: 64532,
                damage: 64532,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "Inflicts 64,532 Fire damage to enemies within 200 yards.",
                image: "images/Detonate.jpg"
            }, {
                name: "Process_Waste",
                baseDamage: 107554,
                damage: 107554,
                type: "physical",
                bleed: false,
                aoe: true,
                description: "Inflicts 107,554 Physical damage every 1 sec for 5 sec.",
                image: "images/Process_Waste.jpg"
            }, {
                name: "Mega_Drill",
                baseDamage: 143405,
                damage: 143405,
                type: "fire",
                bleed: false,
                aoe: true,
                description: "Inflicts 143,405 Physical damage to enemies within 10 yards.",
                image: "images/Mega_Drill.jpg"
            }, {
                name: "Volatile_Waste",
                baseDamage: 35851,
                damage: 35851,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "After dying, the caster inflicts 35,851 Nature damage to all enemies within 100 yards.",
                image: "images/Volatile_Waste.jpg"
            }, {
                name: "Giga-Wallop",
                baseDamage: 43022,
                damage: 43022,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Unleashes an arc of electricity at a player, inflicting 43,022 Nature damage and then jumping to additional nearby enemies within 3 yards.",
                image: "images/Wallop.jpg"
            }, {
                name: "Activate Anti-Personnel Squirrel",
                baseDamage: 179256,
                damage: 179256,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Creates a mechanical squirrel that chases towards a random player, inflicting 179,256 Nature damage to all enemies within 10 yards of the detonation.",
                image: "images/Squirrel.jpg"
            }, {
                name: "Arcing_Zap",
                baseDamage: 21151,
                damage: 21151,
                type: "nature",
                bleed: false,
                aoe: false,
                description: "Inflicts 21511 Nature damage and an additional 21,151 Nature damage every 2 sec for 20 sec.",
                image: "images/Arcing_Zap.jpg"
            }, {
                name: "Short_Out",
                baseDamage: 14340,
                damage: 14340,
                type: "nature",
                bleed: false,
                aoe: true,
                description: "Inflicts 14,340 Nature damage to all players every 0.5 sec for 3 sec.",
                image: "images/Short_Out.jpg"
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
        magicDR: .35,
        physicalDR: .35,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Increases your chance to dodge by 50% and reduces all damage taken by 35% for 10 sec.",
        image: "images/Blur.jpg"
    }, {
        class: "Demon Hunter",
        specs: ["Havoc"],
        name: "Desperate_Instincts",
        magicDR: .5,
        physicalDR: .5,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Blur now reduces damage taken by an additional 15%. Additionally, you automatically trigger Blur when you fall below 35% health. This effect can only occur when Blur is not on cooldown.",
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
        armorPercentIncrease: 1,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .3,
        versIncrease: 0,
        selected: false,
        description: "Transform to demon form for 15 sec, increasing current and maximum health by 30% and Armor by 100%.",
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
        specs: ["Guardian"],
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
    },{
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
        specs: ["Retribution"],
        name: "Retribution",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "When any party or raid member within 40 yds dies, you gain 20% increased damage done and 30% reduced damage taken for 10 sec.",
        image: "images/Retribution.jpg"
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
        specs: ["Shadow"],
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
        specs: ["Protection"],
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
        specs: ["Mistweaver"],
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
        description: "Turns your skin to stone, increasing your current and maximum health by 20%, and reducing damage taken by 20% for 15 sec.",
        image: "images/Fortifying_Brew.jpg"
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
        name: "Miniaturized_Plasma_Shield",
        amount: 0,
        selected: false,
        description: "Permanently attaches a specialized device to your belt, which when used creates an absorb shield around the player for 10 sec.",
        image: "images/Miniaturized_Plasma_Shield.jpg"
    }, {
        class: "all",
        specs: "all",
        name: "Resounding_Protection",
        amount: 0,
        selected: false,
        description: "Every 30 sec, gain an absorb shield for 30 sec.",
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
        class: "all",
        specs: "all",
        name: "Luminous_Barrier",
        amount: 0,
        selected: false,
        description: "Create a shield on all allies within 40 yards, absorbing damage on each of them for 10 sec.",
        image: "images/Luminous_Barrier.jpg"
    }, {
        class: "all",
        specs: "all",
        name: "otherAbsorb",
        amount: 0,
        selected: false,
        description: "Other Absorbs.",
        image: "images/Resounding_Protection.jpg"
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
        name: "Conflict_and_Strife",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 560,
        selected: false,
        description: "Your spells and abilities have a chance to increase your Versatility by 70 for 14 sec, stacking up to 8 times. Being the vicitim of a loss of control or movement impairing effect also grants a stack of Strife.",
        image: "images/conflict.jpg"
    },
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
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Devotion Aura: all affected allies gain 20% damage reduction.",
        image: "images/Aura_Mastery.jpg"
    }, {
        name: "Aura_of_Sacrifice",
        magicDR: .1,
        physicalDR: .1,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "While you are above 75% health, 10% of all damage taken by allies within 10 yds is redirected to you and reduced by half.",
        image: "images/Aura_of_Sacrifice.jpg"
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
        name: "Safeguard",
        magicDR: 0.3,
        physicalDR: 0.3,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Intercepting a friendly target now also causes 30% of their damage taken to transfer to you for 6 sec.",
        image: "images/Safeguard.jpg"
    }, {
        name: "Superior_Steelskin_Potion",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 1215,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Use: Infuses your body with resilient energy, increasing your Armor by 1215 for 25 sec. (1 Min Cooldown)",
        image: "images/Superior_Steelskin_Potion.jpg"
    }, {
        name: "Bil_Tong",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: 0,
        versIncrease: 93,
        selected: false,
        description: "Use: Restores 219459 health and 109730 mana over 20 sec.  Must remain seated while eating.  If you spend at least 10 seconds eating you will become well fed and gain 93 Versatility for 1 hour.",
        image: "images/Biltong.jpg"
    }, {
        name: "Superior_Battle_Potion_of_Stamina",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 29700,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Use: Increases your Stamina by 1485 for 25 sec. (1 Min Cooldown)",
        image: "images/Superior_Battle_Potion_of_Stamina.jpg"
    }, {
        name: "Greater_Flask_of_the_Vast_Horizon",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 10800,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Use: Increases Stamina by 540 for 1 hour. Counts as both a Battle and Guardian elixir.  This effect persists through death. (3 Sec Cooldown)",
        image: "images/Greater_Flask_of_the_Vast_Horizon.jpg"
    }, {
        name: "Fragrant_Kakavia",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 3996,
        healthPercentIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Use: Restores 219459 health and 109730 mana over 20 sec.  Must remain seated while eating.  If you spend at least 10 seconds eating you will become well fed and gain 198 Stamina for 1 hour.",
        image: "images/Fragrant_Kakavia.jpg"
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
        healthPercentIncrease: .1,
        versIncrease: 0,
        selected: false,
        description: "Infuses the target with vitality, increasing their Stamina by 10% for 60 min.",
        image: "images/Power_Word_Fortitude.jpg"
    }, {
        name: "War_Scroll_of_Fortitude",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .07,
        versIncrease: 0,
        selected: false,
        description: "Use: Increases the target's Stamina by 7% for 30 min.",
        image: "images/War_Scroll_of_Fortitude.jpg"
    }, {
        name: "Infusion:_Fortitude",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        healthPercentIncrease: .1,
        versIncrease: 0,
        selected: false,
        description: "Infuses the target with vitality, increasing their Stamina by 10% for until cancelled.",
        image: "images/Infusion_Fortitude.jpg"
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

// dungeons.forEach(dungeon => {
//     if (dungeon.name !== "Operation_Mechagon") {
//         dungeon.bossAbilities.forEach(bossAbility => {
//             if (bossAbility.name !== "Upheaval" && bossAbility.name !== "Explosive_Burst" && bossAbility.name !== "Pistol_Shot" && bossAbility.name !== "Azerite_Powder_Shot" && bossAbility.name !== "Severing_Axe" && bossAbility.name !== "Powder_Shot") {
//                 bossAbility.damage = bossAbility.damage * 1.3;
//                 bossAbility.baseDamage = bossAbility.baseDamage * 1.3;
//             }
//         });
//         dungeon.trashAbilities.forEach(trashAbility => {
//             trashAbility.damage = trashAbility.damage * 1.3;
//             trashAbility.baseDamage = trashAbility.baseDamage * 1.3;
//             if (trashAbility.name === "Bladestorm") {
//                 trashAbility.damage = trashAbility.damage - (trashAbility.damage * .15);
//             }
//             if (trashAbility.name === "Frost_Shock") {
//                 trashAbility.damage = trashAbility.damage - (trashAbility.damage * .19);
//             }
//             if (trashAbility.name === "Deathly_Chill") {
//                 trashAbility.damage = trashAbility.damage - (trashAbility.damage * .15);
//             }
//         });
//     }
// });

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
        <img class="classImage" data-class="Mage" src="images/jay.png" alt="Mage">
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
        <div class="imgContainer col-md-6" data-dungeon="Atal'Dazar">
            <img class="dungeonImage" data-dungeon="Atal'Dazar" src="images/Atal'Dazar.jpeg" alt="Atal'Dazar">
            <div class="overlay">
                <div class="text">Atal'Dazar</div>
            </div>
            <div class="hide imgText">
                <div class="text">Atal'Dazar</div>
            </div>
        </div>
        <div class="imgContainer col-md-6" data-dungeon="Freehold">
            <img class="dungeonImage" data-dungeon="Freehold" src="images/Freehold.jpeg" alt="Freehold">
            <div class="overlay">
                <div class="text">Freehold</div>
            </div>
            <div class="hide imgText">
                <div class="text">Freehold</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="imgContainer col-md-6" data-dungeon="Kings'_Rest">
            <img class="dungeonImage" data-dungeon="Kings' Rest" src="images/Kings' Rest.jpeg" alt="Kings' Rest">
            <div class="overlay">
                <div class="text">Kings' Rest</div>
            </div>
            <div class="hide imgText">
                <div class="text">Kings' Rest</div>
            </div>
        </div>
        <div class="imgContainer col-md-6" data-dungeon="Shrine_of_the_Storm">
            <img class="dungeonImage" data-dungeon="Shrine_of_the_Storm" src="images/Shrine of the Storm.jpeg" alt="Shrine of the Storm">
            <div class="overlay">
                <div class="text">Shrine of the Storm</div>
            </div>
            <div class="hide imgText">
                <div class="text">Shrine of the Storm</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="imgContainer col-md-6" data-dungeon="Siege_of_Boralus">
            <img class="dungeonImage" data-dungeon="Siege_of_Boralus" src="images/Siege of Boralus.jpeg" alt="Siege of Boralus">
            <div class="overlay">
                <div class="text">Siege of Boralus</div>
            </div>
            <div class="hide imgText">
                <div class="text">Siege of Boralus</div>
            </div>
        </div>
        <div class="imgContainer col-md-6" data-dungeon="Temple_of_Sethraliss">
            <img class="dungeonImage" data-dungeon="Temple_of_Sethraliss" src="images/Temple of Sethraliss.jpeg" alt="Temple of Sethraliss">
            <div class="overlay">
                <div class="text">Temple of Sethraliss</div>
            </div>
            <div class="hide imgText">
                <div class="text">Temple of Sethraliss</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="imgContainer col-md-6" data-dungeon="The_Motherlode">
            <img class="dungeonImage" data-dungeon="The_Motherlode" src="images/The Motherlode.jpeg" alt="The Motherlode">
            <div class="overlay">
                <div class="text">The Motherlode</div>
            </div>
            <div class="hide imgText">
                <div class="text">The Motherlode</div>
            </div>
        </div>
        <div class="imgContainer col-md-6" data-dungeon="The_Underrot">
            <img class="dungeonImage" data-dungeon="The_Underrot" src="images/The Underrot.jpeg" alt="The Underrot">
            <div class="overlay">
                <div class="text">The Underrot</div>
            </div>
            <div class="hide imgText">
                <div class="text">The Underrot</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="imgContainer col-md-6" data-dungeon="Tol_Dagor">
            <img class="dungeonImage" data-dungeon="Tol_Dagor" src="images/Tol Dagor.jpeg" alt="Tol Dagor">
                <div class="overlay">
                    <div class="text">Tol Dagor</div>
                </div>
                <div class="hide imgText">
                    <div class="text">Tol Dagor</div>
                </div>
        </div>
        <div class="imgContainer col-md-6" data-dungeon="Waycrest_Manor">
            <img class="dungeonImage" data-dungeon="Waycrest_Manor" src="images/Waycrest Manor.jpeg" alt="Waycrest Manor">
            <div class="overlay">
                <div class="text">Waycrest Manor</div>
            </div>
            <div class="hide imgText">
                <div class="text">Waycrest Manor</div>
            </div>
        </div>
    </div>
    <div class="row">
    <div class="imgContainer col-md-6" data-dungeon="Mechagon_Junkyard">
        <img class="dungeonImage" data-dungeon="Mechagon_Junkyard" src="images/Mechagon_Junkyard.png" alt="Mechagon Junkyard">
        <div class="overlay">
            <div class="text">Mechagon Junkyard</div>
        </div>
        <div class="hide imgText">
            <div class="text">Mechagon Junkyard</div>
        </div>
    </div>
    <div class="imgContainer col-md-6" data-dungeon="Mechagon_Workshop">
        <img class="dungeonImage" data-dungeon="Mechagon_Workshop" src="images/Mechagon_Workshop.png" alt="Mechagon Workshop">
        <div class="overlay">
            <div class="text">Mechagon Workshop</div>
        </div>
        <div class="hide imgText">
            <div class="text">Mechagon Workshop</div>
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
                    <img data-toggle="tooltip" data-placement="top" data-html="true" title="<h6>${absorbs[5].name.replace("_", " ").replace("_", " ").replace("_", " ")}</h6>${absorbs[5].description}"class="absorbImage" data-name=${absorbs[5].name} src=${absorbs[5].image} alt=${absorbs[5].name}>
                </div>
                <div class="col-md-5">
                    <div class="input-group mb-3 absorbInput" style="margin-top: 9px">
                        <input type="text" class="form-control" data-name=${absorbs[5].name} placeholder="Amount" aria-label="Shield Amount" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary shieldOkay" data-name=${absorbs[5].name} type="button">OK</button>
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
    if (externalName === "War_Scroll_of_Fortitude") {
        externals.forEach(external => {
            if (external.name === "Power_Word:_Fortitude" && external.selected) {
                external.selected = false;
                $(`img[data-name="Power_Word:_Fortitude"]`).removeClass("selected");
            }
        });
    }
    if (externalName === "Power_Word:_Fortitude") {
        externals.forEach(external => {
            if (external.name === "War_Scroll_of_Fortitude" && external.selected) {
                external.selected = false;
                $(`img[data-name=War_Scroll_of_Fortitude]`).removeClass("selected");
            }
        });
    }
    if (externalName === "Bil_Tong") {
        externals.forEach(external => {
            if (external.name === "Fragrant_Kakavia" && external.selected) {
                external.selected = false;
                $(`img[data-name=Fragrant_Kakavia]`).removeClass("selected");
            }
        });
    }
    if (externalName === "Fragrant_Kakavia") {
        externals.forEach(external => {
            if (external.name === "Bil_Tong" && external.selected) {
                external.selected = false;
                $(`img[data-name=Bil_Tong]`).removeClass("selected");
            }
        });
    }
    if (externalName === "Superior_Steelskin_Potion") {
        externals.forEach(external => {
            if (external.name === "Superior_Battle_Potion_of_Stamina" && external.selected) {
                external.selected = false;
                $(`img[data-name=Superior_Battle_Potion_of_Stamina]`).removeClass("selected");
            }
        });
    }
    if (externalName === "Superior_Battle_Potion_of_Stamina") {
        externals.forEach(external => {
            if (external.name === "Superior_Steelskin_Potion" && external.selected) {
                external.selected = false;
                $(`img[data-name=Superior_Steelskin_Potion]`).removeClass("selected");
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
    if (externalName !== "Infusion:_Fortitude") {
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
    }
});