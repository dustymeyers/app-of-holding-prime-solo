
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "characters" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "user" NOT NULL,
  "character_name" VARCHAR(80) NOT NULL,
  "gender" VARCHAR(15) NOT NULL,
  "level" INT DEFAULT 1,
  "str_score" INT NOT NULl,
  "dex_score" INT NOT NULL,
  "con_score" INT NOT NULL,
  "int_score" INT NOT NULL,
  "wis_score" INT NOT NULL,
  "cha_score" INT NOT NULL,
  "hit_dice_available" INT NOT NULL DEFAULT 1,
  "current_hit_points" INT,
  "max_hit_points" INT NOT NULL,
  "temporary_hit_points" INT,
  "armor_class" INT NOT NULL,
  "cp_total" INT NOT NULL DEFAULT 0,
  "sp_total" INT NOT NULL DEFAULT 0,
  "ep_total" INT NOT NULL DEFAULT 0,
  "gp_total" INT NOT NULL DEFAULT 0,
  "pp_total" INT NOT NULL DEFAULT 0,
  "experience_points" INT NOT NULL DEFAULT 0,
  "alignment" VARCHAR(20) DEFAULT 'Neutral',
  "background" VARCHAR(100) DEFAULT 'Acolyte',
  "personality_traits" VARCHAR(1000),
  "ideals" VARCHAR(1000),
  "bonds" VARCHAR(1000),
  "flaws" VARCHAR(1000),
  "dm_inspiration" BOOLEAN DEFAULT FALSE,
  "dead" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "classes" (
	"id" SERIAL PRIMARY KEY,
	"class_name" VARCHAR(15) NOT NULL,
  "spellcasting_ability" VARCHAR(15),
  "hit_die" INT NOT NULL,
  "play_style" VARCHAR(15) NOT NULL,
  "magic_style" VARCHAR(15) NOT NULL
);

CREATE TABLE "equipment" (
  "id" SERIAL PRIMARY KEY,
  "api_index" VARCHAR(300) NOT NULL,
  "equipment_name" VARCHAR(300) NOT NULL
);

CREATE TABLE "features" (
	"id" SERIAL PRIMARY KEY,
	"feature_name" VARCHAR(64) NOT NULL,
	"feature_description" TEXT NOT NULL
);

CREATE TABLE "languages" (
  "id" SERIAL PRIMARY KEY,
  "api_index" VARCHAR(300) NOT NULL,
  "language_name" VARCHAR(20) NOT NULL
);

CREATE TABLE "races" (
	"id" SERIAL PRIMARY KEY,
	"race_name" VARCHAR(25) NOT NULL,
  "str_bonus" INT NOT NULL DEFAULT 0,
  "dex_bonus" INT NOT NULL DEFAULT 0,
  "con_bonus" INT NOT NULL DEFAULT 0,
  "int_bonus" INT NOT NULL DEFAULT 0,
  "wis_bonus" INT NOT NULL DEFAULT 0,
  "cha_bonus" INT NOT NULL DEFAULT 0,
  "speed" INT NOT NULL
);

CREATE TABLE "saving_throws" (
  "id" SERIAL PRIMARY KEY,
  "saving_throw_name" VARCHAR(20) NOT NULL
);

CREATE TABLE "skills" (
  "id" SERIAL PRIMARY KEY,
  "skill_name" VARCHAR(30) NOT NULL
);

CREATE TABLE "spells" (
  "id" SERIAL PRIMARY KEY,
  "api_index" VARCHAR(300) NOT NULL,
  "spell_name" VARCHAR(300) NOT NULL,
  "spellcasting_level" INT NOT NULL
);

-- Joining tables

-- Joining tables

CREATE TABLE "characters_classes" (
  "id" SERIAL PRIMARY KEY,  
  "character_id" INT REFERENCES "characters" ON DELETE CASCADE NOT NULL, 
  "class_id" INT REFERENCES "classes" NOT NULL
);

CREATE TABLE "characters_equipment" (
  "id" SERIAL PRIMARY KEY,  
  "character_id" INT REFERENCES "characters" ON DELETE CASCADE NOT NULL,
  "equipment_id" INT REFERENCES "equipment" NOT NULL,
  "qty" INT NOT NULL DEFAULT 1
);

CREATE TABLE "characters_languages" (
  "id" SERIAL PRIMARY KEY,  
  "character_id" INT REFERENCES "characters" ON DELETE CASCADE NOT NULL,
  "language_id" INT REFERENCES "languages" NOT NULL
);

CREATE TABLE "characters_races" (
  "id" SERIAL PRIMARY KEY,
  "character_id" INT REFERENCES "characters" ON DELETE CASCADE NOT NULL,
  "race_id" INT REFERENCES "races" NOT NULL
);

CREATE TABLE "characters_skills" (
  "id" SERIAL PRIMARY KEY,  
  "character_id" INT REFERENCES "characters" ON DELETE CASCADE NOT NULL,
  "skill_id" INT REFERENCES "skills" NOT NULL
);

CREATE TABLE "characters_spells" (
  "id" SERIAL PRIMARY KEY,
  "character_id" INT REFERENCES "characters" ON DELETE CASCADE NOT NULL,
  "spell_id" INT REFERENCES "spells" NOT NULL
);

CREATE TABLE "characters_savingThrows" (
  "id" SERIAL PRIMARY KEY,  
  "character_id" INT REFERENCES "characters" ON DELETE CASCADE NOT NULL,
  "savingThrow_id" INT REFERENCES "saving_throws" NOT NULL
);

