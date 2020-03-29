//Author: Alexander Adu-Sarkodie
//Server launch file for Model, Query and Schema
//Graphiql IDE loaded via webpack to offset CORS issues. Proxy-ing.
//IDE is packaged into webpack 

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLInt = graphql.GraphQLInt;

//Define data
var goldbergs = {
  1: {
    id: "1",
    categories: ['Leanne Grahamsggggg',' Bretsssss'], 
    tags: ['Sincere@april.biz','Gwenborough'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 1'] 
  },
  2: {
    id: "2",
    categories: ['Ervin Howell','Antonette'],
    tags: ['Shanna@melissa.tv','Wisokyburgh'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 2']
  },
  3: {
    id: "3",
    categories: ['Clementine Bauchh','Samantha'],
    tags: ['Nathan@yesenia.net!','McKenziehaven!'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 3']
  },
  4: {
    id: "4",
    categories: ['Patricia Lebsack','Karianne'],
    tags: ['Julianne.OConner@kory.org','South Elvis'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 4']
  },
  5: {
    id: "5",
    categories: ['Chelsey Dietrich','Kamren'],
    tags: ['Lucio_Hettinger@annie.ca','Roscoeview'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 5']
  },
  6: {
    id: "6",
    categories: ['Mrs. Dennis Schulist','Leopoldo_Corkery'],
    tags: ['Karley_Dach@jasper.info','South Christy'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 6']
  },
  7: {
    id: "7",
    categories: ['Kurtis Weissnat','Elwyn.Skiles'],
    tags: ['Telly.Hoeger@billy.biz','Howemouth'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 7']
  },
  8: {
    id: "8",
    categories: ['Nicholas Runolfsdottir V','Maxime_Nieno'],
    tags: ['Sherwood@rosamond.me','Aliyaview'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 8']
  },
  9: {
    id: "9",
    categories: ['Glenna Reichert','Delphine'],
    tags: ['Chaim_McDermott@dana.io','Bartholomebury'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 9']
  },
  10: {
    id: "10",
    categories: ['Clementina DuBuque','Moriah.Stanton'],
    tags: ['Rey.Padberg@karina.biz','Lebsackbury'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 10']
  },
  11: {
    id: "11",
    categories: ['Jake Dhallion','J.D'],
    tags: ['J.D@faker.biz','Faker'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 11']
  },
  12: {
    id: "12",
    categories: ['Dr Aras','A.A'],
    tags: ['ceo@testenium.com','CEO'],
    desc: ['Lorem ipsum anet consecteur Lorem ipsum anet consecteur Lorem ipsum anet consecteur 12']
  }       
}


//When we resolve our query we return the output of a function called getGoldberg():
//See line 137 iin QueryType
function getGoldberg(id) {
  return goldbergs[id]
}

//Define Model
var goldbergType = new GraphQLObjectType({
  name: 'Goldberg',
  description: "Member of The Goldbergs",
  fields: {
    categories: {
      type: GraphQLString,
      description: "Name of the categories",
    },
    tags: {
      type: GraphQLString,
      description: "Name of the tag",
    },
    desc: {
      type: GraphQLString,
      description: "Description of character",
    },
    id: {
      type: GraphQLInt,
      description: "ID of this Goldberg instance",
    }
  }
});


//Define Query. This is also an instance GraphQLObjectType
//Here in the query we define a unique reference "goldberg" field with a type equal to the type in the  schema above "goldbergType" - The Model
//Properties of the "goldberg" field in the query
//1. type 
//2. args 
//3.resolve
//in the resolve we return a the function getGoldberg(args.id) from above
var queryType = new GraphQLObjectType({
  name: 'query',
  description: "Goldberg query",
  fields: {
    goldberg: {
      type: goldbergType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: function(_, args){
        return getGoldberg(args.id)
      }
    }
  }
});

//Finally, the “schema type” brings it all together.
var schema = new GraphQLSchema({
  query: queryType
});

// Serving the schema
//We use express and the graphqlHTTP middleware to serve our schema.
//With graphiql set to true we can easily test our work:
var graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(8070);
console.log("The GraphQL Server is running.")

var compiler = webpack({
  entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/static/"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
          }
        ]
    }
});

//To serve the front end of our app we need to install
// babel, babel-loader, and a couple of babel presets.
//We also create a new file called .babelrc, 
//this will tell babel what presets we want to use:

var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${8070}`},
  publicPath: '/static/',
  stats: {colors: true}
});

// Serve static resources
app.use('/', express.static('static'));
app.listen(3010);
console.log("The App Server is running on port 3010. graphiql on port 3010.")
