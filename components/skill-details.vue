<template>
  <div class="skills-container">
    <div v-for="skill in skills" :key="skill.name" class="skill-group">
      <div class="header">{{ skill.name }}</div>

      <ul class="subset skills">
        <li
          v-for="item in skill.subset"
          :key="item.name"
          :style="{ opacity: item.value / 10 }"
          class="item"
        >
          <component
            :is="
              'icn-' +
              (item.icon ||
                item.name.replace('.', '').replace(/\s/g, '-').toLowerCase())
            "
          />

          <div class="name">{{ item.name }}</div>
          <div class="progress-track">
            <div
              class="bar"
              :style="{
                width: (item.value / 10) * 100 + '%',
                background: item.color || '',
              }"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      skills: require('../content/skills.json').skills,
    }
  },
})
</script>

<style lang="scss">
.skills-container {
  .skill-group {
    .header {
      font-size: 1.2rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--bg-lighter);
    }
    .subset {
      padding: 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, 100px);
      gap: 1rem;

      .item {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid var(--bg-lighter);
        padding: 0.5rem;
        border-radius: 4px;

        svg {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;

          *:not([class*='dontfill']) {
            fill: white;
          }
        }
        .name {
          font-size: 0.7rem;
        }
      }
    }
  }
}
</style>
