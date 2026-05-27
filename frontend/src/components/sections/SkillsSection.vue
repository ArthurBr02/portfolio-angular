<template>
  <section class="section" id="skills">
    <div class="container">
      <span class="eyebrow">{{ $t('skills.eyebrow') }}</span>
      <h2 class="h-section">{{ $t('skills.title') }}</h2>
      <div class="skills-grid">
        <div
          v-for="(group, cat) in groupedSkills"
          :key="cat"
          class="card skills-cat"
        >
          <h3>{{ cat }}</h3>
          <p class="skills-cat-sub">{{ group.length }} {{ group.length > 1 ? $t('skills.skill_plural') : $t('skills.skill_singular') }}</p>
          <div v-for="skill in group" :key="skill.id" class="skill-row">
            <div class="skill-head">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-badge" :data-level="skill.level">{{ levelLabel(skill.level) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Skill } from '../../lib/types';

export default defineComponent({
  name: 'SkillsSection',
  props: {
    skills: { type: Array as () => Skill[], default: () => [] },
    locale: { type: String, default: 'fr' },
  },

  computed: {
    groupedSkills(): Record<string, Skill[]> {
      const groups: Record<string, Skill[]> = {};
      for (const skill of this.skills) {
        const cat = (this.locale === 'en' ? skill.category_en : skill.category_fr) || 'Autres';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(skill);
      }
      return groups;
    },
  },

  methods: {
    levelLabel(level: number): string {
      return level >= 1 && level <= 3 ? this.$t(`skills.level_${level}`) : '';
    },
  },
});
</script>
