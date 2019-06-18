module.exports = db => async ({ collection, data, uniqueFields }) => {
  const records = []
  if (data instanceof Array) {
    data.forEach((item) => records.push(genRecord({ data: item, uniqueFields })))
  } else if(Object.keys(data).length > 0) {
    records.push(genRecord({ data, uniqueFields }))
  }
  let _ids = []
  if (records.length > 0) {
    const result = await db.collection(collection).bulkWrite(records)
    result.getUpsertedIds().slice(0).concat(result.getInsertedIds())
      .forEach((item) => _ids.push(item._id))
  }
  return { _ids }
} 

function genRecord({ data, uniqueFields }) {
  if (uniqueFields && uniqueFields.length > 0) {
    let replaceOne = { replacement: data, upsert: true, filter: {} }
    uniqueFields.forEach((field) => replaceOne.filter[field] = data[field])
    return { replaceOne }
  }
  return { insertOne: { document: data } }
}
