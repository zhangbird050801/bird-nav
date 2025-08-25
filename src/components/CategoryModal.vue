<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>{{ category ? '编辑分类' : '添加分类' }}</h3>
        <button class="close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label for="categoryName">分类名称</label>
          <input
            id="categoryName"
            v-model="form.name"
            type="text"
            placeholder="请输入分类名称"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="categoryIcon">图标类名</label>
          <div class="icon-input">
            <input
              id="categoryIcon"
              v-model="form.icon"
              type="text"
              placeholder="例如: fas fa-tools"
              required
            />
            <div class="icon-preview">
              <i :class="form.icon" v-if="form.icon"></i>
            </div>
          </div>
          <small class="form-help">
            请使用 FontAwesome 图标类名，如: fas fa-tools, fab fa-github 等
          </small>
        </div>
        
        <div class="icon-suggestions">
          <p class="suggestions-title">常用图标：</p>
          <div class="icon-grid">
            <button
              v-for="iconClass in commonIcons"
              :key="iconClass"
              type="button"
              class="icon-option"
              @click="form.icon = iconClass"
              :class="{ active: form.icon === iconClass }"
            >
              <i :class="iconClass"></i>
            </button>
          </div>
        </div>
        
        <div class="modal-actions">
          <button type="button" class="btn secondary" @click="closeModal">
            取消
          </button>
          <button type="submit" class="btn primary">
            {{ category ? '保存' : '添加' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Category } from '../types'

interface Props {
  category?: Category | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  save: [categoryData: Omit<Category, 'id' | 'sites'>]
  close: []
}>()

const form = ref({
  name: '',
  icon: ''
})

const commonIcons = [
  'fas fa-tools',
  'fas fa-code',
  'fas fa-graduation-cap',
  'fas fa-gamepad',
  'fas fa-music',
  'fas fa-camera',
  'fas fa-shopping-cart',
  'fas fa-heart',
  'fas fa-star',
  'fas fa-home',
  'fas fa-briefcase',
  'fas fa-book',
  'fab fa-github',
  'fab fa-google',
  'fab fa-youtube',
  'fab fa-twitter'
]

// 初始化表单数据
watch(() => props.category, (category) => {
  if (category) {
    form.value = {
      name: category.name,
      icon: category.icon
    }
  } else {
    form.value = {
      name: '',
      icon: ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  if (!form.value.name.trim() || !form.value.icon.trim()) {
    return
  }
  
  emit('save', {
    name: form.value.name.trim(),
    icon: form.value.icon.trim()
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
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
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

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
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

.icon-suggestions {
  margin-bottom: 1.5rem;
}

.suggestions-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.75rem;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.5rem;
}

.icon-option {
  width: 40px;
  height: 40px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: white;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.icon-option:hover,
.icon-option.active {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
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
