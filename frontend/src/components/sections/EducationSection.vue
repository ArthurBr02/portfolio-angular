<template>
  <section class="education section-padding">
    <div class="container animate-on-scroll">
      <h2 class="section-title">Éducation</h2>
      
      <div class="timeline">
        <div class="timeline-item animate-on-scroll" v-for="edu in education" :key="edu.id">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h3>{{ edu.degree }}</h3>
            <span class="timeline-date">{{ edu.start_date }} - {{ edu.end_date }}</span>
            <span class="timeline-school">{{ edu.school }}</span>
            <p>{{ edu.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'EducationSection',
  setup() {
    // MOCK DATA
    const education = ref([
      { id: 1, degree: 'Master en Ingénierie Logicielle', school: 'Université de Technologie', start_date: '2018', end_date: '2020', description: 'Spécialisation en architectures distribuées et développement web.' },
      { id: 2, degree: 'Licence Informatique', school: 'Université des Sciences', start_date: '2015', end_date: '2018', description: 'Bases de la programmation, algorithmique et bases de données.' }
    ])

    return { education }
  }
})
</script>

<style scoped>
.section-padding { padding: var(--spacing-xl) var(--spacing-lg); }
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
  left: calc(var(--spacing-lg) * -1 - 6px);
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--color-accent);
  border: 3px solid var(--color-bg-primary); /* background matches section background */
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

.timeline-date, .timeline-school {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
}

.timeline-school {
  color: var(--color-text-primary);
}
</style>
