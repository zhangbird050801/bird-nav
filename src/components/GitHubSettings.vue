<template>
  <div class="github-settings">
    <div class="settings-header">
      <h3>
        <i class="fab fa-github"></i>
        GitHub 存储设置
      </h3>
      <div class="status-indicator" :class="statusClass">
        <i :class="statusIcon"></i>
        {{ statusText }}
      </div>
    </div>

    <div class="settings-form">
      <div class="form-group">
        <label for="github-owner">GitHub 用户名/组织</label>
        <input
          id="github-owner"
          v-model="config.owner"
          type="text"
          placeholder="例如: zhangbird050801"
          @input="updateConfig"
        />
      </div>

      <div class="form-group">
        <label for="github-repo">仓库名称</label>
        <input
          id="github-repo"
          v-model="config.repo"
          type="text"
          placeholder="例如: bird-nav"
          @input="updateConfig"
        />
      </div>

      <div class="form-group">
        <label for="github-branch">分支名称</label>
        <input
          id="github-branch"
          v-model="config.branch"
          type="text"
          placeholder="例如: main"
          @input="updateConfig"
        />
      </div>

      <div class="form-group">
        <label for="github-path">数据文件路径</label>
        <input
          id="github-path"
          v-model="config.dataPath"
          type="text"
          placeholder="例如: data/navigation.json"
          @input="updateConfig"
        />
      </div>

      <div class="form-group">
        <label for="github-token">
          GitHub Token (可选)
          <span class="optional">- 用于保存数据</span>
        </label>
        <div class="token-input">
          <input
            id="github-token"
            v-model="config.token"
            :type="showToken ? 'text' : 'password'"
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            @input="updateConfig"
          />
          <button
            type="button"
            class="toggle-token"
            @click="showToken = !showToken"
          >
            <i :class="showToken ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <small class="help-text">
          需要 <code>repo</code> 权限的 Personal Access Token
          <a href="https://github.com/settings/tokens" target="_blank">
            创建 Token
            <i class="fas fa-external-link-alt"></i>
          </a>
        </small>
      </div>
    </div>

    <div class="settings-actions">
      <button 
        class="btn-primary" 
        @click="testConnection"
        :disabled="isLoading || !isConfigValid"
      >
        <i class="fas fa-plug"></i>
        测试连接
      </button>
      
      <button 
        class="btn-secondary" 
        @click="syncNow"
        :disabled="isLoading || !canWrite"
      >
        <i class="fas fa-sync" :class="{ 'fa-spin': isLoading }"></i>
        立即同步
      </button>
      
      <button 
        class="btn-danger" 
        @click="clearConfig"
      >
        <i class="fas fa-trash"></i>
        清除配置
      </button>
    </div>

    <div class="github-info">
      <h4>GitHub 存储优势</h4>
      <ul>
        <li>✅ 完全免费</li>
        <li>✅ 数据版本控制</li>
        <li>✅ 多设备同步</li>
        <li>✅ 数据安全可靠</li>
        <li>✅ 可以手动编辑数据文件</li>
      </ul>
      
      <h4>使用说明</h4>
      <ol>
        <li>配置 GitHub 仓库信息</li>
        <li>创建 Personal Access Token（用于写入数据）</li>
        <li>测试连接确保配置正确</li>
        <li>数据将自动同步到 GitHub</li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { createGitHubStorage, type GitHubConfig } from '../utils/github-storage'

interface Emits {
  (e: 'config-updated', config: GitHubConfig): void
}

const emit = defineEmits<Emits>()

const config = ref<GitHubConfig>({
  owner: 'zhangbird050801',
  repo: 'bird-nav',
  branch: 'main',
  dataPath: 'data/navigation.json',
  token: ''
})

const showToken = ref(false)
const isLoading = ref(false)
const connectionStatus = ref<'unknown' | 'success' | 'error'>('unknown')
const errorMessage = ref('')

const isConfigValid = computed(() => {
  return !!(config.value.owner && config.value.repo && config.value.branch && config.value.dataPath)
})

const canWrite = computed(() => {
  return isConfigValid.value && !!config.value.token
})

const statusClass = computed(() => {
  switch (connectionStatus.value) {
    case 'success': return 'status-success'
    case 'error': return 'status-error'
    default: return 'status-unknown'
  }
})

const statusIcon = computed(() => {
  switch (connectionStatus.value) {
    case 'success': return 'fas fa-check-circle'
    case 'error': return 'fas fa-exclamation-circle'
    default: return 'fas fa-question-circle'
  }
})

const statusText = computed(() => {
  switch (connectionStatus.value) {
    case 'success': return '连接正常'
    case 'error': return '连接失败'
    default: return '未测试'
  }
})

const updateConfig = () => {
  saveConfig()
  emit('config-updated', config.value)
}

const testConnection = async () => {
  if (!isConfigValid.value) return

  isLoading.value = true
  connectionStatus.value = 'unknown'
  errorMessage.value = ''

  try {
    const storage = createGitHubStorage(config.value)
    await storage.getData()
    connectionStatus.value = 'success'
  } catch (error) {
    connectionStatus.value = 'error'
    errorMessage.value = error instanceof Error ? error.message : '未知错误'
  } finally {
    isLoading.value = false
  }
}

const syncNow = async () => {
  if (!canWrite.value) return

  isLoading.value = true
  try {
    // 这里应该调用主应用的同步方法
    // 目前只是测试连接
    await testConnection()
  } finally {
    isLoading.value = false
  }
}

const clearConfig = () => {
  config.value = {
    owner: '',
    repo: '',
    branch: 'main',
    dataPath: 'data/navigation.json',
    token: ''
  }
  connectionStatus.value = 'unknown'
  updateConfig()
}

const saveConfig = () => {
  localStorage.setItem('github-config', JSON.stringify(config.value))
}

const loadConfig = () => {
  try {
    const saved = localStorage.getItem('github-config')
    if (saved) {
      config.value = { ...config.value, ...JSON.parse(saved) }
    }
  } catch {
    // 使用默认配置
  }
}

onMounted(() => {
  loadConfig()
})
</script>

<style scoped>
.github-settings {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.settings-header h3 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-success {
  background: #10b981;
  color: white;
}

.status-error {
  background: #ef4444;
  color: white;
}

.status-unknown {
  background: var(--bg-light);
  color: var(--text-light);
}

.settings-form {
  margin-bottom: 2rem;
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

.optional {
  font-weight: 400;
  color: var(--text-light);
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.token-input {
  display: flex;
  gap: 0.5rem;
}

.token-input input {
  flex: 1;
}

.toggle-token {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-light);
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-token:hover {
  background: white;
  color: var(--text-color);
}

.help-text {
  display: block;
  margin-top: 0.5rem;
  color: var(--text-light);
  font-size: 0.85rem;
}

.help-text a {
  color: var(--primary-color);
  text-decoration: none;
}

.help-text a:hover {
  text-decoration: underline;
}

.help-text code {
  background: var(--bg-light);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.settings-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-danger {
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

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--bg-light);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
  background: white;
  transform: translateY(-2px);
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.github-info {
  background: var(--bg-light);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.github-info h4 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
  font-size: 1.1rem;
}

.github-info ul,
.github-info ol {
  margin: 0 0 1.5rem 0;
  padding-left: 1.5rem;
}

.github-info li {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.github-info ul li {
  list-style: none;
  position: relative;
}

@media (max-width: 768px) {
  .github-settings {
    padding: 1rem;
  }
  
  .settings-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .settings-actions {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary,
  .btn-danger {
    width: 100%;
    justify-content: center;
  }
}
</style>
