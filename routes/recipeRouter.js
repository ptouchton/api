/* eslint-disable no-param-reassign */
const express = require('express');

function recipeRoutes() {
  const recipeRouter = express.Router();

  recipeRouter.route('/recipes')
    .get((req, res) => {
      res.json('test recipe');
    });

  recipeRouter.route('/recipes/:recipeId')
    .get((req, res) => {
      res.json('test recipe');
    });

  return recipeRouter;
}

module.exports = recipeRoutes;
