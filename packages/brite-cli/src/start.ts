const presets = {
  react: '@eventbrite/brite-preset-react',
  'react-node': '@eventbrite/brite-preset-react-node',
};

export const init = (options) => {
  let presetPackage = presets[options.preset];

  if (presetPackage) {
    const Preset = require(`@eventbrite/brite-preset-${options.preset}`).default;
    const instance = new Preset(options);
    instance.start();
  }
};