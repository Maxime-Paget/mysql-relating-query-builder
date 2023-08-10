import mysql, { Pool } from 'mysql2';


enum dbSupport {
    mysql
}

type RelatingQueryBuilderOptions = {
    host: string,
    databaseName: string,
    port: Int16Array | 3006
    support: dbSupport | "mysql"
}

type Table = {
    name: String,
    alias: String,
    joinClause?: String
}

class QueryBuilder {

    private selectedColumns: Array<String>;
    private tables: Array<Table>;
    private query: String;
    private connectionPool;

    constructor (connectionPool: Pool) {
        this.selectedColumns = [];
        this.tables = [];
        this.query = '';
        this.connectionPool = connectionPool;
    }

    public select (...columns: String[]) {
        this.selectedColumns.push(...columns);
        this.query += `SELECT ${this.selectedColumns.join(', ')}\n`
        return this;
    }

    public from (table: String, alias: '') {
        this.tables.push({ name: table, alias });
        this.query += `FROM ${table} AS ${alias || table}\n`
        return this;
    }

    public innerJoin (table: Table) {
        this.tables.push(table);
        this.query += `INNER JOIN ${table.name} AS ${table.alias || table.name} ON ${table.joinClause}`;
        return this;
    }

    public execute() {
        console.log(this.query);
    }
}

export function sqlConnect (opts: RelatingQueryBuilderOptions) {
    if (dbSupport[opts.support] === undefined || dbSupport[opts.support] === null) {
        throw new Error(`Support must be one of allowed SGDB`)
    }
    return new QueryBuilder(mysql.createPool({
        database: opts.databaseName,
        port: Number(opts.port)
    }));
}