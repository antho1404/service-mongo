const mesg = require('mesg-js').service()
const { MongoClient } = require('mongodb')

const { DB_NAME } = process.env

async function main(){
  const mongodb = await MongoClient.connect("mongodb://mongo:27017", { useNewUrlParser: true })
  const db = mongodb.db(DB_NAME);
  
  mesg.listenTask({
    write: require('./tasks/write')(db),
    aggregate: require('./tasks/aggregate')(db)
  })
}

main()