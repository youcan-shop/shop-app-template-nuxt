import CelesteIcons from '@youcan/celeste-icons/icons.json';

import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: { display: 'inline-block' },
      collections: {
        [CelesteIcons.prefix]: () => CelesteIcons,
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
