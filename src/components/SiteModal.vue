<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>{{ site ? '编辑网站' : '添加网站' }}</h3>
        <button class="close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label for="siteName">网站名称</label>
          <input
            id="siteName"
            v-model="form.name"
            type="text"
            placeholder="请输入网站名称"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="siteUrl">网站地址</label>
          <input
            id="siteUrl"
            v-model="form.url"
            type="url"
            placeholder="https://example.com"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="siteDescription">网站描述</label>
          <textarea
            id="siteDescription"
            v-model="form.description"
            placeholder="请输入网站描述"
            rows="3"
            required
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="siteIcon">网站图标</label>
          <IconSelector 
            v-model="form.icon"
            :website-url="form.url"
          />
          <small class="form-help">
            可以自动获取网站图标或手动选择 FontAwesome 图标
          </small>
        </div>
        
        <div class="form-group">
          <label for="siteTags">标签</label>
          <input
            id="siteTags"
            v-model="tagsInput"
            type="text"
            placeholder="用逗号分隔，例如: 工具,开发,在线"
          />
          <small class="form-help">
            用逗号分隔多个标签
          </small>
        </div>
        
        <div class="form-group">
          <label>分类</label>
          <div class="category-info">
            <i :class="category.icon"></i>
            <span>{{ category.name }}</span>
          </div>
        </div>
        
        <div class="modal-actions">
          <button type="button" class="btn secondary" @click="closeModal">
            取消
          </button>
          <button type="submit" class="btn primary">
            {{ site ? '保存' : '添加' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Category, Site } from '../types'
import IconSelector from './IconSelector.vue'

interface Props {
  site?: Site | null
  category?: Category | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  save: [siteData: Omit<Site, 'id'>]
  close: []
}>()

const form = ref({
  name: '',
  url: '',
  description: '',
  icon: '',
  tags: [] as string[]
})

const tagsInput = ref('')

// 初始化表单数据
watch(() => props.site, (site) => {
  if (site) {
    form.value = {
      name: site.name,
      url: site.url,
      description: site.description,
      icon: site.icon,
      tags: site.tags || []
    }
    tagsInput.value = (site.tags || []).join(', ')
  } else {
    form.value = {
      name: '',
      url: '',
      description: '',
      icon: '',
      tags: []
    }
    tagsInput.value = ''
  }
}, { immediate: true })

// 监听标签输入
watch(tagsInput, (value) => {
  form.value.tags = value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
})

const handleSubmit = () => {
  if (!form.value.name.trim() || !form.value.url.trim() || !form.value.description.trim()) {
    return
  }
  
  emit('save', {
    name: form.value.name.trim(),
    url: form.value.url.trim(),
    description: form.value.description.trim(),
    icon: form.value.icon.trim(),
    tags: form.value.tags
  })
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideInUp 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.icon-input {
  position: relative;
}

.icon-preview {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1.2rem;
}

.form-help {
  color: var(--text-light);
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--bg-light);
  border-radius: 8px;
  color: var(--text-color);
}

.category-info i {
  color: var(--primary-color);
  font-size: 1.1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn.primary {
  background: var(--primary-color);
  color: white;
}

.btn.secondary {
  background: var(--bg-light);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .icon-grid {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .modal-actions {
    flex-direction: column-reverse;
  }
}
</style>
