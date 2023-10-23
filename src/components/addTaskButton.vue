<script setup>
import { reactive, ref } from 'vue'
import { API } from '@/api/axiosAPI.js'

const formData = reactive({
  done: false,
  title: '',
  important: false,
  date: '',
  time: '',
  fileName: '',
  fileUploaded: '',
  message: ''
})

const showFile = ref(false)
function getFile(e) {
  const selectedFile = e.target
  if (selectedFile.files.length) {
    showFile.value = true
    formData.fileName = selectedFile.files[0].name
    formData.fileUploaded = getCurrentDate()
  }
}

function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

function resetFormData() {
  for (const key in formData) {
    formData[key] = null
  }
}

const isAdding = ref(false)
function toggleAdd() {
  isAdding.value = !isAdding.value
}

function resetData() {
  isAdding.value = false
  resetFormData()
}

function createData() {
  const records = [
    {
      fields: {
        title: formData.title,
        done: formData.done,
        important: formData.important,
        date: formData.date,
        time: formData.time,
        fileName: formData.fileName,
        fileUploadDate: formData.fileUploaded,
        message: formData.message
      }
    }
  ]

  const data = {
    records: records
  }

  API.post('/task', data)
}
</script>

<template>
  <button class="task_adding_icon" @click="toggleAdd" v-if="!isAdding">
    <i class="fa-light fa-plus"></i>
    <span>Add Task</span>
  </button>

  <form
    class="task_container adding"
    @submit.prevent="createData"
    @reset="resetData"
    v-if="isAdding"
  >
    <div class="task_title">
      <input type="checkbox" name="done" v-model="formData.done" />
      <div class="task_title_dashboard">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Typing something Here..."
            v-model="formData.title"
            required
          />
          <input type="checkbox" name="important" v-model="formData.important" />
          <button class="edit" type="button" disabled>
            <i class="fa-light fa-pen"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="task_content">
      <div>
        <i class="fa-solid fa-calendar-days"></i>
        <div class="task_content_subtitle">
          <p>Deadline</p>
          <div class="date_container">
            <input
              class="date"
              type="date"
              name="date"
              placeholder="yyyy/mm/dd"
              v-model="formData.date"
              required
            />
            <input
              class="time"
              type="time"
              name="time"
              placeholder="hh:mm"
              v-model="formData.time"
              required
            />
          </div>
        </div>
      </div>
      <div>
        <i class="fa-light fa-file"></i>
        <div class="task_content_subtitle">
          <p>File</p>
          <div class="file_container">
            <div class="file_detail" v-if="showFile">
              <span class="file_name">{{ formData.fileName }}</span>
              <span class="file_time">uploaded {{ formData.fileUploaded }}</span>
            </div>
            <label for="file-upload" class="add_file">
              <i class="fa-light fa-plus"></i>
              <input type="file" id="file-upload" @change="getFile" />
            </label>
          </div>
        </div>
      </div>
      <div>
        <i class="fa-regular fa-comment-dots"></i>
        <div class="task_content_subtitle">
          <p>Comment</p>
          <textarea
            class="message"
            name="message"
            rows="5"
            placeholder="Type your memo here..."
            v-model="formData.message"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="task_control">
      <button type="reset">
        <i class="fa-light fa-xmark"></i>
        <span>Cancel</span>
      </button>
      <button type="submit">
        <i class="fa-light fa-plus"></i>
        <span>Add Task</span>
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import '@/assets/scss/components/_task.scss';

.task_adding_icon {
  width: 100%;
  text-align: initial;
  padding: 18px 32px;
  border: 2px solid $gray-300;
  background: $white;
  font-size: 24px;
  color: $gray-300;
  cursor: pointer;
  .fa-light.fa-plus {
    margin-right: 5px;
  }
}

.task_container.adding {
  .edit {
    i {
      font-weight: 600;
      color: $light-blue;
    }
  }
  .task_content {
    display: block;
  }
  .task_control {
    display: flex;
  }
}
</style>
