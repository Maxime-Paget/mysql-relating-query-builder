type RelatingQueryBuilderOptions = {
    databaseName: String,
    host: String,
    port?: Int16Array |3000
}

class QueryBuilder {
    private selectedColumns: Array<String>
    private query: String

    constructor () {
        this.selectedColumns = [];
        this.query = '';
    }

    public select (...columns: String[]) {
        this.selectedColumns.push(...columns);
        this.query += `SELECT ${this.selectedColumns.join(', ')}`
    }

    public execute() {
        console.log(this.query);
    }
}

export function sqlConnect (opts: RelatingQueryBuilderOptions) {
    console.log(opts);

    return new QueryBuilder();
}