<template>
  <section class="contact section-padding bg-alt">
    <div class="container animate-on-scroll">
      <h2 class="section-title">Contact</h2>
      
      <div class="contact-wrapper">
        <div class="contact-info">
          <h3>Discutons de votre projet</h3>
          <p>Je suis actuellement disponible pour de nouvelles opportunités. N'hésitez pas à m'envoyer un message !</p>
          
          <div class="social-links">
            <a href="#" class="social-link">GitHub</a>
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">Twitter</a>
          </div>
        </div>
        
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nom</label>
            <input type="text" id="name" v-model="form.name" required placeholder="Votre nom" />
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required placeholder="votre@email.com" />
          </div>
          
          <div class="form-group">
            <label for="subject">Sujet</label>
            <input type="text" id="subject" v-model="form.subject" required placeholder="Sujet de votre message" />
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" required rows="5" placeholder="Votre message..."></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary" :disabled="status === 'loading'">
            {{ status === 'loading' ? 'Envoi en cours...' : 'Envoyer' }}
          </button>
          
          <div v-if="status === 'success'" class="alert alert-success">Message envoyé avec succès !</div>
          <div v-if="status === 'error'" class="alert alert-error">Une erreur s'est produite.</div>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ContactSection',
  setup() {
    const form = ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    
    const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

    const submitForm = async () => {
      status.value = 'loading'
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.value)
        })
        if (res.ok) {
          status.value = 'success'
          form.value = { name: '', email: '', subject: '', message: '' }
          setTimeout(() => status.value = 'idle', 3000)
        } else {
          status.value = 'error'
        }
      } catch (e) {
        status.value = 'error'
      }
    }

    return {
      form,
      status,
      submitForm
    }
  }
})
</script>

<style scoped>
.section-padding { padding: var(--spacing-xl) var(--spacing-lg); }
.bg-alt { background-color: var(--color-bg-secondary); }
.container { max-width: 1000px; margin: 0 auto; }
.section-title { font-size: 2.5rem; margin-bottom: var(--spacing-xl); text-align: center; position: relative; }
.section-title::after {
  content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 60px; height: 4px; background-color: var(--color-accent); border-radius: var(--radius-full);
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
}

@media (min-width: 768px) {
  .contact-wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

.contact-info h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.contact-info p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
  font-size: 1.1rem;
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  color: var(--color-accent);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.social-link:hover {
  color: var(--color-accent-hover);
}

.contact-form {
  background-color: var(--color-bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
  color: var(--color-text-primary);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
}

.btn-primary {
  background-color: var(--color-accent);
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.alert {
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  text-align: center;
  font-weight: 500;
}

.alert-success {
  background-color: oklch(0.60 0.15 155 / 0.1);
  color: var(--color-success);
}

.alert-error {
  background-color: oklch(0.60 0.22 25 / 0.1);
  color: var(--color-error);
}
</style>
