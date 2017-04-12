CREATE TABLE course(
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `courseId` VARCHAR(128) NOT NULL,
    `name` VARCHAR(128),
    `description` TEXT,
	`completed` DATETIME,

    PRIMARY KEY (`id`)
);
