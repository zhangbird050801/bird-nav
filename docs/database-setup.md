# 数据存储配置指南

## 方案选择

本项目支持多种数据存储方案，您可以根据需求选择：

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **GitHub API** | 免费、版本控制、多设备同步 | 需要 token、有 API 限制 | 个人使用、开发者 |
| **本地存储** | 简单、无依赖、离线可用 | 无同步、数据可能丢失 | 单设备使用 |
| **Supabase** | 功能完整、实时同步、用户认证 | 有免费额度限制 | 多用户应用 |

## 推荐方案：GitHub API 存储

### 优势
- ✅ **完全免费** - 使用 GitHub 免费账户即可
- ✅ **版本控制** - 所有数据变更都有历史记录
- ✅ **多设备同步** - 数据存储在云端，随时随地访问
- ✅ **数据安全** - GitHub 的可靠性保证
- ✅ **手动编辑** - 可以直接在 GitHub 上编辑数据文件

### 快速开始

#### 1. 创建 Personal Access Token

1. 访问 [GitHub Settings - Personal Access Tokens](https://github.com/settings/tokens)
2. 点击 "Generate new token (classic)"
3. 设置权限：✅ `repo` - 仓库完全访问权限
4. 复制生成的 token（以 `ghp_` 开头）

#### 2. 配置数据文件

在您的 GitHub 仓库中创建 `data/navigation.json` 文件：

```json
[
  {
    "id": "tools",
    "name": "实用工具",
    "icon": "fas fa-tools",
    "description": "日常开发和工作中常用的实用工具",
    "sites": [
      {
        "id": "google-translate",
        "name": "Google 翻译",
        "url": "https://translate.google.com",
        "description": "在线翻译工具",
        "icon": "fas fa-language",
        "tags": ["翻译", "语言", "工具"]
      }
    ]
  }
]
```

#### 3. 在应用中配置

在应用的设置面板中填入：
- **GitHub 用户名**: 您的 GitHub 用户名
- **仓库名称**: 存储数据的仓库名（如: bird-nav）
- **分支名称**: 通常是 `main` 或 `master`
- **数据文件路径**: `data/navigation.json`
- **GitHub Token**: 上一步创建的 token

---
