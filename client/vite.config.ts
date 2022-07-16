/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import UnoCSS from "unocss/vite";
import { presetAttributify, presetIcons, presetUno } from "unocss";
import transformerDirective from "@unocss/transformer-directives";

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dirs: [
        "./src/components",
        "./src/layouts",
        "./src/atoms",
        "./src/molecules",
        "./src/organisms",
        "./src/pages",
        "./src/templates",
      ],
      dts: true,
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue/macros", "vue-router"],
      dts: true,

      dirs: [
        "./src/stores",
        "./src/utils",
        "./src/services",
        "./src/composables",
        "./src/composables/CrossTable",
        "./src/composables/DatePicker",
        "./src/composables/Auth",
        "./src/composables/V",
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          customizations: {
            transform(svg) {
              return svg.replace(/#fff/, "#fff");
            },
          },
          extraProperties: {
            display: "inline-block",
            "vertical-align": "middle",
          },
        }),
      ],
      transformers: [transformerDirective()],
    }),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    globals: true,
    environment: "jsdom",
  },
});
