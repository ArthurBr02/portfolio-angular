<template>
  <div>
    <div class="admin-page-head">
      <div><h1>Unités d'enseignement</h1><p>{{ totalCount }} UE au total</p></div>
      <div style="display:flex;gap:.75rem;align-items:center">
        <input v-model="search" type="search" placeholder="Filtrer…" style="width:200px" />
        <button class="btn btn-primary" @click="() => openCreate()">+ Nouvelle UE</button>
      </div>
    </div>

    <div v-if="!educations.length" class="panel">
      <div class="panel-body" style="text-align:center;color:var(--color-text-muted)">Aucune formation trouvée</div>
    </div>

    <template v-for="edu in filteredEducations" :key="edu.id">
      <div class="panel" style="margin-bottom:1.25rem">
        <div class="panel-head">
          <div>
            <h2>{{ edu.degree_fr }}</h2>
            <p>{{ edu.school }}</p>
          </div>
          <button class="btn btn-ghost" @click="openCreate(edu.id)">+ Ajouter une UE</button>
        </div>

        <table class="tbl" v-if="filteredUe(edu.id).length">
          <thead>
            <tr>
              <th :class="['sortable', sortKey === 'semester' ? 'sort-' + sortDir : '']" @click="setSort('semester')">Semestre</th>
              <th :class="['sortable', sortKey === 'code' ? 'sort-' + sortDir : '']" @click="setSort('code')">Code</th>
              <th :class="['sortable', sortKey === 'name' ? 'sort-' + sortDir : '']" @click="setSort('name')">Nom</th>
              <th>Description</th>
              <th style="text-align:right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ue in filteredUe(edu.id)" :key="ue.id">
              <td style="font-family:ui-monospace,monospace;font-size:.82rem;white-space:nowrap">{{ ue.semester || '—' }}</td>
              <td style="font-family:ui-monospace,monospace;font-size:.82rem;white-space:nowrap">{{ ue.code || '—' }}</td>
              <td><strong>{{ ue.name }}</strong></td>
              <td style="color:var(--color-text-secondary);font-size:.88rem;max-width:320px">
                <span v-if="ue.description">{{ ue.description }}</span>
                <span v-else style="color:var(--color-text-muted)">—</span>
              </td>
              <td>
                <div class="tbl-actions">
                  <button class="btn-icon" @click="openEdit(ue)"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 2l2 2-8 8H2v-2L10 2z" stroke="currentColor" stroke-width="1.5"/></svg></button>
                  <button class="btn-icon" @click="remove(ue.id)"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V2h4v2M3 4l1 8h6l1-8" stroke="currentColor" stroke-width="1.5"/></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="panel-body" style="color:var(--color-text-muted);font-size:.88rem">
          Aucune UE pour cette formation.
        </div>
      </div>
    </template>

    <div v-if="educations.length && !filteredEducations.length" class="panel">
      <div class="panel-body" style="text-align:center;color:var(--color-text-muted)">Aucun résultat pour "{{ search }}"</div>
    </div>

    <AppModal v-model="showModal" title="Unité d'enseignement">
      <h3 style="margin-bottom:1.5rem">{{ editing ? 'Modifier' : 'Nouvelle' }} UE</h3>
      <div style="display:flex;flex-direction:column;gap:1rem">
        <div>
          <label class="field-label">Formation</label>
          <select v-model.number="form.education_id">
            <option v-for="edu in educations" :key="edu.id" :value="edu.id">{{ edu.degree_fr }} — {{ edu.school }}</option>
          </select>
        </div>
        <div class="form-row">
          <div><label class="field-label">Semestre</label><input v-model="form.semester" placeholder="Semestre 8" /></div>
          <div><label class="field-label">Code</label><input v-model="form.code" placeholder="UF 8.1" /></div>
        </div>
        <div><label class="field-label">Nom</label><input v-model="form.name" placeholder="Conduite de projet" /></div>
        <div>
          <label class="field-label">Description (ce que j'ai fait)</label>
          <textarea v-model="form.description" rows="3" placeholder="Ex : Réalisation d'un rapport de projet, présentation orale…" />
        </div>
        <div style="display:flex;justify-content:flex-end;gap:.75rem;margin-top:.5rem">
          <button class="btn btn-ghost" @click="showModal = false">Annuler</button>
          <button class="btn btn-primary" @click="saveItem" :disabled="saving || !form.name">{{ saving ? '…' : 'Sauvegarder' }}</button>
        </div>
      </div>
    </AppModal>
    <AppToast :message="toast" @close="toast = ''" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from '../../lib/api';
import type { Education, EducationUe } from '../../lib/types';
import AppModal from '../../components/ui/AppModal.vue';
import AppToast from '../../components/ui/AppToast.vue';

const emptyForm = (educationId = 0) => ({
  education_id: educationId,
  semester: '' as string | null,
  code: '' as string | null,
  name: '',
  description: '' as string | null,
  sort_order: 0,
});

export default defineComponent({
  name: 'EducationUeView',
  components: { AppModal, AppToast },

  data() {
    return {
      educations: [] as Education[],
      ueByEducation: {} as Record<number, EducationUe[]>,
      search: '',
      sortKey: 'semester' as string,
      sortDir: 'asc' as 'asc' | 'desc',
      showModal: false,
      editing: null as EducationUe | null,
      form: emptyForm(),
      saving: false,
      toast: '',
    };
  },

  computed: {
    totalCount(): number {
      return Object.values(this.ueByEducation).reduce((sum, list) => sum + list.length, 0);
    },
    filteredEducations(): Education[] {
      if (!this.search.trim()) return this.educations;
      return this.educations.filter(edu => this.filteredUe(edu.id).length > 0);
    },
  },

  async mounted() {
    await this.load();
  },

  methods: {
    async load() {
      this.educations = await api.get<Education[]>('/education');
      const results = await Promise.all(
        this.educations.map(edu => api.get<EducationUe[]>(`/admin/education/${edu.id}/ue`))
      );
      const map: Record<number, EducationUe[]> = {};
      this.educations.forEach((edu, i) => { map[edu.id] = results[i]; });
      this.ueByEducation = map;
    },

    setSort(key: string) {
      if (this.sortKey === key) this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      else { this.sortKey = key; this.sortDir = 'asc'; }
    },
    filteredUe(educationId: number): EducationUe[] {
      const list = this.ueByEducation[educationId] || [];
      const q = this.search.toLowerCase().trim();
      const filtered = !q ? list : list.filter(ue =>
        (ue.name || '').toLowerCase().includes(q) ||
        (ue.code || '').toLowerCase().includes(q) ||
        (ue.semester || '').toLowerCase().includes(q) ||
        (ue.description || '').toLowerCase().includes(q)
      );
      const k = this.sortKey as keyof EducationUe;
      return [...filtered].sort((a, b) => {
        const semCmp = String(a.semester ?? '').localeCompare(String(b.semester ?? ''));
        if (semCmp !== 0) return this.sortKey === 'semester' && this.sortDir === 'desc' ? -semCmp : semCmp;
        const codeCmp = String(a.code ?? '').localeCompare(String(b.code ?? ''));
        if (k === 'semester') return codeCmp;
        const av = String(a[k] ?? '');
        const bv = String(b[k] ?? '');
        const cmp = av.localeCompare(bv);
        return this.sortDir === 'asc' ? cmp : -cmp;
      });
    },

    openCreate(educationId = 0) {
      this.editing = null;
      this.form = emptyForm(educationId || (this.educations[0]?.id ?? 0));
      this.showModal = true;
    },

    openEdit(ue: EducationUe) {
      this.editing = ue;
      this.form = { ...emptyForm(ue.education_id), ...ue };
      this.showModal = true;
    },

    async saveItem() {
      this.saving = true;
      try {
        if (this.editing) {
          await api.put(`/admin/education-ue/${this.editing.id}`, this.form);
        } else {
          await api.post(`/admin/education/${this.form.education_id}/ue`, this.form);
        }
        this.showModal = false;
        await this.load();
        this.toast = 'Sauvegardé !';
      } finally {
        this.saving = false;
      }
    },

    async remove(id: number) {
      if (!confirm('Supprimer cette UE ?')) return;
      await api.delete(`/admin/education-ue/${id}`);
      await this.load();
      this.toast = 'Supprimé';
    },
  },
});
</script>
