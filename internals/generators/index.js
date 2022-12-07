/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-catch */
const Case = require('case');
const { execSync } = require('child_process');

module.exports = (plop) => {
  // create your generators here
  plop.setGenerator('start', {
    description: 'Now build All Files in one Go',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name of your Resources -',
      },
    ],
    actions: () => {
      const actions = [
        {
          type: 'add',
          path: '../../src/routes/v1/{{camelCase name}}Route/index.js',
          templateFile: './templates/route.template.hbs',
        },
        {
          type: 'append',
          pattern: 'ADD_ROUTES',
          path: '../../src/routes/v1/adminPanel.route.js',
          templateFile: './templates/routeIndex.template.hbs',
        },

        {
          type: 'add',
          path: '../../src/services/{{camelCase name}}Service/index.js',
          templateFile: './templates/services.template.hbs',
        },
        {
          type: 'append',
          pattern: 'ADD_SERVICES',
          path: '../../src/services/index.js',
          templateFile: './templates/servicesIndex.hbs',
        },

        {
          type: 'add',
          path: '../../src/validations/{{camelCase name}}Validation/index.js',
          templateFile: './templates/validation.template.hbs',
        },
        {
          type: 'append',
          pattern: 'ADD_VALIDATION',
          path: '../../src/validations/index.js',
          templateFile: './templates/validationIndex.hbs',
        },

        {
          type: 'add',
          path: '../../src/models/{{camelCase name}}Model/index.js',
          templateFile: './templates/model.template.hbs',
        },
        {
          type: 'append',
          pattern: 'ADD_MODEL',
          path: '../../src/models/index.js',
          templateFile: './templates/modelIndex.hbs',
        },

        {
          type: 'add',
          path: '../../src/controllers/{{camelCase name}}Controller/index.js',
          templateFile: './templates/controller.template.hbs',
        },
        {
          type: 'append',
          pattern: 'ADD_CONTROLLER',
          path: '../../src/controllers/index.js',
          templateFile: './templates/controllerIndex.hbs',
        },
      ];
      actions.push({
        type: 'prettify',
      });
      return actions;
    },
  });
  plop.setActionType('prettify', () => {
    try {
      execSync('prettier --write **/**/**/*.js');
    } catch (err) {
      throw err;
    }
  });
  plop.setHelper('camelCase', (txt) => Case.camel(txt));
  plop.setHelper('pascal', (txt) => Case.pascal(txt));
};
