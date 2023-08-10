import { Pool } from 'mysql2';
declare enum dbSupport {
    mysql = 0
}
type RelatingQueryBuilderOptions = {
    host: string;
    databaseName: string;
    port: Int16Array | 3006;
    support: dbSupport | "mysql";
};
type Table = {
    name: String;
    alias: String;
    joinClause?: String;
};
declare class QueryBuilder {
    private selectedColumns;
    private tables;
    private query;
    private connectionPool;
    constructor(connectionPool: Pool);
    select(...columns: String[]): this;
    from(table: String, alias: ''): this;
    innerJoin(table: Table): this;
    execute(): void;
}
export declare function sqlConnect(opts: RelatingQueryBuilderOptions): QueryBuilder;
export {};
