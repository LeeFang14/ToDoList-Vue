<script setup>
import addTaskButton from '@/components/addTaskButton.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="container nav_container">
      <RouterLink to="/">My tasks</RouterLink>
      <RouterLink to="/inprogress">In Progress</RouterLink>
      <RouterLink to="/completed">Completed</RouterLink>
    </nav>
  </header>
  <main class="container main_container">
    <div class="task_adding_container">
      <addTaskButton></addTaskButton>
    </div>
    <RouterView v-slot="{ Component }">
      <suspense>
        <template #default>
          <div class="task_list_container">
            <component :is="Component"></component>
          </div>
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </suspense>
    </RouterView>
  </main>
</template>

<style scoped lang="scss">
header {
  background: $light-blue;
}
.container {
  max-width: 660px;
}

.main_container {
  padding: 24px 20px 64px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.nav_container {
  display: flex;
  a {
    position: relative;
    padding: 24px 0;
    flex: 1 1 auto;
    display: block;
    text-align: center;

    @include Paragraph;
    color: $blue;
    @include breakpoint($sm) {
      @include Title;
    }
    &:hover {
      color: $white;
    }
  }
  .router-link-active {
    color: $white;
    &::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% * 160 / 220);
      height: 5px;
      content: '';
      background: $blue;
    }
  }
}

.task_list_container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
