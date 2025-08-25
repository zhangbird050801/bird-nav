<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="title-line">bird-nav</span>
        </h1>
        <!-- <p class="hero-subtitle">
			欢迎使用 bird-nav
        </p> -->
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">{{ totalSites }}</span>
            <span class="stat-label">个网站</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ totalCategories }}</span>
            <span class="stat-label">个分类</span>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="floating-cards">
          <div 
            v-for="(site, index) in featuredSites" 
            :key="site.id"
            class="floating-card"
            :style="{ 
              animationDelay: `${index * 0.2}s`,
              '--rotation': `${(index - 1) * 15}deg`
            }"
          >
            <div class="card-icon">
              <SmartIcon 
                :url="site.url"
                :icon="site.icon"
                :alt="site.name"
              />
            </div>
            <span>{{ site.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-background">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Category } from '../types'
import SmartIcon from './SmartIcon.vue'

interface Props {
  categories: Category[]
}

const props = defineProps<Props>()

const totalSites = computed(() => 
  props.categories.reduce((sum, category) => sum + category.sites.length, 0)
)

const totalCategories = computed(() => props.categories.length)

const featuredSites = computed(() => {
  const allSites = props.categories.flatMap(category => category.sites)
  return allSites.slice(0, 6) // 显示前6个网站
})
</script>

<style scoped>
.hero {
  position: relative;
  padding: 4rem 0;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.9) 100%
  );
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-light);
}

.hero-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-text {
  text-align: left;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  color: #2d3748;
}

.title-line {
  display: block;
  color: #2d3748;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideInLeft 0.8s ease-out;
}

.title-line:nth-child(2) {
  animation-delay: 0.2s;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #4a5568;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  animation: slideInLeft 0.8s ease-out 0.4s both;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  animation: slideInLeft 0.8s ease-out 0.6s both;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #4a5568;
  margin-top: 0.25rem;
}

.hero-visual {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-cards {
  position: relative;
  width: 300px;
  height: 300px;
}

.floating-card {
  position: absolute;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  animation: float 3s ease-in-out infinite;
  border: 2px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  font-size: 0.75rem;
  font-weight: 500;
  color: #2d3748;
  transform: rotate(var(--rotation));
}

.floating-card:nth-child(1) {
  top: 0;
  left: 50%;
  transform: translateX(-50%) rotate(var(--rotation));
}

.floating-card:nth-child(2) {
  top: 25%;
  right: 0;
  transform: translateY(-50%) rotate(var(--rotation));
}

.floating-card:nth-child(3) {
  bottom: 25%;
  right: 10%;
  transform: translateY(50%) rotate(var(--rotation));
}

.floating-card:nth-child(4) {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) rotate(var(--rotation));
}

.floating-card:nth-child(5) {
  bottom: 25%;
  left: 10%;
  transform: translateY(50%) rotate(var(--rotation));
}

.floating-card:nth-child(6) {
  top: 25%;
  left: 0;
  transform: translateY(-50%) rotate(var(--rotation));
}

.floating-card i {
  font-size: 1.5rem;
  color: #667eea;
}

.card-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  opacity: 0.1;
  animation: pulse 4s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 10%;
  animation-delay: 1.5s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  top: 50%;
  right: 30%;
  animation-delay: 3s;
}

/* 动画 */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(var(--rotation));
  }
  50% {
    transform: translateY(-10px) rotate(var(--rotation));
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.2;
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .hero {
    padding: 2rem 0;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }
  
  .hero-text {
    text-align: center;
    order: 2;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .hero-visual {
    height: 250px;
    order: 1;
  }
  
  .floating-cards {
    width: 200px;
    height: 200px;
  }
  
  .floating-card {
    width: 60px;
    height: 60px;
    font-size: 0.7rem;
  }
  
  .floating-card i {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .floating-card {
    width: 50px;
    height: 50px;
    font-size: 0.6rem;
  }
  
  .floating-card i {
    font-size: 1rem;
  }
}
</style>
