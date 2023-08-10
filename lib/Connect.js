"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConnect = void 0;
class QueryBuilder {
    constructor() {
        this.selectedColumns = [];
        this.query = '';
    }
    select(...columns) {
        this.selectedColumns.push(...columns);
        this.query += `SELECT ${this.selectedColumns.join(', ')}`;
    }
    execute() {
        console.log(this.query);
    }
}
function sqlConnect(opts) {
    console.log(opts);
    return new QueryBuilder();
}
exports.sqlConnect = sqlConnect;
