import type { Category } from '../types'

export const defaultCategories: Category[] = [
  {
    id: 'tools',
    name: '实用工具',
    icon: 'fas fa-tools',
    sites: [
      {
        id: 'google-translate',
        name: 'Google 翻译',
        url: 'https://translate.google.com',
        description: '在线翻译工具',
        icon: 'fas fa-language',
        tags: ['翻译', '语言', '工具']
      },
      {
        id: 'figma',
        name: 'Figma',
        url: 'https://www.figma.com',
        description: 'UI/UX 设计工具',
        icon: 'fas fa-palette',
        tags: ['设计', 'UI', 'UX']
      },
      {
        id: 'github',
        name: 'GitHub',
        url: 'https://github.com',
        description: '代码托管平台',
        icon: 'fab fa-github',
        tags: ['代码', 'Git', '开源']
      },
      {
        id: 'json-formatter',
        name: 'JSON 格式化',
        url: 'https://jsonformatter.org',
        description: 'JSON 格式化工具',
        icon: 'fas fa-code',
        tags: ['JSON', '格式化', '开发']
      },
      {
        id: 'tinypng',
        name: 'TinyPNG',
        url: 'https://tinypng.com',
        description: '智能图片压缩工具',
        icon: 'fas fa-compress',
        tags: ['图片', '压缩', '优化']
      },
      {
        id: 'caniuse',
        name: 'Can I Use',
        url: 'https://caniuse.com',
        description: '浏览器兼容性查询',
        icon: 'fas fa-browser',
        tags: ['兼容性', '浏览器', 'CSS']
      }
    ]
  },
  {
    id: 'development',
    name: '开发工具',
    icon: 'fas fa-code',
    sites: [
      {
        id: 'stackoverflow',
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        description: '程序员问答社区',
        icon: 'fab fa-stack-overflow',
        tags: ['问答', '编程', '社区']
      },
      {
        id: 'mdn',
        name: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        description: 'Web 开发文档',
        icon: 'fab fa-firefox',
        tags: ['文档', 'Web', 'API']
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        url: 'https://nodejs.org',
        description: 'JavaScript 运行时',
        icon: 'fab fa-node-js',
        tags: ['Node.js', 'JavaScript', '后端']
      },
      {
        id: 'codepen',
        name: 'CodePen',
        url: 'https://codepen.io',
        description: '前端代码演示',
        icon: 'fab fa-codepen',
        tags: ['代码', '演示', '前端']
      },
      {
        id: 'vuejs',
        name: 'Vue.js',
        url: 'https://vuejs.org',
        description: '渐进式 JavaScript 框架',
        icon: 'fab fa-vuejs',
        tags: ['Vue', 'JavaScript', '框架']
      },
      {
        id: 'vite',
        name: 'Vite',
        url: 'https://vitejs.dev',
        description: '下一代前端构建工具',
        icon: 'fas fa-bolt',
        tags: ['构建', '工具', '快速']
      }
    ]
  },
  {
    id: 'learning',
    name: '学习资源',
    icon: 'fas fa-graduation-cap',
    sites: [
      {
        id: 'coursera',
        name: 'Coursera',
        url: 'https://www.coursera.org',
        description: '在线课程平台',
        icon: 'fas fa-play-circle',
        tags: ['课程', '学习', '在线']
      },
      {
        id: 'youtube',
        name: 'YouTube',
        url: 'https://www.youtube.com',
        description: '视频学习平台',
        icon: 'fab fa-youtube',
        tags: ['视频', '学习', '教程']
      },
      {
        id: 'leetcode',
        name: 'LeetCode',
        url: 'https://leetcode.com',
        description: '算法练习平台',
        icon: 'fas fa-code',
        tags: ['算法', '练习', '面试']
      },
      {
        id: 'freecodecamp',
        name: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org',
        description: '免费编程学习',
        icon: 'fab fa-free-code-camp',
        tags: ['编程', '免费', '学习']
      },
      {
        id: 'juejin',
        name: '掘金',
        url: 'https://juejin.cn',
        description: '技术文章社区',
        icon: 'fas fa-gem',
        tags: ['技术', '文章', '社区']
      },
      {
        id: 'vue-mastery',
        name: 'Vue Mastery',
        url: 'https://www.vuemastery.com',
        description: 'Vue.js 学习平台',
        icon: 'fab fa-vuejs',
        tags: ['Vue', '学习', '高级']
      }
    ]
  },
  {
    id: 'entertainment',
    name: '娱乐休闲',
    icon: 'fas fa-gamepad',
    sites: [
      {
        id: 'bilibili',
        name: '哔哩哔哩',
        url: 'https://www.bilibili.com',
        description: '弹幕视频网站',
        icon: 'fas fa-tv',
        tags: ['视频', '弹幕', '娱乐']
      },
      {
        id: 'netease-music',
        name: '网易云音乐',
        url: 'https://music.163.com',
        description: '在线音乐平台',
        icon: 'fas fa-music',
        tags: ['音乐', '在线', '播放']
      },
      {
        id: 'reddit',
        name: 'Reddit',
        url: 'https://www.reddit.com',
        description: '社交新闻聚合',
        icon: 'fab fa-reddit',
        tags: ['社交', '新闻', '社区']
      },
      {
        id: 'unsplash',
        name: 'Unsplash',
        url: 'https://unsplash.com',
        description: '免费高质量图片',
        icon: 'fas fa-camera',
        tags: ['图片', '免费', '高质量']
      },
      {
        id: 'spotify',
        name: 'Spotify',
        url: 'https://open.spotify.com',
        description: '音乐流媒体服务',
        icon: 'fab fa-spotify',
        tags: ['音乐', '流媒体', '播放']
      },
      {
        id: 'pinterest',
        name: 'Pinterest',
        url: 'https://www.pinterest.com',
        description: '图片分享平台',
        icon: 'fab fa-pinterest',
        tags: ['图片', '分享', '创意']
      }
    ]
  }
]