<template>
  <div class="skills-container">
    <div v-for="skill in skills" :key="skill.name" class="skill-group v2">
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
  margin-top: 1.25rem;

  .skill-group.v2 {
    position: relative;
    background: unset !important;
    border: 1px solid var(--bg-lighter);
    padding: 0.25rem !important;

    .header {
      font-size: 0.6rem;
      font-weight: bold;
      padding: 0rem !important;
      position: absolute;
      left: 8px;
      top: -8px;
      text-shadow: 2px 2px 5px white;
      background-color: white;
      writing-mode: horizontal-tb;
      z-index: 10;
    }
    .subset {
      display: grid;
      grid-template-columns: repeat(auto-fit, 100px);
      gap: 4px !important;
      margin-top: 4px;
      padding: 0rem !important;

      .item {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0.2rem !important;
        border-radius: 0px;
        border: 1px solid var(--bg-lighter);

        .progress-track {
          height: 2px !important;
        }

        svg {
          width: 20px !important;
          height: 20px !important;
          margin-bottom: 4px !important;

          *:not([class*='dontfill']) {
            fill: white;
          }
        }
        .name {
          font-size: 8px !important;
        }
      }
    }
  }
}
</style>
