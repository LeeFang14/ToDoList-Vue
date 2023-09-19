<script setup></script>

<template>
  <form class="task_container">
    <div class="task_title">
      <input type="checkbox" name="isDone" />
      <div class="task_title_dashboard">
        <div>
          <input type="text" name="title" placeholder="Typing something Here..." required />
          <input type="checkbox" name="isImportant" />
          <button class="edit">
            <i class="fa-light fa-pen" type="button"></i>
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
            <input class="date" type="date" name="date" placeholder="yyyy/mm/dd" required />
            <input class="time" type="time" name="time" placeholder="hh:mm" required />
          </div>
        </div>
      </div>
      <div>
        <i class="fa-light fa-file"></i>
        <div class="task_content_subtitle">
          <p>File</p>
          <div class="file_container">
            <label for="file-upload" class="add_file">
              <i class="fa-light fa-plus"></i>
              <input id="file-upload" type="file" name="file" />
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
// base task
.task_container {
  background: $gray-200;
  border-radius: 5px;
  order: 1;
}
.task_title {
  display: flex;
  align-items: first baseline;
  padding: 24px 32px;
  gap: 16px;

  input[name="isDone"] {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    appearance: none;
    background: $white;
    border-radius: 2px;
    cursor: pointer;
  }

  input[name="isDone"]:checked {
    background: url("@/assets/image/check-solid.svg") $light-blue;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
  }

  input[type="text"] {
    flex-grow: 1;
    width: 100%;
    @include Paragraph;
    font-weight: 500;
    @include breakpoint($sm) {
      @include Title;
    }
    background: $gray-200;
    &::placeholder {
      color: black;
    }
  }
  input[type="text"]:disabled {
    color: $black;
  }
  button {
    padding: 0;
    background: none;
    height: 24px;
  }

  input[name="isImportant"] {
    flex-shrink: 0;
    width: 27px;
    height: 24px;
    appearance: none;
    background: url("@/assets/image/star-regular.svg");
    cursor: pointer;
  }
  input[name="isImportant"]:hover,
  input[name="isImportant"]:checked {
    background: url("@/assets/image/star-solid.svg");
  }

  .edit:hover {
    i {
      font-weight: 600;
      color: $light-blue;
    }
  }

  &_dashboard {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 16px;
    > div:nth-child(1) {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 16px;
      @include breakpoint($sm) {
        gap: 32px;
      }
      i {
        line-height: 24px;
        font-size: 24px;
      }
    }
    .task_title_status {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 16px;
      color: $gray-400;
    }
    .fa-calendar-days {
      margin: 0 8px 0 0;
    }
  }
}
.task_content {
  display: none;
  padding: 25.6px 39px 24px 36px;
  @include breakpoint($sm) {
    padding: 25.6px 78px 24px 72px;
  }
  > div {
    display: flex;
    align-items: baseline;
    gap: 8px;
    & + div {
      margin-top: 27px;
    }
  }
  p {
    @include Subtitle;
    margin-bottom: 8px;
  }
  &_subtitle {
    flex-grow: 1;
    textarea {
      width: 100%;
      padding: 8px 16px;
    }
  }
  .file_container {
    display: flex;
    align-items: center;
    gap: 24px;
    span {
      display: block;
    }
    .file_time {
      @include Remark;
    }
    .add_file {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      width: 32px;
      background: $gray-300;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background: $light-blue;
      }
      i {
        font-weight: bolder;
        color: $white;
      }
      input {
        display: none;
      }
    }
  }
  .date_container {
    input[name="date"],
    input[name="time"] {
      width: 162px;
      padding: 8px 16px;
    }
  }
}
.task_control {
  display: none;
  button {
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 50%;
    gap: 16px;
    @include Title;
    font-weight: $Regular;
    &:nth-child(1) {
      background: $white;
      color: $red;
      border-bottom-left-radius: 5px;
      &:hover {
        background: #fdfdfd;
      }
    }
    &:nth-child(2) {
      background: $light-blue;
      color: $white;
      border-bottom-right-radius: 5px;
      &:hover {
        background: #3982d7;
      }
    }
  }
}
</style>
