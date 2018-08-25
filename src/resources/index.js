// export function configure(config) {
//   config.globalResources([
//     './value-converters/stringify'
//   ]);
// }

export function configure(config) {
  config.globalResources([
    './value-converters/stringify',
    './elements/nav-bar/nav-bar.html',
    './value-converters/number-value-converter'

  ]);
}
