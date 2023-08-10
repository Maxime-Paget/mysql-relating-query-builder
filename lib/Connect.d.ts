type RelatingQueryBuilderOptions = {
    databaseName: String;
    host: String;
    port?: Int16Array | 3000;
};
declare class QueryBuilder {
    private selectedColumns;
    private query;
    constructor();
    select(...columns: String[]): void;
    execute(): void;
}
export declare function sqlConnect(opts: RelatingQueryBuilderOptions): QueryBuilder;
export {};
