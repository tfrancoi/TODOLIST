CREATE TABLE `todo`.`task` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 200 ) NOT NULL ,
`category` SMALLINT NOT NULL ,
`priority` TINYINT NOT NULL ,
`lateness` BOOL NOT NULL DEFAULT '1',
`deadline` DATETIME NOT NULL,
`done` tinyint(1) NOT NULL,
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_roman_ci;


CREATE TABLE `todo`.`category` (
`id` SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 200 ) NOT NULL
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_roman_ci;


CREATE TABLE `todo`.`priority` (
`id` TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 40 ) NOT NULL ,
`color` VARCHAR( 7 ) NOT NULL ,
`ordre` SMALLINT NOT NULL
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_roman_ci;





ALTER TABLE task ADD FOREIGN KEY (category) REFERENCES category (id);
ALTER TABLE task ADD FOREIGN KEY (priority) REFERENCES priority (id);


ALTER DATABASE `todo` DEFAULT CHARACTER SET utf8 COLLATE utf8_roman_ci;

ALTER TABLE `category` CHANGE `name` `name` VARCHAR( 200 ) CHARACTER SET utf8 COLLATE utf8_roman_ci NOT NULL; 
ALTER TABLE `priority` CHANGE `name` `name` VARCHAR( 30 ) CHARACTER SET utf8 COLLATE utf8_roman_ci NOT NULL ,
CHANGE `color` `color` VARCHAR( 11 ) CHARACTER SET utf8 COLLATE utf8_roman_ci NOT NULL ;
ALTER TABLE `task` CHANGE `name` `name` VARCHAR( 200 ) CHARACTER SET utf8 COLLATE utf8_roman_ci NOT NULL ;


INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Perso'),
(3, 'BEST'),
(4, 'Cours'),
(5, 'Mémoire');


INSERT INTO `priority` (`id`, `name`, `color`, `ordre`) VALUES
(1, 'Haute', '#FF0000', 1),
(2, 'Basse', '#808000', 10),
(3, 'Moyenne', '#FF8040', 5);
