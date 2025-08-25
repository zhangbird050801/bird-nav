<template>
  <div class="smart-icon">
    <!-- 网站图标 -->
    <img 
      v-if="showFavicon && faviconUrl" 
      :src="faviconUrl" 
      :alt="alt"
      class="favicon"
      @error="onFaviconError"
      @load="onFaviconLoad"
    />
    <!-- FontAwesome 图标作为备选 -->
    <i 
      v-else
      :class="fallbackIcon || 'fas fa-globe'"
      class="font-icon"
      :title="alt"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getFaviconUrl, getHighQualityFavicon } from '../utils/favicon'

interface Props {
  url?: string
  icon?: string
  alt?: string
  useHighQuality?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  useHighQuality: true
})

const faviconUrl = ref('')
const showFavicon = ref(false)
const fallbackIcon = ref(props.icon)

const loadFavicon = async () => {
  if (!props.url) {
    showFavicon.value = false
    return
  }

  try {
    const favicon = props.useHighQuality 
      ? getHighQualityFavicon(props.url)
      : getFaviconUrl(props.url)
    
    faviconUrl.value = favicon
    showFavicon.value = true
  } catch (error) {
    console.warn('Failed to load favicon:', error)
    showFavicon.value = false
  }
}

const onFaviconError = () => {
  showFavicon.value = false
}

const onFaviconLoad = () => {
  showFavicon.value = true
}

// 监听 URL 变化
watch(() => props.url, loadFavicon, { immediate: true })

onMounted(() => {
  loadFavicon()
})
</script>

<style scoped>
.smart-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.favicon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

.font-icon {
  font-size: inherit;
  color: inherit;
}

/* 确保图标在不同尺寸下都能正确显示 */
.smart-icon {
  min-width: 16px;
  min-height: 16px;
}
</style>