CREATE TABLE "classes_features" (
  "id" SERIAL PRIMARY KEY,
  "class_id" INT REFERENCES "classes" NOT NULL,
  "feature_id" INT REFERENCES "features" NOT NULL
);

CREATE TABLE "classes_savingThrows" (
  "id" SERIAL PRIMARY KEY,  
  "class_id" INT REFERENCES "classes" NOT NULL,
  "savingThrow_id" INT REFERENCES "saving_throws" NOT NULL
);

CREATE TABLE "classes_skills" (
  "id" SERIAL PRIMARY KEY,
  "class_id" INT REFERENCES "classes" NOT NULL,
  "skill_id" INT REFERENCES "skills" NOT NULL
);

CREATE TABLE "races_features" (
  "id" SERIAL PRIMARY KEY,
  "race_id" INT REFERENCES "races" NOT NULL,
  "feature_id" INT REFERENCES "features" NOT NULL
);

CREATE TABLE "races_languages" (
  "id" SERIAL PRIMARY KEY,  
  "race_id" INT REFERENCES "races" NOT NULL,
  "language_id" INT REFERENCES "languages" NOT NULL
);

CREATE TABLE "races_skills" (
  "id" SERIAL PRIMARY KEY,
  "race_id" INT REFERENCES "races" NOT NULL,
  "skill_id" INT REFERENCES "skills" NOT NULL
);

------------- INSERTS -------------

------------- Equipment -------------

