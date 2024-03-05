const express = require("express");
const adminRoute = require("./admin.routes");
const router = express.Router();
const config = require("../../config/config");

const defaultRoutes = [
  {
    path: "/admin",
    route: adminRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
