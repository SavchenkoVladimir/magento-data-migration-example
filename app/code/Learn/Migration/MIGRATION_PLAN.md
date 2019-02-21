## Migration plan

1. Discover migration requirements
2. Set up Magento 1 with sample data.
3. Set up Magento 2.3.0 with clean database.
4. Backup Magento 1 and Magento 2 databases.
5. Create additional tables with provided script.
6. Generate additional data with run the procedure provided in the script.
7. Install data-migration-tool in according to current Magento 2 version.
8. Set up data-migration-tool in according to Magento 1 version and addition
 data should be migrated from. Make the required setups:
 - chose right folder (like opensource-to-opensource)
 - chose right child folder (like 1.9.4.0)
 - create config.xml from sample and setup: servers, Db names, Db users and
 passwords, additional entities if needed
 - setup map_file and magento 1 key
 - create map.xml from sample
 - implement other config files like map-tier-price.xml etc. if needed
9. Run migrate:settings and resolve errors if exist.
10. Run migrate:data and check errors.
11. Exclude tables and fields in according to migration.log and the ticket requirements
12. Write a module to create tables not existed in the Magento 2 application.
13. Set <steps>, and implement classes to validate fields and data to migrate.
14. Setup mapping to migrate data from fields to other fields.
15. Implement classes to transform migrated data.
16. Implement models which migrate custom data (custom tables, split tables, combine tables)
17. Migrate data.
18. Test migrated data.
19. Make results backup.
20. Push code and results backup to github.