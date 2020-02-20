# The MERN Stack Evolved 

This repository contains supporting resources for a workshop on migrating Node.js Express applications to [MongoDB Realm. ](https://www.mongodb.com/cloud/stitch)

While the high level steps are outlined here, please see the [MERN Stack Evolved workshop document](https://docs.google.com/document/d/1BZfDNckDjYrC2EByV1eSfQwutXUZlokg0ku01Rtwhzg/edit?usp=sharing) for the details of each step.

## Architecture

### Current State

### Future State

## Step 1: Provision the Backend
In this step you will provision an [Atlas](https://www.mongodb.com/cloud/stitch) cluster named **Todo** and a Realm application named **Todo**. 

See the [Step 1](https://docs.google.com/document/d/1BZfDNckDjYrC2EByV1eSfQwutXUZlokg0ku01Rtwhzg/edit#heading=h.k9sxni8q8v7t) of the workshop document for detailed instructions.

## Step 2: Download and Run the Front-End
In this step we download and fire up the front-end. 

```
git clone https://github.com/wbleonard/mern-stack-part-04 todo-app

cd todo-app

npm install

nodemon start
```

_Note, the UI will take several seconds to load because it's looking for a back-end that doesn't yet exist._

See the [Step 2](https://docs.google.com/document/d/1BZfDNckDjYrC2EByV1eSfQwutXUZlokg0ku01Rtwhzg/edit#heading=h.8azct1u6fh2y) of the workshop document for detailed instructions.

## Step 2 (Option): Run the Front-End in CodeSandbox
If you don't have and are not inclined to install `git` and `npm`, you have the option to complete the workshop in an on-line IDE such as [CodeSandbox](https://codesandbox.io/). 

https://codesandbox.io/s/github/wbleonard/mern-stack-part-04

## Step 3: Create Todo
In this step we implement that API to create a todo. Create a [Realm Service](https://docs.mongodb.com/stitch/services/) named **Todo** and an [Incoming Webhook](https://docs.mongodb.com/stitch/services/#incoming-webhooks) named **add** with the following function code:

```
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
```

See the [Step 3](https://docs.google.com/document/d/1BZfDNckDjYrC2EByV1eSfQwutXUZlokg0ku01Rtwhzg/edit#heading=h.eevhio1lfzo1) of the workshop document for detailed instructions.
