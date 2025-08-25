<template>
  <div class="search-section">
    <div class="search-container">
      <div class="search-input-wrapper">
        <i class="fas fa-search search-icon"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索网站、描述或标签..."
          class="search-input"
          @input="handleSearch"
          @keyup.enter="performSearch"
        />
        <button
          v-if="searchQuery"
          class="clear-btn"
          @click="clearSearch"
          aria-label="清空搜索"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <button
        class="search-btn"
        @click="performSearch"
        :disabled="!searchQuery.trim()"
      >
        搜索
      </button>
    </div>
    
    <!-- 搜索建议 -->
    <div v-if="showSuggestions && suggestions.length" class="suggestions">
      <div
        v-for="suggestion in suggestions"
        :key="suggestion.site.id"
        class="suggestion-item"
        @click="selectSuggestion(suggestion)"
      >
        <i :class="suggestion.site.icon" class="suggestion-icon"></i>
        <div class="suggestion-content">
          <div class="suggestion-name">{{ suggestion.site.name }}</div>
          <div class="suggestion-desc">{{ suggestion.site.description }}</div>
          <div class="suggestion-category">{{ suggestion.category.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { SearchResult } from '../types'

interface Props {
  allSites: SearchResult[]
}

interface Emits {
  (e: 'search', query: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const searchQuery = ref('')
const showSuggestions = ref(false)

const suggestions = computed(() => {
  if (!searchQuery.value.trim() || searchQuery.value.length < 2) {
    return []
  }
  
  const query = searchQuery.value.toLowerCase()
  return props.allSites
    .filter(item => 
      item.site.name.toLowerCase().includes(query) ||
      item.site.description.toLowerCase().includes(query) ||
      item.site.tags?.some(tag => tag.toLowerCase().includes(query))
    )
    .slice(0, 5) // 限制显示数量
})

const handleSearch = () => {
  showSuggestions.value = searchQuery.value.length >= 2
  emit('search', searchQuery.value)
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
    showSuggestions.value = false
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  showSuggestions.value = false
  emit('search', '')
}

const selectSuggestion = (suggestion: SearchResult) => {
  window.open(suggestion.site.url, '_blank')
  showSuggestions.value = false
}

// 点击外部关闭建议
watch(showSuggestions, (show) => {
  if (show) {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.search-section')) {
        showSuggestions.value = false
        document.removeEventListener('click', handleClickOutside)
      }
    }
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
  }
})
</script>

<style scoped>
.search-section {
  margin: 2rem 0;
  position: relative;
}

.search-container {
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-light);
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid transparent;
  border-radius: 50px;
  font-size: 1rem;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  outline: none;
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: var(--bg-light);
  color: var(--text-color);
}

.search-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.search-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 0.5rem;
  overflow: hidden;
}

.suggestion-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--border-color);
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background: var(--bg-light);
}

.suggestion-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: 10px;
  margin-right: 1rem;
  font-size: 1.2rem;
}

.suggestion-content {
  flex: 1;
}

.suggestion-name {
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.25rem;
}

.suggestion-desc {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 0.25rem;
}

.suggestion-category {
  font-size: 0.8rem;
  color: var(--primary-color);
  font-weight: 500;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }
  
  .search-btn {
    align-self: center;
    padding: 0.875rem 3rem;
  }
}
</style>
