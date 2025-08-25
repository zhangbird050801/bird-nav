<template>
  <div class="storage-selector">
    <div class="selector-header">
      <h3>
        <i class="fas fa-database"></i>
        选择数据存储方案
      </h3>
    </div>

    <div class="storage-options">
      <div 
        class="storage-option"
        :class="{ active: selectedStorage === 'local' }"
        @click="selectStorage('local')"
      >
        <div class="option-icon">
          <i class="fas fa-hard-drive"></i>
        </div>
        <div class="option-info">
          <h4>本地存储</h4>
          <p>数据存储在浏览器本地，简单快速</p>
          <div class="option-features">
            <span class="feature">✅ 简单易用</span>
            <span class="feature">✅ 离线可用</span>
            <span class="feature">❌ 无法同步</span>
          </div>
        </div>
      </div>

      <div 
        class="storage-option recommended"
        :class="{ active: selectedStorage === 'github' }"
        @click="selectStorage('github')"
      >
        <div class="option-icon">
          <i class="fab fa-github"></i>
        </div>
        <div class="option-info">
          <h4>
            GitHub 存储
            <span class="recommended-badge">推荐</span>
          </h4>
          <p>使用 GitHub API 存储数据，支持版本控制</p>
          <div class="option-features">
            <span class="feature">✅ 完全免费</span>
            <span class="feature">✅ 多设备同步</span>
            <span class="feature">✅ 版本控制</span>
          </div>
        </div>
      </div>

      <div 
        class="storage-option"
        :class="{ active: selectedStorage === 'supabase' }"
        @click="selectStorage('supabase')"
      >
        <div class="option-icon">
          <i class="fas fa-database"></i>
        </div>
        <div class="option-info">
          <h4>Supabase 数据库</h4>
          <p>使用 Supabase 云数据库，功能完整</p>
          <div class="option-features">
            <span class="feature">✅ 实时同步</span>
            <span class="feature">✅ 用户认证</span>
            <span class="feature">⚠️ 需要配置</span>
          </div>
        </div>
      </div>
    </div>

    <div class="storage-description" v-if="selectedStorage">
      <div class="description-content">
        <template v-if="selectedStorage === 'local'">
          <h4>本地存储</h4>
          <p>数据将存储在您的浏览器中，无需任何配置即可使用。</p>
          <ul>
            <li>✅ 无需网络连接</li>
            <li>✅ 立即可用</li>
            <li>❌ 无法在不同设备间同步</li>
            <li>❌ 清除浏览器数据会丢失</li>
          </ul>
        </template>

        <template v-if="selectedStorage === 'github'">
          <h4>GitHub 存储</h4>
          <p>将数据存储在您的 GitHub 仓库中，支持版本控制和多设备同步。</p>
          <ul>
            <li>✅ 完全免费使用</li>
            <li>✅ 自动版本控制</li>
            <li>✅ 多设备数据同步</li>
            <li>✅ 可手动编辑数据文件</li>
            <li>⚙️ 需要创建 GitHub Token</li>
          </ul>
          <div class="quick-setup">
            <h5>快速设置：</h5>
            <ol>
              <li>访问 <a href="https://github.com/settings/tokens" target="_blank">GitHub Settings</a> 创建 Token</li>
              <li>在设置中配置 GitHub 信息</li>
              <li>测试连接并开始使用</li>
            </ol>
          </div>
        </template>

        <template v-if="selectedStorage === 'supabase'">
          <h4>Supabase 数据库</h4>
          <p>使用 Supabase 提供的 PostgreSQL 数据库，功能强大且易于扩展。</p>
          <ul>
            <li>✅ 实时数据同步</li>
            <li>✅ 支持用户认证</li>
            <li>✅ SQL 查询能力</li>
            <li>✅ 自动扩容</li>
            <li>⚙️ 需要创建 Supabase 项目</li>
          </ul>
          <div class="quick-setup">
            <h5>快速设置：</h5>
            <ol>
              <li>访问 <a href="https://supabase.com" target="_blank">Supabase</a> 创建项目</li>
              <li>执行数据库初始化脚本</li>
              <li>配置项目 URL 和 API Key</li>
            </ol>
          </div>
        </template>
      </div>
    </div>

    <div class="storage-actions" v-if="selectedStorage">
      <button 
        class="btn-primary"
        @click="confirmSelection"
      >
        <i class="fas fa-check"></i>
        使用 {{ getStorageName(selectedStorage) }}
      </button>
      
      <button 
        v-if="selectedStorage !== 'local'"
        class="btn-secondary"
        @click="showSettings = true"
      >
        <i class="fas fa-cog"></i>
        配置设置
      </button>
    </div>

    <!-- GitHub 设置弹窗 -->
    <div v-if="showSettings && selectedStorage === 'github'" class="settings-modal">
      <GitHubSettings @config-updated="handleGitHubConfig" />
    </div>

    <!-- Supabase 设置弹窗（待实现） -->
    <div v-if="showSettings && selectedStorage === 'supabase'" class="settings-modal">
      <div class="modal-placeholder">
        <h4>Supabase 配置</h4>
        <p>此功能正在开发中...</p>
        <button class="btn-secondary" @click="showSettings = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GitHubSettings from './GitHubSettings.vue'
