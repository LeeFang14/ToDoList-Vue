<script setup>
import { API } from '@/api/axiosAPI.js'
import task from '@/components/task.vue'
import { computed } from 'vue'

async function fetchTasks() {
  try {
    const response = await API.get('/task')
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}
const response = fetchTasks().then((value) => value)
const taskList = await response
const apiObj = taskList.data.records
const tasks = apiObj.map((task) => {
  return task
})

const filteredTasks = computed(() => {
  return tasks.filter((task) => !task.fields.done)
})
</script>

<template>
  <task
    v-for="task in filteredTasks"
    :key="task.id"
    v-model:done="task.fields.done"
    v-model:important="task.fields.important"
    v-model:title="task.fields.title"
    v-model:date="task.fields.date"
    v-model:message="task.fields.message"
  />
  <div class="task_counter">
    <p class="task_left">{{ filteredTasks.length }} task left</p>
  </div>
</template>

<style scoped lang="scss">
.task_counter {
  @include Status;
  order: 999;
}
</style>
