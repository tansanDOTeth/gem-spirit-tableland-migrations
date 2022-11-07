# Braindump

I wrote some scripts for seeding data into Tableland for Gem Spirits. It's very basic way for me to track my changes and table relations. I took a more low tech approach than having a local SQLite due to time.

- After creating a table, it saves an artifact so it won't recreate the same table again. If I add a new column, then i can just delete the artifact and re-run the script to create a new table.
- When inserting, it will check the difference in the data in the script and the data in Tableland to find the new rows before inserting the new rows. Caveat is it's a naive check and has to be in a specific order, so there will be side effects. If you need to update or delete, you have to do that manually. Main use case for me is to be able to just run the scripts across different chains for seeding data.
- Automatically appends created_at and updated_at timestamps when inserting data. It also automatically appends these columns when creating.
- It also validates the table creation in case there it fails.

Here is an example of adding a new column: https://github.com/tansanDOTeth/gem-spirit-tableland-migrations/commit/cb5b219b042e5553d2b2131671643170b573c602
