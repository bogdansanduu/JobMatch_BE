Database migration commands:
- npx typeorm-ts-node-esm migration:generate .\src\database\migrations\test -d .\src\database\dataSource.ts
- npx typeorm-ts-node-commonjs migration:run  -d .\src\database\dataSource.ts
- npx typeorm-ts-node-commonjs migration:revert  -d .\src\database\dataSource.ts