exports = function(payload, response) {
    var todo = {};
    var result = {};
      
    if (payload.body) {
      
      // Parse the body to get the todo document...
      todo = EJSON.parse(payload.body.text());
      console.log("Parsed Payload body: ", JSON.stringify(todo));
      
      var collection = context.services.get("mongodb-atlas").db("todos").collection("todos");
    
      console.log("todo_id: ", todo.todo_id);
    
      // Update the todo...
      return collection.updateOne({_id:BSON.ObjectId(todo.todo_id)}, {$set: todo});
        
    }
    return  result;
  };