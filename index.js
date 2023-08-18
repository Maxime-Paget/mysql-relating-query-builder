const { ArkConnect } = require("./lib")

const queryBuilder = ArkConnect.mysql.connect({
    database: 'miamogames',
    host: 'localhost',
    user: 'root',
    password: 'SupErV1e'
})


console.log(3, 
    queryBuilder
    .select('t.id', 't.fr')
    .from('pictionnary_dictionary', 't')
    .execute()
)
