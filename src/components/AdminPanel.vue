<template>
  <div class="admin-panel" :class="{ 'is-open': isOpen }">
    <!-- 管理按钮 -->
    <button 
      class="admin-toggle" 
      @click="togglePanel"
      :title="isOpen ? '关闭管理面板' : '打开管理面板'"
    >
      <i class="fas fa-cog" :class="{ 'fa-spin': isOpen }"></i>
    </button>

    <!-- 管理面板内容 -->
    <div class="admin-content" v-if="isOpen">
      <div class="admin-header">
        <h2>
          <i class="fas fa-tools"></i>
          管理面板
        </h2>
        <button class="close-btn" @click="togglePanel">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- 统计信息 -->
      <div class="admin-stats">
        <div class="stat-card">
          <div class="stat-number">{{ stats.totalCategories }}</div>
          <div class="stat-label">个分类</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ stats.totalSites }}</div>
          <div class="stat-label">个网站</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ stats.categoriesWithSites }}</div>
          <div class="stat-label">有内容的分类</div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="admin-actions">
        <button class="action-btn primary" @click="showAddCategoryModal = true">
          <i class="fas fa-plus"></i>
          添加分类
        </button>
        <button class="action-btn github" @click="showGitHubSettings = true">
          <i class="fab fa-github"></i>
          GitHub 设置
        </button>
        <button class="action-btn secondary" @click="exportData">
          <i class="fas fa-download"></i>
          导出数据
        </button>
        <label class="action-btn secondary">
          <i class="fas fa-upload"></i>
          导入数据
          <input
            type="file"
            accept=".json"
            @change="handleImport"
            style="display: none"
          />
        </label>
        <button class="action-btn danger" @click="showResetModal = true">
          <i class="fas fa-refresh"></i>
          重置数据
        </button>
      </div>

      <!-- 分类列表 -->
      <div class="category-list">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-item"
        >
          <div class="category-header">
            <div class="category-info">
              <i :class="category.icon"></i>
              <span class="category-name">{{ category.name }}</span>
              <span class="site-count">{{ category.sites.length }} 个网站</span>
            </div>
            <div class="category-actions">
              <button 
                class="icon-btn" 
                @click="editCategory(category)"
                title="编辑分类"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button 
                class="icon-btn" 
                @click="openAddSiteModal(category)"
                title="添加网站"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button 
                class="icon-btn danger" 
                @click="confirmDeleteCategory(category)"
                title="删除分类"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          
          <!-- 网站列表 -->
          <div v-if="category.sites.length > 0" class="site-list">
            <div
              v-for="site in category.sites"
              :key="site.id"
              class="site-item"
            >
              <i :class="site.icon"></i>
              <span class="site-name">{{ site.name }}</span>
              <div class="site-actions">
                <button 
                  class="icon-btn small" 
                  @click="editSite(category, site)"
                  title="编辑网站"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button 
                  class="icon-btn small danger" 
                  @click="confirmDeleteSite(category, site)"
                  title="删除网站"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加分类模态框 -->
    <CategoryModal
      v-if="showAddCategoryModal"
      :category="editingCategory"
      @save="handleSaveCategory"
      @close="closeModals"
    />

    <!-- 添加网站模态框 -->
    <SiteModal
      v-if="showAddSiteModal"
      :site="editingSite"
      :category="selectedCategory"
      @save="handleSaveSite"
      @close="closeModals"
    />

    <!-- 确认重置模态框 -->
    <ConfirmModal
      v-if="showResetModal"
      title="重置数据"
      message="确定要重置所有数据吗？这将删除您的所有自定义内容并恢复到默认设置。"
      @confirm="handleReset"
      @cancel="showResetModal = false"
    />

    <!-- 确认删除分类模态框 -->
    <ConfirmModal
      v-if="showDeleteCategoryModal"
      title="删除分类"
      :message="`确定要删除「${deletingCategory?.name}」分类吗？这将同时删除该分类下的所有网站。`"
      @confirm="handleDeleteCategory"
      @cancel="showDeleteCategoryModal = false"
    />

    <!-- 确认删除网站模态框 -->
    <ConfirmModal
      v-if="showDeleteSiteModal"
      title="删除网站"
      :message="`确定要删除「${deletingSite?.name}」网站吗？`"
      @confirm="handleDeleteSite"
      @cancel="showDeleteSiteModal = false"
    />

    <!-- GitHub 设置模态框 -->
    <div v-if="showGitHubSettings" class="modal-overlay" @click="showGitHubSettings = false">
      <div class="github-settings-modal" @click.stop>
        <div class="modal-header">
          <h3>
            <i class="fab fa-github"></i>
            GitHub 存储设置
          </h3>
          <button class="close-btn" @click="showGitHubSettings = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="github-info">
            <p>配置 GitHub API 存储，将您的导航数据同步到 GitHub 仓库。</p>
            <div class="benefits">
              <span class="benefit">✅ 完全免费</span>
              <span class="benefit">✅ 版本控制</span>
              <span class="benefit">✅ 多设备同步</span>
            </div>
          </div>

          <form @submit.prevent="saveGitHubConfig" class="github-form">
            <div class="form-group">
              <label for="github-owner">GitHub 用户名</label>
              <input
                id="github-owner"
                v-model="githubConfig.owner"
                type="text"
                placeholder="例如: zhangbird050801"
                required
              />
            </div>

            <div class="form-group">
              <label for="github-repo">仓库名称</label>
              <input
                id="github-repo"
                v-model="githubConfig.repo"
                type="text"
                placeholder="例如: bird-nav"
                required
              />
            </div>

            <div class="form-group">
              <label for="github-branch">分支名称</label>
              <input
                id="github-branch"
                v-model="githubConfig.branch"
                type="text"
                placeholder="例如: main"
                required
              />
            </div>

            <div class="form-group">
              <label for="github-path">数据文件路径</label>
              <input
                id="github-path"
                v-model="githubConfig.dataPath"
                type="text"
                placeholder="例如: data/navigation.json"
                required
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
                  v-model="githubConfig.token"
                  :type="showToken ? 'text' : 'password'"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
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
                  创建 Token <i class="fas fa-external-link-alt"></i>
                </a>
              </small>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="testGitHubConnection">
                <i class="fas fa-plug"></i>
                测试连接
              </button>
              <button type="submit" class="btn-primary">
                <i class="fas fa-save"></i>
                保存配置
              </button>
            </div>
          </form>

          <div v-if="githubStatus" class="status-message" :class="githubStatus.type">
            <i :class="githubStatus.icon"></i>
            {{ githubStatus.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Category, Site } from '../types'
import { useSiteManager } from '../composables/useSiteManager'
import CategoryModal from './CategoryModal.vue'
import SiteModal from './SiteModal.vue'
import ConfirmModal from './ConfirmModal.vue'

const {
  categories,
  stats,
  addCategory,
  editCategory: updateCategory,
  deleteCategory,
  addSite,
  editSite: updateSite,
  deleteSite,
  resetToDefault,
  exportData,
  importData
} = useSiteManager()

const isOpen = ref(false)
const showAddCategoryModal = ref(false)
const showAddSiteModal = ref(false)
const showResetModal = ref(false)
const showDeleteCategoryModal = ref(false)
const showDeleteSiteModal = ref(false)
const showGitHubSettings = ref(false)

// GitHub 配置相关
const showToken = ref(false)
const githubConfig = ref({
  owner: 'zhangbird050801',
  repo: 'bird-nav',
  branch: 'main',
  dataPath: 'data/navigation.json',
  token: ''
})
const githubStatus = ref<{
  type: 'success' | 'error' | 'info';
  message: string;
  icon: string;
} | null>(null)

const editingCategory = ref<Category | null>(null)
const editingSite = ref<Site | null>(null)
const selectedCategory = ref<Category | null>(null)
const deletingCategory = ref<Category | null>(null)
const deletingSite = ref<Site | null>(null)
const deletingSiteCategory = ref<Category | null>(null)

const togglePanel = () => {
  isOpen.value = !isOpen.value
}

const editCategory = (category: Category) => {
  editingCategory.value = category
  showAddCategoryModal.value = true
}

const openAddSiteModal = (category: Category) => {
  selectedCategory.value = category
  editingSite.value = null
  showAddSiteModal.value = true
}

const editSite = (category: Category, site: Site) => {
  selectedCategory.value = category
  editingSite.value = site
  showAddSiteModal.value = true
}

const confirmDeleteCategory = (category: Category) => {
  deletingCategory.value = category
  showDeleteCategoryModal.value = true
}

const confirmDeleteSite = (category: Category, site: Site) => {
  deletingCategory.value = category
  deletingSite.value = site
  deletingSiteCategory.value = category
  showDeleteSiteModal.value = true
}

const handleSaveCategory = (categoryData: Omit<Category, 'id' | 'sites'>) => {
  if (editingCategory.value) {
    updateCategory(editingCategory.value.id, categoryData)
  } else {
    addCategory(categoryData)
  }
  closeModals()
}

const handleSaveSite = (siteData: Omit<Site, 'id'>) => {
  if (!selectedCategory.value) return
  
  if (editingSite.value) {
    updateSite(selectedCategory.value.id, editingSite.value.id, siteData)
  } else {
    addSite(selectedCategory.value.id, siteData)
  }
  closeModals()
}

const handleDeleteCategory = () => {
  if (deletingCategory.value) {
    deleteCategory(deletingCategory.value.id)
  }
  showDeleteCategoryModal.value = false
  deletingCategory.value = null
}

const handleDeleteSite = () => {
  if (deletingSiteCategory.value && deletingSite.value) {
    deleteSite(deletingSiteCategory.value.id, deletingSite.value.id)
  }
  showDeleteSiteModal.value = false
  deletingSite.value = null
  deletingSiteCategory.value = null
}

const handleReset = () => {
  resetToDefault()
  showResetModal.value = false
}

const handleImport = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const success = await importData(file)
  if (success) {
    alert('数据导入成功！')
  } else {
    alert('数据导入失败，请检查文件格式。')
  }
  
  // 重置文件输入
  target.value = ''
}

