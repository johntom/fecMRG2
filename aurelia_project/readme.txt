    // "tether",
    // "velocity-animate",
    // "bootstrap-select",
    // "bootstrap-tagsinput",
    // "aurelia-bootstrap-select",
    // "aurelia-bootstrap",



{
  "name": "fecMRG2",
  "type": "project:application",
  "bundler": {
    "id": "cli",
    "displayName": "Aurelia-CLI"
  },
  "build": {
    "targets": [
      {
        "id": "web",
        "displayName": "Web",
        "port": 9000,
        "index": "index.html",
        "baseDir": ".",
        "output": "scripts"
      }
    ],
    "options": {
      "minify": "stage & prod",
      "sourcemaps": "dev & stage",
      "rev": "stage & prod"
    },
    "bundles": [
      {
        "name": "app-bundle.js",
        "source": [
          "[**/*.js]",
          "**/*.{css,html}"
        ]
      },
      {
        "name": "vendor-bundle.js",
        "prepend": [
          "node_modules/bluebird/js/browser/bluebird.core.js",
          {
            "path": "node_modules/aurelia-cli/lib/resources/scripts/configure-bluebird-no-long-stacktraces.js",
            "env": "stage & prod"
          },
          {
            "path": "node_modules/aurelia-cli/lib/resources/scripts/configure-bluebird.js",
            "env": "dev"
          },
          "node_modules/moment/min/moment-with-locales.js",
          "node_modules/lodash/lodash.min.js",
          "node_modules/babel-polyfill/dist/polyfill.min.js",
          "node_modules/systemjs/dist/system.js"
        ],
        "dependencies": [
          "aurelia-animator-css",
          "aurelia-binding",
          "aurelia-bootstrapper",
          "aurelia-dependency-injection",
          "aurelia-event-aggregator",
          "aurelia-fetch-client",
          "aurelia-framework",
          "aurelia-history",
          "aurelia-history-browser",
          "aurelia-loader",
          "aurelia-loader-default",
          "aurelia-logging",
          "aurelia-logging-console",
          "aurelia-metadata",
          "aurelia-pal",
          "aurelia-pal-browser",
          "aurelia-path",
          "aurelia-polyfills",
          "aurelia-route-recognizer",
          "aurelia-router",
          "aurelia-task-queue",
          "aurelia-templating",
          "aurelia-templating-binding",
          "jquery",

  {
            "name": "bootstrap",
            "path": "../node_modules/bootstrap/dist",
            "main": "js/bootstrap.min",
            "deps": [
              "jquery"
            ],
            "exports": "$",
            "resources": [
              "css/bootstrap.css"
            ]
          },
        
          {
            "name": "bootstrap-select",
            "main": "dist/js/bootstrap-select.js",
            "path": "../node_modules/bootstrap-select",
            "resources": [
              "dist/css/bootstrap-select.min.css"
            ]
          },
          {
            "name": "aurelia-bootstrap-select",
            "main": "index",
            "path": "../node_modules/aurelia-bootstrap-select/dist/amd",
            "resources": [
              "**/*.{css,html}"
            ]
          },



       
          {
            "name": "aurelia-templating-resources",
            "path": "../node_modules/aurelia-templating-resources/dist/amd",
            "main": "aurelia-templating-resources"
          },
          {
            "name": "aurelia-templating-router",
            "path": "../node_modules/aurelia-templating-router/dist/amd",
            "main": "aurelia-templating-router"
          },
          {
            "name": "aurelia-testing",
            "path": "../node_modules/aurelia-testing/dist/amd",
            "main": "aurelia-testing",
            "env": "dev"
          },
          {
            "name": "text",
            "path": "../node_modules/systemjs-plugin-text",
            "main": "text"
          },
          {
            "name": "aurelia-dialog",
            "main": "aurelia-dialog",
            "path": "../node_modules/aurelia-dialog/dist/commonjs",
            "resources": []
          },
          {
            "name": "aurelia-kendoui-bridge",
            "path": "../node_modules/aurelia-kendoui-bridge/dist/amd",
            "main": "index",
            "resources": [
              "common/*.{js,html}",
              "button/*.{js,html}"
            ]
          },
        
          "numeral"
        ]
      }
    ],
    "loader": {
      "type": "system",
      "configTarget": "vendor-bundle.js",
      "includeBundleMetadataInConfig": "auto",
      "plugins": [
        {
          "name": "text",
          "extensions": [
            ".html",
            ".css"
          ],
          "stub": true
        }
      ]
    }
  },
  "platform": {
    "id": "web",
    "displayName": "Web",
    "port": 9000,
    "index": "index.html",
    "baseDir": ".",
    "output": "scripts"
  },
  "transpiler": {
    "id": "babel",
    "displayName": "Babel",
    "fileExtension": ".js",
    "options": {
      "plugins": [
        "transform-class-properties",
        "transform-async-to-generator",
        "transform-decorators-legacy",
        "transform-es2015-modules-amd"
      ]
    },
    "source": "src/**/*.js"
  },
  "markupProcessor": {
    "id": "maximum",
    "displayName": "Maximum Minification",
    "fileExtension": ".html",
    "source": "src/**/*.html"
  },
  "cssProcessor": {
    "id": "none",
    "displayName": "None",
    "fileExtension": ".css",
    "source": "src/**/*.css"
  },
  "editor": {
    "id": "vscode",
    "displayName": "Visual Studio Code"
  },
  "unitTestRunner": {
    "id": "karma",
    "displayName": "Karma",
    "source": "test/unit/**/*.js"
  },
  "integrationTestRunner": {
    "id": "none",
    "displayName": "None"
  },
  "paths": {
    "root": "src",
    "resources": "resources",
    "elements": "resources/elements",
    "attributes": "resources/attributes",
    "valueConverters": "resources/value-converters",
    "bindingBehaviors": "resources/binding-behaviors"
  },
  "testFramework": {
    "id": "jasmine",
    "displayName": "Jasmine"
  },
  "packageManager": "yarn"
}