import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessagesStore = defineStore('messages', () => {
  const unreadCount = ref(0)

  async function fetchUnreadCount(token: string) {
    if (!token) return
    try {
      const res = await fetch('/api/admin/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        unreadCount.value = data.filter((m: any) => !m.is_read).length
      }
    } catch (e) {
      console.error('Failed to fetch messages', e)
    }
  }

  return { unreadCount, fetchUnreadCount }
})
