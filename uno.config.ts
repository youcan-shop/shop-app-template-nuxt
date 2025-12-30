import CelesteIcons from '@youcan/celeste-icons/icons.json';

import { presetCeleste } from '@youcan/celeste-tokens/preset';

import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind4(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: { display: 'inline-block' },
      collections: {
        [CelesteIcons.prefix]: () => CelesteIcons,
      },
    }),
    presetCeleste(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
