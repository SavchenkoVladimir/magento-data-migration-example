DROP TABLE IF EXISTS `migration_ignor_me_table` ;
DROP TABLE IF EXISTS `migration_change_my_name_table` ;
DROP TABLE IF EXISTS `migration_change_field_table`;
DROP TABLE IF EXISTS `migration_split_me_table`;
DROP TABLE IF EXISTS `migration_combine_me_table_1`;
DROP TABLE IF EXISTS `migration_combine_me_table_2`;
CREATE TABLE `migration_ignor_me_table`
(
  `id`         BIGINT(20) NOT NULL      AUTO_INCREMENT,
  PRIMARY KEY (`id`)
);
CREATE TABLE `migration_change_my_name_table`
(
  `id`         BIGINT(20) NOT NULL      AUTO_INCREMENT,
  PRIMARY KEY (`id`)
);
CREATE TABLE `migration_change_field_table`
(
  `id`         BIGINT(20) NOT NULL      AUTO_INCREMENT,
  `name_change_field_name` VARCHAR(225)  DEFAULT NULL,
  `lastname_change_field_type` VARCHAR(225)  DEFAULT NULL,
  `modify_content` VARCHAR(225)  DEFAULT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `migration_split_me_table`
(
  `id`         BIGINT(20) NOT NULL      AUTO_INCREMENT,
  `account_id_split_1`         BIGINT(20) NOT NULL,
  `name_split_1` VARCHAR(225)  DEFAULT NULL,
  `lastname_split_2` VARCHAR(225)  DEFAULT NULL,
  `age_split_1`   INT(11)                  DEFAULT NULL,
  `is_new`    INT(11)                  DEFAULT NULL,
  `value`      FLOAT                    DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `migration_connect_me_table_1`
(
  `id`         BIGINT(20) NOT NULL      AUTO_INCREMENT,
  `account_id`         BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `migration_connect_me_table_2`
(
  `id`         BIGINT(20) NOT NULL      AUTO_INCREMENT,
   `lastname_connect` VARCHAR(225)  DEFAULT NULL,
  `age`   INT(11)                  DEFAULT NULL,
  `is_new`    INT(11)                  DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP PROCEDURE IF EXISTS migration_generate_data;
DELIMITER $$
CREATE PROCEDURE migration_generate_data ()
BEGIN
    DECLARE i INT DEFAULT 0 ;
  WHILE
    i < 100000 DO
    INSERT INTO `migration_change_field_table` (
      `name_change_field_name`,
      `lastname_change_field_type`,
      `modify_content`
    )
    VALUES
      (
        LEFT(UUID(), 8),
        LEFT(UUID(), 8),
        LEFT(UUID(), 8)
      ) ;
      INSERT INTO `migration_split_me_table` (
      `account_id_split_1`,
      `name_split_1`,
      `lastname_split_2`,
      `age_split_1`,
      `value`,
      `is_new`
    )
    VALUES
      (
        LEFT(UUID(), 8),
        LEFT(UUID(), 8),
        LEFT(UUID(), 8),
        FLOOR(1 + RAND() * 100),
        2,
        1
      ) ;
	INSERT INTO `migration_connect_me_table_1` (
      `account_id`
    )
    VALUES
      (
        LEFT(UUID(), 8)
      ) ;
      INSERT INTO `migration_connect_me_table_2` (
      `lastname_connect`,
      `age`
    )
    VALUES
      (
        LEFT(UUID(), 8),
        1
      ) ;
   SET i = i + 1 ;
  END WHILE ;
END $$
DELIMITER ;