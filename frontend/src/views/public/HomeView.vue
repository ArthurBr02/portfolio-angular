<template>
  <PublicLayout>
    <HeroSection v-if="settingsStore.isSectionEnabled('hero')" id="hero" />
    <AboutSection v-if="settingsStore.isSectionEnabled('about')" id="about" />
    <SkillsSection v-if="settingsStore.isSectionEnabled('skills')" id="skills" />
    <ProjectsSection v-if="settingsStore.isSectionEnabled('projects')" id="projects" />
    <ExperienceSection v-if="settingsStore.isSectionEnabled('experience')" id="experience" />
    <EducationSection v-if="settingsStore.isSectionEnabled('education')" id="education" />
    <ContactSection v-if="settingsStore.isSectionEnabled('contact')" id="contact" />
  </PublicLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import PublicLayout from '../../layouts/PublicLayout.vue'
import HeroSection from '../../components/sections/HeroSection.vue'
import AboutSection from '../../components/sections/AboutSection.vue'
import SkillsSection from '../../components/sections/SkillsSection.vue'
import ProjectsSection from '../../components/sections/ProjectsSection.vue'
import ExperienceSection from '../../components/sections/ExperienceSection.vue'
import EducationSection from '../../components/sections/EducationSection.vue'
import ContactSection from '../../components/sections/ContactSection.vue'
import { useSettingsStore } from '../../stores/settings'

export default defineComponent({
  name: 'HomeView',
  components: {
    PublicLayout,
    HeroSection,
    AboutSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    EducationSection,
    ContactSection
  },
  setup() {
    const settingsStore = useSettingsStore()

    onMounted(async () => {
      await settingsStore.fetchSettings()
    })

    return {
      settingsStore
    }
  }
})
</script>
