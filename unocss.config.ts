import {
  defineConfig,
  presetUno,
  presetWebFonts,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        sans: "Satoshi",
      },
    }),
  ],
  transformers: [transformerVariantGroup()],
});
