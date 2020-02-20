exports = async function(payload, response) {
    var collection = context.services.get("mongodb-atlas").db("todos").collection("todos");
    var todos = await collection.find().toArray();
  
    // Convert the ObjectIds to strings...
    todos.forEach(todo => {
      todo._id = todo._id.toString();
    });
    
    return todos;
  };