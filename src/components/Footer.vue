<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-brand">
          <div class="footer-logo">
            <i class="fas fa-compass"></i>
            <span>Bird Navigation</span>
          </div>
          <p class="footer-description">
            一个简洁美观的个人导航网站模板，帮助您快速访问常用网站。
          </p>
          <div class="footer-social">
            <a 
              href="https://github.com/zhangbird050801/bird-nav" 
              target="_blank"
              aria-label="GitHub"
            >
              <i class="fab fa-github"></i>
            </a>
            <a 
              href="mailto:your-email@example.com" 
              target="_blank"
              aria-label="Email"
            >
              <i class="fas fa-envelope"></i>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="footer-column">
            <h3>快速链接</h3>
            <ul>
              <li><a href="#home">首页</a></li>
              <li><a href="#about">关于</a></li>
              <li><a href="https://github.com/zhangbird050801/bird-nav" target="_blank">GitHub</a></li>
              <li><a href="https://github.com/zhangbird050801/bird-nav/issues" target="_blank">反馈</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h3>技术栈</h3>
            <ul>
              <li><a href="https://vuejs.org" target="_blank">Vue 3</a></li>
              <li><a href="https://www.typescriptlang.org" target="_blank">TypeScript</a></li>
              <li><a href="https://vitejs.dev" target="_blank">Vite</a></li>
              <li><a href="https://fontawesome.com" target="_blank">Font Awesome</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h3>部署平台</h3>
            <ul>
              <li><a href="https://pages.github.com" target="_blank">GitHub Pages</a></li>
              <li><a href="https://pages.cloudflare.com" target="_blank">Cloudflare Pages</a></li>
              <li><a href="https://vercel.com" target="_blank">Vercel</a></li>
              <li><a href="https://netlify.com" target="_blank">Netlify</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; {{ currentYear }} Bird Navigation. Made with ❤️ for everyone.</p>
          <p class="footer-license">
            <i class="fas fa-balance-scale"></i>
            Licensed under MIT License
          </p>
        </div>
        <div class="footer-meta">
          <p>
            <i class="fas fa-code"></i>
            Built with Vue 3 & TypeScript
          </p>
          <p>
            <i class="fas fa-rocket"></i>
            Last updated: {{ lastUpdated }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- 回到顶部按钮 -->
    <button 
      v-show="showBackToTop"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="回到顶部"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentYear = new Date().getFullYear()
const lastUpdated = new Date().toLocaleDateString('zh-CN')
const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  margin-top: 4rem;
  position: relative;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 1rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.footer-logo i {
  font-size: 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.footer-social a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.footer-social a:hover {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-column h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 0.5rem;
}

.footer-column a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
}

.footer-column a:hover {
  color: var(--primary-color);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copyright,
.footer-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-copyright p,
.footer-meta p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-license i,
.footer-meta i {
  color: var(--primary-color);
}

.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
}

/* 响应式 */
@media (max-width: 768px) {
  .footer-content {
    padding: 2rem 1rem 1rem;
  }
  
  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .footer-copyright,
  .footer-meta {
    align-items: center;
  }
  
  .back-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .footer-social {
    justify-content: center;
  }
  
  .footer-links {
    text-align: center;
  }
}
</style>
