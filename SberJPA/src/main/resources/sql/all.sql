CREATE SCHEMA `sber` ;
CREATE TABLE `sber`.`parent_c` (
  `id` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `id_address` BIGINT(8) NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `middle_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `sber`.`child_c` (
  `id` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `middle_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `institution_id` BIGINT(8) NOT NULL,
  `age` TINYINT(2) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `sber`.`institution` (
  `id` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `id_address` BIGINT(8) NULL,
  `no` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `sber`.`district` (
  `id` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `sber`.`address` (
  `id` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `postal_code` VARCHAR(45) NULL,
  `more_address` VARCHAR(45) NULL,
  `district_id` BIGINT(8) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `sber`.`parent_child_c` (
  `id` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `id_child_c` BIGINT(8) NOT NULL,
  `id_parent_a` BIGINT(8) NOT NULL,
  PRIMARY KEY (`id`));
