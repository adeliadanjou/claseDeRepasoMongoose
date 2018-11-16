const mongoose = require('mongoose');

const Recipe = require('./models/Recipe');
const data = require('./data.js');

mongoose
  .connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');

    return Recipe.collection.drop();
  })

  .then(() => Recipe.create({
    title: 'La receta de PEPE',
    level: 'Amateur Chef',
    ingredients: [
      '1/2 cup rice vinegar',
      '5 tablespoons honey',
      '1/3 cup soy sauce (such as Silver Swan®)',
      '1/4 cup Asian (toasted) sesame oil',
      '3 tablespoons Asian chili garlic sauce',
      '3 tablespoons minced garlic',
      'salt to taste',
      '8 skinless, boneless chicken thighs',
    ],
    cuisine: 'Asian',
    dishType: ['Dish'],
    image:
        'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef LePapu',
  })
    .then((recipe) => {
      console.log(recipe.title);
    })
    .catch((err) => {
      console.log(`Error al crear modelo ${err}`);
    }))
  .then(() => Recipe.insertMany(data)
    .then(console.log)
    .catch((err) => {
      console.log(`Err insertMany ${err}`);
    }))
  .then(() => Recipe.updateOne(
    { title: 'Rigatoni alla Genovese' },
    { duration: 100 },
  )
    .then(console.log)
    .catch((err) => {
      console.log(`Err updateOne ${err}`);
    }))
  .then(() => Recipe.deleteOne({ title: 'La receta de PEPE' })
    .then(console.log)
    .catch((err) => {
      console.log(`Err delete ${err}`);
    }))
  .then(() => {
    mongoose.connection
      .close()
      .then(() => console.log('mongoose disconnect'))
      .catch(err => console.log(`Err Disconnect Mongo ${err}`));
  })

  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });
