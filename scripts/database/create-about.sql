CREATE TABLE about (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`owner` VARCHAR(128) NOT NULL,
	`description` VARCHAR(255),
	`occupation` VARCHAR(255),
	`school` VARCHAR(255),
	`birthdate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY(`id`)
);	