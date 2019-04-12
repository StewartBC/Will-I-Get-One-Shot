var playerClass = "";
var playerSpec = "";
var dungeon = "";
var feint = false;
var fortified = false;
var tyrannical = false;
var playerMainStat = 0;
var playerArmor = 0;
var avoidance = 0;
var playerVers = 0;
var playerMastery = 0;
var playerStamina = 0;
var playerHealth = 0;
var playerAbsorb = 0;
var selectedDungeon = "";
var level = 2;
var scaling = [1, 1.08, 1.17, 1.26, 1.36, 1.47, 1.59, 1.71, 1.85, 2, 2.16, 2.33, 2.52, 2.72, 2.94, 3.17, 3.43, 3.70, 4, 4.32, 4.66, 5.04, 5.44, 5.87];
var slider = document.getElementById("myRange");
var output = document.getElementById("keyLevel");
slider.oninput = function () {
    level = this.value;
    output.innerHTML = "Key Level: " + this.value;
    for (i = 0; i < dungeons.length; i++) {
        for (k = 0; k < dungeons[i].bossAbilities.length; k++) {
            dungeons[i].bossAbilities[k].damage = Math.round(dungeons[i].bossAbilities[k].baseDamage * scaling[level - 2]);
        }
    }
    calcDamage();
}
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
                            <img class="abilityImage" src="${dungeons[i].bossAbilities[k].image}" alt="${dungeons[i].bossAbilities[k].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].bossAbilities[k].damage}</p>
                        </div>
                    </div>
                    `);
                    } else {
                        $("#dungeonInput").append(`
                    <div class="row">
                        <div class="col-md-2">
                            <img class="abilityImage" src="${dungeons[i].bossAbilities[k].image}" alt="${dungeons[i].bossAbilities[k].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].bossAbilities[k].damage}</p>
                        </div>
                        <div class="col-md-2">
                        </div>
                        <div class="col-md-2">
                            <img class="abilityImage" src="${dungeons[i].bossAbilities[k + 1].image}" alt="${dungeons[i].bossAbilities[k + 1].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].bossAbilities[k + 1].damage}</p>
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
                            <img class="abilityImage" src="${dungeons[i].trashAbilities[k].image}" alt="${dungeons[i].trashAbilities[k].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].trashAbilities[k].damage}</p>
                        </div>
                    </div>
                    `);
                    } else {
                        $("#dungeonInput").append(`
                    <div class="row">
                        <div class="col-md-2">
                            <img class="abilityImage" src="${dungeons[i].trashAbilities[k].image}" alt="${dungeons[i].trashAbilities[k].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].trashAbilities[k].damage}</p>
                        </div>
                        <div class="col-md-2">
                        </div>
                        <div class="col-md-2">
                            <img class="abilityImage" src="${dungeons[i].trashAbilities[k + 1].image}" alt="${dungeons[i].trashAbilities[k + 1].name}">
                        </div>
                        <div class="col-md-1">
                            <p class="abilityDamage">${dungeons[i].trashAbilities[k + 1].damage}</p>
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
    }
}
function calcDamage() {
    var health = playerStamina * 20;
    var vers = 0;
    var magic = [];
    var physical = [];
    var armorPercent = [];
    var armor = playerArmor;
    var absorbAmount = 0;
    var absorbsArray = [];
    for (i = 0; i < personals.length; i++) {
        if (personals[i].selected) {
            if (personals[i].magicDR > 0) {
                magic.push(personals[i].magicDR);
            }
            if (personals[i].physicalDR > 0) {
                physical.push(personals[i].physicalDR);
            }
            armor = armor + personals[i].armorIncrease;
            if (personals[i].armorPercentIncrease > 0) {
                armorPercent.push(personals[i].armorPercentIncrease);
            }
            if (personals[i].absorb > 0) {
                absorbsArray.push(personals[i].absorb);
            }
            health = health + personals[i].healthIncrease;
            vers = vers + personals[i].versIncrease;
            if (personals[i].name === "Endurance_Training") {
                health = health * 1.05;
            }
            if (personals[i].name === "Metamorphosis") {
                health = health * 1.3;
            }
            if (personals[i].name === "Desperate_Prayer") {
                health = health * 1.25;
            }
            if (personals[i].name === "Indomitable") {
                health = health * 1.1;
            }
            if (personals[i].name === "Last_Stand") {
                health = health * 1.3;
            }
            if (personals[i].name === "Fortifying_Brew") {
                health = health * 1.2;
            }
        }
    }
    for (i = 0; i < externals.length; i++) {
        if (externals[i].selected) {
            if (externals[i].magicDR > 0) {
                magic.push(externals[i].magicDR);
            }
            if (externals[i].physicalDR > 0) {
                physical.push(externals[i].physicalDR);
            }
            armor = armor + externals[i].armorIncrease;
            if (externals[i].armorPercentIncrease > 0) {
                armorPercent.push(externals[i].armorPercentIncrease);
            }
            if (externals[i].absorb > 0) {
                absorbsArray.push(externals[i].absorb);
            }
            health = health + externals[i].healthIncrease;
            vers = vers + externals[i].versIncrease;
            if (externals[i].name === "Power_Word:_Fortitude") {
                health = health * 1.1;
            }
            if (externals[i].name === "War_Scroll_of_Fortitude") {
                health = health * 1.07;
            }
            if (externals[i].name === "Rallying_Cry") {
                health = health * 1.15;
            }
            if (externals[i].name === "Rallying_Cry") {
                health = health * 1.15;
            }
            if (externals[i].name === "Ancestral_Protection_Totem") {
                health = health * 1.1;
            }
        }
    }
    for (i = 0; i < absorbs.length; i++) {
        if (absorbs[i].selected) {
            absorbAmount = absorbAmount + absorbs[i].amount;
        }
    }
    for (i = 0; i < versTrinkets.length; i++) {
        if (versTrinkets[i].selected) {
            vers = vers + versTrinkets[i].amount;
        }
    }
    for (i = 0; i < absorbsArray.length; i++) {
        absorbAmount = absorbAmount + absorbsArray[i] * health;
    }
    for (i = 0; i < armorPercent.length; i++) {
        armor = armor * armorPercent[i];
    }
    for (i = 0; i < dungeons.length; i++) {
        for (k = 0; k < dungeons[i].bossAbilities.length; k++) {
            var damage = dungeons[i].bossAbilities[k].baseDamage;
            damage = damage * scaling[level - 2];
            if (tyrannical) {
                damage = damage * 1.15;
            }
            damage = damage - (damage * 0.01 * (vers * (.5 / 85)));
            if (dungeons[i].bossAbilities[k].type === "physical") {
                for (m = 0; m < physical.length; m++) {
                    damage = damage - damage * physical[m];
                }
                damage = damage - (damage * 0.01 * ((armor / (armor + 8467)) * 100));
            } else {
                for (m = 0; m < magic.length; m++) {
                    damage = damage - damage * magic[m];
                }
            }
            if (dungeons[i].bossAbilities[k].aoe) {
                damage = damage - (damage * 0.01 * (avoidance * (1 / 28)));
            }
            dungeons[i].bossAbilities[k].damage = Math.round(damage);
        }
    }
    $(".totalHealth").html(`Total Health: ${Math.round(health)}`);
    $(".totalAbsorb").html(`Total Absorb: ${Math.round(absorbAmount)}`);
    $(".effectiveHealth").html(`Effective Health: ${Math.round(health + absorbAmount)}`);
    displayDungeons();
}
var dungeons = [
    {
        name: "Atal'Dazar",
        bossAbilities: [
            {
                name: "Devour",
                baseDamage: 30059,
                damage: 30059,
                type: "physical",
                aoe: false,
                description: "Rezan tries to eat the victim whole, inflicting 30,059 Physical damage every 1 sec. for 8 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_fossilizedraptor.jpg"
            }, {
                name: "Toxic_Leap",
                baseDamage: 43210,
                damage: 43210,
                type: "nature",
                aoe: true,
                description: "Vol'kaal leaps towards a random player inflicting 43,210 Nature to players within 8 yards of the impact, knocking them back.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_quickrecovery.jpg"
            }, {
                name: "Toxic_Pool",
                baseDamage: 30146,
                damage: 30146,
                type: "nature",
                aoe: true,
                description: "Creates a pool of noxious fumes at random locations, that inflict 30,146 Nature damage every 2 sec to players standing within the pool.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_deathcoil.jpg"
            }, {
                name: "Echoes_of_Shadra",
                baseDamage: 60123,
                damage: 60123,
                type: "shadow",
                aoe: true,
                description: "Summons forth several shadowy spider images. Touching an Echo of Shadra causes it to burst inflicting 60,123 Shadow damage to players within 3 yards, creating a pool of Shadowy Remains at the location.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_monsterspidercarapace_01.jpg"
            }, {
                name: "Shadowy_Remains",
                baseDamage: 38804,
                damage: 38804,
                type: "shadow",
                aoe: true,
                description: "Inflicts 38,804 Shadow damage every 2 sec and reduces the target's movement speed by 30% while within the effect.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_gathershadows.jpg"
            }, {
                name: "Soulrend",
                baseDamage: 27444,
                damage: 27444,
                type: "shadow",
                aoe: false,
                description: "Upon reaching 100 Energy, Yazma inflicts 27,444 Shadow damage to all players. The impact rips a piece of the target's soul free, creating a Soulspawn at the target's location.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_soulcleave2.jpg"
            }, {
                name: "Soulfeast",
                baseDamage: 6447,
                damage: 6447,
                type: "shadow",
                aoe: true,
                description: "Yazma unleashes a wave of shadowy energy that hits all players, inflicting 6,447 Shadow damage every 1.5 sec for 21 sec. This effect stacks.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_priest_shadow-mend.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Merciless_Assault",
                baseDamage: 38130,
                damage: 38130,
                type: "physical",
                aoe: true,
                description: "Charges to an area, inflicting 38,130 Physical damage to all enemies within 8 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_butcher_whirl.jpg"
            }, {
                name: "Wildfire",
                baseDamage: 17770,
                damage: 17770,
                type: "fire",
                aoe: false,
                description: "Launches a bolt of fire at a random target inflicting 17,770 Fire damage and an additional 7,295 Fire damage every 2 sec for 8 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_fire_flamebolt.jpg"
            }, {
                name: "Fervent_Strike",
                baseDamage: 61009,
                damage: 61009,
                type: "physical",
                aoe: false,
                description: "The caster slashes out, inflicting 61,009 Physical damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_1h_zandalari_c_02red.jpg"
            }, {
                name: "Leaping_Thrash",
                baseDamage: 7245,
                damage: 7245,
                type: "physical",
                aoe: true,
                description: "Leap to the target area, inflicting 7,245 Physical damage to all enemies and causing them to bleed.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_druid_bloodythrash.jpg"
            }, {
                name: "Venom_Blast",
                baseDamage: 26691,
                damage: 26691,
                type: "nature",
                aoe: false,
                description: "Toxic vapors assault the target inflicting 26,691 Nature damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_poisoncleansingtotem.jpg"
            }, {
                name: "Rending_Maul",
                baseDamage: 45756,
                damage: 45756,
                type: "physical",
                aoe: false,
                description: "Inflicts 45,756 Physical damage and additional 4,023 Physical damage every 2 sec for 20 sec. This effect stacks.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_druid_ravage.jpg"
            }, {
                name: "Quickshot",
                baseDamage: 39358,
                damage: 39358,
                type: "physical",
                aoe: false,
                description: "Shoots at an enemy, inflicting 39,358 Physical damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_ammo_arrow_01.jpg"
            }, {
                name: "Frenzied_Charge",
                baseDamage: 21278,
                damage: 21278,
                type: "physical",
                aoe: true,
                description: "Charges towards a random enemy, inflicting 21,278 Physical damage to all players caught in the path. Victims are stunned for 2 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_triceratopsmount.jpg"
            }, {
                name: "Wild_Thrash",
                baseDamage: 8007,
                damage: 8007,
                type: "physical",
                aoe: true,
                description: "Monzumi thrashes wildly inflicting 8,007 Physical damage to all enemies within 8 yards every 0.8 sec for 1.5 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_druid_bloodythrash.jpg"
            }
        ]
    }, {
        name: "Freehold",
        bossAbilities: [
            {
                name: "Charrrrrge",
                baseDamage: 48387,
                damage: 48387,
                type: "nature",
                aoe: true,
                description: "Charrrrrges towards a random enemy, inflicting 48,388 Nature damage and knocking back all players within 8 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_parrotmount_green.jpg"
            }, {
                name: "Pistol_Shot",
                baseDamage: 28556,
                damage: 28556,
                type: "fire",
                aoe: false,
                description: "The caster draws a concealed pistol and fires a quick shot at an enemy, dealing 28,556 Fire damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_pistolshot.jpg"
            }, {
                name: "Azerite_Powder_Shot",
                baseDamage: 52604,
                damage: 52604,
                type: "fire",
                aoe: true,
                description: "Inflicts 52,604 Fire damage to all enemies in a cone 30 yds. long in front of the caster.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_musket_02.jpg"
            }, {
                name: "Powder_Shot",
                baseDamage: 60118,
                damage: 60118,
                type: "physical",
                aoe: false,
                description: "Eudora fires a heavy powder shot at a random enemy, inflicting 60,118 Physical damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_firearm_2h_rifle_draenorcrafted_d_01_a_alliance.jpg"
            }, {
                name: "Grapeshot",
                baseDamage: 38710,
                damage: 38710,
                type: "fire",
                aoe: true,
                description: "Eudora leaps to a new location and fires wide blasts of grapeshot from her rifle across the arena. Each blast deals 38,710 Fire damage in a cone.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_firearm_2h_rifle_kultirasquest_b_01.jpg"
            }, {
                name: "Barrel_Smash",
                baseDamage: 22544,
                damage: 22544,
                type: "physical",
                aoe: true,
                description: "Raoul lifts his emptied barrel of grog and slams it to the ground repeatedly for 4 sec. All enemies within 10 yards suffer 22,544 Physical damage and are knocked back every second.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_cask_03.jpg"
            }, {
                name: "Whirlpool_of_Blades",
                baseDamage: 55273,
                damage: 55273,
                type: "nature",
                aoe: true,
                description: "Captain Jolly unleashes a whirling saber empowered by the seas that inflicts 55,273 Nature damage every second to all nearby enemies.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_food_legion_gooamberblue_pool.jpg"
            }, {
                name: "Cutting_Surge",
                baseDamage: 22122,
                damage: 22122,
                type: "physical",
                aoe: true,
                description: "Dashes to a player, inflicting 22,122 Physical damage to targets within 5 yds. Players struck are left bleeding for 11060 Physical damage every 2 sec for 12 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_sprint_blue.jpg"
            }, {
                name: "Rearm",
                baseDamage: 38170,
                damage: 38170,
                type: "physical",
                aoe: true,
                description: "Trothak charges a nearby shark, inflicting 38,170 Physical damage to anyone in the way. Upon reaching the shark, Trothak reattaches the shark to his arm.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_unholystrength.jpg"
            }, {
                name: "Ripper_Punch",
                baseDamage: 12904,
                damage: 12904,
                type: "physical",
                aoe: false,
                description: "Trothak punches a nearby enemy, inflicting 12,904 Physical damage and bleeding the target for 8063 every 3 sec for 12 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_druid_bloodythrash.jpg"
            }, {
                name: "Shark_Tornando",
                baseDamage: 25807,
                damage: 25807,
                type: "physical",
                aoe: true,
                description: "Trothak holds his shark by the tail and spins in a circle, inflicting 25,807 Physical damage every 1 sec to all enemies within 9 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/trade_archaeology_shark-jaws.jpg"
            }, {
                name: "Shark_Toss",
                baseDamage: 19355,
                damage: 19355,
                type: "nature",
                aoe: true,
                description: "Trothak throws a shark at a player, inflicting 19,355 Nature damage to all enemies 8 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_landshark.jpg"
            }, {
                name: "Flailing_Shark",
                baseDamage: 22581,
                damage: 22581,
                type: "nature",
                aoe: true,
                description: "A loose shark leaps at the nearest enemy, inflicting 22,581 Nature damage to all enemies within 5 yards of the shark.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_shoulder_cloth_sharkjaw_b_01.jpg"
            }, {
                name: "Swiftwind_Saber",
                baseDamage: 33064,
                damage: 33064,
                type: "nature",
                aoe: true,
                description: "With a flick of his saber, Harlan bends the tradewinds to his will and sends them flying forward. Enemies that collide with the winds are knocked back and suffer 33,065 Nature damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_sandstorm.jpg"
            }, {
                name: "Cannon_Barrage",
                baseDamage: 25807,
                damage: 25807,
                type: "fire",
                aoe: true,
                description: "Every 0.8 sec the target marks their current location. After 1.5 sec, the marked location explodes inflicting 25,807 Fire damage to all players within 5 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_vehicle_siegeenginecannon.jpg"
            }, {
                name: "Black_Powder_Bomb",
                baseDamage: 45162,
                damage: 45162,
                type: "fire",
                aoe: true,
                description: "Irontide Grenadiers detonate when they reach their target, inflicting 45,162 Fire damage to all enemies within 5 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_blackironbomb.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Crippling_Bite",
                baseDamage: 18409,
                damage: 18409,
                type: "physical",
                aoe: false,
                description: "Inflicts 18,409 Physical damage and reduces enemy movement speed by 50% for 5 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_druid_primaltenacity.jpg"
            }, {
                name: "Brutal_Backhand",
                baseDamage: 54230,
                damage: 54230,
                type: "physical",
                aoe: true,
                description: "Swings a backhand, inflicting 54,230 Physical damage and knocking back all nearby enemies in a cone.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_kidneyshot.jpg"
            }, {
                name: "Rat_Traps",
                baseDamage: 13387,
                damage: 13387,
                type: "physical",
                aoe: false,
                description: "The caster hurls steel traps at nearby targets. When triggered, the traps root the target and inflict 13,387 Physical damage every 1 sec for 5 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_steeltrap.jpg"
            }, {
                name: "Frost_Blast",
                baseDamage: 25802,
                damage: 25802,
                type: "frost",
                aoe: true,
                description: "Inflicts 25,802 Frost damage to all enemies in a cone 30 yds. long in front of the caster.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_frost_chillingblast.jpg"
            }, {
                name: "Water_Bolt",
                baseDamage: 12021,
                damage: 12021,
                type: "frost",
                aoe: false,
                description: "Fires a bolt of water at the target, inflicting 12,021 Frost damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_volatilewater.jpg"
            }, {
                name: "Goin'_Bananas",
                baseDamage: 16229,
                damage: 16229,
                type: "physical",
                aoe: false,
                description: "In a whirlwind of banana knive the caster attack all enemies within 5 yards, inflicting 16,229 Physical damage every 1 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_warrior_bladestorm.jpg"
            }, {
                name: "Dragging_Harpoon",
                baseDamage: 18031,
                damage: 18031,
                type: "physical",
                aoe: false,
                description: "Throws a harpoon at an enemy, inflicting 12 Physical damage and pulling the enemy to the caster.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_harpoon.jpg"
            }, {
                name: "Shell_Bounce",
                baseDamage: 34057,
                damage: 34057,
                type: "nature",
                aoe: true,
                description: "Throws a shell that bounces around the arena, inflicting 34,057 Nature damage to anyone hit.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_thunderking_spinningshell.jpg"
            }, {
                name: "Boulder_Throw",
                baseDamage: 66365,
                damage: 66365,
                type: "physical",
                aoe: true,
                description: "Inflicts 66,365 Physical damage to all enemies within 5 yards and knocks them down for 2 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_stone_13.jpg"
            }, {
                name: "Ground_Shatter",
                baseDamage: 51604,
                damage: 51604,
                type: "physical",
                aoe: true,
                description: "A powerful stomp dealing 51,604 Physical damage and knocking back all enemies within 9 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_shaman_earthquake.jpg"
            }, {
                name: "Thundering_Squall",
                baseDamage: 19534,
                damage: 19534,
                type: "nature",
                aoe: true,
                description: "Channels a thundering storm, inflicting 19,534 Nature damage to enemies within 10 yds every 2 sec for 12 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_stormreach.jpg"
            }, {
                name: "Lightning_Bolt",
                baseDamage: 9676,
                damage: 9676,
                type: "nature",
                aoe: false,
                description: "Blasts an enemy with lightning, inflicting 9,676 Nature damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_lightning.jpg"
            }
        ]
    }, {
        name: "Kings'_Rest",
        bossAbilities: [
            {
                name: "Charrrrrge",
                baseDamage: 48387,
                damage: 48387,
                type: "nature",
                aoe: true,
                description: "Charrrrrges towards a random enemy, inflicting 48,388 Nature damage and knocking back all players within 8 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_parrotmount_green.jpg"
            }, {
                name: "Pistol Shot",
                baseDamage: 28556,
                damage: 28556,
                type: "fire",
                aoe: false,
                description: "The caster draws a concealed pistol and fires a quick shot at an enemy, dealing 28,556 Fire damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_pistolshot.jpg"
            }, {
                name: "Azerite Powder Shot",
                baseDamage: 52604,
                damage: 52604,
                type: "fire",
                aoe: true,
                description: "Inflicts 52,604 Fire damage to all enemies in a cone 30 yds. long in front of the caster.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_musket_02.jpg"
            }, {
                name: "Powder Shot",
                baseDamage: 60118,
                damage: 60118,
                type: "physical",
                aoe: false,
                description: "Eudora fires a heavy powder shot at a random enemy, inflicting 60,118 Physical damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_firearm_2h_rifle_draenorcrafted_d_01_a_alliance.jpg"
            }, {
                name: "Grapeshot",
                baseDamage: 38710,
                damage: 38710,
                type: "fire",
                aoe: true,
                description: "Eudora leaps to a new location and fires wide blasts of grapeshot from her rifle across the arena. Each blast deals 38,710 Fire damage in a cone.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_firearm_2h_rifle_kultirasquest_b_01.jpg"
            }, {
                name: "Barrel Smash",
                baseDamage: 22544,
                damage: 22544,
                type: "physical",
                aoe: true,
                description: "Raoul lifts his emptied barrel of grog and slams it to the ground repeatedly for 4 sec. All enemies within 10 yards suffer 22,544 Physical damage and are knocked back every second.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_cask_03.jpg"
            }, {
                name: "Whirlpool of Blades",
                baseDamage: 55273,
                damage: 55273,
                type: "nature",
                aoe: true,
                description: "Captain Jolly unleashes a whirling saber empowered by the seas that inflicts 55,273 Nature damage every second to all nearby enemies.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_food_legion_gooamberblue_pool.jpg"
            }, {
                name: "Cutting Surge",
                baseDamage: 22122,
                damage: 22122,
                type: "physical",
                aoe: true,
                description: "Dashes to a player, inflicting 22,122 Physical damage to targets within 5 yds. Players struck are left bleeding for 11060 Physical damage every 2 sec for 12 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_sprint_blue.jpg"
            }, {
                name: "Rearm",
                baseDamage: 38170,
                damage: 38170,
                type: "physical",
                aoe: true,
                description: "Trothak charges a nearby shark, inflicting 38,170 Physical damage to anyone in the way. Upon reaching the shark, Trothak reattaches the shark to his arm.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_unholystrength.jpg"
            }, {
                name: "Ripper Punch",
                baseDamage: 12904,
                damage: 12904,
                type: "physical",
                aoe: false,
                description: "Trothak punches a nearby enemy, inflicting 12,904 Physical damage and bleeding the target for 8063 every 3 sec for 12 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_druid_bloodythrash.jpg"
            }, {
                name: "Shark Tornando",
                baseDamage: 25807,
                damage: 25807,
                type: "physical",
                aoe: true,
                description: "Trothak holds his shark by the tail and spins in a circle, inflicting 25,807 Physical damage every 1 sec to all enemies within 9 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/trade_archaeology_shark-jaws.jpg"
            }, {
                name: "Shark Toss",
                baseDamage: 19355,
                damage: 19355,
                type: "nature",
                aoe: true,
                description: "Trothak throws a shark at a player, inflicting 19,355 Nature damage to all enemies 8 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_landshark.jpg"
            }, {
                name: "Flailing Shark",
                baseDamage: 22581,
                damage: 22581,
                type: "nature",
                aoe: true,
                description: "A loose shark leaps at the nearest enemy, inflicting 22,581 Nature damage to all enemies within 5 yards of the shark.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_shoulder_cloth_sharkjaw_b_01.jpg"
            }, {
                name: "Swiftwind Saber",
                baseDamage: 33064,
                damage: 33064,
                type: "nature",
                aoe: true,
                description: "With a flick of his saber, Harlan bends the tradewinds to his will and sends them flying forward. Enemies that collide with the winds are knocked back and suffer 33,065 Nature damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_sandstorm.jpg"
            }, {
                name: "Cannon Barrage",
                baseDamage: 25807,
                damage: 25807,
                type: "fire",
                aoe: true,
                description: "Every 0.8 sec the target marks their current location. After 1.5 sec, the marked location explodes inflicting 25,807 Fire damage to all players within 5 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_vehicle_siegeenginecannon.jpg"
            }, {
                name: "Black Powder Bomb",
                baseDamage: 45162,
                damage: 45162,
                type: "fire",
                aoe: true,
                description: "Irontide Grenadiers detonate when they reach their target, inflicting 45,162 Fire damage to all enemies within 5 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_blackironbomb.jpg"
            }
        ],
        trashAbilities: [
            {
                name: "Crippling Bite",
                baseDamage: 18409,
                damage: 18409,
                type: "physical",
                aoe: false,
                description: "Inflicts 18,409 Physical damage and reduces enemy movement speed by 50% for 5 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_druid_primaltenacity.jpg"
            }, {
                name: "Brutal Backhand",
                baseDamage: 54230,
                damage: 54230,
                type: "physical",
                aoe: true,
                description: "Swings a backhand, inflicting 54,230 Physical damage and knocking back all nearby enemies in a cone.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_kidneyshot.jpg"
            }, {
                name: "Rat Traps",
                baseDamage: 13387,
                damage: 13387,
                type: "physical",
                aoe: false,
                description: "The caster hurls steel traps at nearby targets. When triggered, the traps root the target and inflict 13,387 Physical damage every 1 sec for 5 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_steeltrap.jpg"
            }, {
                name: "Frost Blast",
                baseDamage: 25802,
                damage: 25802,
                type: "frost",
                aoe: true,
                description: "Inflicts 25,802 Frost damage to all enemies in a cone 30 yds. long in front of the caster.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_frost_chillingblast.jpg"
            }, {
                name: "Water Bolt",
                baseDamage: 12021,
                damage: 12021,
                type: "frost",
                aoe: false,
                description: "Fires a bolt of water at the target, inflicting 12,021 Frost damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_volatilewater.jpg"
            }, {
                name: "Goin' Bananas",
                baseDamage: 16229,
                damage: 16229,
                type: "physical",
                aoe: false,
                description: "In a whirlwind of banana knive the caster attack all enemies within 5 yards, inflicting 16,229 Physical damage every 1 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_warrior_bladestorm.jpg"
            }, {
                name: "Dragging Harpoon",
                baseDamage: 18031,
                damage: 18031,
                type: "physical",
                aoe: false,
                description: "Throws a harpoon at an enemy, inflicting 12 Physical damage and pulling the enemy to the caster.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_harpoon.jpg"
            }, {
                name: "Shell Bounce",
                baseDamage: 34057,
                damage: 34057,
                type: "nature",
                aoe: true,
                description: "Throws a shell that bounces around the arena, inflicting 34,057 Nature damage to anyone hit.",
                image: "https://wow.zamimg.com/images/wow/icons/large/ability_thunderking_spinningshell.jpg"
            }, {
                name: "Boulder Throw",
                baseDamage: 66365,
                damage: 66365,
                type: "physical",
                aoe: true,
                description: "Inflicts 66,365 Physical damage to all enemies within 5 yards and knocks them down for 2 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/inv_stone_13.jpg"
            }, {
                name: "Ground Shatter",
                baseDamage: 51604,
                damage: 51604,
                type: "physical",
                aoe: true,
                description: "A powerful stomp dealing 51,604 Physical damage and knocking back all enemies within 9 yards.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_shaman_earthquake.jpg"
            }, {
                name: "Thundering Squall",
                baseDamage: 19534,
                damage: 19534,
                type: "nature",
                aoe: true,
                description: "Channels a thundering storm, inflicting 19,534 Nature damage to enemies within 10 yds every 2 sec for 12 sec.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_stormreach.jpg"
            }, {
                name: "Lightning Bolt",
                baseDamage: 9676,
                damage: 9676,
                type: "nature",
                aoe: false,
                description: "Blasts an enemy with lightning, inflicting 9,676 Nature damage.",
                image: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_lightning.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Your tattoos reduce magic damage taken by 10%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/inv_belt_leather_demonhunter_a_01.13c87e6784716cddba0dfe3bf5da0a33c38f1a67.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Increases your chance to dodge by 50% and reduces all damage taken by 35% for 10 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_demonhunter_blur.a2923a147b452524dc27c8b0a1af4fab1d2f8c43.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Blur now reduces damage taken by an additional 15%. Additionally, you automatically trigger Blur when you fall below 35% health. This effect can only occur when Blur is not on cooldown.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_shadow_manafeed.d1bd39c838aea699524a25365a0905fc367480aa.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Your tattoos reduce all damage taken by 20%, and increase your Stamina by 65% and your Armor by 80%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/inv_belt_leather_demonhunter_a_01.13c87e6784716cddba0dfe3bf5da0a33c38f1a67.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Surge with fel power, increasing your Parry chance by 20% and reducing Physical damage taken by 10% for 6 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_demonhunter_demonspikes.165c8685d70b5e267eaffbefb02471ad7ce7b6ff.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Transform to demon form for 15 sec, increasing current and maximum health by 30% and Armor by 100%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_demonhunter_metamorphasistank.655d7acdfb5daf9774b1ec91988ef7b7ff9ccbec.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Brand an enemy with a demonic symbol, instantly dealing (720% of attack power) Fire damage and reducing the damage they do to you by 40% for 8 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_demonhunter_fierybrand.79481bda1d4128a912293c072e26fda92d63d1b1.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Your blood freezes, granting immunity to Stun effects and reducing all damage you take by 30% for 8 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_deathknight_iceboundfortitude.67869c32ef85ee27a088b1e641d0bd6f0e9d3327.jpg"

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
        versIncrease: 0,
        selected: false,
        description: "Surrounds you with a barrier of whirling bones, increasing Armor by (40 * Strength / 100), and your Haste by 10%. Each melee attack against you consumes a charge. Lasts 30 sec or until all charges are consumed.",
        image: "https://wow.zamimg.com/images/wow/icons/large/ability_deathknight_boneshield.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "A devastating blow that consumes 2 stacks of your Thrash on the target to deal [ 96.93% of Attack Power ] Physical damage, and reduces all damage you take by 9% for 20 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_druid_malfurionstenacity.0896a00f9d40f7564349c3c2edc222de65879253.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "While in Bear Form, Thrash also increases your damage dealt to the target, and reduces your damage taken from the target by 2% per application of Thrash.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_druid_swipe.fc8c7068d6179d1aeba69e136608dcd6fce3b24c.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Increases armor by [ 75% of Agility ] for 7 sec. Multiple uses of this ability may overlap.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_druid_ironfur.34c1f970d2268b9f47f6ffe4b2bd26389e8e7501.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage taken by 6%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/talentspec_druid_feral_bear.e58da0101e30ae252d7894e79021f2c003bfff4c.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage taken by 6%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/inv_misc_pelt_bear_03.6a08b788bf498cda218d5c3369fed00f086c2080.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you take by 50% for 6 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_druid_tigersroar.2989948f9675e44591b6f8a0218f05d234e64b92.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Shapeshift into Moonkin Form, increasing the damage of your spells by 10% and your armor by 125%, and granting protection from Polymorph effects.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_nature_forceofnature.512d802f975108efb80cd39f57153d1a267e95a6.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Your skin becomes as tough as bark, reducing all damage you take by 20% and preventing damage from delaying your spellcasts. Lasts 12 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_nature_stoneclawtotem.c6b5377f9efb7b6b2f018932d2d324164e9ee1b9.jpg"
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
        stamIncrease: .25,
        versIncrease: 0,
        selected: false,
        description: "Shapeshift into Bear Form, increasing armor by 220% and Stamina by 25%, granting protection from Polymorph effects, and increasing threat generation.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_racial_bearform.d4791ca13718bbc60770e850075bd3653356bc1e.jpg"
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
        stamIncrease: .45,
        versIncrease: 0,
        selected: false,
        description: "Shapeshift into Bear Form, increasing armor by 220% and Stamina by 45%, granting protection from Polymorph effects, and increasing threat generation.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_racial_bearform.d4791ca13718bbc60770e850075bd3653356bc1e.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Deflects all attacks and reduces all damage you take by 30% for 8 sec, but you cannot attack.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_hunter_pet_turtle.a8cd9b96b7f58d43e38975afb380f5df2baeb29d.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you and your pet take by 20% for 6 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_nature_spiritarmor.33da9d26b400fe2b225250f84d45f28186a26709.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "You and your pet gain 5% increased maximum health.",
        image: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_huntervswild.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Ice Barrier increases your armor by 200% while active, and Ice Block applies Ice Barrier to you when it fades.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_mage_coldasice.64a2341791d7974a8bb1c4d1377130abbe13479b.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Shields you with an arcane force, absorbing [ 20% of Total Health ] damage and reducing magic damage taken by 15% for 60 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_magearmor.0ba362755890ce629051ed03df36e5bc276d6e84.jpg"
    }, {
        class: "Mage",
        specs: ["Frost"],
        name: "Ice_Barrier",
        magicDR: .15,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: .2,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Shields you with an arcane force, absorbing [ 20% of Total Health ] damage and reducing magic damage taken by 15% for 60 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_magearmor.0ba362755890ce629051ed03df36e5bc276d6e84.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Shields you in flame, absorbing [ 20% of Total Health ] damage for 60 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_mage_moltenarmor.f578e6029a0591525ab75c735a56f121b65e045c.jpg"
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
        versIncrease: 1007,
        selected: false,
        description: "The Light temporarily magnifies your power, increasing your Haste, Critical Strike, Mastery, and Versatility by 1,007.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_paladin_seraphim.2b9aa3a2658b66078d958a3aa4acbc8b453f8ac0.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Each enemy within 8 yards reduces the damage that you take and increases the damage that you deal by up to 3%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_divinepurpose.1f15cbb14240ef0a5568d6fe66378e4afcf0a356.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage taken while inside your Consecration by 2.8%. Increases your chance to block melee attacks by 8.0%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_holyprotection.bb12bfd915b3f57f43033418c6c8e8786ff8a5c4.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Surround yourself with a bladed bulwark, reducing Physical damage taken by 35% and dealing [ 35.3% of Attack Power ] Physical damage to any melee attackers for 10 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_weaponmastery.9a7efcab217085d4636f346952eb84b48f3f4572.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Empowers you with the spirit of ancient kings, reducing all damage you take by 50% for 8 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_heroism.b98c1f5a1cbb691400a949725a8a1a5486f2bf7e.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "When any party or raid member within 40 yds dies, you gain 20% increased damage done and 30% reduced damage taken for 10 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_crusade.d45378a23b3e829d87231bd0d8f479c11910f13a.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you take by 20% for 8 sec. While Ardent Defender is active, the next attack that would otherwise kill you will instead bring you to 20% of your maximum health.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_ardentdefender.7857d6ca6acb60d96f2cbce78fe9dd8d7e4bde3a.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Slams enemies in front of you with your shield, causing [ 33% of Attack Power ] Holy damage, and increasing your Armor by 150% of Strength for 4.5 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_paladin_shieldofvengeance.b087f76953d250606f09e44da67c18062df7f41d.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you take by 20% for 8 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_divineprotection.7355c7438a2f3533f9884830c4d19c94e538aa97.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "When you cast Shadow Mend on yourself, its damage over time effect heals you instead, and reduces all damage you take by 10%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_shadow_misery.6dab60b60a24d5c8497c6c77df9cb8f8f4a2a2e4.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Disperse into pure shadow energy, reducing all damage taken by 75% for 6 sec, but you are unable to attack or cast spells.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_shadow_dispersion.4dc54d711d67aa9b29b027a2fb8454538e6eb45c.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Increases maximum health by 25% for 10 sec, and instantly heals you for that amount.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_testoffaith.d5822c859b9d5d8954b56cab09a2ccebf7a2bde9.jpg"
    }, {
        class: "Rogue",
        specs: ["Assassination", "Subtlety", "Outlaw"],
        name: "Elusiveness",
        magicDR: .35,
        physicalDR: .35,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Feint also reduces all damage you take from non-area-of-effect attacks by 30% for 5 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_rogue_turnthetables.f43cc498d74f1a6314e93ff6496753eb2c822f76.jpg"
    }, {
        class: "Rogue",
        specs: ["Assassination", "Subtlety", "Outlaw"],
        name: "Feint",
        magicDR: .4,
        physicalDR: .4,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Performs an evasive maneuver, reducing damage taken from area-of-effect attacks by 40% for 5 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_rogue_feint.6cec023fe3918f5512bf68b5890587b3f83d47eb.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Shift partially into the elemental planes, taking 40% less damage for 8 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_shaman_astralshift.bc92328a2bb1929fc67e2a959dc6b84f19819393.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "The Primal Earth Elemental hardens its own skin and the Shaman's skin into pure granite, reducing all damage taken by 40% for 10 sec.",
        image: "https://wow.zamimg.com/images/wow/icons/large/ability_golemthunderclap.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "While transformed into a Ghost Wolf, you gain 5% increased movement speed and 5% damage reduction every 1 sec, stacking up to 4 times.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_hunter_lonewolf.0205c28bd77ee6c8c11b65f1f4415b41c34ba4d5.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "While transformed into a Ghost Wolf, you gain 5% increased movement speed and 5% damage reduction every 1 sec, stacking up to 4 times.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_shadow_demonictactics.37ccdc83053a6f88c60cf8f354cd96832bc99394.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "20% of all damage you take is taken by your demon pet instead.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warlock_soullink.6e05a794b61f6b842d328aee74ecd620b6bdf9d3.jpg"
    }, {
        class: "Warlock",
        specs: ["Destruction", "Affliction", "Demonology"],
        name: "Dark_Pact",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: .2 * 2.5,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Sacrifices 20% of your current health to shield you for 250% of the sacrificed health for 20 sec. Usable while suffering from control impairing effects.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/warlock_sacrificial_pact.9925b811864d3038a1a489e8c1ca5e9d5ced4a3f.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "All single-target damage done by you and your minions grants you and your pet shadowy shields that absorb 8% of the damage dealt for 15 sec, up to 10% of maximum health.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/warlock_siphonlife.720eebe118a8e01e96796dbefe527be7b87a83c8.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Your Soul Leech absorption now passively recharges at a rate of 0.5% of maximum health every 1 sec, and may now absorb up to 15% of maximum health.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_shadow_felarmour.0c08743a5b1f8d02cd94bcd81c3cc63be35475b9.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Raise your shield, reflecting spells cast on you and reducing magical damage you take by 20%. Lasts 5 sec or until a spell is reflected.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warrior_shieldreflection.7a2379a92ced9534ffc99ff0253549331130e31e.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "A defensive combat state that reduces all damage you take by 20%, and all damage you deal by 10%. Lasts 0 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warrior_defensivestance.b3299f786c91a674328a0fdc9c504099670398ac.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Increases your maximum health by 10%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warrior_intensifyrage.d7551af2d8cade7c263a3b98b4d77c6ff718cb59.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "You take 10% reduced damage while Enrage is active.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_rogue_preparation.9f0f1e3afa736818be9ca2f45b59376162911795.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you take by 40% for 8 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warrior_shieldwall.08bd34f6271c071556094d08b32f007ac98a1f82.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Demoralizes all enemies within 10 yards, reducing the damage they deal to you by 20% for 8 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warrior_warcry.0ffaf0e48c15af39afc990fd0d8d3c290e129de5.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Increases your parry chance by [ 100 + 25% of Spell Power ]% and reduces all damage you take by 30% for 8 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warrior_challange.0f93e334b27c919fe6c2ac309fc92d6d11253df5.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces damage taken by 30%, and Bloodthirst restores an additional 20% health. Usable while stunned. Lasts 8 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warrior_focusedrage.621831f0a6c723405872a1d69a6f5880cc012ff8.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Increases maximum health by 30% for 15 sec, and instantly heals you for that amount.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_ashestoashes.725a70920eb36c1d3e7e3406b95d412bf06a2a0c.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage you take by 20% to 50% for 10 sec, with larger attacks being reduced by more.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_monk_dampenharm.dbd8639ee14697635321419927009fb266b26b0f.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Each Chi you spend reduces damage taken by 2% for 5 sec, stacking up to 5 times.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_monk_domeofmist.fc74c0ae7b104ff7cbfa84698e74256388cbae7f.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage taken by 60% for 8 sec. Moving, being hit by a melee attack, or taking another action will cancel this effect.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_monk_zenmeditation.9267252dcd99c634463d20ca9cb0dde32d2a82b8.jpg"
    }, {
        class: "Monk",
        specs: ["Windwalker", "Mistweaver"],
        name: "Diffuse_Magic",
        magicDR: 0,
        physicalDR: .6,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces magic damage you take by 60% for 6 sec, and transfers all currently active harmful magical effects on you back to their original caster if possible.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_monk_diffusemagic.2f77f34533eca219bf3dc75679682ff9180451a2.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Absorbs all damage taken for 10 sec, up to 50% of your maximum health, and redirects 70% of that amount to the enemy target as Nature damage over 6 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_monk_touchofkarma.7a1a1d95334c0d65a550f01365dd76f929501586.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Turns your skin to stone, increasing your current and maximum health by 20%, and reducing damage taken by 20% for 15 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_monk_fortifyingelixir.0c364d00a39edb68d5240c4f75ba0c3fe1d7c357.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Breathe fire on targets in front of you, causing [23.75% of Attack Power] Fire damage. Targets affected by Keg Smash will also burn, taking [19.66% of Attack Power] Fire damage and dealing 5% reduced damage to you for 12 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_monk_breathoffire.c76d9b77d043c835784b41b0a2a26c910dfec75c.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "You shrug off attacks, delaying a portion of Physical damage based on your Agility, instead taking it over 10 sec. Affects magical attacks at 35% effectiveness.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/monk_stance_drunkenox.5d1ea3070a1f6900e8ba39eff164a4bd81a45314.jpg"
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
        versIncrease: 0,
        selected: false,
        description: "Turns your skin to stone for 15 sec, increasing your current and maximum health by 20%, increasing the effectiveness of Stagger by 10%, and reducing all damage you take by 20%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_monk_fortifyingale_new.81d7385c9e70edb9150581fbcccb78adbcf817e9.jpg"
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
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/trade_engineering.699aff53c99e46d703090933b3840d102d65be0f.jpg"
    }, {
        class: "all",
        specs: "all",
        name: "Resounding_Protection",
        amount: 0,
        selected: false,
        description: "Every 30 sec, gain an absorb shield for 30 sec.",
        image: "https://wow.zamimg.com/images/wow/icons/large/ability_vehicle_shellshieldgenerator_green.jpg"
    }, {
        class: "all",
        specs: "all",
        name: "Power_Word-_Shield",
        amount: 0,
        selected: false,
        description: "Reduces all damage taken by a friendly target by 40% for 8 sec. Castable while stunned.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_powerwordshield.3954a85ecb0d43eeb25250cbf2166ed339fcbe45.jpg"
    }, {
        class: "all",
        specs: "all",
        name: "Luminous_Barrier",
        amount: 0,
        selected: false,
        description: "Create a shield on all allies within 40 yards, absorbing damage on each of them for 10 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_priest_burningwill.c6dea3ee591cb81de29a8bd3372362063caf3533.jpg"
    }, {
        class: "all",
        specs: "all",
        name: "otherAbsorb",
        amount: 0,
        selected: false,
        description: "Other Absorbs.",
        image: "https://wow.zamimg.com/images/wow/icons/large/ability_vehicle_shellshieldgenerator_green.jpg"
    }, {
        class: "Warrior",
        specs: ["Protection"],
        name: "Ignore_Pain",
        amount: 0,
        selected: false,
        description: "Fight through the pain, ignoring 50% of damage taken, up to [ 700% of Attack Power ] total damage prevented.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warrior_renewedvigor.a75f649937190c6ff48d6f3e84448246a491048b.jpg"
    }
];

var externals = [
    {
        name: "Power_Word:_Fortitude",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Infuses the target with vitality, increasing their Stamina by 10% for 60 min.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_wordfortitude.da6141705dfd22fec7aaa097b2a63c7131ec5c3e.jpg"
    }, {
        name: "Ironbark",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "The target's skin becomes as tough as Ironwood, reducing all damage taken by 20% for 12 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_druid_ironbark.822b1681d1a4b6ec250b9e8c72e797a09f9a7475.jpg"
    }, {
        name: "Aegis_of_Light",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Channels an Aegis of Light that protects you and all allies standing within 10 yards behind you for 6 sec, reducing all damage taken by 20%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_greaterblessingoflight.bb701b5630ba1b0ab06469fc4e693cc349f22399.jpg"
    }, {
        name: "Aura_Mastery",
        magicDR: .2,
        physicalDR: .2,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Devotion Aura: all affected allies gain 20% damage reduction.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_auramastery.1e3f7247e225cec54b4cd738162f900534e2d796.jpg"
    }, {
        name: "Aura_of_Sacrifice",
        magicDR: .1,
        physicalDR: .1,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "While you are above 75% health, 10% of all damage taken by allies within 10 yds is redirected to you and reduced by half.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_deathwing_bloodcorruption_earth.c1ffe5c2e062d10e8588e7dbf055e4c506308f06.jpg"
    }, {
        name: "Devotion_Aura",
        magicDR: 0.03,
        physicalDR: 0.03,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Damage dealt to allies within 10 yards is reduced by up to 10%, diminishing as more allies enter the aura.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_devotionaura.e663b3d5d74bd6ef41f3c1059b0589246600654d.jpg"
    }, {
        name: "Blessing_of_Sacrifice",
        magicDR: .3,
        physicalDR: .3,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Blesses a party or raid member, reducing their damage taken by 30%, but you suffer 100% of damage prevented. Lasts 12 sec, or until transferred damage would cause you to fall below 20% health.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_sealofsacrifice.22bb121700b3e627e2efd5f0a459f172866fd4b6.jpg"
    }, {
        name: "Lenience",
        magicDR: .03,
        physicalDR: .03,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Atonement reduces damage taken by 3%.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_priest_atonement.b1ce9042e3267c27a33895c2a211a7056ca49b9c.jpg"
    }, {
        name: "Power_Word:_Barrier",
        magicDR: .25,
        physicalDR: .25,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Summons a holy barrier to protect all allies at the target location for 10 sec, reducing all damage taken by 25% and preventing damage from delaying spellcasting.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_powerwordbarrier.72bcb91618abc681a915e7bfa9c2c90b23c1842b.jpg"
    }, {
        name: "Pain_Suppression",
        magicDR: .4,
        physicalDR: .4,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Reduces all damage taken by a friendly target by 40% for 8 sec. Castable while stunned.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_holy_painsupression.0dfc33c65184f8b90bed1db3da01cb9fcd44781d.jpg"
    }, {
        name: "Ancestral_Protection_Totem",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Summons a totem at the target location for 30 sec. All allies within 20 yards of the totem gain 10% increased health. If an ally dies, the totem will be consumed to allow them to Reincarnate with 20% health and mana.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_nature_reincarnation.0f66f2d35a25ccdd8a71ce942372e6e51bb4f547.jpg"
    }, {
        name: "Spirit_Link_Totem",
        magicDR: .1,
        physicalDR: .1,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Summons a totem at the target location for 6 sec, which reduces damage taken by all party and raid members within 10 yards by 10%. Every 1 sec the health of all affected players is redistributed, such that all players are at the same percentage of maximum health.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/spell_shaman_spiritlink.f35cb0fb1725afbcfb62816e431eb91dbe06f0c8.jpg"
    }, {
        name: "Rallying_Cry",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Lets loose a rallying cry, granting all party or raid members within 40 yards 15% temporary and maximum health for 10 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warrior_rallyingcry.22e6f5cd68c301c9f3071839e99250cfc6c5cff2.jpg"
    }, {
        name: "Safeguard",
        magicDR: 0.3,
        physicalDR: 0.3,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Intercepting a friendly target now also causes 30% of their damage taken to transfer to you for 6 sec.",
        image: "https://media-azeroth.cursecdn.com/wow/icons/large/ability_warrior_safeguard.69ad28a1e07cb5d53f238ac5167c2a8dc07347aa.jpg"
    }, {
        name: "Steelskin_Potion",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 900,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Use: Infuses your body with resilient energy, increasing your Armor by 900 for 25 sec. (1 Min Cooldown)",
        image: "https://wow.zamimg.com/images/wow/icons/large/inv_alchemy_80_elixir01green.jpg"
    }, {
        name: "Spiced_Snapper",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 70,
        selected: false,
        description: "Use: Restores 166257 health and 83129 mana over 20 sec.  Must remain seated while eating.  If you spend at least 10 seconds eating you will become well fed and gain 70 Versatility for 1 hour.",
        image: "https://wow.zamimg.com/images/wow/icons/large/inv_cooking_80_spicedcatfish.jpg"
    }, {
        name: "Battle_Potion_of_Stamina",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 22000,
        versIncrease: 0,
        selected: false,
        description: "Use: Increases your Stamina by 1100 for 25 sec. (1 Min Cooldown)",
        image: "https://wow.zamimg.com/images/wow/icons/large/trade_alchemy_potionc3.jpg"
    }, {
        name: "Flask_of_the_Vast_Horizon",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 7140,
        versIncrease: 0,
        selected: false,
        description: "Use: Increases Stamina by 357 for 1 hour. Counts as both a Battle and Guardian elixir.  This effect persists through death. (3 Sec Cooldown)",
        image: "https://wow.zamimg.com/images/wow/icons/large/inv_alchemy_80_flask01red.jpg"
    }, {
        name: "War_Scroll_of_Fortitude",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 0,
        versIncrease: 0,
        selected: false,
        description: "Use: Increases the target's Stamina by 7% for 30 min.",
        image: "https://wow.zamimg.com/images/wow/icons/large/inv_inscription_80_warscroll_fortitude.jpg"
    }, {
        name: "Seasoned_Steak_and_Potatoes",
        magicDR: 0,
        physicalDR: 0,
        armorIncrease: 0,
        armorPercentIncrease: 0,
        absorb: 0,
        healthIncrease: 3000,
        versIncrease: 0,
        selected: false,
        description: "Use: Restores 166257 health and 83129 mana over 20 sec.  Must remain seated while eating.  If you spend at least 10 seconds eating you will become well fed and gain 150 Stamina for 1 hour.",
        image: "https://wow.zamimg.com/images/wow/icons/large/inv_cooking_81_paleosteakandpotatoes.jpg"
    }
];

var versTrinkets = [
    {
        name: "Lustruous_Golden_Plumage",
        selected: false,
        amount: 0,
        description: "Use: Increase your Versatility for 20 sec. (2 Min Cooldown)",
        image: "https://wow.zamimg.com/images/wow/icons/large/inv_icon_feather06a.jpg"
    }, {
        name: "Dread_Gladiators_Medallion",
        selected: false,
        amount: 0,
        description: "Use: Increases Versatility for 20 sec. (2 Min Cooldown)",
        image: "https://wow.zamimg.com/images/wow/icons/large/spell_arcane_rune.jpg"
    }
];

$(".classImage").on("click", function (event) {
    event.preventDefault();
    playerClass = $(this).attr("data-class");
});

$(document).on("click", ".specImage", function (event) {
    event.preventDefault();
    playerSpec = $(this).attr("data-spec");
});

$(document).on("click", ".dungeonImage", function (event) {
    event.preventDefault();
    dungeon = $(this).attr("data-dungeon");
});

$(document).on("click", "#dungeonContinue", function (event) {
    event.preventDefault();
    calcDamage();
});

$(document).on("click", "#tyrannical", function (event) {
    event.preventDefault();
    if (tyrannical) {
        tyrannical = false;
        $("#tyrannical").removeClass("selected");
    } else {
        tyrannical = true;
        $("#tyrannical").addClass("selected");
    }
    calcDamage();
});

$(document).on("click", "#fortified", function (event) {
    event.preventDefault();
    if (fortified) {
        fortified = false;
        $("#fortified").removeClass("selected");
    } else {
        fortified = true;
        $("#fortified").addClass("selected");
    }
    calcDamage();
});

$(document).on("click", "#specContinue", function (event) {
    event.preventDefault();
    if (playerSpec !== "") {
        $("#classInput").empty();
        $("#classInput").append(`
        <div class="row personalRow">
            <div class="col-md-6 personalCol">
                <h2>Personals:</h2>
            </div>
            <div class="col-md-6 healthCol">
                <h4 class="totalHealth">Total Health: 0</h4>
                <h4 class="totalAbsorb">Total Absorb: 0</h4>
                <h4 class="effectiveHealth">Effective Health: 0</h4>
            </div>
        </div>    
        `);
        for (i = 0; i < personals.length; i++) {
            if (personals[i].class === playerClass && personals[i].specs.includes(playerSpec)) {
                $(".personalCol").append(`<img class="personalImage" data-name=${personals[i].name} src=${personals[i].image} alt=${personals[i].name}>`);
            }
        }
        $("#classInput").append(`<h2>Externals:</h2>`);
        for (i = 0; i < externals.length; i++) {
            $("#classInput").append(`<img class="externalImage" data-name=${externals[i].name} src=${externals[i].image} alt=${externals[i].name}>`);
        }
        $("#classInput").append(`<h2>Absorbs:</h2>`);
        for (i = 0; i < 4; i++) {
            $("#classInput").append(`
            <div class="row absorbRow">
                <div class="col-md-6">
                    <img class="absorbImage" data-name=${absorbs[i].name} src=${absorbs[i].image} alt=${absorbs[i].name}>
                </div>
                <div class="col-md-5">
                    <div class="input-group mb-3" style="margin-top: 9px">
                        <input type="text" class="form-control" data-name=${absorbs[i].name} placeholder="Amount" aria-label="Shield Amount" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary shieldOkay" data-name=${absorbs[i].name} type="button">Okay</button>
                        </div>
                    </div>
                </div
            </div>
            `);
        }
        if (playerClass === "Warrior" && playerSpec === "Protection") {
            $("#classInput").append(`
            <div class="row absorbRow">
                <div class="col-md-6">
                    <img class="absorbImage" data-name=${absorbs[5].name} src=${absorbs[5].image} alt=${absorbs[5].name}>
                </div>
                <div class="col-md-5">
                    <div class="input-group mb-3" style="margin-top: 9px">
                        <input type="text" class="form-control" data-name=${absorbs[5].name} placeholder="Amount" aria-label="Shield Amount" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary shieldOkay" data-name=${absorbs[5].name} type="button">Okay</button>
                        </div>
                    </div>
                </div
            </div>
            `);
        }
        $("#classInput").append(`
            <div class="row absorbRow">
                <div class="col-md-6">
                    <p style="margin-top: 15px">Other Absorbs: </p>
                </div>
                <div class="col-md-5">
                    <div class="input-group mb-3" style="margin-top: 9px">
                        <input type="text" class="form-control" data-name="otherAbsorb" placeholder="Amount" aria-label="Shield Amount" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary shieldOkay" data-name="otherAbsorb" type="button">Okay</button>
                        </div>
                    </div>
                </div
            </div>
            `);
        $("#classInput").append(`<h2>Versatility Trinkets:</h2>`);
        for (i = 0; i < versTrinkets.length; i++) {
            $("#classInput").append(`
            <div class="row absorbRow">
                <div class="col-md-6">
                    <img class="absorbImage" data-name=${versTrinkets[i].name} src=${versTrinkets[i].image} alt=${versTrinkets[i].name}>
                </div>
                <div class="col-md-5">
                    <div class="input-group mb-3" style="margin-top: 9px">
                        <input type="text" class="form-control" data-name=${versTrinkets[i].name} placeholder="Amount" aria-label="Vers Amount" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary versOkay" data-name=${versTrinkets[i].name} type="button">Okay</button>
                        </div>
                    </div>
                </div
            </div>
            `);
        }
        $("#classInput").append(`</div>`);
        $("#classInput").append(`
        <h2>Stats:</h2>
        <div class="row">
            <div class="col-md-6">
            <p class="playerInput" style="margin-top: 4px">Stamina (no buffs):</p>
            </div>
            <div class="col-md-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" data-name="stamina" placeholder="Amount" aria-label="Stamina Amount" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary stamOkay" data-name="stamina" type="button">Okay</button>
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
                    <button class="btn btn-outline-secondary versatilityOkay" data-name="vers" type="button">Okay</button>
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
                <button class="btn btn-outline-secondary armorOkay" data-name="armor" type="button">Okay</button>
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
            <button class="btn btn-outline-secondary avoidanceOkay" data-name="avoidance" type="button">Okay</button>
        </div>
    </div>
    </div>
</div>
        `);
        if (playerSpec === "Vengeance" || playerSpec === "Blood" || playerSpec === "Guardian" || (playerSpec === "protection" && playerClass === "Paladin")) {
            $("#classInput").append(`
            <div class="row">
            <div class="col-md-6">
            <p class="playerInput" style="margin-top: 4px">Main stat (no buffs):</p>
            </div>
            <div class="col-md-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" data-name="mainStat" placeholder="Amount" aria-label="Main Stat Amount" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary mainStatOkay" data-name="mainStat" type="button">Okay</button>
                </div>
            </div>
            </div>
        </div>
            `);
        }
        if (playerSpec === "Vengeance" || (playerClass === "Paladin" && playerSpec === "Protection")) {
            $("#classInput").append(`
            <div class="row">
            <div class="col-md-5">
            <p class="playerInput">Mastery (no buffs):</p>
            </div>
            <div class="col-md-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" data-name="mastery" placeholder="Amount" aria-label="Mastery Amount" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary masteryOkay" data-name="mastery" type="button">Okay</button>
                </div>
            </div>
            </div>
        </div>
            `);
        }
    };
});


$(document).on("click", ".stamOkay", function (event) {
    event.preventDefault();
    var stamAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (stamAmount === "") {
        stamAmount = 0;
    }
    playerStamina = stamAmount;
    calcDamage();
});

$(document).on("click", ".versOkay", function (event) {
    event.preventDefault();
    var versAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (versAmount === "") {
        versAmount = 0;
    }
    playerVers = versAmount;
    calcDamage();
});

$(document).on("click", ".avoidanceOkay", function (event) {
    event.preventDefault();
    var avoidanceAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (avoidanceAmount === "") {
        avoidanceAmount = 0;
    }
    avoidance = avoidanceAmount;
    calcDamage();
});

$(document).on("click", ".armorOkay", function (event) {
    event.preventDefault();
    var armorAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (armorAmount === "") {
        armorAmount = 0;
    }
    playerArmor = armorAmount;
    calcDamage();
});

$(document).on("click", ".mainStatOkay", function (event) {
    event.preventDefault();
    var mainStatAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (mainStatAmount === "") {
        mainStatAmount = 0;
    }
    playerMainStat = mainStatAmount;
    calcDamage();
});

$(document).on("click", ".masteryOkay", function (event) {
    event.preventDefault();
    var masteryAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (masteryAmount === "") {
        masteryAmount = 0;
    }
    playerMastery = masteryAmount;
    calcDamage();
});

$(document).on("click", ".shieldOkay", function (event) {
    event.preventDefault();
    var shieldName = $(this).attr("data-name");
    var shieldAmount = Number($(`input[type=text][data-name=${$(this).attr("data-name")}]`).val());
    if (shieldAmount === "") {
        shieldAmount = 0;
    }
    for (i = 0; i < absorbs.length; i++) {
        if (absorbs[i].name === shieldName) {
            absorbs[i].amount = shieldAmount;
            if (absorbs[i].selected && shieldAmount === 0) {
                $(`img[data-name=${$(this).attr("data-name")}]`).removeClass("selected");
                absorbs[i].selected = false;
            } else if (shieldAmount) {
                absorbs[i].selected = true;
                $(`img[data-name=${$(this).attr("data-name")}]`).addClass("selected");
            }
        }
    }
    if (shieldAmount === 0) {
        $(`img[data-name=${$(this).attr("data-name")}]`).removeClass("selected");
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
    for (i = 0; i < versTrinkets.length; i++) {
        if (versTrinkets[i].name === trinketName) {
            versTrinkets[i].amount = versAmount;
            if (versTrinkets[i].selected && versAmount === 0) {
                versTrinkets[i].selected = false;
                $(`img[data-name=${$(this).attr("data-name")}]`).removeClass("selected");
            } else if (versAmount > 0) {
                versTrinkets[i].selected = true;
                $(`img[data-name=${$(this).attr("data-name")}]`).addClass("selected");
            }
        }
    }
    if (versAmount === 0) {
        $(`img[data-name=${$(this).attr("data-name")}]`).removeClass("selected");
    }
    calcDamage();
});

$(document).on("click", ".personalImage", function (event) {
    event.preventDefault();
    var personalName = $(this).attr("data-name");
    for (i = 0; i < personals.length; i++) {
        if (personals[i].name === personalName && personals[i].class === playerClass && personals[i].specs.includes(playerSpec)) {
            if (personals[i].selected) {
                personals[i].selected = false;
                $(this).removeClass("selected");
            } else {
                personals[i].selected = true;
                $(this).addClass("selected");
            }
        }
    }
    calcDamage();
});

$(document).on("click", ".externalImage", function (event) {
    event.preventDefault();
    var externalName = $(this).attr("data-name");
    for (i = 0; i < externals.length; i++) {
        if (externals[i].name === externalName) {
            if (externals[i].selected) {
                externals[i].selected = false;
                $(this).removeClass("selected");
            } else {
                externals[i].selected = true;
                $(this).addClass("selected");
            }
        }
    }
    calcDamage();
});

$("#classContinue").on("click", function (event) {
    event.preventDefault();
    if (playerClass !== "") {
        $("#classInput").empty();
    };
    if (playerClass === "Demon Hunter") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Havoc\" src=\"images/Havoc.png\" alt=\"Havoc\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Vengeance\" src=\"images/Vengeance.png\" alt=\"Vengeance\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Death Knight") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Blood\" src=\"images/Blood.png\" alt=\"Blood\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Frost\" src=\"images/Frost.png\" alt=\"Frost\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Unholy\" src=\"images/Unholy.png\" alt=\"Unholy\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Druid") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Feral\" src=\"images/Feral.png\" alt=\"Feral\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Balance\" src=\"images/Balance.png\" alt=\"Balance\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Restoration\" src=\"images/Restoration.png\" alt=\"Restoration\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Guardian\" src=\"images/Guardian.png\" alt=\"Guardian\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Hunter") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Beast Mastery\" src=\"images/Beast Mastery.png\" alt=\"Beast Mastery\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Marksmanship\" src=\"images/Marksmanship.png\" alt=\"Marksmanship\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Survival\" src=\"images/Survival.png\" alt=\"Survival\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Mage") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Frost\" src=\"images/Frost Mage.png\" alt=\"Frost\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Fire\" src=\"images/Fire.png\" alt=\"Fire\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Arcane\" src=\"images/Arcane.png\" alt=\"Arcane\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Monk") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Brewmaster\" src=\"images/Brewmaster.png\" alt=\"Brewmaster\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Mistweaver\" src=\"images/Mistweaver.png\" alt=\"Mistweaver\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Windwalker\" src=\"images/Windwalker.png\" alt=\"Windwalker\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Paladin") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Protection\" src=\"images/Protection Paladin.png\" alt=\"Protection\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Retribution\" src=\"images/Retribution.png\" alt=\"Retribution\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Holy\" src=\"images/Holy.png\" alt=\"Holy\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Priest") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Shadow\" src=\"images/Shadow.png\" alt=\"Shadow\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Holy\" src=\"images/Holy Priest.png\" alt=\"Holy\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Discipline\" src=\"images/Discipline.png\" alt=\"Discipline\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Rogue") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Assassination\" src=\"images/Assassination.png\" alt=\"Assassination\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Outlaw\" src=\"images/Outlaw.png\" alt=\"Outlaw\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Subtlety\" src=\"images/Subtlety.png\" alt=\"Subtlety\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Shaman") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Restoration\" src=\"images/Restoration Shaman.png\" alt=\"Restoration\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Elemental\" src=\"images/Elemental.png\" alt=\"Elemental\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Enhancement\" src=\"images/Enhancement.png\" alt=\"Enhancement\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Warlock") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Demononlogy\" src=\"images/Demonology.png\" alt=\"Demonology\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Destruction\" src=\"images/Destruction.png\" alt=\"Destruction\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Affliction\" src=\"images/Affliction.png\" alt=\"Affliction\">");
        $("#classInput").append("</div>");
    } else if (playerClass === "Warrior") {
        $("#classInput").append("<div class=\"row\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Protection\" src=\"images/Protection.png\" alt=\"Protection\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Arms\" src=\"images/Arms.png\" alt=\"Arms\">");
        $("#classInput").append("<img class=\"specImage\" data-spec=\"Fury\" src=\"images/Fury.png\" alt=\"Fury\">");
        $("#classInput").append("</div>");
    }
    if (playerClass !== "") {
        $("#classInput").append("<button type=\"button\" id=\"specContinue\" class=\"btn btn-primary\">Continue</button>");
    };
});