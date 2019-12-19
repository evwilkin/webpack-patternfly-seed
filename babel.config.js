require.extensions['.css'] = () => undefined;
const components = require('@patternfly/react-core/dist/js/components');
const experimental = require('@patternfly/react-core/dist/js/experimental');
const layouts = require('@patternfly/react-core/dist/js/layouts');
// console.log(components);

// let componentsObj = {};
// let prevKey = '';
// let nestedComponents = [];
// Object.keys(components).forEach(key => {
//   console.log("Key: ", key);
//   try {
//     require.resolve(`@patternfly/react-core/dist/js/components/${key}`);
//     componentsObj[key] = key;
//     prevKey = key;
//     console.log(nestedComponents.length);
//     while (nestedComponents.length) {
//       const nestedComponent = nestedComponents.shift();
//       componentsObj[nestedComponent] = prevKey;
//       console.log('popped off component: ', nestedComponent);
//     }
//   }
//   catch (e) {
//     // console.log(e.name);
//     if (prevKey) {
//       // console.log('prevkey: ', prevKey);
//       try {
//         console.log(`@patternfly/react-core/dist/js/components/${prevKey}/${key}.js`)
//         require.resolve(`@patternfly/react-core/dist/js/components/${prevKey}/${key}.js`);
//         componentsObj[key] = prevKey;
//         // console.log('Matched to prevkey');
//       }
//       catch (e) {
//         console.log(e);
//         nestedComponents.push(key);
//         console.log(`No match to prevkey ${prevKey}, adding to array`);
//       }
//     } else {
//       nestedComponents.push(key);
//       // console.log('No prevkey, adding to array');
//     }
//   }
// });

let componentsObj = {};
Object.keys(components).forEach(component => {
  try {
    const componentExport = require(`@patternfly/react-core/dist/js/components/${component}`);
    Object.keys(componentExport).forEach(key => {
      try {
        require.resolve(`@patternfly/react-core/dist/js/components/${component}/${key}`)
        componentsObj[key] = component;
      } catch (e) {
        console.log(e.name, ` - please use a direct path import for ${key}`);
      }
    });
  } catch (e) {
    // not a component directory
  }
});
console.log(componentsObj);

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
            let res = '@patternfly/react-core/dist/js/';
            if (components[importName]) {
              res += 'components';
            } else if (experimental[importName]) {
              res += 'experimental';
            } else if (layouts[importName]) {
              res += 'layouts';
            }

            // res += `/${componentsObj[importName]}/${importName}.js`;
            res += `/${importName}/${importName}.js`;
            return res; 
          },
          preventFullImport: true,
          skipDefaultConversion: true
        }
      }
    ]
  ]
}
