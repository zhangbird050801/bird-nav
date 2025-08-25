<template>
  <section class="categories">
    <div 
      v-for="category in filteredCategories" 
      :key="category.id" 
      class="category fade-in-up"
      :data-category="category.id"
    >
      <div class="category-header">
        <h2 class="category-title">
          <i :class="category.icon" :style="{ color: category.color }"></i>
          {{ category.name }}
        </h2>
        <div class="category-count">{{ category.sites.length }} 个网站</div>
      </div>
      
      <div v-if="category.sites.length > 0" class="sites-grid">
        <SiteCard 
          v-for="site in category.sites" 
          :key="site.id"
          :site="site"
        />
      </div>
      
      <div v-else class="empty-category">
        <i class="fas fa-search"></i>
        <p>没有找到匹配的网站</p>
      </div>
    </div>
    
    <!-- 无搜索结果 -->
    <div v-if="filteredCategories.length === 0" class="no-results">
      <div class="no-results-content">
        <i class="fas fa-search"></i>
        <h3>没有找到相关内容</h3>
        <p>尝试使用其他关键词搜索</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Category } from '../types'
import SiteCard from './SiteCard.vue'

interface Props {
  categories: Category[]
  searchQuery?: string
}

const props = withDefaults(defineProps<Props>(), {
  searchQuery: ''
})

const filteredCategories = computed(() => {
  if (!props.searchQuery.trim()) {
    return props.categories
  }
  
  const query = props.searchQuery.toLowerCase()
  return props.categories
    .map(category => ({
      ...category,
      sites: category.sites.filter(site => 
        site.name.toLowerCase().indexOf(query) !== -1 ||
        site.description.toLowerCase().indexOf(query) !== -1 ||
        site.tags?.some(tag => tag.toLowerCase().indexOf(query) !== -1)
      )
    }))
    .filter(category => category.sites.length > 0)
})
</script>

<style scoped>
.categories {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 2rem;
}

.category {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 1rem;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
}

.category-title i {
  font-size: 1.8rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.category-count {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  animation: fadeInGrid 0.6s ease-out;
}

.empty-category {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
}

.empty-category i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-category p {
  font-size: 1.1rem;
  margin: 0;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-content {
  max-width: 400px;
  margin: 0 auto;
}

.no-results-content i {
  font-size: 4rem;
  color: var(--text-light);
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results-content h3 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
}

.no-results-content p {
  color: var(--text-light);
  font-size: 1rem;
  margin: 0;
}

/* 动画 */
@keyframes fadeInGrid {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

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

/* 响应式 */
@media (max-width: 1024px) {
  .sites-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .category {
    padding: 1.5rem;
  }
  
  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .category-title {
    font-size: 1.3rem;
  }
  
  .sites-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .category {
    padding: 1rem;
  }
  
  .category-title {
    font-size: 1.2rem;
  }
  
  .category-title i {
    font-size: 1.5rem;
  }
}
</style>
