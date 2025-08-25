<template>
  <div class="app">
    <!-- 导航栏 -->
    <NavBar />
    
    <!-- 主要内容 -->
    <main class="main-content">
      <!-- 英雄区域 -->
      <HeroSection :categories="categories" />
      
      <!-- 搜索框 -->
      <SearchSection 
        :all-sites="allSites" 
        @search="handleSearch" 
      />
      
      <!-- 网站分类 -->
      <CategorySection 
        :categories="categories" 
        :search-query="searchQuery" 
      />
    </main>
    
    <!-- 关于部分 -->
    <AboutSection />
    
    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import SearchSection from './components/SearchSection.vue'
import CategorySection from './components/CategorySection.vue'
import AboutSection from './components/AboutSection.vue'
import Footer from './components/Footer.vue'
import { categories } from './data/sites'
import type { SearchResult } from './types'

const searchQuery = ref('')

// 将所有网站转换为搜索结果格式
const allSites = computed((): SearchResult[] => {
  const results: SearchResult[] = []
  categories.forEach(category => {
    category.sites.forEach(site => {
      results.push({
        site,
        category
      })
    })
  })
  return results
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}
</script>

<style>
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  --text-color: #333;
  --text-light: #666;
  --bg-white: #ffffff;
  --bg-light: #f8f9fa;
  --border-color: #e9ecef;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.15);
  --border-radius: 12px;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
}

/* 全局动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* 响应式 */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem 0.5rem;
  }
}

/* 辅助功能 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  html {
    scroll-behavior: auto;
  }
}

/* 焦点样式 */
:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* 选择文本样式 */
::selection {
  background: var(--primary-color);
  color: white;
}
</style>
