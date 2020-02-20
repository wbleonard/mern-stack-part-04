exports = function(payload, response) {
  
    var todo = {};
    var result = {};
      
    if (payload.body) {
  
      // Parse the body to get the todo document...
      todo = EJSON.parse(payload.body.text());
      console.log("Parsed Payload body: ", JSON.stringify(todo));
        
      // Get a reference to the todos database and collection...
      var collection = context.services.get("mongodb-atlas").db("todos").collection("todos");
    
      // Insert the new todo...
      return collection.insertOne(todo);
        
    }
    return  result;
  };