import mysql from 'mysql2';

type Table = {
    name: String,
    alias: String,
    joinClause?: String
}

abstract class QueryBuilder {

    protected selectedColumns: Array<String>;
    protected tables: Array<Table>;
    protected query: String;
    protected pool;

    protected constructor (connectionPool: any) {
        this.selectedColumns = [];
        this.tables = [];
        this.query = '';
        this.pool = connectionPool;
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

    public abstract execute() : any;
}

class MySqlQueryBuilder extends QueryBuilder {
    constructor (connectionPool: mysql.Pool) {
        super(connectionPool);
    }

    static connect (opts: mysql.PoolOptions): MySqlQueryBuilder {
        return new MySqlQueryBuilder(mysql.createPool(opts))
    }

    public execute(): any {
        let result: any
        this.pool.query(this.query, function (err: Error | undefined, rows: any) {
            if (err) {
                throw err;
            }
            result = rows;
            console.log(1, result);
        })
        return result
    }
}


export const ArkConnect = {
    mysql: {
        connect: MySqlQueryBuilder.connect
    }
}