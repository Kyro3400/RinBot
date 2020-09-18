const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const path = require('path');
const fs = require('fs').promises;

/**
 * @param {string} dir - drive path
 * @param {string[]} [namespaces] -
 * @param {string} [folderName] -
 */
async function walkDirectory(dir, namespaces = [], folderName = '') {
  const files = await fs.readdir(dir);
  const languages = [];
  for (const file of files) {
    const stat = await fs.stat(path.join(dir, file));
    if (stat.isDirectory()) {
      const isLanguage = file.includes('-');
      if (isLanguage) languages.push(file);

      const folder = await walkDirectory(path.join(dir, file), namespaces, isLanguage ? '' : `${file}/`);

      namespaces = folder.namespaces;
    } else {
      namespaces.push(`${folderName}${file.substr(0, file.length - 5)}`);
    }
  }

  return { namespaces: [...new Set(namespaces)], languages };
}

/**
 * @returns {Promise<Map<string, any>>}
 */
module.exports = async () => {
  const ops = {
    jsonIndent: 2,
    // eslint-disable-next-line no-undef
    loadPath: path.resolve(__dirname, '../languages/{{lng}}/{{ns}}.json'),
  };
  
  // eslint-disable-next-line no-undef 
  const { namespaces, languages } = await walkDirectory(path.resolve(__dirname, '../languages/'));
  
  i18next.use(Backend);
  
  await i18next.init({
    backend: ops,
    debug: false,
    fallbackLng: 'en-US',
    initImmediate: false,
    interpolation: { escapeValue: false },
    load: 'all',
    ns: [...namespaces],
    preload: [...languages],
  });

  return new Map(languages.map(item => [item, i18next.getFixedT(item)]));
};