module.exports = db => async ({ collection, lookups = [], project, noID, one }, { success, failure }) => {
  let expr = []
  lookups.forEach(({ collection, field }) => {
    expr.push({ $lookup: {
      from: collection,
      localField: field,
      foreignField: field,
      as: collection
    }})
  })
  if (project) expr.push({ $project: project })
  try {
    let results = await db.collection(collection).aggregate(expr).toArray()
    if (noID) removeID(results)
    if (one) {
      let data = null
      if (results.length > 0) data = results[0]
      return success({ data })
    }
    return success({ data: results })
  } catch (err) {
    return failure({ message: err.toString() })
  }
}

function removeID(data) {
  if (Array.isArray(data)) {
    data.forEach(item => removeID(item))
    return
  }
  delete data._id
}