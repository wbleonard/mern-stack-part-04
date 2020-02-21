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

## Step 4: List Todos
In this step we implement the API that lists the todos (and we'll be able to see the todo created earlier in our app).

Add a new Incoming Webhook named **todos** to the existing Todo Realm Service with the following function:

```

exports = async function(payload, response) {
  var collection = context.services.get("mongodb-atlas").db("todos").collection("todos");
  var todos = await collection.find().toArray();

  // Convert the ObjectIds to strings...
  todos.forEach(todo => {
    todo._id = todo._id.toString();
  });
  
  return todos;
};
```

See the [Step 4](https://docs.google.com/document/d/1BZfDNckDjYrC2EByV1eSfQwutXUZlokg0ku01Rtwhzg/edit#heading=h.ywtdr24jlb1g) of the workshop document for detailed instructions.

## Step 5: Edit Todos
In this step we implement the final APIs that allows us to edit the todos. This step introduces a wrinkle, because the client uses a path parameter, but [Realm doesn't yet support path parameters](https://mongodb.canny.io/mongodb-stitch/p/ability-to-set-parameters-through-a-webhook-path). As a workaround, we’ll simply pass this value as an argument to the webhook.

There are two APIs associated with this component: one to load the todo to edit and another to update the todo with the changes.

### Load Todo

Add a new Incoming Webhook named **edit** to the existing Todo Realm Service with the following code:

```
exports = function(payload, response) {
  
  const id = payload.query.id || '';

  console.log ("Id received = " + id);
  
  var collection = context.services.get("mongodb-atlas").db("todos").collection("todos");
  return collection.findOne({_id:BSON.ObjectId(id)});
};
```

See the [Step 5 - Load Todo](https://docs.google.com/document/d/1BZfDNckDjYrC2EByV1eSfQwutXUZlokg0ku01Rtwhzg/edit#heading=h.t8vpsiv55j5k) of the workshop document for detailed instructions.

### Update Todo

Add a new Incoming Webhook named **update** to the existing Todo Realm Service with the following code:

```
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
```
See the [Step 5 - Update Todo](https://docs.google.com/document/d/1BZfDNckDjYrC2EByV1eSfQwutXUZlokg0ku01Rtwhzg/edit#heading=h.54zvf6jfr8gg) of the workshop document for detailed instructions.


# What About the Front-End?

## Step 1: Create a Build
In this step, the build is optimized for deployment. See the React documentation on [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```
$ npm run build
```

## Step 2: Deploy the Front-end
In this step you'll enable Realm [Static Hosting](https://docs.mongodb.com/stitch/hosting/) and upload the contents of the build directory, 

See the [Step 2 - Deploy the Front-end](https://docs.google.com/document/d/1BZfDNckDjYrC2EByV1eSfQwutXUZlokg0ku01Rtwhzg/edit#heading=h.cfj2wno8utpg) of the workshop document for detailed instructions.