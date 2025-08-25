import { ref, computed, onMounted } from 'vue'
import type { Category, Site } from '../types'
import { createGitHubStorage, type GitHubConfig } from '../utils/github-storage'
import { defaultCategories } from '../data/sites'

export function useGitHubSiteManager(config?: Partial<GitHubConfig>) {
  const githubStorage = createGitHubStorage(config)
  
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const isOnline = ref(navigator.onLine)
  const lastSyncTime = ref<Date | null>(null)
  const hasUnsavedChanges = ref(false)

  // 监听网络状态
  window.addEventListener('online', () => {
    isOnline.value = true
    if (hasUnsavedChanges.value) {
      syncToGitHub()
    }
  })
  
  window.addEventListener('offline', () => {
    isOnline.value = false
  })

  /**
   * 从 GitHub 加载数据
   */
  const loadFromGitHub = async () => {
    if (!githubStorage.isConfigured()) {
      console.warn('GitHub storage not configured, using default data')
      categories.value = [...defaultCategories]
      return
    }

    isLoading.value = true
    try {
      const data = await githubStorage.getData()
      categories.value = data.length > 0 ? data : [...defaultCategories]
      lastSyncTime.value = new Date()
      hasUnsavedChanges.value = false
      
      // 同时保存到本地存储作为备份
      localStorage.setItem('bird-nav-backup', JSON.stringify(categories.value))
    } catch (error) {
      console.error('Failed to load from GitHub:', error)
      // 降级到本地存储
      loadFromLocalStorage()
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 同步到 GitHub
   */
  const syncToGitHub = async (commitMessage?: string) => {
    if (!githubStorage.canWrite() || !isOnline.value) {
      hasUnsavedChanges.value = true
      return false
    }

    isLoading.value = true
    try {
      const success = await githubStorage.saveData(
        categories.value,
        commitMessage || `Update navigation data - ${new Date().toLocaleString()}`
      )
      
      if (success) {
        lastSyncTime.value = new Date()
        hasUnsavedChanges.value = false
        // 同时更新本地备份
        localStorage.setItem('bird-nav-backup', JSON.stringify(categories.value))
      }
      
      return success
    } catch (error) {
      console.error('Failed to sync to GitHub:', error)
      hasUnsavedChanges.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 从本地存储加载（降级方案）
   */
  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('bird-nav-backup')
      if (stored) {
        categories.value = JSON.parse(stored)
      } else {
        categories.value = [...defaultCategories]
      }
    } catch {
      categories.value = [...defaultCategories]
    }
  }

  /**
   * 标记有未保存的更改
   */
  const markAsChanged = () => {
    hasUnsavedChanges.value = true
    // 立即保存到本地存储
    localStorage.setItem('bird-nav-backup', JSON.stringify(categories.value))
  }

  // 添加新分类
  const addCategory = async (category: Omit<Category, 'id' | 'sites'>) => {
    const newCategory: Category = {
      ...category,
      id: `category-${Date.now()}`,
      sites: []
    }
    categories.value.push(newCategory)
    markAsChanged()
    
    if (isOnline.value && githubStorage.canWrite()) {
      await syncToGitHub(`Add category: ${category.name}`)
    }
  }

  // 编辑分类
  const editCategory = async (categoryId: string, updates: Partial<Category>) => {
    const index = categories.value.findIndex(cat => cat.id === categoryId)
    if (index !== -1) {
      const oldName = categories.value[index].name
      categories.value[index] = { ...categories.value[index], ...updates }
      markAsChanged()
      
      if (isOnline.value && githubStorage.canWrite()) {
        await syncToGitHub(`Update category: ${oldName}`)
      }
    }
  }

  // 删除分类
  const deleteCategory = async (categoryId: string) => {
    const index = categories.value.findIndex(cat => cat.id === categoryId)
    if (index !== -1) {
      const categoryName = categories.value[index].name
      categories.value.splice(index, 1)
      markAsChanged()
      
      if (isOnline.value && githubStorage.canWrite()) {
        await syncToGitHub(`Delete category: ${categoryName}`)
      }
    }
  }

  // 添加网站到指定分类
  const addSite = async (categoryId: string, site: Omit<Site, 'id'>) => {
    const category = categories.value.find(cat => cat.id === categoryId)
    if (category) {
      const newSite: Site = {
        ...site,
        id: `site-${Date.now()}`
      }
      category.sites.push(newSite)
      markAsChanged()
      
      if (isOnline.value && githubStorage.canWrite()) {
        await syncToGitHub(`Add site: ${site.name} to ${category.name}`)
      }
    }
  }

  // 编辑网站
  const editSite = async (categoryId: string, siteId: string, updates: Partial<Site>) => {
    const category = categories.value.find(cat => cat.id === categoryId)
    if (category) {
      const siteIndex = category.sites.findIndex(site => site.id === siteId)
      if (siteIndex !== -1) {
        const oldName = category.sites[siteIndex].name
        category.sites[siteIndex] = { ...category.sites[siteIndex], ...updates }
        markAsChanged()
        
        if (isOnline.value && githubStorage.canWrite()) {
          await syncToGitHub(`Update site: ${oldName}`)
        }
      }
    }
  }

  // 删除网站
  const deleteSite = async (categoryId: string, siteId: string) => {
    const category = categories.value.find(cat => cat.id === categoryId)
    if (category) {
      const siteIndex = category.sites.findIndex(site => site.id === siteId)
      if (siteIndex !== -1) {
        const siteName = category.sites[siteIndex].name
        category.sites.splice(siteIndex, 1)
        markAsChanged()
        
        if (isOnline.value && githubStorage.canWrite()) {
          await syncToGitHub(`Delete site: ${siteName}`)
        }
      }
    }
  }

  // 重置为默认数据
  const resetToDefault = async () => {
    categories.value = JSON.parse(JSON.stringify(defaultCategories))
    markAsChanged()
    
    if (isOnline.value && githubStorage.canWrite()) {
      await syncToGitHub('Reset to default navigation data')
    }
  }

  // 导出数据
  const exportData = () => {
    const dataStr = JSON.stringify(categories.value, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'bird-nav-backup.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  // 导入数据
  const importData = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          if (Array.isArray(data) && data.every(isValidCategory)) {
            categories.value = data
            markAsChanged()
            
            if (isOnline.value && githubStorage.canWrite()) {
              await syncToGitHub('Import navigation data')
            }
            resolve(true)
          } else {
            resolve(false)
          }
        } catch {
          resolve(false)
        }
      }
      reader.readAsText(file)
    })
  }

  // 验证分类数据格式
  const isValidCategory = (category: any): category is Category => {
    return (
      typeof category === 'object' &&
      typeof category.id === 'string' &&
      typeof category.name === 'string' &&
      typeof category.icon === 'string' &&
      Array.isArray(category.sites)
    )
  }

  // 手动同步
  const manualSync = () => syncToGitHub('Manual sync')

  // 计算统计信息
  const stats = computed(() => ({
    totalCategories: categories.value.length,
    totalSites: categories.value.reduce((sum, cat) => sum + cat.sites.length, 0),
    categoriesWithSites: categories.value.filter(cat => cat.sites.length > 0).length,
    lastSync: lastSyncTime.value,
    hasUnsavedChanges: hasUnsavedChanges.value,
    isOnline: isOnline.value,
    canSync: githubStorage.canWrite()
  }))

  // 组件挂载时加载数据
  onMounted(() => {
    loadFromGitHub()
  })

  return {
    categories: computed(() => categories.value),
    isLoading: computed(() => isLoading.value),
    stats,
    addCategory,
    editCategory,
    deleteCategory,
    addSite,
    editSite,
    deleteSite,
    resetToDefault,
    exportData,
    importData,
    syncToGitHub: manualSync,
    loadFromGitHub
  }
}
