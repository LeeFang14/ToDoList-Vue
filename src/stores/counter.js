import { defineStore } from 'pinia'
import { API } from '@/api/axiosAPI.js'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('task', {
  // 定義狀態初始值
  state: () => ({
    done: false,
    title: '',
    important: false,
    date: '',
    time: '',
    fileName: '',
    fileUploaded: '',
    message: ''
  }),
  //對狀態加工的 getters，如同 computed
  getters: {
    inprogressTasks: (state) => state.tasks.filter((task) => task.done),
    completedTasks: (state) => state.tasks.filter((task) => !task.done)
  },
  //定義使用到的函式，可以為同步和非同步，如同 method
  actions: {
    async fetchTasks() {
      try {
        const response = await API.get('/task')
        return response
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }
})
