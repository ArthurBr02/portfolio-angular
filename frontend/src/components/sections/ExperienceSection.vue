<template>
  <section class="experience section-padding bg-alt">
    <div class="container animate-on-scroll">
      <h2 class="section-title">Expérience Professionnelle</h2>
      
      <div class="timeline">
        <div class="timeline-item animate-on-scroll" v-for="exp in experiences" :key="exp.id">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h3>{{ exp.role }}</h3>
            <span class="timeline-date">{{ exp.start_date }} - {{ exp.current ? 'Présent' : exp.end_date }}</span>
            <span class="timeline-company">{{ exp.company }}</span>
            <p>{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ExperienceSection',
  setup() {
    // MOCK DATA
    const experiences = ref([
      { id: 1, role: 'Développeur Fullstack Senior', company: 'Tech Corp', start_date: '2023', end_date: '', current: true, description: 'Développement d\'applications web avec Vue 3 et Node.js. Architecture microservices.' },
      { id: 2, role: 'Développeur Frontend', company: 'Web Agency', start_date: '2020', end_date: '2023', current: false, description: 'Création d\'interfaces utilisateur complexes et performantes.' }
    ])

    return { experiences }
  }
})
</script>

<style scoped>
.section-padding { padding: var(--spacing-xl) var(--spacing-lg); }
.bg-alt { background-color: var(--color-bg-secondary); }
.container { max-width: 800px; margin: 0 auto; }
.section-title { font-size: 2.5rem; margin-bottom: var(--spacing-xl); text-align: center; position: relative; }
.section-title::after {
  content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 60px; height: 4px; background-color: var(--color-accent); border-radius: var(--radius-full);
}

.timeline {
  position: relative;
  padding-left: var(--spacing-lg);
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background-color: var(--color-border);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--spacing-lg);
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: calc(var(--spacing-lg) * -1 - 6px); /* Align with timeline line */
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--color-accent);
  border: 3px solid var(--color-bg-secondary);
}

.timeline-content {
  background-color: var(--color-bg-card);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.timeline-content h3 {
  color: var(--color-accent);
  margin-bottom: var(--spacing-xs);
  font-size: 1.25rem;
}

.timeline-date, .timeline-company {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
}

.timeline-company {
  color: var(--color-text-primary);
}
</style>
