# Redux, GraphQL, REACT & Express

1. Clone repository

2. ```npm install```

3. ```npm start```

4. Go to http://localhost:xxxxx/  - Check server.js for host port number

5. Use this query to test the API . Change the ids and submit the query

```
{
  goldberg(id: 2) {
    id
    categories
    tags
  }
}

```

6. Go to http://localhost:yyyyy/graphql for GraphiQl Interactive IDE - Check server.js for port number

7. This proxy url should be injected in the server configurarion scripts.


## Application Notes:

GraphQL is a query language which provides a common interface between the client and the server for data fetching and manipulations.

The client asks for various data from the GraphQL server via queries. The response format is described in the query and defined by the client instead of the server: they are called client‐specified queries. 
The structure of the data is not hardcoded as in traditional REST APIs - this makes retrieving data from the server more efficient for the client.

Benefits:

1. GraphQL allows you to evolve your API naturally without versioning

2. Provides workable documentation 

3. Avoids the problems of over and under-fetching

4. Offers a convenient way to aggregate data from multiple sources with a single request.

Here’s an example query that a client might send in an Instagram-like application:

```
query {
  feed {
    id
    imageUrl
    description
    address {
      postcode 
      housenumber
      strret
    }
  }
}


```

The keyword query in the beginning expresses the operation type. Besides query, there are two more operation types called ''mutation'' and ''subscription''. Note that the default operation type of a request is in fact query, so you might as well remove it from the above request. feed is the root field of the query and everything that follows is called the selection set of the query.


When a server receives the above query, it will resolve it, i.e. collect the required data, and package up the response in the same format of the query. Here’s what a potential response could look like:

```

{
  "data": {
    "feed": [
      {
        "id": "1",
        "description": "Nice Sunset",
        "imageUrl": "http://example.org/sunset.png"
      },
      {
        "id": "2",
        "description": "Cute Cats",
        "imageUrl": "http://example.org/cats.png"
      }
    ]
  }
}


```


As another  example, the client can ask for linked resources without defining new API endpoints. With the following GraphQL query, we can ask for the user specific fields and the linked friends resource as well.

```
{
  user(id: 1) {
    name
    age
    friends {
      name
    }
  }
}

```


In a resource based REST API it would look something like:

```

GET /users/1 and GET /users/1/friends  


```

or

```

GET /users/1?include=friends.name 

``` 

A. We use GraphQL data modelling Architecturalwe to construct 3 types to enable get an end point:

i. A type for the model (properties of the madel are name, description and field - the field has selections of the field with their defined data types.).

ii. A type for the query.

iii. A type for the schema.

When we resolve our query we return the output of a function from the data model. This is in server.js


B. We use express and the graphqlHTTP middleware to serve the schema.

C. Serving our application

To serve the front end of our app we need to install babel, babel-loader, and a couple of babel presets.

D. Immmutability: 

To ensure data consitence and best practice we use immutable.  This presents a mutative API which does not update the data in-place, but instead always yields new updated data.

E. Thunk middleware:

Helps  to make  requests.

Component Did Mount life Cycle: 
This is set to retrieve the result of a query on application first load from server: 

{goldberg(id: 1) {_id, categories, tags}}



## Root types 

Each schema has root types(are entry points for the API) that define the entry points into the API. These are the root types that you can define in your schema:

1. Query: Specifies all the queries a GraphQL server accepts

2. Mutation: Specifies all the mutations a GraphQL server accepts

3. Subscription: Specifies all the subscriptions a GraphQL server accepts (subscriptions are used for realtime functionality, learn more here)

To enable the feed query and createPost mutation (from snippets folder), you’d have to write the root types as follows:

Note the added ! flags the selector's valued as required.

```
type Query {
  feed: [Post!]!
}

type Mutation {
  createPost(description: String!, imageUrl: String!): Post
}

```
