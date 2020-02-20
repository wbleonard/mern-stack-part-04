
exports = function(payload, response) {
  
    const id = payload.query.id || '';
  
    console.log ("Id received = " + id);
    
    var collection = context.services.get("mongodb-atlas").db("todos").collection("todos");
    return collection.findOne({_id:BSON.ObjectId(id)});
  };
  