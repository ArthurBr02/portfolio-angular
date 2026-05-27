<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @mousedown.self="overlayMousedown = true" @mouseup.self="onOverlayMouseup">
      <div class="modal" role="dialog" :aria-label="title">
        <button class="modal-close" @click="close" :aria-label="$t('common.close')">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppModal',
  props: {
    modelValue: { type: Boolean, required: true },
    title: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  data() {
    return { overlayMousedown: false };
  },
  mounted() {
    window.addEventListener('keydown', this.onEscape);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    },
    onOverlayMouseup() {
      if (this.overlayMousedown) this.close();
      this.overlayMousedown = false;
    },
    onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && this.modelValue) this.close();
    },
  },
});
</script>

<style scoped>
.modal-content { padding: 2rem; }
</style>