INSERT INTO "equipment" ( "api_index" , "equipment_name" )
VALUES
    ('abacus', 'Abacus'),
    ('acid-vial', 'Acid (vial)'),
    ('alchemists-fire-flask', 'Alchemist''s fire (flask)'),
    ('alchemists-supplies', 'Alchemist''s supplies'),
    ('amulet', 'Amulet'),
    ('animal-feed-1-day', 'Animal Feed (1 day)'),
    ('antitoxin-vial', 'Antitoxin (vial)'),
    ('arrow', 'Arrow'),
    ('backpack', 'Backpack'),
    ('bagpipes', 'Bagpipes'),
    ('ball-bearings-bag-of-1000', 'Ball bearings (bag of 1,000)'),
    ('barding-breastplate', 'Barding: Breastplate'),
    ('barding-chain-mail', 'Barding: Chain mail'),
    ('barding-chain-shirt', 'Barding: Chain shirt'),
    ('barding-half-plate', 'Barding: Half plate'),
    ('barding-hide', 'Barding: Hide'),
    ('barding-leather', 'Barding: Leather'),
    ('barding-padded', 'Barding: Padded'),
    ('barding-plate', 'Barding: Plate'),
    ('barding-ring-mail', 'Barding: Ring mail'),
    ('barding-scale-mail', 'Barding: Scale mail'),
    ('barding-splint', 'Barding: Splint'),
    ('barding-studded-leather', 'Barding: Studded Leather'),
    ('barrel', 'Barrel'),
    ('basket', 'Basket'),
    ('battleaxe', 'Battleaxe'),
    ('bedroll', 'Bedroll'),
    ('bell', 'Bell'),
    ('bit-and-bridle', 'Bit and bridle'),
    ('blanket', 'Blanket'),
    ('block-and-tackle', 'Block and tackle'),
    ('blowgun', 'Blowgun'),
    ('blowgun-needle', 'Blowgun needle'),
    ('book', 'Book'),
    ('bottle-glass', 'Bottle, glass'),
    ('breastplate', 'Breastplate'),
    ('brewers-supplies', 'Brewer''s supplies'),
    ('bucket', 'Bucket'),
    ('burglars-pack', 'Burglar''s Pack'),
    ('calligraphers-supplies', 'Calligrapher''s supplies'),
    ('caltrops', 'Caltrops'),
    ('camel', 'Camel'),
    ('candle', 'Candle'),
    ('carpenters-tools', 'Carpenter''s tools'),
    ('carriage', 'Carriage'),
    ('cart', 'Cart'),
    ('cartographers-tools', 'Cartographer''s tools'),
    ('case-crossbow-bolt', 'Case, crossbow bolt'),
    ('case-map-or-scroll', 'Case, map or scroll'),
    ('chain-10-feet', 'Chain (10 feet)'),
    ('chain-mail', 'Chain Mail'),
    ('chain-shirt', 'Chain Shirt'),
    ('chalk-1-piece', 'Chalk (1 piece)'),
    ('chariot', 'Chariot'),
    ('chest', 'Chest'),
    ('climbers-kit', 'Climber''s Kit'),
    ('clothes-common', 'Clothes, common'),
    ('clothes-costume', 'Clothes, costume'),
    ('clothes-fine', 'Clothes, fine'),
    ('clothes-travelers', 'Clothes, traveler''s'),
    ('club', 'Club'),
    ('cobblers-tools', 'Cobbler''s tools'),
    ('component-pouch', 'Component pouch'),
    ('cooks-utensils', 'Cook''s utensils'),
    ('crossbow-bolt', 'Crossbow bolt'),
    ('crossbow-hand', 'Crossbow, hand'),
    ('crossbow-heavy', 'Crossbow, heavy'),
    ('crossbow-light', 'Crossbow, light'),
    ('crowbar', 'Crowbar'),
    ('crystal', 'Crystal'),
    ('dagger', 'Dagger'),
    ('dart', 'Dart'),
    ('dice-set', 'Dice set'),
    ('diplomats-pack', 'Diplomat''s Pack'),
    ('disguise-kit', 'Disguise Kit'),
    ('donkey', 'Donkey'),
    ('drum', 'Drum'),
    ('dulcimer', 'Dulcimer'),
    ('dungeoneers-pack', 'Dungeoneer''s Pack'),
    ('elephant', 'Elephant'),
    ('emblem', 'Emblem'),
    ('entertainers-pack', 'Entertainer''s Pack'),
    ('explorers-pack', 'Explorer''s Pack'),
    ('fishing-tackle', 'Fishing tackle'),
    ('flail', 'Flail'),
    ('flask-or-tankard', 'Flask or tankard'),
    ('flute', 'Flute'),
    ('forgery-kit', 'Forgery Kit'),
    ('galley', 'Galley'),
    ('glaive', 'Glaive'),
    ('glassblowers-tools', 'Glassblower''s tools'),
    ('grappling-hook', 'Grappling hook'),
    ('greataxe', 'Greataxe'),
    ('greatclub', 'Greatclub'),
    ('greatsword', 'Greatsword'),
    ('halberd', 'Halberd'),
    ('half-plate', 'Half Plate'),
    ('hammer', 'Hammer'),
    ('hammer-sledge', 'Hammer, sledge'),
    ('handaxe', 'Handaxe'),
    ('healers-kit', 'Healer''s Kit'),
    ('herbalism-kit', 'Herbalism Kit'),
    ('hide', 'Hide'),
    ('holy-water-flask', 'Holy water (flask)'),
    ('horn', 'Horn'),
    ('horse-draft', 'Horse, draft'),
    ('horse-riding', 'Horse, riding'),
    ('hourglass', 'Hourglass'),
    ('hunting-trap', 'Hunting trap'),
    ('ink-1-ounce-bottle', 'Ink (1 ounce bottle)'),
    ('ink-pen', 'Ink pen'),
    ('javelin', 'Javelin'),
    ('jewelers-tools', 'Jeweler''s tools'),
    ('jug-or-pitcher', 'Jug or pitcher'),
    ('keelboat', 'Keelboat'),
    ('ladder-10-foot', 'Ladder (10-foot)'),
    ('lamp', 'Lamp'),
    ('lance', 'Lance'),
    ('lantern-bullseye', 'Lantern, bullseye'),
    ('lantern-hooded', 'Lantern, hooded'),
    ('leather', 'Leather'),
    ('leatherworkers-tools', 'Leatherworker''s tools'),
    ('light-hammer', 'Light hammer'),
    ('lock', 'Lock'),
    ('longbow', 'Longbow'),
    ('longship', 'Longship'),
    ('longsword', 'Longsword'),
    ('lute', 'Lute'),
    ('lyre', 'Lyre'),
    ('mace', 'Mace'),
    ('magnifying-glass', 'Magnifying glass'),
    ('manacles', 'Manacles'),
    ('masons-tools', 'Mason''s tools'),
    ('mastiff', 'Mastiff'),
    ('maul', 'Maul'),
    ('mess-kit', 'Mess Kit'),
    ('mirror-steel', 'Mirror, steel'),
    ('morningstar', 'Morningstar'),
    ('mule', 'Mule'),
    ('navigators-tools', 'Navigator''s tools'),
    ('net', 'Net'),
    ('oil-flask', 'Oil (flask)'),
    ('orb', 'Orb'),
    ('padded', 'Padded'),
    ('painters-supplies', 'Painter''s supplies'),
    ('pan-flute', 'Pan flute'),
    ('paper-one-sheet', 'Paper (one sheet)'),
    ('parchment-one-sheet', 'Parchment (one sheet)'),
    ('perfume-vial', 'Perfume (vial)'),
    ('pick-miners', 'Pick, miner''s'),
    ('pike', 'Pike'),
    ('piton', 'Piton'),
    ('plate', 'Plate'),
    ('playing-card-set', 'Playing card set'),
    ('poison-basic-vial', 'Poison, basic (vial)'),
    ('poisoners-kit', 'Poisoner''s Kit'),
    ('pole-10-foot', 'Pole (10-foot)'),
    ('pony', 'Pony'),
    ('pot-iron', 'Pot, iron'),
    ('potion-of-healing', 'Potion of healing'),
    ('potters-tools', 'Potter''s tools'),
    ('pouch', 'Pouch'),
    ('priests-pack', 'Priest''s Pack'),
    ('quarterstaff', 'Quarterstaff'),
    ('quiver', 'Quiver'),
    ('ram-portable', 'Ram, portable'),
    ('rapier', 'Rapier'),
    ('rations-1-day', 'Rations (1 day)'),
    ('reliquary', 'Reliquary'),
    ('riding', 'Riding'),
    ('ring-mail', 'Ring Mail'),
    ('robes', 'Robes'),
    ('rod', 'Rod'),
    ('rope-hempen-50-feet', 'Rope, hempen (50 feet)'),
    ('rope-silk-50-feet', 'Rope, silk (50 feet)'),
    ('rowboat', 'Rowboat'),
    ('sack', 'Sack'),
    ('saddle-exotic', 'Saddle, Exotic'),
    ('saddle-military', 'Saddle, Military'),
    ('saddle-pack', 'Saddle, Pack'),
    ('saddlebags', 'Saddlebags'),
    ('sailing-ship', 'Sailing ship'),
    ('scale-mail', 'Scale Mail'),
    ('scale-merchants', 'Scale, merchant''s'),
    ('scholars-pack', 'Scholar''s Pack'),
    ('scimitar', 'Scimitar'),
    ('sealing-wax', 'Sealing wax'),
    ('shawm', 'Shawm'),
    ('shield', 'Shield'),
    ('shortbow', 'Shortbow'),
    ('shortsword', 'Shortsword'),
    ('shovel', 'Shovel'),
    ('sickle', 'Sickle'),
    ('signal-whistle', 'Signal whistle'),
    ('signet-ring', 'Signet ring'),
    ('sled', 'Sled'),
    ('sling', 'Sling'),
    ('sling-bullet', 'Sling bullet'),
    ('smiths-tools', 'Smith''s tools'),
    ('soap', 'Soap'),
    ('spear', 'Spear'),
    ('spellbook', 'Spellbook'),
    ('spike-iron', 'Spike, iron'),
    ('splint', 'Splint'),
    ('sprig-of-mistletoe', 'Sprig of mistletoe'),
    ('spyglass', 'Spyglass'),
    ('stabling-1-day', 'Stabling (1 day)'),
    ('staff', 'Staff'),
    ('studded-leather', 'Studded Leather'),
    ('tent-two-person', 'Tent, two-person'),
    ('thieves-tools', 'Thieves'' tools'),
    ('tinderbox', 'Tinderbox'),
    ('tinkers-tools', 'Tinker''s tools'),
    ('torch', 'Torch'),
    ('totem', 'Totem'),
    ('trident', 'Trident'),
    ('vial', 'Vial'),
    ('viol', 'Viol'),
    ('wagon', 'Wagon'),
    ('wand', 'Wand'),
    ('war-pick', 'War pick'),
    ('warhammer', 'Warhammer'),
    ('warhorse', 'Warhorse'),
    ('warship', 'Warship'),
    ('waterskin', 'Waterskin'),
    ('weavers-tools', 'Weaver''s tools'),
    ('whetstone', 'Whetstone'),
    ('whip', 'Whip'),
    ('woodcarvers-tools', 'Woodcarver''s tools'),
    ('wooden-staff', 'Wooden staff'),
    ('yew-wand', 'Yew wand');

