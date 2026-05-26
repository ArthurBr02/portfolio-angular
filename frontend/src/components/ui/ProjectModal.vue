<template>
  <dialog ref="dialogRef" closedby="any" class="project-modal">
    <div v-if="project" class="modal-content">
      <button class="close-btn" @click="closeModal" aria-label="Fermer">✕</button>
      <div class="modal-header">
        <h2>{{ project.title }}</h2>
      </div>
      <div class="modal-body">
        <div class="project-image-placeholder"></div>
        <p>{{ project.description }}</p>
        <div class="tech-tags">
          <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>
      <div class="modal-footer">
        <a v-if="project.demo_url" :href="project.demo_url" target="_blank" class="btn btn-primary">Démo en direct</a>
        <a v-if="project.repo_url" :href="project.repo_url" target="_blank" class="btn btn-secondary">Code source</a>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'ProjectModal',
  setup() {
    const dialogRef = ref<HTMLDialogElement | null>(null)
    const project = ref<any>(null)
    
    let clickHandler: ((e: MouseEvent) => void) | null = null;

    const openModal = (proj: any) => {
      project.value = proj
      if (dialogRef.value) {
        dialogRef.value.showModal()
      }
    }

    const closeModal = () => {
      if (dialogRef.value) {
        dialogRef.value.close()
      }
      project.value = null
    }

    onMounted(() => {
      if (dialogRef.value) {
        // Fallback for browsers without closedby support
        if (!('closedBy' in HTMLDialogElement.prototype)) {
          clickHandler = (event: MouseEvent) => {
            if (event.target !== dialogRef.value) return;
            const rect = dialogRef.value!.getBoundingClientRect();
            const isDialogContent = (
              rect.top <= event.clientY &&
              event.clientY <= rect.top + rect.height &&
              rect.left <= event.clientX &&
              event.clientX <= rect.left + rect.width
            );
            if (isDialogContent) return;
            closeModal();
          }
          dialogRef.value.addEventListener('click', clickHandler);
        }
      }
    })

    onUnmounted(() => {
      if (dialogRef.value && clickHandler) {
         dialogRef.value.removeEventListener('click', clickHandler)
      }
    })

    return {
      dialogRef,
      project,
      openModal,
      closeModal
    }
  }
})
</script>

<style scoped>
.project-modal {
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  max-width: 800px;
  width: 90%;
  box-shadow: var(--shadow-lg);
  /* Animation for dialog */
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.project-modal[open] {
  opacity: 1;
  transform: scale(1);
}

.project-modal::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-modal[open]::backdrop {
  opacity: 1;
}

.modal-content {
  padding: var(--spacing-lg);
  position: relative;
}

.close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.close-btn:hover {
  color: var(--color-error);
}

.modal-header h2 {
  margin-bottom: var(--spacing-md);
  color: var(--color-accent);
}

.project-image-placeholder {
  width: 100%;
  height: 300px;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin: var(--spacing-md) 0;
}

.tech-tag {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  border: 1px solid var(--color-border);
}

.modal-footer {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
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
  color: #fff;
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
