import mysql from 'mysql2';
type Table = {
    name: String;
    alias: String;
    joinClause?: String;
};
declare abstract class QueryBuilder {
    protected selectedColumns: Array<String>;
    protected tables: Array<Table>;
    protected query: String;
    protected pool: any;
    protected constructor(connectionPool: any);
    select(...columns: String[]): this;
    from(table: String, alias: ''): this;
    innerJoin(table: Table): this;
    abstract execute(): any;
}
declare class MySqlQueryBuilder extends QueryBuilder {
    constructor(connectionPool: mysql.Pool);
    static connect(opts: mysql.PoolOptions): MySqlQueryBuilder;
    execute(): any;
}
export declare const ArkConnect: {
    mysql: {
        connect: typeof MySqlQueryBuilder.connect;
    };
};
export {};
