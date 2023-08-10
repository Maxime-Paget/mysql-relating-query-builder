"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConnect = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
var dbSupport;
(function (dbSupport) {
    dbSupport[dbSupport["mysql"] = 0] = "mysql";
})(dbSupport || (dbSupport = {}));
class QueryBuilder {
    constructor(connectionPool) {
        this.selectedColumns = [];
        this.tables = [];
        this.query = '';
        this.connectionPool = connectionPool;
    }
    select(...columns) {
        this.selectedColumns.push(...columns);
        this.query += `SELECT ${this.selectedColumns.join(', ')}\n`;
        return this;
    }
    from(table, alias) {
        this.tables.push({ name: table, alias });
        this.query += `FROM ${table} AS ${alias || table}\n`;
        return this;
    }
    innerJoin(table) {
        this.tables.push(table);
        this.query += `INNER JOIN ${table.name} AS ${table.alias || table.name} ON ${table.joinClause}`;
        return this;
    }
    execute() {
        console.log(this.query);
    }
}
function sqlConnect(opts) {
    if (dbSupport[opts.support] === undefined || dbSupport[opts.support] === null) {
        throw new Error(`Support must be one of allowed SGDB`);
    }
    return new QueryBuilder(mysql2_1.default.createPool({
        database: opts.databaseName,
        port: Number(opts.port)
    }));
}
exports.sqlConnect = sqlConnect;
