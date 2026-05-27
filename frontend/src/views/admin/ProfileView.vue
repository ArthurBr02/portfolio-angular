<template>
  <div>
    <div class="admin-page-head">
      <div>
        <h1>Profil</h1>
        <p>Vos informations personnelles</p>
      </div>
      <button class="btn btn-primary" @click="save" :disabled="saving">
        {{ saving ? 'Sauvegarde…' : 'Sauvegarder' }}
      </button>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1.5rem; align-items: start">
      <div class="panel">
        <div class="panel-head"><h2>Avatar</h2></div>
        <div class="panel-body" style="display: flex; flex-direction: column; align-items: center; gap: 1rem">
          <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, var(--mesh-1), var(--mesh-3)); position: relative; overflow: hidden; flex-shrink: 0">
            <img v-if="form.avatar_url" :src="form.avatar_url" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover" />
            <span v-else style="position: absolute; inset: 0; display: grid; place-items: center; font-size: 2rem; font-weight: 600; color: var(--color-text-primary)">{{ initials(form.name ?? null) }}</span>
          </div>
          <label class="btn btn-ghost btn-sm" style="cursor: pointer">
            Changer l'avatar
            <input type="file" accept="image/*" style="display:none" @change="uploadFile($event, 'avatar_url')" />
          </label>
          <label class="btn btn-ghost btn-sm" style="cursor: pointer">
            Mettre à jour le CV
            <input type="file" accept=".pdf" style="display:none" @change="uploadFile($event, 'cv_url')" />
          </label>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head"><h2>Informations</h2></div>
        <div class="panel-body" style="display: flex; flex-direction: column; gap: 1rem">
          <div class="form-row">
            <div>
              <label class="field-label">Nom</label>
              <input v-model="form.name" type="text" />
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="field-label">Titre (FR)</label>
              <input v-model="form.title" type="text" />
            </div>
            <div>
              <label class="field-label">Titre (EN)</label>
              <input v-model="form.title_en" type="text" />
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="field-label">Bio (FR)</label>
              <textarea v-model="form.bio" rows="4" style="resize: vertical; width: 100%" />
            </div>
            <div>
              <label class="field-label">Bio (EN)</label>
              <textarea v-model="form.bio_en" rows="4" style="resize: vertical; width: 100%" />
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="field-label">Email</label>
              <input v-model="form.email" type="email" />
            </div>
            <div>
              <label class="field-label">Téléphone</label>
              <input v-model="form.phone" type="tel" />
            </div>
          </div>
          <div>
            <label class="field-label">Localisation</label>
            <input v-model="form.location" type="text" />
          </div>
          <div class="form-row">
            <div>
              <label class="field-label">LinkedIn</label>
              <input v-model="form.linkedin_url" type="url" placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label class="field-label">GitHub</label>
              <input v-model="form.github_url" type="url" placeholder="https://github.com/..." />
            </div>
          </div>
          <div class="toggle-row">
            <div class="toggle-row-info">
              <div class="toggle-row-label">Disponible pour un emploi</div>
              <div class="toggle-row-desc">Affiche le badge "Disponible" sur le portfolio</div>
            </div>
            <button
              :class="['toggle', { on: form.available_for_work === 1 }]"
              @click="form.available_for_work = form.available_for_work === 1 ? 0 : 1"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="panel" style="margin-top: 1.5rem">
      <div class="panel-head"><h2>Sécurité</h2></div>
      <div class="panel-body" style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px">
        <div>
          <label class="field-label">Mot de passe actuel</label>
          <input v-model="pwForm.current_password" type="password" autocomplete="current-password" />
        </div>
        <div>
          <label class="field-label">Nouveau mot de passe</label>
          <input v-model="pwForm.new_password" type="password" autocomplete="new-password" />
        </div>
        <div>
          <label class="field-label">Confirmer le nouveau mot de passe</label>
          <input v-model="pwForm.confirm_password" type="password" autocomplete="new-password" />
        </div>
        <button class="btn btn-ghost btn-sm" style="align-self: flex-start" @click="changePassword" :disabled="savingPw">
          {{ savingPw ? '…' : 'Changer le mot de passe' }}
        </button>
      </div>
    </div>

    <AppToast :message="toast" :type="toastType" @close="toast = ''" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from '../../lib/api';
import { initials } from '../../lib/utils';
import type { Profile } from '../../lib/types';
import AppToast from '../../components/ui/AppToast.vue';

export default defineComponent({
  name: 'ProfileView',
  components: { AppToast },
  data() {
    return {
      form: { name: '', title: '', title_en: '', bio: '', bio_en: '', email: '', phone: '', location: '', avatar_url: '', cv_url: '', linkedin_url: '', github_url: '', available_for_work: 0 } as Partial<Profile>,
      pwForm: { current_password: '', new_password: '', confirm_password: '' },
      saving: false,
      savingPw: false,
      toast: '',
      toastType: 'success',
    };
  },
  async mounted() {
    const profile = await api.get<Profile>('/profile').catch(() => null);
    if (profile) this.form = { ...profile };
  },
  methods: {
    initials,
    async uploadFile(e: Event, field: 'avatar_url' | 'cv_url') {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const res = await api.upload('/admin/upload', file);
      this.form[field] = res.url;
    },
    async changePassword() {
      if (this.pwForm.new_password !== this.pwForm.confirm_password) {
        this.toast = 'Les mots de passe ne correspondent pas';
        this.toastType = 'error';
        return;
      }
      if (this.pwForm.new_password.length < 8) {
        this.toast = 'Le mot de passe doit contenir au moins 8 caractères';
        this.toastType = 'error';
        return;
      }
      this.savingPw = true;
      try {
        await api.put('/auth/admin/password', {
          current_password: this.pwForm.current_password,
          new_password: this.pwForm.new_password,
        });
        this.pwForm = { current_password: '', new_password: '', confirm_password: '' };
        this.toast = 'Mot de passe modifié !';
        this.toastType = 'success';
      } catch (e: unknown) {
        this.toast = e instanceof Error ? e.message : 'Erreur lors du changement';
        this.toastType = 'error';
      } finally {
        this.savingPw = false;
      }
    },
    async save() {
      this.saving = true;
      try {
        await api.put('/admin/profile', this.form);
        this.toast = 'Profil sauvegardé !';
        this.toastType = 'success';
      } catch {
        this.toast = 'Erreur lors de la sauvegarde';
        this.toastType = 'error';
      } finally {
        this.saving = false;
      }
    },
  },
});
</script>
