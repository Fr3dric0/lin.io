CREATE TABLE project (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(128) NOT NULL,
	`description` TEXT NOT NULL,
	`motivation` VARCHAR(255),
	`github` VARCHAR(255),
	`client` VARCHAR(128),
	`page` VARCHAR(255),
	`course` INT(11),
	`role` VARCHAR(255) NOT NULL,
	`img` VARCHAR(255),

	PRIMARY KEY(`id`)
);
