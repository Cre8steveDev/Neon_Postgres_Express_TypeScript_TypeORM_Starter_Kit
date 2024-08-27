# Code Guide / Documentation

## Migrations

When you make changes to your Model/Entity, you can run create a migration file and then run migrations to update your table. **Make sure to run the comands below on the root of your project or you can adjust the relative paths accordingly**.

### Generate a Migration File

```bash
npx typeorm-ts-node-commonjs migration:generate ./src/orm/migrations/<NAME_OF_MIGRATION_FILE> -d ./src/orm/data-source.ts
```

### Run all Pending Migrations

```bash
npx typeorm-ts-node-commonjs migration:run -d ./src/orm/data-source.ts
```

### Run a Specific Migration

Copy the name of the migration file exactly as it was created in the migrations folder.

```bash
npx typeorm-ts-node-commonjs migration:run --name <MIGRATION_FILE_NAME> -d ./src/orm/data-source.ts
```

### Revert Migration

The command below will revert the last migration you made. You can revert multiple migrations in the order in which they were made by running the command multiple times.

```bash
npx typeorm-ts-node-commonjs migration:revert  -d ./src/orm/data-source.ts
```
