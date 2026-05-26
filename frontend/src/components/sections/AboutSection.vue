<template>
  <section class="about section-padding">
    <div class="container animate-on-scroll">
      <h2 class="section-title">À propos de moi</h2>
      <div class="about-grid">
        <div class="about-image">
          <!-- Placeholder avatar -->
          <div class="avatar-placeholder"></div>
        </div>
        <div class="about-content">
          <h3>Passionné par le web et les interfaces fluides</h3>
          <p>
            Je crée des applications web depuis plusieurs années avec un focus sur l'expérience utilisateur et les performances. J'aime concevoir des architectures solides et des interfaces qui se démarquent par leur minimalisme et leurs animations subtiles.
          </p>
          <p>
            Actuellement disponible pour de nouvelles opportunités.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutSection'
})
</script>

<style scoped>
.section-padding {
  padding: var(--spacing-xl) var(--spacing-lg);
}

.container {
  max-width: 1000px;
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

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr 2fr;
  }
}

.avatar-placeholder {
  width: 100%;
  aspect-ratio: 1;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}

.about-content h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.about-content p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  font-size: 1.1rem;
}
</style>
