-- Create User Table
CREATE TABLE kitra.`User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) AUTO_INCREMENT=3000;

CREATE TABLE kitra.`Treasure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` VARCHAR(191) NOT NULL,
    `longtitude` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) AUTO_INCREMENT=100;

CREATE TABLE kitra.`Money_Value` (
    `amt` DECIMAL(65, 30) NOT NULL,
    `treasure_id` INTEGER NOT NULL
);

-- Seed `User`s
INSERT INTO `User` (`name`, `age`, `password`, `email`) VALUES ('U1', 21, '123123', 'u1@kitra.abc');
INSERT INTO `User` (`name`, `age`, `password`, `email`) VALUES ('U1', 51, '234234', 'u2@kitra.abc');
INSERT INTO `User` (`name`, `age`, `password`, `email`) VALUES ('U1', 31, '345345', 'u3@kitra.abc');
INSERT INTO `User` (`name`, `age`, `password`, `email`) VALUES ('U1', 18, '456456', 'u4@kitra.abc');
INSERT INTO `User` (`name`, `age`, `password`, `email`) VALUES ('U1', 21, '567567', 'u5@kitra.abc');
INSERT INTO `User` (`name`, `age`, `password`, `email`) VALUES ('U1', 35, '678678', 'u6@kitra.abc');

-- Seed Treasures
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5437648051331', '121.019911678311', 'T1');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5532076554883', '121.055774532421', 'T2');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5446435656183', '121.020365629871', 'T3');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5872615919051', '120.979504794655', 'T4');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5732032723718', '121.023090376156', 'T5');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5231131289849', '121.019457319516', 'T6');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.6024229153284', '121.011513378939', 'T7');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.6085746293116', '121.018551395794', 'T8');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.4911143426092', '121.043748206197', 'T9');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5445595272478', '121.106088282234', 'T10');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5879814117365', '121.058208029763', 'T11');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5488649285797', '121.03363929755', 'T12');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5371505894201', '120.990430237915', 'T13');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5257966600328', '121.020868844103', 'T14');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.5170998780454', '120.981002106201', 'T15');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.502006871058', '120.991618127534', 'T16');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.521124409049', '121.042771368704', 'T17');
INSERT INTO `Treasure` (`latitude`, `longtitude`, `name`) VALUES ('14.4772076562187', '120.986792724064', 'T18');

-- Seed Money_Values
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (100, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (101, 10);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (102, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (103, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (104, 10);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (105, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (106, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (107, 10);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (108, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (109, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (110, 10);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (111, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (112, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (113, 10);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (114, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (115, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (116, 10);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (117, 15);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (100, 20);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (101, 25);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (102, 20);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (103, 25);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (107, 30);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (108, 30);
INSERT INTO `Money_Value` (`treasure_id`, `amt`) VALUES (109, 30);