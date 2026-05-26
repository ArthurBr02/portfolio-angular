<template>
  <div class="public-layout">
    <Navbar />
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Navbar from '../components/ui/Navbar.vue'

export default defineComponent({
  name: 'PublicLayout',
  components: {
    Navbar
  },
  setup() {
    onMounted(() => {
      // Implement IntersectionObserver fallback for scroll-driven animations
      if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                (entry.target as HTMLElement).style.opacity = '1';
                (entry.target as HTMLElement).style.transform = 'translateY(0) scale(1)';
              }
            }
          },
          { threshold: 0.1 }
        )

        // Observe elements with animation classes
        document.querySelectorAll('.animate-on-scroll, .animate-scale-on-scroll').forEach((el) => {
          (el as HTMLElement).style.opacity = '0';
          if (el.classList.contains('animate-on-scroll')) {
             (el as HTMLElement).style.transform = 'translateY(30px)';
          } else {
             (el as HTMLElement).style.transform = 'scale(0.95)';
          }
          observer.observe(el)
        })
      }
    })
  }
})
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding-top: 70px; /* Navbar height */
}
</style>