const closeModals = () => {
  showAddCategoryModal.value = false
  showAddSiteModal.value = false
  editingCategory.value = null
  editingSite.value = null
  selectedCategory.value = null
}

// GitHub 配置相关方法
const loadGitHubConfig = () => {
  try {
    const saved = localStorage.getItem('github-config')
    if (saved) {
      const config = JSON.parse(saved)
      githubConfig.value = { ...githubConfig.value, ...config }
    }
  } catch {
    // 使用默认配置
  }
}

const saveGitHubConfig = () => {
  localStorage.setItem('github-config', JSON.stringify(githubConfig.value))
  githubStatus.value = {
    type: 'success',
    message: 'GitHub 配置已保存',
    icon: 'fas fa-check-circle'
  }
  setTimeout(() => {
    githubStatus.value = null
  }, 3000)
}

const testGitHubConnection = async () => {
  if (!githubConfig.value.owner || !githubConfig.value.repo) {
    githubStatus.value = {
      type: 'error',
      message: '请填写 GitHub 用户名和仓库名称',
      icon: 'fas fa-exclamation-circle'
    }
    return
  }

  githubStatus.value = {
    type: 'info',
    message: '正在测试连接...',
    icon: 'fas fa-spinner fa-spin'
  }

  try {
    const url = `https://api.github.com/repos/${githubConfig.value.owner}/${githubConfig.value.repo}/contents/${githubConfig.value.dataPath}?ref=${githubConfig.value.branch}`
    const response = await fetch(url)
    
    if (response.ok || response.status === 404) {
      githubStatus.value = {
        type: 'success',
        message: '连接成功！可以访问仓库',
        icon: 'fas fa-check-circle'
      }
    } else {
      githubStatus.value = {
        type: 'error',
        message: `连接失败：${response.status} ${response.statusText}`,
        icon: 'fas fa-exclamation-circle'
      }
    }
  } catch (error) {
    githubStatus.value = {
      type: 'error',
      message: '连接失败：网络错误',
      icon: 'fas fa-exclamation-circle'
    }
  }

  setTimeout(() => {
    githubStatus.value = null
  }, 5000)
}

