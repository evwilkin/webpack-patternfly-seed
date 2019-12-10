module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "transform-imports",
      {
        "@patternfly/react-core": {
          // Use "transform: '@material-ui/core/${member}'," if your bundler does not support ES modules
          transform: '@patternfly/react-core/dist/js/components/${member}',
          preventFullImport: true
        }
      }
    ]
  ]
}
