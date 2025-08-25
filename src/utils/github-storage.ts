import type { Category } from '../types'

export interface GitHubConfig {
  owner: string
  repo: string
  token?: string
  branch: string
  dataPath: string
}

export class GitHubStorage {
  private config: GitHubConfig
  private baseUrl = 'https://api.github.com'

  constructor(config: GitHubConfig) {
    this.config = config
  }

  /**
   * 获取数据文件内容
   */
  async getData(): Promise<Category[]> {
    try {
      const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${this.config.dataPath}?ref=${this.config.branch}`
      
      const response = await fetch(url, {
        headers: this.getHeaders()
      })

      if (!response.ok) {
        if (response.status === 404) {
          // 文件不存在，返回空数组或默认数据
          return []
        }
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const fileData = await response.json()
      const content = atob(fileData.content.replace(/\s/g, ''))
      return JSON.parse(content)
    } catch (error) {
      console.error('Failed to fetch data from GitHub:', error)
      return []
    }
  }

  /**
   * 保存数据到 GitHub
   */
  async saveData(categories: Category[], message = 'Update navigation data'): Promise<boolean> {
    try {
      // 先获取当前文件的 SHA（如果存在）
      const currentFile = await this.getFileInfo()
      const content = btoa(JSON.stringify(categories, null, 2))

      const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${this.config.dataPath}`
      
      const body: any = {
        message,
        content,
        branch: this.config.branch
      }

      // 如果文件已存在，需要提供 SHA
      if (currentFile?.sha) {
        body.sha = currentFile.sha
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      return response.ok
    } catch (error) {
      console.error('Failed to save data to GitHub:', error)
      return false
    }
  }

  /**
   * 获取文件信息（主要用于获取 SHA）
   */
  private async getFileInfo() {
    try {
      const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${this.config.dataPath}?ref=${this.config.branch}`
      
      const response = await fetch(url, {
        headers: this.getHeaders()
      })

      if (response.ok) {
        return await response.json()
      }
      return null
    } catch {
      return null
    }
  }

  /**
   * 获取请求头
   */
  private getHeaders() {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'bird-nav-app'
    }

    if (this.config.token) {
      headers['Authorization'] = `token ${this.config.token}`
    }

    return headers
  }

  /**
   * 检查配置是否有效
   */
  isConfigured(): boolean {
    return !!(this.config.owner && this.config.repo && this.config.branch && this.config.dataPath)
  }

  /**
   * 检查是否有写入权限（需要 token）
   */
  canWrite(): boolean {
    return !!(this.config.token && this.isConfigured())
  }
}

/**
 * 创建 GitHub 存储实例
 */
export function createGitHubStorage(config?: Partial<GitHubConfig>): GitHubStorage {
  const defaultConfig: GitHubConfig = {
    owner: 'zhangbird050801', // 默认使用你的用户名
    repo: 'bird-nav',
    branch: 'main',
    dataPath: 'data/navigation.json',
    ...config
  }

  return new GitHubStorage(defaultConfig)
}
