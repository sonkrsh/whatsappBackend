const usersRoute = require("./admin/users.routes");
// ADD_ROUTES

const combineRoute = [
  usersRoute,
  // ADD_REF
];

module.exports = combineRoute;
