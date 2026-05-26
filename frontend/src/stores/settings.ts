import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Record<string, string>>({})
  const currentTheme = ref('sable')

  function isSectionEnabled(section: string): boolean {
    return settings.value[`section_${section}_enabled`] === 'true'
  }

  function applyTheme(theme: string) {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
  }

  async function fetchSettings() {
    try {
      const res = await fetch('/api/settings')
      if (res.ok) {
        const json = await res.json()
        if (json.success) {
          settings.value = json.data
          if (json.data.active_theme) {
            applyTheme(json.data.active_theme)
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch settings', e)
    }
  }

  async function setTheme(theme: string, token?: string) {
    applyTheme(theme)
    if (!token) return
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ active_theme: theme })
      })
    } catch (e) {
      console.error('Failed to save theme', e)
    }
  }

  return { settings, currentTheme, isSectionEnabled, applyTheme, fetchSettings, setTheme }
})
