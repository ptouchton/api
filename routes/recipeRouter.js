/* eslint-disable no-param-reassign */
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

function recipeRoutes() {
  const recipeRouter = express.Router();

  // Set up Auth0 configuration
  const authConfig = {
    domain: 'dev-1ri5oc4g.us.auth0.com',
    audience: 'https://localhost:4000/api/recipes',
  };

  // Define middleware that validates incoming bearer tokens
  // using JWKS from dev-1ri5oc4g.us.auth0.com
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
    }),
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ['RS256'],
  });

  recipeRouter.route('/recipes')
    .get(jwtCheck, (req, res) => {
      res.json('test recipe');
    });

  recipeRouter.route('/recipes/:recipeId')
    .get((req, res) => {
      res.json('test recipe');
    });

  return recipeRouter;
}

module.exports = recipeRoutes;