import type { GitHubConfig } from '../utils/github-storage'

interface Emits {
  (e: 'storage-selected', storage: 'local' | 'github' | 'supabase'): void
}

const emit = defineEmits<Emits>()

const selectedStorage = ref<'local' | 'github' | 'supabase' | null>(null)
const showSettings = ref(false)

const selectStorage = (storage: 'local' | 'github' | 'supabase') => {
  selectedStorage.value = storage
}

const getStorageName = (storage: string) => {
  const names = {
    local: '本地存储',
    github: 'GitHub 存储',
    supabase: 'Supabase 数据库'
  }
  return names[storage as keyof typeof names] || storage
}

const confirmSelection = () => {
  if (selectedStorage.value) {
    // 保存用户选择
    localStorage.setItem('preferred-storage', selectedStorage.value)
    emit('storage-selected', selectedStorage.value)
  }
}

const handleGitHubConfig = (config: GitHubConfig) => {
  console.log('GitHub 配置已更新:', config)
  showSettings.value = false
}

// 检查是否有之前的选择
const savedStorage = localStorage.getItem('preferred-storage') as 'local' | 'github' | 'supabase'
if (savedStorage) {
  selectedStorage.value = savedStorage
}
</script>

<style scoped>
.storage-selector {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.selector-header {
  text-align: center;
  margin-bottom: 2rem;
}

.selector-header h3 {
  margin: 0;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.5rem;
}

.storage-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.storage-option {
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  position: relative;
}

.storage-option:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.storage-option.active {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.1));
}

.storage-option.recommended {
  border-color: #10b981;
}

.storage-option.recommended.active {
  border-color: #10b981;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.1));
}

.option-icon {
  text-align: center;
  margin-bottom: 1rem;
}

.option-icon i {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.recommended .option-icon i {
  color: #10b981;
}

.option-info h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.recommended-badge {
  background: #10b981;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
}

.option-info p {
  color: var(--text-light);
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.option-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature {
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  background: var(--bg-light);
  border-radius: 6px;
  text-align: center;
}

.storage-description {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.description-content h4 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
}

.description-content p {
  color: var(--text-light);
  margin-bottom: 1rem;
}

.description-content ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.description-content li {
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.quick-setup {
  background: var(--bg-light);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.quick-setup h5 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
}

.quick-setup ol {
  margin: 0;
  padding-left: 1.5rem;
}

.quick-setup li {
  margin-bottom: 0.5rem;
}

.quick-setup a {
  color: var(--primary-color);
  text-decoration: none;
}

.quick-setup a:hover {
  text-decoration: underline;
}

.storage-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--bg-light);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: white;
  transform: translateY(-2px);
}

.settings-modal {
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
  padding: 2rem;
}

.modal-placeholder {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
}

.modal-placeholder h4 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
}

.modal-placeholder p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .storage-selector {
    padding: 1rem;
  }
  
  .storage-options {
    grid-template-columns: 1fr;
  }
  
  .storage-actions {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
  
  .settings-modal {
    padding: 1rem;
  }
}
</style>
