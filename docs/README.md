# Code Guide / Documentation

## Debbuging Connection Error

If you're getting this error:

```bash
AggregateError
   at internalConnectMultiple (node:net:1117:18)
   at internalConnectMultiple (node:net:1185:5)
   at Timeout.internalConnectMultipleTimeout (node:net:1711:5)
   at listOnTimeout (node:internal/timers:575:11)
   at processTimers (node:internal/timers:514:7) {
 code: 'ETIMEDOUT',
 [errors]:
```

A. Confirm that your network connection is stable.

B. Stop the Development Server and restart with `npm run dev`

C. Disable IPv6 with the commands below

```bash
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.lo.disable_ipv6=1
```

## Migrations

When you make changes to your Model/Entity, you can run create a migration file and then run migrations to update your table. **Make sure to run the comands below on the root of your project or you can adjust the relative paths accordingly**.

### Generate a Migration File

```bash
npx typeorm-ts-node-commonjs migration:generate ./src/typeorm/migrations/<NAME_OF_MIGRATION_FILE> -d ./src/typeorm/data-source.ts
```

### Run all Pending Migrations

```bash
npx typeorm-ts-node-commonjs migration:run -d ./src/typeorm/data-source.ts
```

### Run a Specific Migration

Copy the name of the migration file exactly as it was created in the migrations folder.

```bash
npx typeorm-ts-node-commonjs migration:run --name <MIGRATION_FILE_NAME> -d ./src/typeorm/data-source.ts
```

### Revert Migration

The command below will revert the last migration you made. You can revert multiple migrations in the order in which they were made by running the command multiple times.

```bash
npx typeorm-ts-node-commonjs migration:revert  -d ./src/typeorm/data-source.ts
```