------------- Classes -------------
INSERT INTO "classes" ("class_name", "spellcasting_ability", "hit_die", "play_style", "magic_style")
VALUES 
    ('Barbarian', 'None', 12, 'hackAndSlash', 'noMagic'),	-- 1
    ('Bard', 'Charisma', 8, 'roleplay', 'arcane'), 	    -- 2
    ('Cleric', 'Wisdom', 8, 'roleplay', 'divineNatural'),    	-- 3
    ('Druid', 'Wisdom', 8, 'roleplay', 'divineNatural' ), 	  	-- 4
    ('Fighter', 'None', 10, 'hackAndSlash', 'noMagic'),   	-- 5
    ('Monk', 'None', 8, 'hackAndSlash', 'noMagic'), 	   	-- 6
    ('Paladin', 'Charisma', 10, 'hackAndSlash', 'divineNatural'),   	-- 7
    ('Ranger', 'Wisdom', 10,  'hackAndSlashh', 'divineNatural'),	   	-- 8
    ('Rogue', 'None', 8, 'roleplay', 'noMagic'),	   	-- 9
    ('Sorcerer', 'Charisma', 6, 'hackAndSlash', 'arcane'),  	-- 10
    ('Warlock', 'Charisma', 8, 'roleplay', 'arcane'),  	-- 11
    ('Wizard', 'Intelligence', 6, 'roleplay', 'arcane');	   	-- 12

