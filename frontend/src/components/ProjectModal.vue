<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal" role="dialog">
        <button class="modal-close" @click="$emit('close')">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="modal-gallery">
          <img
            v-if="currentImage"
            :src="currentImage"
            :alt="title"
          />
          <div v-if="allImages.length > 1" class="modal-gallery-nav">
            <button
              v-for="(_, i) in allImages"
              :key="i"
              :class="['modal-gallery-dot', { active: galleryIndex === i }]"
              @click="galleryIndex = i"
            />
          </div>
        </div>

        <div class="modal-body">
          <span class="chip">{{ project.category || 'web' }}</span>
          <h2>{{ title }}</h2>

          <div class="modal-meta">
            <div v-if="project.category">
              <span class="modal-meta-label">{{ $t('projects.category') }}</span>
              <span class="modal-meta-val">{{ project.category }}</span>
            </div>
            <div>
              <span class="modal-meta-label">{{ $t('projects.year') }}</span>
              <span class="modal-meta-val">{{ year }}</span>
            </div>
          </div>

          <p>{{ description }}</p>

          <div class="project-techs" style="margin-top: 1.5rem; margin-bottom: 1.5rem">
            <span v-for="tech in techs" :key="tech" class="project-tech">{{ tech }}</span>
          </div>

          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap">
            <a v-if="project.demo_url" :href="project.demo_url" target="_blank" class="btn btn-primary btn-sm">
              {{ $t('projects.view_demo') }}
            </a>
            <a v-if="project.repo_url" :href="project.repo_url" target="_blank" class="btn btn-ghost btn-sm">
              {{ $t('projects.view_repo') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Project } from '../lib/types';
import { parseTechnologies } from '../lib/utils';

export default defineComponent({
  name: 'ProjectModal',
  props: {
    project: { type: Object as () => Project, required: true },
    locale: { type: String, default: 'fr' },
  },
  emits: ['close'],

  data() {
    return { galleryIndex: 0 };
  },

  computed: {
    title(): string {
      return (this.locale === 'en' ? this.project.title_en : this.project.title_fr) || '';
    },
    description(): string {
      return (this.locale === 'en' ? this.project.description_en : this.project.description_fr) || '';
    },
    techs(): string[] {
      return parseTechnologies(this.project.technologies);
    },
    allImages(): string[] {
      const imgs: string[] = [];
      if (this.project.image_url) imgs.push(this.project.image_url);
      (this.project.images || []).forEach(i => { if (!imgs.includes(i.image_url)) imgs.push(i.image_url); });
      return imgs;
    },
    currentImage(): string | null {
      return this.allImages[this.galleryIndex] || null;
    },
    year(): string {
      return new Date(this.project.created_at).getFullYear().toString();
    },
  },

  mounted() {
    window.addEventListener('keydown', this.onKey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKey);
  },

  methods: {
    onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') this.$emit('close');
      if (e.key === 'ArrowLeft' && this.galleryIndex > 0) this.galleryIndex--;
      if (e.key === 'ArrowRight' && this.galleryIndex < this.allImages.length - 1) this.galleryIndex++;
    },
  },
});
</script>
