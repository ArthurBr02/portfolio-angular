<template>
  <section class="projects section-padding">
    <div class="container animate-on-scroll">
      <h2 class="section-title">Mes Projets</h2>
      
      <!-- Placeholder for fetch/api integration later -->
      <div class="projects-grid">
        <div 
          v-for="project in projects" 
          :key="project.id" 
          class="project-card animate-scale-on-scroll"
          @click="openProjectModal(project)"
        >
          <div class="project-thumb-placeholder"></div>
          <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p>{{ project.short_description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <ProjectModal ref="modalRef" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProjectModal from '../ui/ProjectModal.vue'

export default defineComponent({
  name: 'ProjectsSection',
  components: {
    ProjectModal
  },
  setup() {
    const modalRef = ref<InstanceType<typeof ProjectModal> | null>(null)
    
    // MOCK DATA for now
    const projects = ref([
      { id: 1, title: 'E-Commerce App', short_description: 'Une boutique en ligne complète.', description: 'Une description plus longue du projet avec tous les détails techniques.', technologies: ['Vue.js', 'Express', 'Stripe'] },
      { id: 2, title: 'Task Manager', short_description: 'Application de gestion de tâches.', description: 'Gestionnaire de tâches avec Kanban.', technologies: ['React', 'Node.js'] },
      { id: 3, title: 'Portfolio', short_description: 'Ce site internet.', description: 'Mon portfolio personnel construit avec Vue 3 et Express.', technologies: ['Vue.js', 'Pinia', 'SQLite'] },
    ])

    const openProjectModal = (project: any) => {
      if (modalRef.value) {
        modalRef.value.openModal(project)
      }
    }

    return {
      projects,
      modalRef,
      openProjectModal
    }
  }
})
</script>

<style scoped>
.section-padding {
  padding: var(--spacing-xl) var(--spacing-lg);
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-lg);
}

.project-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}

.project-thumb-placeholder {
  height: 200px;
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.project-info {
  padding: var(--spacing-md);
  flex: 1;
}

.project-info h3 {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-primary);
}

.project-info p {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}
</style>
