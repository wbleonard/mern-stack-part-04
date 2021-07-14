exports = function(payload, response) {
  const mongodb = context.services.get("mongodb-atlas");
  const todoCollection = mongodb.db("todos").collection("todos");
  
  
  const query = {"todo_id":"id"};
  
return todoCollection.deleteOne(query)
  .then(result => console.log(`Deleted ${result.deletedCount} item.`))
  .catch(err => console.error(`Delete failed with error: ${err}`))


  
}
