module.exports = {
  title: 'Mathieu TUDISCO',
  description: 'Un blog',
  plugins: [
    ['@vuepress/blog', {
      postsDir: 'blog',
      permalink: false
    }],
    ['@vuepress/medium-zoom', {
      selector: '.post .content img'
    }],
    ['@vuepress/pwa', {
      serviceWorker: true,
      //popupComponent: 'MySWUpdatePopup',
      updatePopup: true
    }],
    'vuepress-plugin-reading-time',
    '@vuepress/last-updated',
    require('./plugins/lastCommit'),
    ['@vuepress/container', {
      type: 'center',
      before: '<div style="display: flex; justify-content: center">',
      after: '</div>',
    }]
  ],
  head: [
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.png' }],
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
      {
        text: 'Links', items: [
          { text: 'Github', link: 'https://github.com/mathieutu' },
          { text: 'Linkedin', link: 'https://www.linkedin.com/in/mathieutu/' },
          { text: 'Twitter', link: 'https://twitter.com/mathieutu' },
        ]
      }
    ]
  }
};
