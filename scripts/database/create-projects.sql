CREATE TABLE project (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(128) NOT NULL,
	`description` TEXT,
	`github` VARCHAR(255),
	`client` VARCHAR(128),
	`page` VARCHAR(255),
	`course` INT(11),

	PRIMARY KEY(`id`)
);
