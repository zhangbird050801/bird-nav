import { ref, computed } from 'vue'
import type { Category, Site } from '../types'
import { useLocalStorage } from './useLocalStorage'
import { defaultCategories } from '../data/sites'

export function useSiteManager() {
  // 使用本地存储保存用户自定义的分类数据
  const [storedCategories, setStoredCategories] = useLocalStorage<Category[]>('bird-nav-categories', defaultCategories)
  
  const categories = ref(storedCategories.value)
  const isEditing = ref(false)
  const editingCategory = ref<Category | null>(null)
  const editingSite = ref<Site | null>(null)

  // 添加新分类
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: `category-${Date.now()}`,
      sites: []
    }
    categories.value.push(newCategory)
    updateStorage()
  }

  // 编辑分类
  const editCategory = (categoryId: string, updates: Partial<Category>) => {
    const index = categories.value.findIndex(cat => cat.id === categoryId)
    if (index !== -1) {
      categories.value[index] = { ...categories.value[index], ...updates }
      updateStorage()
    }
  }

  // 删除分类
  const deleteCategory = (categoryId: string) => {
    const index = categories.value.findIndex(cat => cat.id === categoryId)
    if (index !== -1) {
      categories.value.splice(index, 1)
      updateStorage()
    }
  }

  // 添加网站到指定分类
  const addSite = (categoryId: string, site: Omit<Site, 'id'>) => {
    const category = categories.value.find(cat => cat.id === categoryId)
    if (category) {
      const newSite: Site = {
        ...site,
        id: `site-${Date.now()}`
      }
      category.sites.push(newSite)
      updateStorage()
    }
  }

  // 编辑网站
  const editSite = (categoryId: string, siteId: string, updates: Partial<Site>) => {
    const category = categories.value.find(cat => cat.id === categoryId)
    if (category) {
      const siteIndex = category.sites.findIndex(site => site.id === siteId)
      if (siteIndex !== -1) {
        category.sites[siteIndex] = { ...category.sites[siteIndex], ...updates }
        updateStorage()
      }
    }
  }

  // 删除网站
  const deleteSite = (categoryId: string, siteId: string) => {
    const category = categories.value.find(cat => cat.id === categoryId)
    if (category) {
      const siteIndex = category.sites.findIndex(site => site.id === siteId)
      if (siteIndex !== -1) {
        category.sites.splice(siteIndex, 1)
        updateStorage()
      }
    }
  }

  // 移动网站到不同分类
  const moveSite = (fromCategoryId: string, toCategoryId: string, siteId: string) => {
    const fromCategory = categories.value.find(cat => cat.id === fromCategoryId)
    const toCategory = categories.value.find(cat => cat.id === toCategoryId)
    
    if (fromCategory && toCategory) {
      const siteIndex = fromCategory.sites.findIndex(site => site.id === siteId)
      if (siteIndex !== -1) {
        const site = fromCategory.sites.splice(siteIndex, 1)[0]
        toCategory.sites.push(site)
        updateStorage()
      }
    }
  }

  // 重置为默认数据
  const resetToDefault = () => {
    categories.value = JSON.parse(JSON.stringify(defaultCategories))
    updateStorage()
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
  const importData = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          if (Array.isArray(data) && data.every(isValidCategory)) {
            categories.value = data
            updateStorage()
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

  // 更新本地存储
  const updateStorage = () => {
    setStoredCategories(categories.value)
  }

  // 计算统计信息
  const stats = computed(() => ({
    totalCategories: categories.value.length,
    totalSites: categories.value.reduce((sum, cat) => sum + cat.sites.length, 0),
    categoriesWithSites: categories.value.filter(cat => cat.sites.length > 0).length
  }))

  return {
    categories: computed(() => categories.value),
    isEditing,
    editingCategory,
    editingSite,
    stats,
    addCategory,
    editCategory,
    deleteCategory,
    addSite,
    editSite,
    deleteSite,
    moveSite,
    resetToDefault,
    exportData,
    importData
  }
}
