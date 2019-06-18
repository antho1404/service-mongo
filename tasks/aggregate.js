module.exports = db => async ({
  collection,
  lookups = [],
  match,
  project,
  limit,
  offset,
  sort,
  search,
  noID,
  one
}) => {
  let expr = []
  let _match = {}
  if (search) Object.assign(_match, { $text: { $search: search } })
  if (match) Object.assign(_match, match)
  if (Object.keys(_match).length > 0) expr.push({ $match: _match })
  if (lookups) {
    lookups.forEach(({ collection, field }) => {
      expr.push({ $lookup: {
        from: collection,
        localField: field,
        foreignField: field,
        as: collection
      }})
    })
  }
  if (project) expr.push({ $project: project })
  if (limit) expr.push({ $limit: limit })
  if (offset) expr.push({ $skip: offset })
  if (sort) expr.push({ $sort: sort })
  let results = await db.collection(collection).aggregate(expr).toArray()
  if (noID) removeID(results)
  if (one) {
    let data = null
    if (results.length > 0) data = results[0]
    return { data }
  }
  return { data: results }
}

function removeID(data) {
  if (Array.isArray(data)) {
    data.forEach(item => removeID(item))
    return
  }
  delete data._id
}
