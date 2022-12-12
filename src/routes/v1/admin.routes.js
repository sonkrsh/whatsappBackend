const usersRoute = require("./admin/users.routes");
const carCompanyRoute = require("./admin/carCompany.routes");
// ADD_ROUTES

const combineRoute = [
  usersRoute,
  carCompanyRoute,
  // ROUTES_REF
];

module.exports = combineRoute;