------------ Class Features -------------
INSERT INTO "features" ("feature_name", "feature_description")
VALUES
    ('Rage', 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.

    While raging, you gain the following benefits if you aren''t wearing heavy armor:

    - You have advantage on Strength checks and Strength saving throws.
    - When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.
    - You have resistance to bludgeoning, piercing, and slashing damage.

    If you are able to cast spells, you can''t cast them or concentrate on them while raging.

    Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven''t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.

    Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.'),	-- 1 Barbarian
    ('Unarmored Defense', 'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.'),	-- 2 Barbarian
    ('Spellcasting', 'You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music.

    Your spells are part of your vast repertoire, magic that you can tune to different situations.'),	-- 3 Bard
    ('Bardic Inspiration', 'You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.

    Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the GM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.

    You can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain any expended uses when you finish a long rest.

    Your Bardic Inspiration die changes when you reach certain levels in this class. The die becomes a d8 at 5th level, a d10 at 10th level, and a d12 at 15th level.'),	-- 4 Bard
    ('Spellcasting', 'As a conduit for divine power, you can cast cleric spells.'),	-- 5 Cleric
    ('Life Domain', 'The Life domain focuses on the vibrant positive energy-one of the fundamental forces of the universe-that sustains all life. The gods of life promote vitality and health through healing the sick and wounded, caring for those in need, and driving away the forces of death and undeath. Almost any non-evil deity can claim influence over this domain, particularly agricultural deities (such as Chauntea, Arawai, and Demeter), sun gods (such as Lathander, Pelor, and Re-Horakhty), gods of healing or endurance (such as Ilmater, Mishakal, Apollo, and Diancecht), and gods of home and community (such as Hestia, Hathor, and Boldrei).

    When you choose this domain at 1st level, you gain proficiency with heavy armor. 

    Also starting at 1st level, your healing spells are more effective. Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell''s level.'),	-- 6 Cleric
    ('Druidic', 'You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages. You and others who know this language automatically spot such a message. Others spot the message''s presence with a successful DC 15 Wisdom (Perception) check but can''t decipher it without magic.'),	-- 7 Druid
    ('Spellcasting', 'Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will.'),	-- 8 Druid
    ('Fighting Style: Great Weapon', 'When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.'),	-- 9 Fighter
    ('Second Wind', 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.'),	-- 10 Fighter
    ('Unarmored Defense', 'Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.'),	-- 11 Monk
    ('Martial Arts', 'At 1st level, your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don''t have the two- handed or heavy property.

    You gain the following benefits while you are unarmed or wielding only monk weapons and you aren''t wearing armor or wielding a shield:

    - You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and monk weapons.
    - You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table.
    - When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven''t already taken a bonus action this turn.

    Certain monasteries use specialized forms of the monk weapons. For example, you might use a club that is two lengths of wood connected by a short chain (called a nunchaku) or a sickle with a shorter, straighter blade (called a kama). Whatever name you use for a monk weapon, you can use the game statistics provided for the weapon.'),	-- 12 Monk
    ('Divine Sense', 'The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type (celestial, fiend, or undead) of any being whose presence you sense, but not its identity (the vampire Count Strahd von Zarovich, for instance). Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the *hallow* spell.

    You can use this feature a number of times equal to 1 + your Charisma modifier. When you finish a long rest, you regain all expended uses.'),	-- 13 Paladin
    ('Lay on Hands', 'Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5.

    As an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.

    Alternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.

    This feature has no effect on undead and constructs.'),	-- 14 Paladin
    ('Favored Enemy', 'Beginning at 1st level, you have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.

    Choose a type of favored enemy: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. Alternatively, you can select two races of humanoid (such as gnolls and orcs) as favored enemies.

    You have advantage on Wisdom (Survival) checks to track your favored enemies, as well as on Intelligence checks to recall information about them.

    When you gain this feature, you also learn one language of your choice that is spoken by your favored enemies, if they speak one at all.

    You choose one additional favored enemy, as well as an associated language, at 6th and 14th level. As you gain levels, your choices should reflect the types of monsters you have encountered on your adventures.'),	-- 15 Ranger
    ('Natural Explorer', 'You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions. Choose one type of favored terrain: arctic, coast, desert, forest, grassland, mountain, or swamp. When you make an Intelligence or Wisdom check related to your favored terrain, your proficiency bonus is doubled if you are using a skill that you''re proficient in.

    While traveling for an hour or more in your favored terrain, you gain the following benefits:

    - Difficult terrain doesn''t slow your group''s travel.
    - Your group can''t become lost except by magical means.
    - Even when you are engaged in another activity while traveling (such as foraging, navigating, or tracking), you remain alert to danger.
    - If you are traveling alone, you can move stealthily at a normal pace.
    - When you forage, you find twice as much food as you normally would.
    - While tracking other creatures, you also learn their exact number, their sizes, and how long ago they passed through the area.

    You choose additional favored terrain types at 6th and 10th level.'),	-- 16 Ranger
    ('Expertise', 'At 1st level, choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves'' tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.

    At 6th level, you can choose two more of your proficiencies (in skills or with thieves'' tools) to gain this benefit.'),	-- 17 Rogue
    ('Sneak Attack', 'Beginning at 1st level, you know how to strike subtly and exploit a foe''s distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon.

    You don''t need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn''t incapacitated, and you don''t have disadvantage on the attack roll.

    The amount of the extra damage increases as you gain levels in this class, as shown in the Sneak Attack column of the Rogue table.'),	-- 18 Rogue
    ('Thieves'' Cant', 'During your rogue training you learned thieves'' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation. Only another creature that knows thieves'' cant understands such messages. It takes four times longer to convey such a message than it does to speak the same idea plainly.

    In addition, you understand a set of secret signs and symbols used to convey short, simple messages, such as whether an area is dangerous or the territory of a thieves'' guild, whether loot is nearby, or whether the people in an area are easy marks or will provide a safe house for thieves on the run.'),	-- 19 Rogue
    ('Spellcasting', 'An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic. This font of magic, whatever its origin, fuels your spells.'),	-- 20 Sorcerer
    ('Draconic Bloodline Sorcerous Origin', 'Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors. Most often, sorcerers with this origin trace their descent back to a mighty sorcerer of ancient times who made a bargain with a dragon or who might even have claimed a dragon parent. Some of these bloodlines are well established in the world, but most are obscure. Any given sorcerer could be the first of a new bloodline, as a result of a pact or some other exceptional circumstance.'),	-- 21 Sorcerer
    ('Dragon Ancestor', 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.
 
    Black (Acid), Blue (Lightning), Brass (Fire), Bronze (Lightning), Copper (Acid), Gold (Fire), Green (Poison), Red (Fire), Silver (Cold), and White (Cold).

    You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.'),	-- 22 Sorcerer
    ('Draconic Resilience', 'As magic flows through your body, it causes physical traits of your dragon ancestors to emerge. At 1st level, your hit point maximum increases by 1 and increases by 1 again whenever you gain a level in this class.

    Additionally, parts of your skin are covered by a thin sheen of dragon-like scales. When you aren''t wearing armor, your AC equals 13 + your Dexterity modifier.'),	-- 23 Sorcerer
    ('The Fiend Patron', 'You have made a pact with a fiend from the lower planes of existence, a being whose aims are evil, even if you strive against those aims. Such beings desire the corruption or destruction of all things, ultimately including you. Fiends powerful enough to forge a pact include demon lords such as Demogorgon, Orcus, Fraz''Urb-luu, and Baphomet; archdevils such as Asmodeus, Dispater, Mephistopheles, and Belial; pit fiends and balors that are especially mighty; and ultroloths and other lords of the yugoloths.'),	-- 24 Warlock
    ('Expanded Spell List', 'The Fiend lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.
    
      1st Level Spells: burning hands, command. 2nd Level Spells: blindness/deafness, scorching ray. 3rd Level Spells: fireball, stinking cloud. 4th Level Spells: fire shield, wall of fire. 5th Level Spells: flame strike, hallow. '),	-- 25 Warlock
    ('Dark One''s Blessing', 'Starting at 1st level, when you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1).'),	-- 26 Warlock
    ('Spellcasting', 'As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.'),	-- 27 Wizard
    ('Arcane Recovery', 'You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.

    For example, if you''re a 4th-level wizard, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level spell slot or two 1st-level spell slots.'), -- 28 Wizard
    ('Darkvision', 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can''t discern color in darkness, only shades of gray.'),  -- 29 Dwarf, Gnome
    ('Dwarven Resilience', 'You have advantage on saving throws against poison, and you have resistance against poison damage.'), -- 30 Dwarf
    ('Dwarven Combat Training', 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.'), -- 31 Dwarf
    ('Tool Proficiency', 'You gain proficiency with the artisan''s tools of your choice: smith''s tools, brewer''s supplies, or mason''s tools.'), -- 32 Dwarf
    ('Stonecunning', 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.'), -- 33 Dwarf
    ('Darkvision', 'Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can''t discern color in darkness, only shades of gray.'), -- 34 Elf
    ('Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can''t put you to sleep.'), -- 35 Elf, Half-Elf
    ('Trance', 'Elves don''t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is "trance.") While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice.

      After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.'), -- 36 Elf
    ('Elf Weapon Training', 'You have proficiency with the longsword, shortsword, shortbow, and longbow.'), -- 37 Elf
    ('Lucky', 'When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.'), -- 38 Halfling
    ('Brave', 'You have advantage on saving throws against being frightened.'), -- 39 Halfling
    ('Halfling Nimbleness', 'You can move through the space of any creature that is of a size larger than yours.'), -- 40 Halfling
    ('Naturally Stealthy', 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.'), -- 41 Halfling
    ('Draconic Ancestry', 'You have draconic ancestry related to Red Dragons. Your breath weapon is determined by the type of dragons your ancestors were.'), -- 42 Dragonborn
    ('Breath Weapon', 'You can use your action to exhale destructive energy. Your Breath Weapon deals fire damage to every creature within a 15ft cone originiting from you.

      When you use your breath weapon, each creature in the area of the exhalation must make a dexterity saving throw. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.

      After you use your breath weapon, you can''t use it again until you complete a short or long rest.'), -- 43 Dragonborn
    ('Damage Resistance', 'You have resistance to the damage type associated with your draconic ancestry.'), -- 44 Dragonborn
    ('Gnome Cunning', 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.'), -- 45 Gnome
    ('Artificer''s Lore', 'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.'), -- 46 Gnome
    ('Tinker', 'You have proficiency with artisan''s tools (tinker''s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time.

      When you create a device, choose one of the following options:'), -- 47 Gnome
    ('Clockwork Toy', 'This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents.'), -- 48 Gnome
    ('Fire Starter', 'The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action.'), -- 49 Gnome
    ('Music Box', 'When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song''s end or when it is closed.'), -- 50 Gnome
    ('Darkvision', 'Thanks to your elf blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can''t discern color in darkness, only shades of gray.'), -- 51 Half-Elf
    ('Darkvision', 'Thanks to your orc blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can''t discern color in darkness, only shades of gray.'), -- 52  Half-Orc
    ('Relentless Endurance', ' When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can''t use this feature again until you finish a long rest.'), -- 53  Half-Orc
    ('Savage Attacks', 'When you score a critical hit with a melee weapon attack, you can roll one of the weapon''s damage dice one additional time and add it to the extra damage of the critical hit.'), -- 54  Half-Orc
    ('Darkvision', 'Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can''t discern color in darkness, only shades of gray.'), -- 55 Tiefling
    ('Hellish Resistance', 'You have resistance to fire damage.'), -- 56 Tiefling
    ('Infernal Legacy', 'You know the *thaumaturgy* cantrip. When you reach 3rd level, you can cast the *hellish rebuke* spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the *darkness* spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.'), -- 57 Tiefling
    ('Dwarven Toughness', 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.'); -- 58 Dwarf

------------ Spells Cantrips(0) & Level 1 -------------
INSERT INTO "spells" ( "api_index" , "spell_name" , "spellcasting_level" )
VALUES
    ('acid-splash', 'Acid Splash', '0'),
    ('chill-touch', 'Chill Touch', '0'),
    ('dancing-lights', 'Dancing Lights', '0'),
    ('druidcraft', 'Druidcraft', '0'),
    ('eldritch-blast', 'Eldritch Blast', '0'),
    ('fire-bolt', 'Fire Bolt', '0'),
    ('guidance', 'Guidance', '0'),
    ('light', 'Light', '0'),
    ('mage-hand', 'Mage Hand', '0'),
    ('mending', 'Mending', '0'),
    ('message', 'Message', '0'),
    ('minor-illusion', 'Minor Illusion', '0'),
    ('poison-spray', 'Poison Spray', '0'),
    ('prestidigitation', 'Prestidigitation', '0'),
    ('produce-flame', 'Produce Flame', '0'),
    ('ray-of-frost', 'Ray of Frost', '0'),
    ('resistance', 'Resistance', '0'),
    ('sacred-flame', 'Sacred Flame', '0'),
    ('shillelagh', 'Shillelagh', '0'),
    ('shocking-grasp', 'Shocking Grasp', '0'),
    ('spare-the-dying', 'Spare the Dying', '0'),
    ('thaumaturgy', 'Thaumaturgy', '0'),
    ('true-strike', 'True Strike', '0'),
    ('vicious-mockery', 'Vicious Mockery', '0'),
    ('alarm', 'Alarm', '1'),
    ('animal-friendship', 'Animal Friendship', '1'),
    ('bane', 'Bane', '1'),
    ('bless', 'Bless', '1'),
    ('burning-hands', 'Burning Hands', '1'),
    ('charm-person', 'Charm Person', '1'),
    ('color-spray', 'Color Spray', '1'),
    ('command', 'Command', '1'),
    ('comprehend-languages', 'Comprehend Languages', '1'),
    ('create-or-destroy-water', 'Create or Destroy Water', '1'),
    ('cure-wounds', 'Cure Wounds', '1'),
    ('detect-evil-and-good', 'Detect Evil and Good', '1'),
    ('detect-magic', 'Detect Magic', '1'),
    ('detect-poison-and-disease', 'Detect Poison and Disease', '1'),
    ('disguise-self', 'Disguise Self', '1'),
    ('divine-favor', 'Divine Favor', '1'),
    ('entangle', 'Entangle', '1'),
    ('expeditious-retreat', 'Expeditious Retreat', '1'),
    ('faerie-fire', 'Faerie Fire', '1'),
    ('false-life', 'False Life', '1'),
    ('feather-fall', 'Feather Fall', '1'),
    ('find-familiar', 'Find Familiar', '1'),
    ('floating-disk', 'Floating Disk', '1'),
    ('fog-cloud', 'Fog Cloud', '1'),
    ('goodberry', 'Goodberry', '1'),
    ('grease', 'Grease', '1'),
    ('guiding-bolt', 'Guiding Bolt', '1'),
    ('healing-word', 'Healing Word', '1'),
    ('hellish-rebuke', 'Hellish Rebuke', '1'),
    ('heroism', 'Heroism', '1'),
    ('hideous-laughter', 'Hideous Laughter', '1'),
    ('hunters-mark', 'Hunter''s Mark', '1'),
    ('identify', 'Identify', '1'),
    ('illusory-script', 'Illusory Script', '1'),
    ('inflict-wounds', 'Inflict Wounds', '1'),
    ('jump', 'Jump', '1'),
    ('longstrider', 'Longstrider', '1'),
    ('mage-armor', 'Mage Armor', '1'),
    ('magic-missile', 'Magic Missile', '1'),
    ('protection-from-evil-and-good', 'Protection from Evil and Good', '1'),
    ('purify-food-and-drink', 'Purify Food and Drink', '1'),
    ('sanctuary', 'Sanctuary', '1'),
    ('shield', 'Shield', '1'),
    ('shield-of-faith', 'Shield of Faith', '1'),
    ('silent-image', 'Silent Image', '1'),
    ('sleep', 'Sleep', '1'),
    ('speak-with-animals', 'Speak with Animals', '1'),
    ('thunderwave', 'Thunderwave', '1'),
    ('unseen-servant', 'Unseen Servant', '1');


------------ Languages -------------
INSERT INTO "languages" ( "api_index" , "language_name" )
VALUES
    ('abyssal', 'Abyssal'),
    ('celestial', 'Celestial'),
    ('common', 'Common'),
    ('deep-speech', 'Deep Speech'),
    ('draconic', 'Draconic'),
    ('dwarvish', 'Dwarvish'),
    ('elvish', 'Elvish'),
    ('giant', 'Giant'),
    ('gnomish', 'Gnomish'),
    ('goblin', 'Goblin'),
    ('halfling', 'Halfling'),
    ('infernal', 'Infernal'),
    ('orc', 'Orc'),
    ('primordial', 'Primordial'),
    ('sylvan', 'Sylvan'),
    ('undercommon', 'Undercommon');

------------ Skills -------------
INSERT INTO "skills" ( "skill_name" )
VALUES
    ('Acrobatics (Dex)'),       -- 1
    ('Animal Handling (Wis)'),  -- 2 
    ('Arcana (Int)'), -- 3
    ('Athletics (Str)'), -- 4
    ('Deception (Cha)'),-- 5
    ('History (Int)'), -- 6
    ('Insight (Wis)'), -- 7
    ('Intimidation (Cha)'), -- 8
    ('Investigation (Int)'), -- 9 
    ('Medicine (Wis)'), -- 10
    ('Nature (Int)'), -- 11
    ('Perception (Wis)'), -- 12
    ('Performance (Cha)'), -- 13
    ('Persuasion (Cha)'), -- 14
    ('Religion (Int)'),  -- 15
    ('Sleight of Hand (Dex)'), -- 16
    ('Stealth (Dex)'), -- 17
    ('Survival (Wis)'); -- 18

------------ Races -------------
INSERT INTO "races" ( "race_name" , "str_bonus" , "dex_bonus" , "con_bonus" , "int_bonus" , "wis_bonus" , "cha_bonus" , "speed" )
VALUES
    ('Dragonborn', 2, 0, 0, 0, 0, 1, 30),
    ('Hill Dwarf', 0, 0, 2, 0, 1, 0, 25),
    ('High Elf', 0, 2, 0, 1, 0, 0, 30),
    ('Gnome', 0, 0, 1, 2, 0, 0, 25),
    ('Half-Elf', 0, 1, 0, 1, 0, 2, 30),
    ('Half-Orc', 2, 0, 1, 0, 0, 0, 30),
    ('Lightfoot Halfling', 0, 2, 0, 0, 0, 1, 25),
    ('Human', 1, 1, 1, 1, 1, 1, 30),
    ('Tiefling', 0, 0, 0, 1, 0, 2, 30);

------------ saving_throws -------------  
INSERT INTO "saving_throws" ( "saving_throw_name" )
VALUES 
    ('Strength'),
    ('Dexterity'),
    ('Constitution'),
    ('Intelligence'),
    ('Wisdom'),
    ('Charisma');

------------ classes_features -------------  
INSERT INTO "classes_features" ( "class_id", "feature_id" )
VALUES 
    (1, 1), (1, 2),	-- Barbarian
    (2, 3), (2, 4), 	    -- Bard
    (3, 5), (3, 6),    	-- Cleric
    (4, 7), (4, 8), 	  	-- Druid
    (5, 9), (5, 10),  	-- Fighter
    (6, 11), (6, 12), 	   	-- Monk
    (7, 13), (7, 14),  	-- Paladin
    (8, 15),	(8, 16),   	-- Ranger
    (9, 17),	(9, 18), (9, 19),   	-- Rogue
    (10, 20), (10, 21), (10, 22), (10, 23),	-- Sorcerer
    (11, 24), (11, 25), (11, 26), 	-- Warlock
    (12, 27), (12, 27);	   	-- Wizard

------------ classes_savingThrows -------------  
INSERT INTO "classes_savingThrows" ( "class_id", "savingThrow_id" )
VALUES 
    (1, 1), (1, 3),	-- Barbarian
    (2, 2), (2, 6), 	    -- Bard
    (3, 5), (3, 6),    	-- Cleric
    (4, 4), (4, 5), 	  	-- Druid
    (5, 1), (5, 3),  	-- Fighter
    (6, 1), (6, 2), 	   	-- Monk
    (7, 5), (7, 6),  	-- Paladin
    (8, 1),	(8, 2),   	-- Ranger
    (9, 2),	(9, 4),   	-- Rogue
    (10, 3), (10, 6),  	-- Sorcerer
    (11, 5), (11, 6), 	-- Warlock
    (12, 4), (12, 5);	   	-- Wizard

------------ classes_skills -------------  
INSERT INTO "classes_skills" ( "class_id", "skill_id" )
VALUES 
    (1, 4), (1, 18),	-- Barbarian
    (2, 13), (2, 14), (2, 5), 	    -- Bard
    (3, 10), (3, 14),    	-- Cleric
    (4, 2), (4, 11), 	  	-- Druid
    (5, 4), (5, 18),  	-- Fighter
    (6, 4), (6, 17), 	   	-- Monk
    (7, 4), (7, 10),  	-- Paladin
    (8, 1),	(8, 17), (8, 18),   	-- Ranger
    (9, 4),	(9, 9), (9, 16), (9, 17),  	-- Rogue
    (10, 3), (10, 5),  	-- Sorcerer
    (11, 3), (11, 5), 	-- Warlock
    (12, 3), (12, 9);	   	-- Wizard

------------ RACES_FEATURES -------------   
INSERT INTO "races_features" ( "race_id", "feature_id")
VALUES
    (1, 42), (1, 43), (1, 44),                                      -- Dragonborn
    (2, 29), (2, 30), (2, 31), (2, 32), (2, 33), (2, 58),           -- Dwarf
    (3, 34), (3, 35), (3, 36), (3, 37),                             -- Elf
    (4, 29), (4, 45), (4, 46), (4, 47), (4, 48), (4, 49), (4, 50),  -- Gnome
    (5, 35), (5, 51),                                               -- Half-Elf
    (6, 52), (6, 53), (6, 54),                                       -- Half-Orc
    (7, 38), (7, 39), (7, 40), (7, 41),                             -- Halfling
    -- No human features
    (9, 55), (9, 56), (9, 57);                                      -- Tiefling

------------ RACES_LANGUAGES -------------  
INSERT INTO "races_languages" ( "race_id", "language_id")
VALUES 
    (1, 3), (1, 5),                   -- Dragonborn
    (2, 3), (2, 6),                   -- Dwarf
    (3, 3), (3, 7), (3, 15),          -- Elf
    (4, 3), (4, 9),                   -- Gnome
    (5, 3), (5, 7), (5, 15),   -- Half-Elf
    (6, 3), (6, 13),           -- Half-Orc
    (7, 3), (7, 11),                   -- Halfling
    (8, 3), (8, 6),                   -- human
    (9, 3), (9, 12);                   -- Tiefling


------------ RACES_SKILLS -------------  
-- Since acolyte is the only background availble in srd all races gain access to its skills
INSERT INTO "races_skills" ( "race_id", "skill_id")
VALUES 
    (1, 7), (1, 15),                   -- No Dragonborn Skills
    (2, 7), (2, 15),                   -- No Dwarf
    (3, 7), (3, 15), (3, 12),          -- Elf
    (4, 7), (4, 15),                   -- No Gnome
    (5, 7), (5, 15), (5, 1), (5, 12),  -- Half-Elf
    (6, 7), (6, 15), (6, 8),           -- Half-Orc
    (7, 7), (7, 15),                   -- No Halfling
    (8, 7), (8, 15),                   -- No human Skills
    (9, 7), (9, 15);                   -- No Tiefling

