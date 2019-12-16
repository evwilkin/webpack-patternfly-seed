require.extensions['.css'] = () => undefined;
const components = require('@patternfly/react-core/dist/js/components');
const experimental = require('@patternfly/react-core/dist/js/experimental');
const layouts = require('@patternfly/react-core/dist/js/layouts');

module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    [
      "transform-imports",
      {
        "@patternfly/react-core": {
          // Use "transform: '@material-ui/core/${member}'," if your bundler does not support ES modules
          // transform: (importName, matches) => `@patternfly/react-core/dist/js/components/${importName}/${importName}.js`,
          transform: (importName, matches) => {
            let res = '@patternfly/react-core/dist/js/'
            if (components[importName]) {
              res += 'components'
            } else if (experimental[importName]) {
              res += 'experimental'
            } else if (layouts[importName]) {
              res += 'layouts'
            }

            res += `/${importName}/${importName}.js`
            return res; 
          },
          preventFullImport: true,
          skipDefaultConversion: true
        }
      }
    ]
  ]
}
