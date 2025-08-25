<template>
  <a 
    :href="site.url" 
    target="_blank" 
    rel="noopener noreferrer"
    class="site-card"
    @click="handleClick"
  >
    <div class="site-icon">
      <i :class="site.icon"></i>
    </div>
    <div class="site-info">
      <h3 class="site-name">{{ site.name }}</h3>
      <p class="site-description">{{ site.description }}</p>
      <div v-if="site.tags && site.tags.length" class="site-tags">
        <span 
          v-for="tag in site.tags.slice(0, 3)" 
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <div class="site-link-icon">
      <i class="fas fa-external-link-alt"></i>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { Site } from '../types'

interface Props {
  site: Site
}

const props = defineProps<Props>()

const handleClick = () => {
  // 可以在这里添加点击统计等逻辑
  console.log(`访问网站: ${props.site.name}`)
}
</script>

<style scoped>
.site-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: var(--border-radius);
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.site-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.site-card:hover::before {
  left: 100%;
}

.site-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.site-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: 12px;
  margin-right: 1rem;
  flex-shrink: 0;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.site-card:hover .site-icon {
  transform: scale(1.1) rotate(5deg);
}

.site-info {
  flex: 1;
  min-width: 0;
}

.site-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.site-description {
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.site-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: var(--bg-light);
  color: var(--text-light);
  font-size: 0.75rem;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.site-card:hover .tag {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.site-link-icon {
  opacity: 0;
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  margin-left: 1rem;
}

.site-card:hover .site-link-icon {
  opacity: 1;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .site-card {
    padding: 1rem;
  }
  
  .site-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .site-name {
    font-size: 1rem;
  }
  
  .site-description {
    font-size: 0.85rem;
  }
}
</style>