// 组件挂载时加载配置
loadGitHubConfig()
</script>

<style scoped>
.admin-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.admin-toggle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1001;
}

.admin-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
}

.admin-content {
  position: absolute;
  top: 60px;
  right: 0;
  width: 400px;
  max-height: 80vh;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideInRight 0.3s ease-out;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.admin-header h2 {
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

.admin-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-light);
}

.stat-card {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-light);
}

.admin-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.action-btn.primary {
  background: var(--primary-color);
  color: white;
}

.action-btn.github {
  background: #24292e;
  color: white;
}

.action-btn.secondary {
  background: var(--bg-light);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.action-btn.danger {
  background: #e53e3e;
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.category-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 0 1.5rem 1.5rem;
}

.category-item {
  margin-bottom: 1rem;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-light);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.category-info i {
  color: var(--primary-color);
  font-size: 1.1rem;
}

.category-name {
  font-weight: 600;
  color: var(--text-color);
}

.site-count {
  font-size: 0.8rem;
  color: var(--text-light);
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: white;
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  background: var(--primary-color);
  color: white;
}

.icon-btn.danger:hover {
  background: #e53e3e;
}

.icon-btn.small {
  width: 24px;
  height: 24px;
  font-size: 0.8rem;
}

.site-list {
  padding: 0 1rem 1rem;
}

.site-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: var(--bg-light);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.site-item:hover {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.site-item i {
  color: var(--primary-color);
  width: 16px;
}

.site-name {
  flex: 1;
  font-size: 0.9rem;
  color: var(--text-color);
}

.site-actions {
  display: flex;
  gap: 0.25rem;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .admin-content {
    width: 320px;
    max-height: 70vh;
  }
  
  .admin-actions {
    grid-template-columns: 1fr;
  }
  
  .admin-stats {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

/* GitHub 设置模态框样式 */
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
  animation: fadeIn 0.3s ease;
}

.github-settings-modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  animation: slideIn 0.3s ease;
}

.github-settings-modal .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #24292e;
  color: white;
}

.github-settings-modal .modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.github-settings-modal .close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.github-settings-modal .close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.github-settings-modal .modal-body {
  padding: 1.5rem;
  max-height: 70vh;
  overflow-y: auto;
}

.github-info {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #24292e;
}

.github-info p {
  margin: 0 0 1rem 0;
  color: #374151;
}

.benefits {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.benefit {
  background: #e5f3ff;
  color: #0066cc;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.github-form .form-group {
  margin-bottom: 1.5rem;
}

.github-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.optional {
  font-weight: 400;
  color: #9ca3af;
  font-size: 0.9rem;
}

.github-form input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.github-form input:focus {
  outline: none;
  border-color: #24292e;
  box-shadow: 0 0 0 2px rgba(36, 41, 46, 0.1);
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
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-token:hover {
  background: white;
  color: #374151;
}

.help-text {
  display: block;
  margin-top: 0.5rem;
  color: #6b7280;
  font-size: 0.85rem;
}

.help-text a {
  color: #24292e;
  text-decoration: none;
}

.help-text a:hover {
  text-decoration: underline;
}

.help-text code {
  background: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
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
  background: #24292e;
  color: white;
}

.btn-primary:hover {
  background: #1a1e22;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #f9fafb;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: white;
  transform: translateY(-2px);
}

.status-message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  animation: slideIn 0.3s ease;
}

.status-message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}

.status-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

.status-message.info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #3b82f6;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
