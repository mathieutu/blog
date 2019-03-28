const { resolve } = require('path');
const { writeFileSync, readFileSync, existsSync } = require('fs');
const serialize = require('serialize-javascript');

function replaceFileContent(file, search, replace) {
  writeFileSync(file, readFileSync(file, 'utf8').replace(search, replace));
}

module.exports = (options, ctx) => {
  const storagePath = resolve(ctx.outDir, 'storage.json');

  return {
    enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.js'),

    generated(pages) {
      const store = existsSync(storagePath) ? JSON.parse(readFileSync(storagePath)) : {};

      const replace = `<script>window.STORE=${serialize(store, { isJSON: true })}</script>`;
      const search = '<!--app-ssr-storage-->';

      pages.forEach(path => replaceFileContent(path, search, replace));
    },

    clientDynamicModules() {
      return [
        {
          name: 'constants.js',
          content: `
            export const STORAGE_PATH = '${storagePath}';
          `
        }
      ];
    },
  };
};
