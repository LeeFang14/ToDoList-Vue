<script setup>
import { ref, defineProps, defineEmits } from 'vue'
// import { useCounterStore } from '@/stores/counter.js'

// const counterStore = useCounterStore()
// console.log('counterStore', counterStore)

const props = defineProps({
  id: String,
  done: {
    type: Boolean,
    default: false
  },
  title: String,
  important: {
    type: Boolean,
    default: false
  },
  date: String,
  time: String,
  fileName: String,
  fileUploadDate: String,
  message: String
})

const fileNameDefault = ref(props.fileName)
const fileUploadedDefault = ref(props.fileUploadDate)
defineEmits([
  'update:id',
  'update:done',
  'update:important',
  'update:title',
  'update:date',
  'update:time',
  'update:message'
])

const showFile = ref(false)

const isEditing = ref(false)
const toggleEdit = () => {
  isEditing.value = !isEditing.value
}
const cancelEditing = () => {
  isEditing.value = !isEditing.value
}

const handleFileChange = (event) => {
  const fileInput = event.target

  if (fileInput.files.length) {
    showFile.value = true
    fileNameDefault.value = fileInput.files[0].name
    fileUploadedDefault.value = getCurrentDate()
    emits('file-selected', fileNameDefault, fileUploadedDefault) // 傳給父層有修改
  } else {
    showFile.value = false
  }
}

function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<template>
  <form
    class="task_container"
    :class="{ finished: props.done, important: props.important, editing: isEditing }"
    :draggable="!props.done"
  >
    <div class="task_title">
      <input
        type="checkbox"
        name="done"
        :checked="props.done"
        @input="$emit('update:done', $event.target.value)"
      />
      <div class="task_title_dashboard">
        <div>
          <input
            type="text"
            name="title"
            :value="props.title"
            :disabled="!isEditing"
            @input="$emit('update:title', $event.target.value)"
            required
          />
          <input
            type="checkbox"
            name="important"
            :checked="props.important"
            @input="$emit('update:important', $event.target.value)"
          />
          <button class="edit" @click.prevent="toggleEdit">
            <i class="fa-light fa-pen"></i>
          </button>
        </div>
        <div class="task_title_status">
          <span> <i class="fa-solid fa-calendar-days"></i>{{ props.date }} </span>
          <i class="fa-light fa-file" v-if="props.fileName"></i>
          <i class="fa-regular fa-comment-dots" v-if="props.message"></i>
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
              :value="props.date"
              @input="$emit('update:date', $event.target.value)"
              required
            />
            <input
              class="time"
              type="time"
              name="time"
              :value="props.time"
              @input="$emit('update:time', $event.target.value)"
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
            <template v-if="showFile">
              <div class="file_detail">
                <span class="file_name">{{ fileNameDefault }}</span>
                <span class="file_time">uploaded {{ fileUploadedDefault }}</span>
              </div>
            </template>
            <label for="file-upload" class="add_file">
              <i class="fa-light fa-plus"></i>
              <input id="file-upload" type="file" name="file" @change="handleFileChange" />
            </label>
          </div>
        </div>
      </div>
      <div>
        <i class="fa-regular fa-comment-dots"></i>
        <div class="task_content_subtitle">
          <p>Comment</p>
          <textarea
            name="message"
            rows="5"
            :value="props.message"
            @input="$emit('update:message', $event.target.value)"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="task_control">
      <button type="reset" @click="cancelEditing">
        <i class="fa-light fa-xmark"></i>
        <span>Cancel</span>
      </button>
      <button type="submit">
        <i class="fa-light fa-plus"></i>
        <span>Save</span>
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import '@/assets/scss/components/_task.scss';

// base task
.task_container.editing {
  box-shadow: 0 4px 4px 0 $gray-300;
  .task_content {
    display: block;
    border-top: 3px solid $gray-300;
  }
  .task_control {
    display: flex;
  }
  .task_title_status {
    display: none;
  }
}
.task_container.important {
  order: 0;
  .task_title,
  .task_title input[name='title'] {
    background-color: $important-bg;
  }
}
.task_container.finished {
  order: 2;
  .task_title {
    input[name='title'] {
      text-decoration: line-through;
      color: #9b9b9b;
      &::placeholder {
        color: #9b9b9b;
      }
    }
  }
  .task_title_status {
    display: none;
  }
}

.task_container.dragging {
  position: relative;
  .task_title::before {
    content: '.  .  .';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    writing-mode: vertical-rl;
    font-size: 30px;
    color: #d8d8d8;
  }
}
</style>
