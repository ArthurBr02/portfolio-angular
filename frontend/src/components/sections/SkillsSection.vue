<template>
  <section class="skills section-padding bg-alt">
    <div class="container animate-on-scroll">
      <h2 class="section-title">Mes Compétences</h2>
      <div class="skills-grid">
        <div class="skill-card animate-scale-on-scroll">
          <div class="skill-icon">💻</div>
          <h3>Frontend</h3>
          <ul class="skill-list">
            <li>Vue.js 3 / Pinia</li>
            <li>TypeScript</li>
            <li>HTML5 / CSS3 natif</li>
            <li>Animations (CSS & Web API)</li>
          </ul>
        </div>
        
        <div class="skill-card animate-scale-on-scroll" style="animation-delay: 0.1s">
          <div class="skill-icon">⚙️</div>
          <h3>Backend</h3>
          <ul class="skill-list">
            <li>Node.js / Express</li>
            <li>REST APIs</li>
            <li>SQLite / better-sqlite3</li>
            <li>Clean Architecture</li>
          </ul>
        </div>
        
        <div class="skill-card animate-scale-on-scroll" style="animation-delay: 0.2s">
          <div class="skill-icon">🛠️</div>
          <h3>Outils & Pratiques</h3>
          <ul class="skill-list">
            <li>Git / GitHub</li>
            <li>Docker</li>
            <li>Responsive Design</li>
            <li>Accessibilité (a11y)</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SkillsSection'
})
</script>

<style scoped>
.section-padding {
  padding: var(--spacing-xl) var(--spacing-lg);
}

.bg-alt {
  background-color: var(--color-bg-secondary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-xl);
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background-color: var(--color-accent);
  border-radius: var(--radius-full);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.skill-card {
  background-color: var(--color-bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.skill-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}

.skill-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.skill-card h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-accent);
}

.skill-list {
  list-style: none;
}

.skill-list li {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.skill-list li::before {
  content: '→';
  color: var(--color-accent);
  font-weight: bold;
}
</style>
