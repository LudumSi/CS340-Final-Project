-- Data Definition
--Blacksmith Table
CREATE TABLE blacksmith (
`id` int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`username` varchar(255) UNIQUE NOT NULL,
`password` varchar(255) NOT NULL,
`fname` varchar(255) NOT NULL,
`lname` varchar(255) NOT NULL,
`dob` date NOT NULL,
`experience` int(11) NOT NULL,
`kingdom` varchar(255) NOT NULL,
`village` varchar(255) NOT NULL
)ENGINE = INNODB;

--specialty Table
CREATE TABLE smth_specialty (
`specialty` varchar(255) NOT NULL,
`smth_id` int(11) NOT NULL,
FOREIGN KEY (smth_id) REFERENCES blacksmith(id),
PRIMARY KEY (`specialty`,`smth_id`)
)ENGINE = INNODB;

--Trainig Table
CREATE TABLE smth_training (
`mentor` int(11) NOT NULL,
`mentee` int(11) NOT NULL,
`start_date` date NOT NULL,
`end_date` date,
FOREIGN KEY (mentor) REFERENCES blacksmith(id),
FOREIGN KEY (mentee) REFERENCES blacksmith(id),
PRIMARY KEY (`mentor`,`mentee`)
)ENGINE = INNODB;

--Material Table
CREATE TABLE material (
`name` varchar(255) NOT NULL PRIMARY KEY,
`color` varchar(255) NOT NULL,
`hardness` int(11) NOT NULL,
`weight` int(11) NOT NULL,
`cost` float NOT NULL,
`exeprienceReq` int(11) NOT NULL
)ENGINE = INNODB;

--Weapon Table
CREATE TABLE weapon (
`name` varchar(255) NOT NULL PRIMARY KEY,
`type` varchar(255) NOT NULL,
`cost` float NOT NULL,
`smth_id` int(11) NOT NULL,
FOREIGN KEY (smth_id) REFERENCES blacksmith(id)
)ENGINE = INNODB;

--Enchantment Table
CREATE TABLE enchantment (
`name` varchar(255) NOT NULL PRIMARY KEY,
`magicType` varchar(255) NOT NULL
)ENGINE = INNODB;

--Owning Materials Table
CREATE TABLE smth_own (
`smth_id` int(11) NOT NULL,
`mat_name` varchar(255) NOT NULL,
`amount` int(11) NOT NULL,
FOREIGN KEY (smth_id) REFERENCES blacksmith(id),
FOREIGN KEY (mat_name) REFERENCES material(name),
PRIMARY KEY (`smth_id`,`mat_name`)
)ENGINE = INNODB;

--Weapon's Materials Table
CREATE TABLE wpn_mat (
`wpn_name` varchar(255) NOT NULL,
`mat_name` varchar(255) NOT NULL,
`mat_amount` int(11) NOT NULL,
FOREIGN KEY (wpn_name) REFERENCES weapon(name),
FOREIGN KEY (mat_name) REFERENCES material(name),
PRIMARY KEY (`mat_name`,`wpn_name`)
)ENGINE = INNODB;

--Weapon's Magic Table
CREATE TABLE wpn_magic (
`wpn_name` varchar(255) NOT NULL,
`magic_name` varchar(255) NOT NULL,
FOREIGN KEY (wpn_name) REFERENCES weapon(name),
FOREIGN KEY (magic_name) REFERENCES enchantment(name),
PRIMARY KEY (`magic_name`,`wpn_name`)
)ENGINE = INNODB;

--Enchantment's Table
CREATE TABLE magic_reqs (
`magic_name` varchar(255) NOT NULL,
`mat_name` varchar(255) NOT NULL,
`amount` int(11) NOT NULL,
FOREIGN KEY (magic_name) REFERENCES enchantment(name),
FOREIGN KEY (mat_name) REFERENCES material(name),
PRIMARY KEY (`magic_name`,`mat_name`)
)ENGINE = INNODB;

