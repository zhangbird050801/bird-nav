export interface Site {
  id: string
  name: string
  url: string
  description: string
  icon: string
  tags?: string[]
}

export interface Category {
  id: string
  name: string
  icon: string
  color?: string
  sites: Site[]
}

export interface SearchResult {
  site: Site
  category: Category
}
