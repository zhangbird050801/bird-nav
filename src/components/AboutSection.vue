<template>
  <section id="about" class="about-section">
    <div class="about-container">
      <div class="about-content">
        <div class="about-text">
          <h2 class="about-title">关于 Bird Navigation</h2>
          <p class="about-description">
            Bird Navigation 是一个基于 Vue3 + TypeScript 的个人导航网站模板，
            旨在帮助您快速创建属于自己的导航页面。
          </p>
          
          <div class="features">
            <div class="feature-item">
              <i class="fas fa-palette"></i>
              <div class="feature-content">
                <h3>美观简洁</h3>
                <p>现代化的设计风格，简洁清爽的界面</p>
              </div>
            </div>
            
            <div class="feature-item">
              <i class="fas fa-mobile-alt"></i>
              <div class="feature-content">
                <h3>响应式设计</h3>
                <p>完美适配桌面端、平板和移动设备</p>
              </div>
            </div>
            
            <div class="feature-item">
              <i class="fas fa-search"></i>
              <div class="feature-content">
                <h3>智能搜索</h3>
                <p>支持网站名称、描述和标签的快速搜索</p>
              </div>
            </div>
            
            <div class="feature-item">
              <i class="fas fa-cog"></i>
              <div class="feature-content">
                <h3>易于定制</h3>
                <p>TypeScript 支持，组件化架构，易于修改和扩展</p>
              </div>
            </div>
            
            <div class="feature-item">
              <i class="fas fa-rocket"></i>
              <div class="feature-content">
                <h3>快速部署</h3>
                <p>支持 GitHub Pages、Cloudflare Pages 等平台</p>
              </div>
            </div>
            
            <div class="feature-item">
              <i class="fas fa-code"></i>
              <div class="feature-content">
                <h3>开源免费</h3>
                <p>MIT 许可证，完全开源，可自由使用和修改</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-visual">
          <div class="tech-stack">
            <h3>技术栈</h3>
            <div class="tech-items">
              <div class="tech-item">
                <i class="fab fa-vuejs"></i>
                <span>Vue 3</span>
              </div>
              <div class="tech-item">
                <i class="fab fa-js-square"></i>
                <span>TypeScript</span>
              </div>
              <div class="tech-item">
                <i class="fas fa-bolt"></i>
                <span>Vite</span>
              </div>
              <div class="tech-item">
                <i class="fab fa-css3-alt"></i>
                <span>CSS3</span>
              </div>
            </div>
          </div>
          
          <div class="deployment-options">
            <h3>部署选项</h3>
            <div class="deploy-items">
              <a href="https://pages.github.com/" target="_blank" class="deploy-item">
                <i class="fab fa-github"></i>
                <span>GitHub Pages</span>
              </a>
              <a href="https://pages.cloudflare.com/" target="_blank" class="deploy-item">
                <i class="fas fa-cloud"></i>
                <span>Cloudflare Pages</span>
              </a>
              <a href="https://vercel.com/" target="_blank" class="deploy-item">
                <i class="fas fa-triangle"></i>
                <span>Vercel</span>
              </a>
              <a href="https://www.netlify.com/" target="_blank" class="deploy-item">
                <i class="fas fa-globe"></i>
                <span>Netlify</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="github-section">
        <h3>开始使用</h3>
        <p>Fork 这个项目并开始定制属于您的导航页面</p>
        <div class="github-buttons">
          <a 
            href="https://github.com/zhangbird050801/bird-nav" 
            target="_blank"
            class="github-btn primary"
          >
            <i class="fab fa-github"></i>
            View on GitHub
          </a>
          <a 
            href="https://github.com/zhangbird050801/bird-nav/fork" 
            target="_blank"
            class="github-btn secondary"
          >
            <i class="fas fa-code-branch"></i>
            Fork Project
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 这个组件是纯展示组件，不需要任何逻辑
</script>

<style scoped>
.about-section {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  margin: 3rem 0;
  padding: 3rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-description {
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.7;
  margin: 0 0 2rem 0;
}

.features {
  display: grid;
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.feature-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background: white;
}

.feature-item i {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: 10px;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.feature-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.25rem 0;
}

.feature-content p {
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0;
  line-height: 1.4;
}

.about-visual {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tech-stack,
.deployment-options {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.tech-stack h3,
.deployment-options h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 1rem 0;
  text-align: center;
}

.tech-items,
.deploy-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.tech-item,
.deploy-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.tech-item:hover,
.deploy-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.tech-item i,
.deploy-item i {
  font-size: 1.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tech-item span,
.deploy-item span {
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
}

.github-section {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 16px;
  color: white;
}

.github-section h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.github-section p {
  margin: 0 0 2rem 0;
  opacity: 0.9;
}

.github-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.github-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid white;
}

.github-btn.primary {
  background: white;
  color: var(--primary-color);
}

.github-btn.secondary {
  background: transparent;
  color: white;
}

.github-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* 响应式 */
@media (max-width: 768px) {
  .about-container {
    padding: 0 1rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-title {
    font-size: 2rem;
  }
  
  .features {
    gap: 1rem;
  }
  
  .feature-item {
    padding: 0.875rem;
  }
  
  .tech-items,
  .deploy-items {
    grid-template-columns: 1fr;
  }
  
  .github-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .github-btn {
    width: 200px;
    justify-content: center;
  }
}
</style>