--Sample Data Populations
--Sample Blacksmiths
INSERT blacksmith (username,password,fname,lname,dob,experience,kingdom,village) VALUES
('DapperDan','danstheman1','Davy','Aderlard','1950-01-01',1,'Southerland','The Esteemed Village of Durt'),
('Lancelot','gwenishot','Lancelin','Hickie','1950-02-01',1,'Southerland','Glochteshire'),
('JosesR','redseaman','Joses','Rawkin','1950-01-12',1,'Southerland','Sussex'),
('CrystalSkull','indie4ever','Crystina','Gieffrinnet','1951-01-01',1,'Valencia','Corvallis'),
('Scottsgirl405','broadswordlife','Jodoca','Adhelissa','1953-04-01',2,'Valencia','Washington'),
('Typhoont','123456isabadpassword','Typhenete','Gunneuare','1956-07-01',2,'Valencia','Arnesonia'),
('Cleverusername','beige','Imme','Boaerd','1950-01-02',2,'Valencia','Clever Village Name'),
('IsoJ','oranges43','Isobella','Juiccey','1950-01-03',3,'Cimmeria','Boredom'),
('Balderisbetter','hairisfornerds','Tibald','Federyc','1950-01-04',3,'Cimmeria','Data Entry Sucks'),
('Latinlover','ettubrutus','Jacobus','Raynaldus','1950-05-04',3,'Cimmeria','Honesty');

--Sample Materials
INSERT material VALUES
('Aero Copper','red',6,11.76,20,1),
('Mild Tin','grey',7,89.69,10,1),
('Abberant Diamond','clear',1,42.01,10,2),
('Grand Iron','grey',8,30.3,12,3),
('Mystery Brick','pink',10,666.6,4,3),
('Volatile Linen','white',2,100,2,2),
('Shady Cotton','white',5,120.34,3,1),
('Lucky Zinc','grey',5,62.79,15,1),
('Nightmare Fibre','black',4,10.8,4,2),
('Demon Skin','red',9,67.7,10,3);

--Sample Weapons
INSERT weapon VALUES
('Michael''s Last Weapon','dagger',436,1),
('The Weapon of Truth','spear',343,2),
('Cereberus','spear',735,3),
('Tollbell','spear',576,4),
('Arcane Fury','spear',327,5),
('Backslasher','axe',273,6),
('Cimmerian Steel','sword',234,7),
('Red Margo''s Weapon','spear',838,8),
('Obstacle Break','sword',409,9),
('The Tenth Weapon','axe',279,10);

--Sample Enchantments
INSERT enchantment VALUES
('Astounding Ball of Bad Hygene','holy'),
('Cabalistic Warp of Sausage','holy'),
('Conceal Sweat Spirit','spirit'),
('Grand Chant of the Lounge Singers','spirit'),
('Great Noodles Ball','arcane'),
('Invocation of Baldness','runic'),
('Florist-bane','holy'),
('Invocation of Acne','demonic'),
('Evocation of Cheese','arcane'),
('Summon Caffeine','demonic');

--Sample Specialties
INSERT smth_specialty VALUES
('unusual materials',10),
('innovate designs',2),
('unusual materials',2),
('artisan requests',3),
('decorative handles',3),
('novelty weapons',5),
('wiggly daggers',5),
('artisan requests',10),
('edge honing',1),
('ironworking',4),
('wiggly daggers',9);

--Sample Training
INSERT smth_training VALUES
(3,10, '2000-01-02', '2000-01-03'),
(7,10, '2000-01-04', '2000-01-05'),
(5,10, '2000-01-05', '2000-01-06'),
(8,10, '2000-02-01', '2000-02-05'),
(6,10, '2000-02-06', NULL),
(6,5, '1990-01-02', '2000-01-04'),
(1,8, '2000-05-10', NULL),
(7,2, '2000-10-20', '2001-02-03'),
(2,3, '2010-02-03', '2010-09-08'),
(9,7, '2001-03-04', '2002-03-04');

--Sample Material Owns
INSERT smth_own VALUES
(1,'Aero Copper',93),
(1,'Abberant Diamond',15),
(1,'Volatile Linen',41),
(1,'Nightmare Fibre',187),
(1,'Demon Skin',129),
(1,'Shady Cotton',84),
(2,'Lucky Zinc',65),
(2,'Mystery Brick',61),
(4,'Nightmare Fibre',32),
(4,'Lucky Zinc',51),
(4,'Grand Iron',15),
(6,'Abberant Diamond',27),
(6,'Nightmare Fibre',33),
(6,'Mild Tin',23),
(6,'Grand Iron',158),
(8,'Demon Skin',139),
(9,'Shady Cotton',37);

--Sample Weapon's Materials
INSERT wpn_mat VALUES
('Michael''s Last Weapon','Mystery Brick', 3),
('The Weapon of Truth','Abberant Diamond', 4),
('Cereberus','Abberant Diamond', 5),
('Tollbell','Volatile Linen', 6),
('Arcane Fury','Abberant Diamond', 7),
('Backslasher','Aero Copper', 20),
('Cimmerian Steel','Abberant Diamond', 3000),
('Red Margo''s Weapon','Shady Cotton', 450),
('Obstacle Break','Lucky Zinc', 88),
('The Tenth Weapon','Grand Iron', 1);

