-- Create Treasure Table
CREATE TABLE kitra.`Treasure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` VARCHAR(191) NOT NULL,
    `longtitude` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) AUTO_INCREMENT=100;