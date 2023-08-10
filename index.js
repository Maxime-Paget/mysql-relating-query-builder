const { sqlConnect } = require('./lib/Connect')

const queryBuilder = sqlConnect({
    databaseName: 'test',
    support: "mysql"
})

queryBuilder.select('test1', 'test2').from('toto', 't').innerJoin({
    name: 'titi',
    alias: 'ti',
    joinClause: 'ti.test = t.test'
}).execute()