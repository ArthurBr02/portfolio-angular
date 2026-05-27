<template>
  <div>
    <div class="admin-page-head">
      <div>
        <h1>Dashboard</h1>
        <p>Vue d'ensemble de votre portfolio</p>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-card-head">
          Projets
          <div class="stat-card-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>
          </div>
        </div>
        <div class="stat-card-num">{{ analytics?.projectCount ?? 0 }}</div>
        <div class="stat-card-foot">projets publiés</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-head">
          Expériences
          <div class="stat-card-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/></svg>
          </div>
        </div>
        <div class="stat-card-num">{{ analytics?.experienceCount ?? 0 }}</div>
        <div class="stat-card-foot">expériences</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-head">
          Messages
          <div class="stat-card-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 3h14v10H1V3z" stroke="currentColor" stroke-width="1.5"/></svg>
          </div>
        </div>
        <div class="stat-card-num">{{ analytics?.unreadMessageCount ?? 0 }}</div>
        <div class="stat-card-foot">non lus</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-head">
          Sections actives
          <div class="stat-card-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
        </div>
        <div class="stat-card-num">{{ analytics?.activeSections ?? 0 }}</div>
        <div class="stat-card-foot">/ 7 sections</div>
      </div>
    </div>

    <div class="dash-main-grid">

      <div class="panel">
        <div class="panel-head">
          <div>
            <h2>Visites</h2>
            <p>7 derniers jours</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="chart" ref="chartContainer">
            <svg class="chart-svg" :viewBox="`0 0 ${svgW} ${svgH}`" preserveAspectRatio="none">
              <template v-if="chartPoints.length > 1">
                <line
                  v-for="y in gridLines"
                  :key="y"
                  :x1="0" :y1="y" :x2="svgW" :y2="y"
                  class="chart-grid"
                />
                <polygon :points="areaPoints" class="chart-area" />
                <polyline :points="linePoints" class="chart-line" />
                <circle
                  v-for="(pt, i) in chartPoints"
                  :key="i"
                  :cx="pt.x" :cy="pt.y" r="4"
                  class="chart-dot"
                />
              </template>
            </svg>
            <div v-if="chartPoints.length > 1" class="chart-labels" aria-hidden="true">
              <span
                v-for="(pt, i) in chartPoints"
                :key="i"
                class="chart-label"
                :style="{ left: `${(pt.x / svgW) * 100}%` }"
              >{{ pt.label }}</span>
            </div>
            <div v-else class="chart-empty">Pas encore de données</div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <h2>Derniers messages</h2>
        </div>
        <div class="msg-list">
          <RouterLink
            v-for="msg in analytics?.recentMessages ?? []"
            :key="msg.id"
            to="/admin/messages"
            :class="['msg-item', { unread: msg.is_read === 0 }]"
            style="text-decoration: none; color: inherit"
          >
            <span :class="['msg-unread-dot', { read: msg.is_read === 1 }]" />
            <div class="msg-avatar">{{ initials(msg.name) }}</div>
            <div class="msg-content">
              <div class="msg-name">{{ msg.name }}</div>
              <div class="msg-subject">{{ msg.subject }}</div>
            </div>
            <div class="msg-time">{{ relTime(msg.created_at) }}</div>
          </RouterLink>
          <div v-if="!(analytics?.recentMessages?.length)" style="padding: 1.5rem; color: var(--color-text-muted); font-size: 0.9rem">
            Aucun message
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { api } from '../../lib/api';
import { initials, relativeTime } from '../../lib/utils';
import type { AnalyticsData } from '../../lib/types';

export default defineComponent({
  name: 'DashboardView',
  components: { RouterLink },
  data() {
    return {
      analytics: null as AnalyticsData | null,
      svgW: 400,
      svgH: 140,
      _resizeObserver: null as ResizeObserver | null,
    };
  },
  computed: {
    chartPoints(): { x: number; y: number; label: string }[] {
      const views = this.analytics?.views ?? [];
      if (!views.length) return [];
      const max = Math.max(...views.map(v => v.count), 1);
      return views.map((v, i) => ({
        x: (i / (views.length - 1)) * this.svgW,
        y: this.svgH - (v.count / max) * this.svgH,
        label: v.date.slice(5),
      }));
    },
    linePoints(): string {
      return this.chartPoints.map(p => `${p.x},${p.y}`).join(' ');
    },
    areaPoints(): string {
      if (!this.chartPoints.length) return '';
      const line = this.chartPoints.map(p => `${p.x},${p.y}`).join(' ');
      return `0,${this.svgH} ${line} ${this.svgW},${this.svgH}`;
    },
    gridLines(): number[] {
      return [0, this.svgH * 0.33, this.svgH * 0.66, this.svgH];
    },
  },
  async mounted() {
    this.analytics = await api.get<AnalyticsData>('/admin/analytics');
    await this.$nextTick();
    const container = this.$refs.chartContainer as HTMLElement | undefined;
    if (container) {
      const measure = () => { if (container.clientWidth) this.svgW = container.clientWidth; };
      measure();
      this._resizeObserver = new ResizeObserver(measure);
      this._resizeObserver.observe(container);
    }
  },
  beforeUnmount() {
    this._resizeObserver?.disconnect();
  },
  methods: {
    initials,
    relTime(d: string): string { return relativeTime(d); },
  },
});
</script>