--Sample Weapon's Magic
INSERT wpn_magic VALUES
('Michael''s Last Weapon','Evocation of Cheese'),
('Michael''s Last Weapon','Grand Chant of the Lounge Singers'),
('Michael''s Last Weapon','Cabalistic Warp of Sausage'),
('Michael''s Last Weapon','Conceal Sweat Spirit'),
('Michael''s Last Weapon','Summon Caffeine'),
('Cereberus','Great Noodles Ball'),
('Tollbell','Grand Chant of the Lounge Singers'),
('Arcane Fury','Invocation of Acne'),
('Backslasher','Evocation of Cheese'),
('Red Margo''s Weapon','Grand Chant of the Lounge Singers'),
('Red Margo''s Weapon','Cabalistic Warp of Sausage'),
('Red Margo''s Weapon','Invocation of Acne'),
('Red Margo''s Weapon','Astounding Ball of Bad Hygene'),
('Obstacle Break','Conceal Sweat Spirit'),
('The Tenth Weapon','Astounding Ball of Bad Hygene'),
('The Tenth Weapon','Invocation of Baldness'),
('The Tenth Weapon','Cabalistic Warp of Sausage');

--Sample Enchantment's Materials
INSERT magic_reqs VALUES
('Astounding Ball of Bad Hygene','Mystery Brick',6),
('Cabalistic Warp of Sausage','Aero Copper',29),
('Cabalistic Warp of Sausage','Shady Cotton',8),
('Conceal Sweat Spirit','Grand Iron',18),
('Grand Chant of the Lounge Singers','Grand Iron',20),
('Great Noodles Ball','Mild Tin',29),
('Great Noodles Ball','Abberant Diamond',8),
('Great Noodles Ball','Nightmare Fibre',15),
('Invocation of Baldness','Nightmare Fibre',13),
('Florist-bane','Lucky Zinc',14),
('Invocation of Acne','Nightmare Fibre',23),
('Evocation of Cheese','Aero Copper',13),
('Evocation of Cheese','Grand Iron',10),
('Summon Caffeine','Grand Iron',20),
('Summon Caffeine','Mystery Brick',3),
('Summon Caffeine','Volatile Linen',5);

--We are using the $ character to denotate input variables
-- Because it will otherwise throw errors, whenver this is used it will be put in comments

--To check the password
--SELECT username FROM blacksmith WHERE password=‘$inputPassword’;

--To ensure there is no other user with this username
-- SELECT id FROM blacksmith WHERE username=$usernameInput;

-- To add new user to the database
-- INSERT blacksmith (username, password, fname, lname, dob, experience, kingdom, village)
-- VALUES ($usernameInput, $passwordInput, $firstNameInput, $lastNameInput, $birthdayInput, $experienceChoice, $kingdomInput, $villageInput);

-- SQL to list all weapons:
-- SELECT name, type FROM weapon;

-- With name search parameter:
-- SELECT name, type FROM weapon WHERE name=$nameInput;

-- SQL to list all materials:
-- SELECT name, cost, exeprienceReq FROM material;

-- With name search parameter:
-- SELECT name, cost, exeprienceReq FROM material
-- WHERE name=$nameInput;

-- SQL to list all blacksmiths:
-- SELECT fname, lname, experience FROM blacksmith;

-- With name search parameter:
-- SELECT fname, lname, experience FROM blacksmith
-- WHERE fname=$nameInput OR lname=$nameInput;

-- SELECT name, magicType FROM enchantment;
-- With name search parameter:
-- SELECT name, magicType FROM enchantment WHERE name=$nameInput;

-- SELECT specialty FROM smth_specialty
-- WHERE smth_id=(SELECT id FROM blacksmith
-- WHERE fname=$blacksmithFName AND lname=$blacksmithLName);

-- Finding the blacksmith’s location:
-- SELECT village, kingdom FROM blacksmith
-- WHERE fname=$blacksmithFName AND lname=$blacksmithLName;

-- Listing the blacksmith’s experience:
-- SELECT experience FROM blacksmith
-- WHERE fname=$blacksmithFName AND lname=$blacksmithLName;

-- Listing weapons the blacksmith has made:
-- SELECT name, type FROM weapon
-- WHERE smth_id=(SELECT id FROM blacksmith
-- WHERE fname=$blacksmithFName AND lname=$blacksmithLName);

-- Listing materials the blacksmith owns:
-- SELECT mat_name, amount FROM smth_own
-- WHERE smth_id=(SELECT id FROM blacksmith
-- WHERE fname=$blacksmithFName AND lname=$blacksmithLName);

