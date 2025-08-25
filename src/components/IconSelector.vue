<template>
  <div class="icon-selector">
    <div class="current-icon" @click="toggleSelector">
      <SmartIcon 
        v-if="previewUrl"
        :url="previewUrl"
        :icon="modelValue"
        :alt="'预览图标'"
      />
      <i v-else :class="modelValue || 'fas fa-globe'" class="fallback-icon"></i>
      <span class="selector-label">选择图标</span>
      <i class="fas fa-chevron-down toggle-arrow" :class="{ 'open': showSelector }"></i>
    </div>
    
    <div v-if="showSelector" class="icon-options">
      <div class="option-tabs">
        <button 
          :class="{ active: activeTab === 'auto' }"
          @click="activeTab = 'auto'"
        >
          自动获取
        </button>
        <button 
          :class="{ active: activeTab === 'manual' }"
          @click="activeTab = 'manual'"
        >
          手动选择
        </button>
      </div>
      
      <!-- 自动获取网站图标 -->
      <div v-if="activeTab === 'auto'" class="auto-section">
        <div class="url-input">
          <input 
            v-model="tempUrl"
            type="url" 
            placeholder="输入网站URL，自动获取图标"
            @input="onUrlChange"
          />
          <button v-if="tempUrl" @click="useWebsiteIcon" class="use-btn">
            使用此图标
          </button>
        </div>
        <div v-if="tempUrl" class="preview-section">
          <div class="preview-icon">
            <SmartIcon :url="tempUrl" alt="预览" />
          </div>
          <span>预览</span>
        </div>
      </div>
      
      <!-- 手动选择图标 -->
      <div v-if="activeTab === 'manual'" class="manual-section">
        <div class="icon-categories">
          <button 
            v-for="cat in iconCategories"
            :key="cat.name"
            :class="{ active: activeIconCategory === cat.name }"
            @click="activeIconCategory = cat.name"
          >
            <i :class="cat.icon"></i>
            {{ cat.label }}
          </button>
        </div>
        
        <div class="icons-grid">
          <button
            v-for="icon in currentCategoryIcons"
            :key="icon"
            class="icon-option"
            :class="{ selected: modelValue === icon }"
            @click="selectIcon(icon)"
          >
            <i :class="icon"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import SmartIcon from './SmartIcon.vue'

interface Props {
  modelValue: string
  websiteUrl?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showSelector = ref(false)
const activeTab = ref<'auto' | 'manual'>('auto')
const activeIconCategory = ref('common')
const tempUrl = ref(props.websiteUrl || '')
const previewUrl = ref(props.websiteUrl || '')

const iconCategories = [
  { name: 'common', label: '常用', icon: 'fas fa-star' },
  { name: 'web', label: '网站', icon: 'fas fa-globe' },
  { name: 'dev', label: '开发', icon: 'fas fa-code' },
  { name: 'social', label: '社交', icon: 'fas fa-users' },
  { name: 'tools', label: '工具', icon: 'fas fa-tools' },
  { name: 'media', label: '媒体', icon: 'fas fa-play' }
]

const iconSets = {
  common: [
    'fas fa-globe', 'fas fa-star', 'fas fa-heart', 'fas fa-bookmark',
    'fas fa-home', 'fas fa-user', 'fas fa-search', 'fas fa-plus'
  ],
  web: [
    'fas fa-globe-americas', 'fas fa-link', 'fas fa-external-link-alt',
    'fas fa-wifi', 'fas fa-cloud', 'fas fa-server', 'fas fa-database'
  ],
  dev: [
    'fab fa-github', 'fab fa-gitlab', 'fab fa-bitbucket', 'fas fa-code',
    'fas fa-terminal', 'fab fa-git-alt', 'fas fa-bug', 'fas fa-cogs'
  ],
  social: [
    'fab fa-twitter', 'fab fa-facebook', 'fab fa-instagram', 'fab fa-linkedin',
    'fab fa-youtube', 'fab fa-discord', 'fab fa-telegram', 'fab fa-whatsapp'
  ],
  tools: [
    'fas fa-tools', 'fas fa-wrench', 'fas fa-screwdriver', 'fas fa-hammer',
    'fas fa-paint-brush', 'fas fa-palette', 'fas fa-calculator', 'fas fa-compress'
  ],
  media: [
    'fas fa-play', 'fas fa-music', 'fas fa-video', 'fas fa-image',
    'fas fa-film', 'fas fa-camera', 'fas fa-microphone', 'fas fa-headphones'
  ]
}

const currentCategoryIcons = computed(() => {
  return iconSets[activeIconCategory.value as keyof typeof iconSets] || []
})

const toggleSelector = () => {
  showSelector.value = !showSelector.value
}

const selectIcon = (icon: string) => {
  emit('update:modelValue', icon)
  previewUrl.value = '' // 清除网站URL预览
  showSelector.value = false
}

const onUrlChange = () => {
  previewUrl.value = tempUrl.value
}

const useWebsiteIcon = () => {
  previewUrl.value = tempUrl.value
  emit('update:modelValue', '') // 清空图标类名，使用网站图标
  showSelector.value = false
}

// 监听外部URL变化
watch(() => props.websiteUrl, (newUrl) => {
  if (newUrl) {
    tempUrl.value = newUrl
    previewUrl.value = newUrl
  }
})

// 点击外部关闭选择器
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.icon-selector')) {
    showSelector.value = false
  }
}

// 添加全局点击监听
if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script>

<style scoped>
.icon-selector {
  position: relative;
  width: 100%;
}

.current-icon {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: white;
  cursor: pointer;
  transition: var(--transition);
}

.current-icon:hover {
  border-color: var(--primary-color);
}

.current-icon > :first-child {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fallback-icon {
  font-size: 1.2rem;
  color: var(--primary-color);
}

.selector-label {
  flex: 1;
  color: var(--text-color);
}

.toggle-arrow {
  color: var(--text-light);
  transition: transform 0.3s ease;
}

.toggle-arrow.open {
  transform: rotate(180deg);
}

.icon-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border: 2px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  box-shadow: var(--shadow-hover);
  max-height: 400px;
  overflow-y: auto;
}

.option-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
}

.option-tabs button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  background: var(--bg-light);
  color: var(--text-light);
  cursor: pointer;
  transition: var(--transition);
}

.option-tabs button.active {
  background: var(--primary-color);
  color: white;
}

.auto-section, .manual-section {
  padding: 1rem;
}

.url-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.url-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.use-btn {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.preview-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--bg-light);
  border-radius: 4px;
}

.preview-icon {
  width: 24px;
  height: 24px;
}

.icon-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.icon-categories button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.8rem;
}

.icon-categories button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
}

.icon-option {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: var(--transition);
}

.icon-option:hover {
  background: var(--bg-light);
  border-color: var(--primary-color);
}

.icon-option.selected {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.icon-option i {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .icons-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .icon-categories {
    justify-content: center;
  }
}
</style>
