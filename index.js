const mesg = require('mesg-js').service()
const debug = require('debug')('mongo')
const { MongoClient } = require('mongodb')

const { DB_NAME } = process.env

async function main(){
  const mongodb = await MongoClient.connect("mongodb://mongo:27017", { useNewUrlParser: true })
  const db = mongodb.db(DB_NAME);

  await createIndexes(db)
  
  mesg.listenTask({
    write: require('./tasks/write')(db),
    aggregate: require('./tasks/aggregate')(db)
  })
}

main()

function createIndexes(db) {
  const textIndexes = process.env.TEXT_INDEXES ? JSON.parse(process.env.TEXT_INDEXES) : {}
  debug("text indexes:", textIndexes)

  const promises = Object.keys(textIndexes).map((collection) => {
    const fields = textIndexes[collection]
    let expr = {}
    fields.forEach((field) => expr[field] = "text")
    return db.collection(collection).createIndex( expr )
  })

  return Promise.all(promises)
}