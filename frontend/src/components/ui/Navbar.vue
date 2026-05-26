<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <div class="brand">
        <a href="#hero">Arthur</a>
        <span v-if="profile?.available_for_work" class="status-badge" title="Disponible pour des missions"></span>
      </div>
      
      <div class="nav-links">
        <a v-if="settingsStore.isSectionEnabled('about')" href="#about">À propos</a>
        <a v-if="settingsStore.isSectionEnabled('skills')" href="#skills">Compétences</a>
        <a v-if="settingsStore.isSectionEnabled('projects')" href="#projects">Projets</a>
        <a v-if="settingsStore.isSectionEnabled('experience')" href="#experience">Expérience</a>
        <a v-if="settingsStore.isSectionEnabled('education')" href="#education">Éducation</a>
        <a v-if="settingsStore.isSectionEnabled('contact')" href="#contact">Contact</a>
      </div>
      
      <!-- Placeholder for language switcher -->
      <div class="nav-actions">
        <span>FR / EN</span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from '../../stores/settings'

export default defineComponent({
  name: 'Navbar',
  setup() {
    const settingsStore = useSettingsStore()
    const isScrolled = ref(false)
    const profile = ref<any>({ available_for_work: true }) // MOCK for now

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      settingsStore,
      isScrolled,
      profile
    }
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: var(--color-bg-nav);
  display: flex;
  align-items: center;
  z-index: 1000;
  transition: box-shadow var(--transition-base), background-color var(--transition-base);
}

.navbar.scrolled {
  box-shadow: var(--shadow-sm);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 700;
  font-size: 1.25rem;
}

.brand a {
  text-decoration: none;
  color: var(--color-text-primary);
}

.status-badge {
  width: 10px;
  height: 10px;
  background-color: var(--color-success);
  border-radius: 50%;
  display: inline-block;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 oklch(0.60 0.15 155 / 0.7); }
  70% { box-shadow: 0 0 0 6px oklch(0.60 0.15 155 / 0); }
  100% { box-shadow: 0 0 0 0 oklch(0.60 0.15 155 / 0); }
}

.nav-links {
  display: flex;
  gap: var(--spacing-md);
}

.nav-links a {
  text-decoration: none;
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.nav-links a:hover {
  color: var(--color-accent);
}

.nav-actions {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}
</style>
