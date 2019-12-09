module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    [
      "babel-plugin-import",
      {
        "libraryName": "@patternfly/react-icons",
        // Use ""libraryDirectory": ""," if your bundler does not support ES modules
        "libraryDirectory": "dist/js/icons",
        "camel2DashComponentName": true
      },
      "react-icons"
    ],
    [
      "babel-plugin-import",
      {
        "libraryName": "@patternfly/react-core",
        // Use ""libraryDirectory": ""," if your bundler does not support ES modules
        customName: (name) => {
          console.log(name);
          return `dist/js/components/${name}`;
        },
        "camel2DashComponentName": false
      },
      "react-core"
    ]
  ]
};
