const { path } = require('@vuepress/shared-utils');

const uniq = array => [...new Set(array)];
const concat = arrayOfArrays => [].concat(...arrayOfArrays);

module.exports = (options, ctx) => {
  const { themeAPI: { layoutComponentMap } } = ctx;

  const isLayoutExists = name => layoutComponentMap[name] !== undefined;
  const getLayout = (name, fallback) => isLayoutExists(name) ? name : fallback;
  const isDirectChild = regularPath => path.parse(regularPath).dir === '/';

  const TAGS_PATH = '/tags/';
  const BLOG_PATH = '/blog/';

  const enhancers = [
    {
      condition: ({ regularPath }) => regularPath === TAGS_PATH,
      frontmatter: { layout: getLayout('Tags', 'Page') },
      type: 'tags',
    },
    {
      condition: ({ regularPath }) => regularPath.startsWith(TAGS_PATH),
      frontmatter: { layout: getLayout('Tag', 'Page') },
      type: 'tag',
    },
    {
      condition: ({ regularPath }) => regularPath.startsWith(BLOG_PATH),
      frontmatter: { layout: getLayout('Post', 'Page') },
      type: 'post',
    },
    {
      condition: ({ regularPath }) => regularPath === '/',
      frontmatter: { layout: getLayout('Layout') },
      type: 'page',
    },
    {
      condition: ({ regularPath }) => isDirectChild(regularPath),
      frontmatter: { layout: getLayout('Page', 'Layout') },
      type: 'page',
    },
  ];

  return {
    name: 'blog',

    /**
     * Modify page context according enhancers above.
     */
    extendPageData(page) {
      enhancers.forEach(({ condition, type, frontmatter }) => {
        if (condition(page)) {
          page.frontmatter = { ...frontmatter, ...page.frontmatter };
          page.type = type;
        }
      });
    },

    /**
     * Create tag pages.
     */
    async ready() {
      const tagsList = uniq(concat(ctx.pages.map(({ frontmatter: { tags = [] } }) => tags)));

      const extraPages = [
        {
          permalink: TAGS_PATH,
          title: 'Tags list',
        },
        ...tagsList.map(tagName => ({
          frontmatter: { tagName },
          permalink: `${TAGS_PATH}${tagName}.html`,
          title: `Posts with ${tagName.toUpperCase()} tag`,
        })),
      ];

      await Promise.all(extraPages.map(page => ctx.addPage(page)));
    },
  };
};
