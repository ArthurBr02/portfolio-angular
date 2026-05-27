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
        <div class="stat-card-foot">/ 8 sections</div>
      </div>
    </div>

    <div class="dash-main-grid">

      <div class="panel">
        <div class="panel-head">
          <div>
            <h2>Visites</h2>
            <p>{{ periodLabel }}</p>
          </div>
          <div class="filter-tabs">
            <button
              v-for="p in periods"
              :key="p.value"
              :class="['filter-tab', { active: period === p.value }]"
              @click="setPeriod(p.value)"
            >{{ p.label }}</button>
          </div>
        </div>
        <div class="panel-body">
          <div class="chart">
            <canvas ref="chartCanvas" />
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
import { defineComponent, markRaw } from 'vue';
import { RouterLink } from 'vue-router';
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { api } from '../../lib/api';
import { initials, relativeTime } from '../../lib/utils';
import type { AnalyticsData } from '../../lib/types';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

type Period = '1d' | '7d' | '30d' | '1y' | 'all';

const MONTHS = ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jul', 'aoû', 'sep', 'oct', 'nov', 'déc'];

export default defineComponent({
  name: 'DashboardView',
  components: { RouterLink },
  data() {
    return {
      analytics: null as AnalyticsData | null,
      period: '7d' as Period,
      _chart: null as Chart<'line', number[], string> | null,
    };
  },
  computed: {
    periods(): { value: string; label: string }[] {
      return [
        { value: '1d', label: '1j' },
        { value: '7d', label: '7j' },
        { value: '30d', label: '30j' },
        { value: '1y', label: '1an' },
        { value: 'all', label: 'Tout' },
      ];
    },
    periodLabel(): string {
      const map: Record<Period, string> = {
        '1d': "Aujourd'hui",
        '7d': '7 derniers jours',
        '30d': '30 derniers jours',
        '1y': '12 derniers mois',
        'all': 'Depuis le début',
      };
      return map[this.period];
    },
  },
  async mounted() {
    this.analytics = await api.get<AnalyticsData>(this.analyticsUrl());
    await this.$nextTick();
    this.initChart();
  },
  beforeUnmount() {
    this._chart?.destroy();
  },
  methods: {
    initials,
    relTime(d: string): string { return relativeTime(d); },

    cssVar(name: string): string {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    },

    formatLabels(views: { date: string; count: number }[]): string[] {
      if (this.period === '1d') return views.map(v => `${v.date}h`);
      if (this.period === '1y' || this.period === 'all') {
        return views.map(v => MONTHS[parseInt(v.date.slice(5, 7)) - 1]);
      }
      return views.map(v => v.date.slice(5));
    },

    initChart() {
      const canvas = this.$refs.chartCanvas as HTMLCanvasElement | undefined;
      if (!canvas) return;
      this._chart?.destroy();

      const views = this.analytics?.views ?? [];
      const accent = this.cssVar('--color-accent');
      const accentSoft = this.cssVar('--color-accent-soft');
      const border = this.cssVar('--color-border');
      const textMuted = this.cssVar('--color-text-muted');
      const bgCard = this.cssVar('--color-bg-card');
      const textPrimary = this.cssVar('--color-text-primary');

      this._chart = markRaw(new Chart(canvas, {
        type: 'line',
        data: {
          labels: this.formatLabels(views),
          datasets: [{
            data: views.map(v => v.count),
            borderColor: accent,
            backgroundColor: accentSoft,
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: accent,
            pointBorderColor: bgCard,
            pointBorderWidth: 2,
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: bgCard,
              titleColor: textMuted,
              bodyColor: textPrimary,
              borderColor: border,
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: (item) => {
                  const n = item.raw as number;
                  return ` ${n} visite${n !== 1 ? 's' : ''}`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: {
                color: textMuted,
                font: { size: 11 },
                maxTicksLimit: this.period === '1d' ? 5 : 8,
                maxRotation: 0,
              },
            },
            y: {
              beginAtZero: true,
              border: { display: false, dash: [3, 3] },
              grid: { color: border },
              ticks: {
                color: textMuted,
                font: { size: 11 },
                maxTicksLimit: 4,
                precision: 0,
              },
            },
          },
        },
      }));
    },

    analyticsUrl(): string {
      const tz = -new Date().getTimezoneOffset();
      return `/admin/analytics?period=${this.period}&tz=${tz}`;
    },
    async setPeriod(p: string) {
      this.period = p as Period;
      this.analytics = await api.get<AnalyticsData>(this.analyticsUrl());
      await this.$nextTick();
      const views = this.analytics?.views ?? [];
      if (this._chart) {
        this._chart.data.labels = this.formatLabels(views);
        this._chart.data.datasets[0].data = views.map(v => v.count);
        (this._chart.options.scales!.x as any).ticks.maxTicksLimit = p === '1d' ? 5 : 8;
        this._chart.update();
      }
    },
  },
});
</script>
