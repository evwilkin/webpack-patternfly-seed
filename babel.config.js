require.extensions['.css'] = () => {};
const components = require('@patternfly/react-core/dist/js/components');

const customName = (name) => {
  let res = '@patternfly/react-core/dist/js/'
  if (Object.keys(components).includes(name)) {
    res += 'components/';
  }

  res += name;
  res += '/index.js';
  return res;
}

module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-env"],
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
        customName,
        "camel2DashComponentName": false
      },
      "react-core"
    ]
  ]
};


console.log(customName('Button'))
