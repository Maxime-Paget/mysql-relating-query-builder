"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArkConnect = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
class QueryBuilder {
    constructor(connectionPool) {
        this.selectedColumns = [];
        this.tables = [];
        this.query = '';
        this.pool = connectionPool;
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
}
class MySqlQueryBuilder extends QueryBuilder {
    constructor(connectionPool) {
        super(connectionPool);
    }
    static connect(opts) {
        return new MySqlQueryBuilder(mysql2_1.default.createPool(opts));
    }
    execute() {
        let result;
        this.pool.query(this.query, function (err, rows) {
            if (err) {
                throw err;
            }
            result = rows;
            console.log(1, result);
        });
        return result;
    }
}
exports.ArkConnect = {
    mysql: {
        connect: MySqlQueryBuilder.connect
    }
};
