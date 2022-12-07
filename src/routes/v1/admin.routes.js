const usersRoute = require("./admin/users.routes");
// ADD_ROUTES

const combineRoute = [
  usersRoute,
  // ROUTES_REF
];

module.exports = combineRoute;
