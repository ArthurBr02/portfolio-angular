<template>
  <section class="section" id="contact" style="background: var(--color-bg-secondary)">
    <div class="container">
      <span class="eyebrow">{{ $t('contact.eyebrow') }}</span>
      <h2 class="h-section">{{ $t('contact.title') }}</h2>
      <div class="contact-grid">
        <div class="contact-channels">
          <a v-if="profile?.email" :href="`mailto:${profile.email}`" class="contact-channel">
            <div class="contact-channel-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 4h14v10H2V4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M2 4l7 6 7-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div>
              <div class="contact-channel-label">{{ $t('contact.channel_email') }}</div>
              <div class="contact-channel-val">{{ profile.email }}</div>
            </div>
          </a>
          <a v-if="profile?.location" href="#" class="contact-channel">
            <div class="contact-channel-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1C6.24 1 4 3.24 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="9" cy="6" r="2" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
            <div>
              <div class="contact-channel-label">{{ $t('contact.channel_location') }}</div>
              <div class="contact-channel-val">{{ profile.location }}</div>
            </div>
          </a>
        </div>

        <form class="contact-form" @submit.prevent="submit">
          <div class="form-row">
            <div>
              <label class="field-label">{{ $t('contact.label_name') }}</label>
              <input v-model="form.name" type="text" required />
            </div>
            <div>
              <label class="field-label">{{ $t('contact.label_email') }}</label>
              <input v-model="form.email" type="email" required />
            </div>
          </div>
          <div>
            <label class="field-label">{{ $t('contact.label_subject') }}</label>
            <input v-model="form.subject" type="text" required />
          </div>
          <div>
            <label class="field-label">{{ $t('contact.label_message') }}</label>
            <textarea v-model="form.message" rows="5" required style="resize: vertical" />
          </div>
          <button type="submit" class="btn btn-primary" :disabled="sending">
            {{ sending ? '…' : $t('contact.send') }}
          </button>
          <div v-if="feedback" :style="{ color: feedbackOk ? 'var(--color-success)' : 'var(--color-error)' }">
            {{ feedback }}
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Profile } from '../../lib/types';
import { api } from '../../lib/api';

export default defineComponent({
  name: 'ContactSection',
  props: {
    profile: { type: Object as () => Profile | null, default: null },
  },
  data() {
    return {
      form: { name: '', email: '', subject: '', message: '' },
      sending: false,
      feedback: '',
      feedbackOk: false,
    };
  },
  methods: {
    async submit() {
      this.sending = true;
      try {
        await api.post('/contact', this.form);
        this.feedback = this.$t('contact.success');
        this.feedbackOk = true;
        this.form = { name: '', email: '', subject: '', message: '' };
      } catch (err: unknown) {
        const status = (err as { status?: number }).status;
        this.feedback = status === 429
          ? this.$t('contact.rate_limit')
          : this.$t('contact.error');
        this.feedbackOk = false;
      } finally {
        this.sending = false;
      }
    },
  },
});
</script>
