export function configure(config) {
  config.globalResources([
        './elements/nav-bar/nav-bar.html',
    './value-converters/number-value-converter',
    './value-converters/stringify'
  ]);
}