-- Listing any potential mentors
-- SELECT fname, lname FROM blacksmith
-- WHERE id=(SELECT mentor FROM smth_training
-- WHERE mentee=(SELECT id FROM blacksmith
-- WHERE fname=$blacksmithFName AND lname=$blacksmithLName));

-- Listing any potential mentees:
-- SELECT fname, lname FROM blacksmith
-- WHERE id=(SELECT mentee FROM smth_training
-- WHERE mentor=(SELECT id FROM blacksmith
-- WHERE fname=$blacksmithFName AND lname=$blacksmithLName));

-- SQL to start training relation:
-- INSERT smth_training VALUES (
-- (SELECT id FROM blacksmiths WHERE fname = $mentorFName AND lname = $mentorLName),
-- (SELECT id FROM blacksmiths WHERE fname = $menteeFName AND lname = $menteeLName),
-- $currentDate,
-- NULL);

-- SQL to end training relation:
-- UPDATE smth_training SET end_date = $currentDate WHERE
-- Mentor = (SELECT id FROM blacksmiths WHERE fname = $mentorFName AND lname = $mentorLName) AND
-- Mentee = (SELECT id FROM blacksmiths WHERE fname = $menteeFName AND lname = $menteeLName));

-- SQL to add newly-created weapon:
-- INSERT weapon VALUES ($name,$type,$cost,$smith_id);
-- INSERT wpn_mat ($w_name,$w_mat,$amnt);

-- If there are any enchantments:
-- INSERT wpn_magic ($w_name,$magic_name);

-- SQL to delete recently-sold weapon:
-- DELETE FROM weapon WHERE name = $weapon_name;
-- DELETE FROM wpn_mat WHERE wpn_name = $weapon_name;
-- DELETE FROM wpn_magic WHERE wpn_name = $weapon_name;

-- SQL to delete used-materials:
-- DELETE FROM smth_own WHERE smth_id=$userSmithID AND mat_name=$matName;

-- SQL to add newly-bought materials:
-- INSERT smth_own VALUES ($userSmithID, $matName, $amount);

-- SQL to update material amount of something already owned:
-- UPDATE smth_own SET amount=$newAmount WHERE smth_id=$userSmithID AND mat_name=$matName;

-- Changing specialty:
-- UPDATE smth_specialty SET specialty=$newSpecialty
-- WHERE smth_id=$userSmithID;

-- Changing Location:
-- UPDATE blacksmith SET village=$newVillage WHERE id=$userSmithID;
-- UPDATE blacksmith SET kingdom=$newKingdom WHERE id=$userSmithID;

-- Changing experience (LEVEL UP hehe):
-- UPDATE blacksmith SET experience=$newExperienceLvl
-- WHERE id=$userSmithID;

-- SQL to list all materials in the weapon:
-- SELECT mat_name FROM wpn_mat WHERE wpn_name = $weapon_name
-- UNION
-- SELECT mat_name FROM magic_reqs WHERE magic_name IN (
-- SELECT magic_name FROM wpn_magic WHERE wpn_name = $weapon_name);

-- SQL to list any enchantments the weapon has:
-- SELECT magic_name FROM wpn_magic WHERE wpn_name = $weapon_name;

-- SQL to get the name of the blacksmith creator:
-- SELECT fname,lname FROM blacksmith WHERE smith_id = (
-- SELECT smith_id FROM wpn_magic WHERE wpn_name = $weapon_name);

-- SQL to list the stats (type and cost) of the weapon:
-- SELECT type,cost FROM wpn_magic WHERE wpn_name = $weapon_name;

-- SQL to list any weapons that have this material:
-- SELECT wpn_name FROM wpn_mat WHERE mat_name=$matName;

-- SQL to list any enchantments that require this material:
-- SELECT magic_name FROM magic_reqs WHERE mat_name=$matName;

-- SQL to list the stats (hardness, color, weight, cost) of this material:
-- SELECT hardness FROM material WHERE name=$matName;
-- SELECT color FROM material WHERE name=$matName;
-- SELECT weight FROM material WHERE name=$matName;
-- SELECT cost FROM material WHERE name=$matName;

-- SQL to list the experience requirement of this material:
-- SELECT experienceReq FROM material WHERE name=$matName;

-- SQL to list materials required for this enchantment:
-- SELECT mat_name, amount FROM magic_reqs
-- WHERE magic_name=$enchantmentName;

-- SQL to get the magic type (the only current stat) for this specific enchantment:
-- SELECT magicType FROM enchantment WHERE name=$enchantmentName;

-- SQL to list all weapons currently in the database that have this enchantment:
-- SELECT wpn_name FROM wpn_magic WHERE magic_name=$enchantmentName;
