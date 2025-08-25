import type { Category } from '../types'

export const categories: Category[] = [
  {
    id: 'tools',
    name: '实用工具',
    icon: 'fas fa-tools',
    color: '#667eea',
    sites: [
      {
        id: 'google-translate',
        name: 'Google 翻译',
        url: 'https://translate.google.com',
        description: '在线翻译工具，支持多种语言互译',
        icon: 'fas fa-language',
        tags: ['翻译', '语言', '工具']
      },
      {
        id: 'figma',
        name: 'Figma',
        url: 'https://www.figma.com',
        description: '协作式 UI/UX 设计工具',
        icon: 'fas fa-palette',
        tags: ['设计', 'UI', 'UX', '协作']
      },
      {
        id: 'github',
        name: 'GitHub',
        url: 'https://github.com',
        description: '全球最大的代码托管平台',
        icon: 'fab fa-github',
        tags: ['代码', 'Git', '开源', '协作']
      },
      {
        id: 'json-formatter',
        name: 'JSON 格式化',
        url: 'https://jsonformatter.org',
        description: 'JSON 数据格式化和验证工具',
        icon: 'fas fa-code',
        tags: ['JSON', '格式化', '验证']
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
        description: '浏览器兼容性查询工具',
        icon: 'fas fa-browser',
        tags: ['兼容性', '浏览器', 'CSS', 'JavaScript']
      }
    ]
  },
  {
    id: 'development',
    name: '开发工具',
    icon: 'fas fa-code',
    color: '#764ba2',
    sites: [
      {
        id: 'stackoverflow',
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        description: '全球最大的程序员问答社区',
        icon: 'fab fa-stack-overflow',
        tags: ['问答', '编程', '社区']
      },
      {
        id: 'mdn',
        name: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        description: '权威的 Web 开发文档和教程',
        icon: 'fab fa-firefox',
        tags: ['文档', 'Web', 'JavaScript', 'CSS', 'HTML']
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        url: 'https://nodejs.org',
        description: 'JavaScript 服务端运行时环境',
        icon: 'fab fa-node-js',
        tags: ['JavaScript', '服务端', '运行时']
      },
      {
        id: 'codepen',
        name: 'CodePen',
        url: 'https://codepen.io',
        description: '前端代码演示和分享平台',
        icon: 'fab fa-codepen',
        tags: ['前端', '演示', '分享', 'HTML', 'CSS', 'JavaScript']
      },
      {
        id: 'vuejs',
        name: 'Vue.js',
        url: 'https://vuejs.org',
        description: '渐进式 JavaScript 前端框架',
        icon: 'fab fa-vuejs',
        tags: ['Vue', 'JavaScript', '前端', '框架']
      },
      {
        id: 'vite',
        name: 'Vite',
        url: 'https://vitejs.dev',
        description: '下一代前端构建工具',
        icon: 'fas fa-bolt',
        tags: ['构建工具', '前端', '快速']
      }
    ]
  },
  {
    id: 'learning',
    name: '学习资源',
    icon: 'fas fa-graduation-cap',
    color: '#f093fb',
    sites: [
      {
        id: 'coursera',
        name: 'Coursera',
        url: 'https://www.coursera.org',
        description: '全球知名在线课程平台',
        icon: 'fas fa-play-circle',
        tags: ['课程', '学习', '教育']
      },
      {
        id: 'youtube',
        name: 'YouTube',
        url: 'https://www.youtube.com',
        description: '全球最大的视频分享平台',
        icon: 'fab fa-youtube',
        tags: ['视频', '学习', '教程']
      },
      {
        id: 'leetcode',
        name: 'LeetCode',
        url: 'https://leetcode.com',
        description: '算法和数据结构练习平台',
        icon: 'fas fa-code',
        tags: ['算法', '数据结构', '编程', '面试']
      },
      {
        id: 'freecodecamp',
        name: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org',
        description: '免费编程学习平台',
        icon: 'fab fa-free-code-camp',
        tags: ['编程', '免费', '学习', '认证']
      },
      {
        id: 'juejin',
        name: '掘金',
        url: 'https://juejin.cn',
        description: '高质量技术文章分享社区',
        icon: 'fas fa-gem',
        tags: ['技术', '文章', '社区', '前端']
      },
      {
        id: 'vue-mastery',
        name: 'Vue Mastery',
        url: 'https://www.vuemastery.com',
        description: 'Vue.js 官方推荐学习平台',
        icon: 'fab fa-vuejs',
        tags: ['Vue', '学习', '视频', '教程']
      }
    ]
  },
  {
    id: 'entertainment',
    name: '娱乐休闲',
    icon: 'fas fa-gamepad',
    color: '#667eea',
    sites: [
      {
        id: 'bilibili',
        name: '哔哩哔哩',
        url: 'https://www.bilibili.com',
        description: '国内知名弹幕视频网站',
        icon: 'fas fa-tv',
        tags: ['视频', '弹幕', '娱乐', '学习']
      },
      {
        id: 'netease-music',
        name: '网易云音乐',
        url: 'https://music.163.com',
        description: '发现音乐的美好',
        icon: 'fas fa-music',
        tags: ['音乐', '播放器', '歌单']
      },
      {
        id: 'reddit',
        name: 'Reddit',
        url: 'https://www.reddit.com',
        description: '全球知名社交新闻聚合网站',
        icon: 'fab fa-reddit',
        tags: ['社交', '新闻', '讨论']
      },
      {
        id: 'unsplash',
        name: 'Unsplash',
        url: 'https://unsplash.com',
        description: '免费高质量图片资源网站',
        icon: 'fas fa-camera',
        tags: ['图片', '摄影', '免费', '素材']
      },
      {
        id: 'spotify',
        name: 'Spotify',
        url: 'https://open.spotify.com',
        description: '全球知名音乐流媒体服务',
        icon: 'fab fa-spotify',
        tags: ['音乐', '流媒体', '播放列表']
      },
      {
        id: 'pinterest',
        name: 'Pinterest',
        url: 'https://www.pinterest.com',
        description: '创意图片分享和发现平台',
        icon: 'fab fa-pinterest',
        tags: ['图片', '创意', '灵感', '设计']
      }
    ]
  }
]
