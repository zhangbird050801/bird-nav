/**
 * 获取网站图标的工具函数
 */

// 获取网站的 favicon
export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
  } catch {
    return ''
  }
}

// 获取高质量的网站图标
export function getHighQualityFavicon(url: string): string {
  try {
    const domain = new URL(url).hostname
    // 使用多个图标服务作为备选
    return `https://icon.horse/icon/${domain}`
  } catch {
    return ''
  }
}

// 获取多个图标源
export function getFaviconSources(url: string): string[] {
  try {
    const domain = new URL(url).hostname
    return [
      `https://icon.horse/icon/${domain}`,
      `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
      `https://favicons.githubusercontent.com/${domain}`,
      `https://${domain}/favicon.ico`
    ]
  } catch {
    return []
  }
}

// 检查图标是否加载成功
export function checkImageLoad(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

// 获取可用的图标URL
export async function getAvailableFavicon(url: string): Promise<string> {
  const sources = getFaviconSources(url)
  
  for (const src of sources) {
    const isAvailable = await checkImageLoad(src)
    if (isAvailable) {
      return src
    }
  }
  
  return '' // 如果都不可用，返回空字符串
}
