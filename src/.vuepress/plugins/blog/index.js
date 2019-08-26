const { path, datatypes: { isString } } = require('@vuepress/shared-utils');

module.exports = (options, ctx) => {
  const { themeAPI: { layoutComponentMap } } = ctx;

  const isLayoutExists = name => layoutComponentMap[name] !== undefined;
  const getLayout = (name, fallback) => isLayoutExists(name) ? name : fallback;
  const isDirectChild = regularPath => path.parse(regularPath).dir === '/';

  const TAGS_PATH = '/tag/';
  const BLOG_PATH = '/blog/';

  const enhancers = [
    {
      when: ({ regularPath }) => regularPath === TAGS_PATH,
      frontmatter: { layout: getLayout('Tags', 'Page') }
    },
    {
      when: ({ regularPath }) => regularPath.startsWith(TAGS_PATH),
      frontmatter: { layout: getLayout('Tag', 'Page') }
    },
    {
      when: ({ regularPath }) => regularPath === '/',
      frontmatter: { layout: getLayout('Layout') }
    },
    {
      when: ({ regularPath }) => regularPath.startsWith(BLOG_PATH),
      frontmatter: { layout: getLayout('Post', 'Page') },
      data: { type: 'post' }
    },
    {
      when: ({ regularPath }) => isDirectChild(regularPath),
      frontmatter: { layout: getLayout('Page', 'Layout') },
      data: { type: 'page' }
    }
  ];

  return {
    name: 'blog',

    /**
     * Modify page context according enhancers above.
     */
    extendPageData(pageCtx) {
      const { frontmatter: rawFrontmatter } = pageCtx;

      enhancers.forEach(({ when, data = {}, frontmatter = {} }) => {
        if (when(pageCtx)) {
          Object.keys(frontmatter).forEach(key => {
            if (!rawFrontmatter[key]) {
              rawFrontmatter[key] = frontmatter[key];
            }
          });

          Object.assign(pageCtx, data);
        }
      });
    },

    /**
     * Create tag pages.
     */
    async ready() {
      const { pages } = ctx;
      const tagMap = {};

      const handleTag = (key, pageKey) => {
        if (key) {
          if (!tagMap[key]) {
            tagMap[key] = {};
            tagMap[key].path = `${TAGS_PATH}${key}.html`;
            tagMap[key].pageKeys = [];
          }

          tagMap[key].pageKeys.push(pageKey);
        }
      };


      pages.forEach(({ key, frontmatter: { tag, tags, } }) => {
        if (isString(tag)) {
          handleTag(tag, key);
        }

        if (Array.isArray(tags)) {
          tags.forEach(tag => handleTag(tag, key));
        }
      });

      ctx.tagMap = tagMap;

      const extraPages = [
        {
          permalink: TAGS_PATH,
          frontmatter: { title: 'Tags' }
        },
        ...Object.keys(tagMap).map(tagName => ({
          permalink: tagMap[tagName].path,
          meta: { tagName },
          frontmatter: { title: `${tagName} | Tag` }
        })),
      ];

      await Promise.all(extraPages.map(page => ctx.addPage(page)));
    },

    /**
     * Generate tags metadata.
     */
    async clientDynamicModules() {
      return [
        {
          name: 'tag.js',
          content: `export default ${JSON.stringify(ctx.tagMap, null, 2)}`
        },
      ];
    },

    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
  };
};
