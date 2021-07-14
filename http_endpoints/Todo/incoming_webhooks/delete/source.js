exports = async function(payload, response) {
  
    const id = payload.query.id || '';
  
    console.log ("Id received = " + id);
    
    // Get collection 
   const result = await collection.deleteOne(query)
  .then(result => console.log(`Deleted ${result.deletedCount} item.`))
  .catch(err => console.error(`Delete failed with error: ${err}`))
    
    return result;
  };
  