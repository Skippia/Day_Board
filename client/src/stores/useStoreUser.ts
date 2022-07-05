import { defineStore } from 'pinia'
import type { TTask } from '~/types/IDeskData'

export const useStoreUser = defineStore('user', {
  state: () => ({
    tasks: [
      'Wake up at 08:00 am',
      'Write down Dreams',
      'HP & LS',
      '1-st pomidor',
      '1-st Biceps Training',
      '2-st pomidor',
      '2-st Biceps Training',
      'English Grammar',
      'First Eating',
      '3-st pomidor',
      '3-st Biceps Training',
      '4-st pomidor',
      '4-st Biceps Training',
      '5-st pomidor',
      '5-st Biceps Training',
      'Second Eating',
      'English Reading',
      'Blind Typing',
      'English Walk',
      'SProgramming',
    ] as string[],
    times: [
      '08:00 - 09:00',
      '09:00 - 10:00',
      '10:00 - 11:00',
      '11:00 - 13:00',
      '13:00 - 14:00',
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
      '17:00 - 18:00',
      '18:00 - 19:00',
      '19:00 - 20:00',
      '20:00 - 21:00',
      '21:00 - 22:00',
      '22:00 - 22:30',
      '22:30 - 00:00',
    ] as string[],
    dayData: {} as TTask[],
  }),
  getters: {
    getTimes: state => state.times,
    getTasks: state => state.tasks,
    getDayData: state => state.dayData,
  },
  actions: {
    updateCurrentDay(items: Array<TTask>) {
      localStorage.setItem('items', JSON.stringify(items))
    },
    restoreCurrentDay(items: Array<TTask>) {
      items.forEach((el: TTask) => {
        const td = document.querySelector(`[data-time="${el.timeTask}"][data-task="${el.taskContent}"]`) as HTMLElement
        setTimeout(() => {
          td.style.backgroundColor = 'rgb(34,197,94)'
        }, 0)
      })
    },
    loadDataAboutCurrentDay() {
      if (localStorage.getItem('items')) {
        this.$state.dayData = JSON.parse(localStorage.getItem('items') as string)
        return true
      }
      return false
    },
    clearLocalStorage() {
      location.reload()
      localStorage.clear()
    },
  },
})
