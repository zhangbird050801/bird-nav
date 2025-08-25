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
    
    <!-- 管理面板 -->
    <AdminPanel />
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
import AdminPanel from './components/AdminPanel.vue'
import { useSiteManager } from './composables/useSiteManager'
import type { SearchResult } from './types'

const { categories } = useSiteManager()
const searchQuery = ref('')

// 将所有网站转换为搜索结果格式
const allSites = computed((): SearchResult[] => {
  const results: SearchResult[] = []
  categories.value.forEach(category => {
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
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0f2fe 100%);
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* 响应式 */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem 0.5rem;
  }
}
</style>
