<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="reveal-text delay-1">Bonjour, je suis</span>
        <span class="reveal-text delay-2 highlight">Arthur.</span>
        <span class="reveal-text delay-3">Développeur Fullstack</span>
      </h1>
      <p class="hero-subtitle animate-scale-on-scroll">
        Je conçois des applications modernes, rapides et élégantes.
      </p>
      <div class="hero-actions animate-scale-on-scroll">
        <a href="#projects" class="btn btn-primary">Voir mes projets</a>
        <a href="#contact" class="btn btn-secondary">Me contacter</a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeroSection'
})
</script>

<style scoped>
.hero {
  min-height: calc(100vh - 70px); /* Minus navbar */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) var(--spacing-lg);
  /* Subtly textured background using gradients based on theme colors */
  background: radial-gradient(circle at top right, oklch(0.95 0.02 80 / 0.5), transparent 40%),
              radial-gradient(circle at bottom left, var(--color-bg-secondary), transparent 40%);
}

.hero-content {
  text-align: center;
  max-width: 800px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  display: flex;
  flex-direction: column;
}

.reveal-text {
  display: block;
  opacity: 0;
  animation: fade-up 0.8s ease forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }

.highlight {
  color: var(--color-accent);
}

.hero-subtitle {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
  animation-delay: 0.8s; /* waits for title */
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  animation-delay: 1s;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-size: 1rem;
}

.btn-primary {
  background-color: var(--color-accent);
  color: #fff; /* Good contrast usually */
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-border);
}

.btn-secondary:hover {
  border-color: var(--color-text-primary);
  transform: translateY(-2px);
}
</style>
