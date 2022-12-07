/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-catch */
const Case = require("case");
const { execSync } = require("child_process");

module.exports = (plop) => {
  // create your generators here
  plop.setGenerator("start", {
    description: "Now build All Files in one Go",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Name of your Resources -",
      },
    ],
    actions: () => {
      const actions = [
        {
          type: "add",
          path: "../../src/routes/v1/admin/{{name}}.routes.js",
          templateFile: "./templates/route.template.hbs",
        },
        {
          type: "modify",
          pattern: /(\/\/ ADD_ROUTES)/g,
          path: "../../src/routes/v1/admin.routes.js",
          templateFile: "./templates/routeIndex.template.hbs",
        },
        {
          type: "modify",
          pattern: /(\/\/ ROUTES_REF)/g,
          path: "../../src/routes/v1/admin.routes.js",
          templateFile: "./templates/routeRef.template.hbs",
        },

        {
          type: "add",
          path: "../../src/validations/{{name}}.validation.js",
          templateFile: "./templates/validation.template.hbs",
        },
        {
          type: "modify",
          pattern: /(\/\/ ADD_VALIDATION)/g,
          path: "../../src/validations/index.js",
          templateFile: "./templates/validationIndex.hbs",
        },
        {
          type: "modify",
          pattern: /(\/\/ VALIDATION_REF)/g,
          path: "../../src/validations/index.js",
          templateFile: "./templates/validationRef.template.hbs",
        },

        // {
        //   type: "add",
        //   path: "../../src/models/{{camelCase name}}Model/index.js",
        //   templateFile: "./templates/model.template.hbs",
        // },
        // {
        //   type: "append",
        //   pattern: "ADD_MODEL",
        //   path: "../../src/models/index.js",
        //   templateFile: "./templates/modelIndex.hbs",
        // },

        // {
        //   type: "add",
        //   path: "../../src/controllers/{{camelCase name}}Controller/index.js",
        //   templateFile: "./templates/controller.template.hbs",
        // },
        // {
        //   type: "append",
        //   pattern: "ADD_CONTROLLER",
        //   path: "../../src/controllers/index.js",
        //   templateFile: "./templates/controllerIndex.hbs",
        // },
      ];
      actions.push({
        type: "prettify",
      });
      return actions;
    },
  });
  plop.setActionType("prettify", () => {
    try {
      execSync('prettier --write  "src/**/*.js"');
    } catch (err) {
      throw err;
    }
  });
  plop.setHelper("camelCase", (txt) => Case.camel(txt));
  plop.setHelper("pascal", (txt) => Case.pascal(txt));
};
