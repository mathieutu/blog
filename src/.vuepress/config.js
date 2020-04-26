module.exports = {
  title: 'Mathieu TUDISCO',
  description: "@mathieutu's personal blog.\n Tips, and sharing about web development.",
  plugins: [
    require('./plugins/blog'),
    '@vuepress/medium-zoom',
    'vuepress-plugin-reading-time',
    ['@vuepress/last-updated', { transformer: timestamp => timestamp }],
    require('./plugins/lastCommit'),
    require('./plugins/offlineStore'),
    ['vuepress-plugin-container', {
      type: 'center',
      before: '<div style="display: flex; justify-content: center">',
      after: '</div>',
    }],
  ],
  head: [
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#ded4d4' }],
  ],
  markdown: {
    linkify: true,
  },
  themeConfig: {
    sidebar: false,

    docsRepo: 'mathieutu/blog',
    docsDir: 'src',
    docsBranch: 'master',

    editLinks: true,
    lastUpdated: true,
    nav: [
      { text: 'About', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Links', items: [
        { text: 'Github', link: 'https://github.com/mathieutu' },
        { text: 'Linkedin', link: 'https://www.linkedin.com/in/mathieutu/' },
        { text: 'Twitter', link: 'https://twitter.com/mathieutu' },
      ]}
    ]
  }
};
