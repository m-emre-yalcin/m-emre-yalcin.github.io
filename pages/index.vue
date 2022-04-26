<template>
  <div>
    <div class="update-text">
      Updated at
      {{
        new Date(page.updatedAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      }}
      <br />
      Created by {{ page.author }}
    </div>
    <div v-show="false" class="sparks">
      <span>
        <div></div>
        <div></div>
        <div></div>
      </span>
    </div>

    <div id="welcome" class="overlay beginning">
      <div class="contact-container card">
        <div class="circle-card">
          <img
            src="~assets/images/mehmet-emre-yalcin.jpg"
            title="M. Emre Yalcin"
            alt="M. Emre Yalcin"
          />
        </div>
        <div class="navs">
          <nav
            v-for="item in page.contact"
            :key="item.name"
            :title="item.name || item.label"
            :class="{ fullspan: 'label' in item }"
          >
            <template v-if="'label' in item">
              <component :is="item.name + 'Icon'" v-if="item.name" />

              <h1 v-if="item.htmltag === 'h1'">{{ item.label }}</h1>
              <h2 v-else-if="item.htmltag === 'h2'">{{ item.label }}</h2>
              <span v-else>{{ item.label }}</span>
            </template>

            <template v-else>
              <a :href="item.link" target="_blank">
                <component :is="item.name + 'Icon'" />
              </a>
            </template>
          </nav>
        </div>
      </div>
    </div>

    <div
      class="overlay content spaces"
      :class="{
        sticky: $store.state.scrollY > windowheight + 16,
        active: $store.state.scrollY > windowheight - 100,
      }"
    >
      <div class="container">
        <aside class="card custom-scroll">
          <div class="head">
            <div class="circle-card">
              <img
                src="~assets/images/mehmet-emre-yalcin.jpg"
                title="M. Emre Yalcin"
                alt="M. Emre Yalcin"
              />
            </div>
            <div class="namespace">
              <h1>{{ page.author }}</h1>
              <h2>{{ page.job }}</h2>
            </div>
          </div>

          <div class="body">
            <ul class="list">
              <li
                v-for="toc in asideList"
                :key="toc.id"
                :class="{ col: 'list' in toc }"
                :title="toc.text"
              >
                <nuxt-link :to="getTocPath(toc)">
                  {{ toc.text }}
                </nuxt-link>

                <ul v-if="'list' in toc">
                  <li v-for="toc in toc.list" :key="toc.id" :title="toc.text">
                    <span>{{ toc.text }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>

        <main>
          <div
            v-for="doc in contentGroups"
            :key="doc.body.children[0].props.id"
            :name="doc.body.children[0].props.id"
            class="content card custom-scroll"
          >
            <nuxt-content :document="doc" />
          </div>
        </main>

        <aside class="card skills custom-scroll" style="padding: 1rem">
          <h2>My Skills</h2>
          <ul>
            <li
              v-for="skill in page.skills"
              :key="skill.name"
              :title="`My ${skill.name} skill is ${skill.value} out of 10`"
              :style="{ opacity: skill.value / 10 }"
            >
              <div class="name">{{ skill.name }}</div>
              <div class="progress-track">
                <div
                  class="bar"
                  :style="{
                    width:
                      $store.state.scrollY >= windowheight - 20
                        ? (skill.value / 10) * 100 + '%'
                        : '0%',
                    background: skill.color || '',
                  }"
                />
              </div>
              <div class="description">{{ skill.description }}</div>
            </li>
          </ul>

          <small style="font-size: 0.6em">
            * The values are correlated with my professional experience and the
            rate of my successful problem solving on the subject
          </small>
        </aside>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// Add below code sample to your component
declare module 'vue/types/vue' {
  interface Vue {
    page: any
  }
}

export default Vue.extend({
  components: {
    githubIcon: require('../assets/icons/github.svg?inline'),
    linkedinIcon: require('../assets/icons/linkedin.svg?inline'),
    stackoverflowIcon: require('../assets/icons/stackoverflow.svg?inline'),
    mailIcon: require('../assets/icons/mail.svg?inline'),
    locationIcon: require('../assets/icons/map-pin.svg?inline'),
  },
  async asyncData({ $content }) {
    const page = await $content('portfolio').fetch()

    return { page }
  },
  data() {
    return {
      windowheight: window.innerHeight,
    }
  },
  computed: {
    asideList() {
      const list = []
      if (this.page) {
        let i = 0
        for (const toc of this.page.toc) {
          if (toc.depth === 2) {
            list.push(toc)

            if (this.page.toc[i + 1] && this.page.toc[i + 1].depth === 3) {
              if (!toc.list) toc.list = []

              for (let b = i + 1; b <= this.page.toc.length; b++) {
                if (this.page.toc[b] && this.page.toc[b].depth === 3) {
                  toc.list.push(this.page.toc[b])
                } else {
                  break
                }
              }
            }
          }

          i++
        }
      }
      return list.filter((toc) => toc.depth === 2)
    },
    contentGroups() {
      const groups = []

      if (this.page) {
        let i = 0
        for (const child of this.page.body.children) {
          if (child.tag === 'h2') {
            groups.push({
              body: {
                children: [child],
                type: 'root',
              },
            })

            for (let b = i + 1; b <= this.page.body.children.length; b++) {
              const child = this.page.body.children[b]
              if (!child || child.tag === 'h2') break

              groups[groups.length - 1].body.children.push(child)
            }
          }

          i++
        }
      }

      return groups
    },
  },
  mounted() {
    // scrolling timeout
    setTimeout(() => {
      document.addEventListener('scroll', () => {
        const scrollPaddingTop = 16

        document.querySelectorAll('#welcome, h2[id]').forEach((el) => {
          if (el.id && this.$route.hash.slice(1) !== el.id) {
            const contentContainer = document.querySelector<any>(
              `[name='${el.id}']`
            )

            // h2
            if (
              contentContainer &&
              contentContainer.getBoundingClientRect().top === scrollPaddingTop
            ) {
              // update hash
              this.$router.push({ hash: el.id })
            }

            // #welcome
            else if (el.getBoundingClientRect().top === 0) {
              // update hash
              this.$router.push({ hash: el.id })
            }
          }
        })
      })
    }, 1000)
  },
  methods: {
    getTocPath(toc: any) {
      if (toc.depth === 2) {
        if (this.$route.hash === `#${toc.id}`) {
          return { hash: '' }
        }
      }

      return { hash: toc.id }
    },
  },
})
</script>

<style lang="scss">
.spaces {
  margin: 0% 10%;
  transition: margin 0.25s ease;

  @media screen and (max-width: 1500px) {
    margin: 0% 5%;
  }
  @media screen and (max-width: 1200px) {
    margin: 0% 0%;
  }
}

.overlay {
  z-index: 1;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  .namespace,
  .navs {
    h1 {
      font-size: 1.5em;
    }
    h2 {
      font-size: 1em;
      font-weight: 300;
    }
  }
}

.overlay {
  position: relative;
  width: inherit;
  height: 100vh;
  top: 0;
  left: 0;

  .card {
    color: var(--secondary-lighter);
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(20px);
    transition: backdrop-filter 0.5s ease;
    border: 1px solid var(--bg);
  }
}

.overlay.beginning {
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .contact-container {
    padding: 2rem;

    .circle-card {
      position: relative;
      width: 220px;
      height: 220px;
      margin: 0 auto;
      border-radius: 50%;
      box-shadow: var(--shadow-lg);
      margin-bottom: 0.5rem;

      img {
        border-radius: 50%;
        width: 100%;
      }
    }

    .navs {
      display: grid;
      grid-template-columns: repeat(auto-fit, 50px);
      justify-content: space-between;
      column-gap: 1.5rem;

      nav {
        display: flex;
        align-items: center;
        justify-content: center;

        &.fullspan {
          grid-column: span 4;
          font-size: 1rem;
          justify-content: center;

          &:nth-child(3) {
            margin-top: 0.5rem;
            margin-bottom: 3rem;

            svg {
              width: 20px;
            }
          }
        }

        a,
        span {
          color: var(--secondary);
          font-weight: 200;
          margin-left: 0.25rem;
        }

        a {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;

          &::before,
          svg {
            transition: transform 0.15s ease-out;
          }

          &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            background-color: var(--bg);
            transform: scale(0);
            z-index: -1;
          }

          &:hover::before {
            transform: scale(0.8);
          }

          &:active {
            svg {
              transform: scale(1.1);
            }

            &::before {
              transform: scale(1);
            }
          }
        }

        svg {
          stroke: var(--secondary-light);
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}

.overlay.content {
  height: auto;

  &,
  &.active {
    .container {
      display: grid;
      grid-template-columns: var(--aside-with) 1fr var(--aside-with);
      gap: 1rem;
      padding: 1rem;
      transform: scale(1);
      opacity: 1;
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

      main {
        .content {
          scroll-snap-align: start;
          margin-bottom: 2rem;
          height: calc(100vh - 4rem);
          overflow: overlay;

          .nuxt-content {
            h2 {
              border-bottom: 1px solid var(--bg);
              padding-bottom: 0.5rem;
              margin-bottom: 1rem;
            }
            h3 {
              ~ h3 {
                margin-top: 3rem;
              }
            }
            h3 + ul,
            h4 + ul {
              margin-top: 0.15rem;
              font-size: 0.8rem;
              display: flex;
              justify-content: space-between;
              li {
                flex: 1;
                opacity: 0.7;
                &:nth-child(1) {
                  text-align: left;
                }
                &:nth-child(2) {
                  text-align: right;
                }
              }
            }
            h2#tech-stack ~ ul {
              justify-content: unset;
              flex-direction: column;
              li {
                text-align: left;
              }
            }

            p,
            ol {
              font-size: 0.8rem;
              line-height: 1.2rem;
            }
            p {
              a {
                font-weight: 900;
                color: rgb(77, 85, 240);
              }
            }
            ol {
              li {
                padding: 1rem;
                border-radius: 8px;
                &::marker {
                  margin-left: 2rem;
                }
                &:hover {
                  background-color: var(--bg-lighter);
                }
              }
            }
            table {
              border-spacing: 0;
              border: 1px solid var(--bg);
              font-size: 1rem;
              margin: 1rem 0;
              border-radius: 4px;

              td,
              th {
                text-align: left;
                &:nth-child(n + 2) {
                  border-left: 1px solid var(--bg);
                }
              }
              th {
                padding: 0.5rem;
                text-transform: capitalize;
                font-weight: 900;
              }
              td {
                padding: 0.35rem 0.5rem;
                border-top: 1px solid var(--bg);
                color: var(--secondary-darker);
              }
            }
          }
        }
      }

      aside {
        top: 1rem;
        position: sticky;
        height: max-content;
        padding: 2rem 0;
        min-height: 300px;

        .head {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid var(--bg);
          padding-bottom: 1rem;

          .circle-card {
            position: relative;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            transition: width 0.2s ease, height 0.2s ease;
            transition-delay: 1s;

            img {
              border-radius: 50%;
              width: 100%;
              box-shadow: var(--shadow);
            }
          }

          .namespace {
            max-width: calc(var(--aside-with) - 104px);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: center;
            transition-delay: 1s;
            margin-top: 0.5rem;
            padding-left: 0.5rem;
            white-space: nowrap;
            @media screen and (max-width: 1500px) {
              font-size: 1rem;
            }
          }
        }

        .body {
          padding: 1.2rem;

          ul.list {
            padding-left: 2.25rem;

            > li {
              margin-bottom: 0.5rem;
              > ul {
                display: grid;
                line-height: -0rem;
                height: 0;
                opacity: 0;
                pointer-events: none;
                transition: line-height 0.5s ease;
                position: relative;
                > li {
                  margin-bottom: 0.25rem;
                  white-space: nowrap;
                  overflow-x: auto;
                  &::-webkit-scrollbar-track {
                    width: 0;
                    height: 0;
                  }
                  &::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                  }
                }
              }
            }

            > li > .nuxt-link-active + ul {
              line-height: 1rem;
              opacity: 1;
              height: max-content;
              pointer-events: visible;
            }
          }

          ul,
          ul.list {
            display: flex;
            flex-direction: column;
            color: var(--secondary-dark);

            a {
              border-left: 2px solid transparent;
              padding: 0.25rem 0.25rem 0.25rem 1rem;
              text-align: left;
            }

            a.nuxt-link-active {
              font-weight: 900;
              color: var(--secondary-lighter);
              border-left: 2px solid var(--secondary);
            }

            li {
              display: flex;
              justify-content: center;
            }

            li.col {
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              padding: 0;

              ul {
                font-size: 0.8rem;
                margin-top: 0.25rem;
                padding-left: 1.25rem;
              }
            }
            li.row,
            li:not(.col) {
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
            }
          }
        }
      }

      aside.skills {
        overflow-y: overlay;
        max-height: calc(100vh - 4rem);

        ul {
          li {
            margin: 1rem 0;
            border-bottom: 1px solid var(--bg);
            padding-bottom: 1rem;
            transition: opacity 0.25s;

            &:hover {
              opacity: 1 !important;
            }

            .name {
              font-weight: 300;
            }

            .description {
              font-weight: 200;
              font-size: 0.8em;
            }

            .progress-track {
              width: 100%;
              height: 10px;
              margin: 2px 0;

              .bar {
                background-color: var(--secondary-lighter);
                height: 100%;
                border-radius: 2px;
                transition: width 1s ease-out;
              }
            }
          }
        }
      }
    }
  }

  &:not(.active) {
    filter: blur(5px);

    .container {
      transform: scale(1);
      opacity: 0;
    }
  }

  &.active.sticky {
    .container {
      .head {
        .circle-card {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.sparks {
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;

  span {
    transform: translate(-200px, -200px);
  }
  div {
    position: absolute;
    filter: blur(140px);
  }
  div:nth-child(1) {
    width: 340px;
    height: 340px;
    border-radius: 40% 80% 44% 80%;
    background-color: red;
    animation: red-spark 16s infinite;
    z-index: 0;
  }
  div:nth-child(2) {
    width: 310px;
    height: 340px;
    border-radius: 80% 64% 80% 48%;
    background-color: blue;
    animation: blue-spark 8s infinite;
    z-index: 1;
  }
  div:nth-child(3) {
    width: 310px;
    height: 320px;
    border-radius: 40% 80% 26% 85%;
    background-color: green;
    animation: green-spark 14s infinite;
    z-index: 0;
  }
}

@keyframes red-spark {
  0% {
    transform: rotate(0deg) translate(0px, 0px);
  }
  50% {
    transform: rotate(180deg) translate(-200px, -50px);
  }
  75% {
    transform: rotate(270deg) translate(100px, -80px);
  }
  100% {
    transform: rotate(360deg) translate(0px, 0px);
  }
}
@keyframes blue-spark {
  0% {
    transform: rotate(0deg) translate(0px, 0px);
  }
  50% {
    transform: rotate(180deg) translate(-80px, -80px);
  }
  100% {
    transform: rotate(360deg) translate(0px, 0px);
  }
}
@keyframes green-spark {
  0% {
    transform: rotate(0deg) translate(0px, 0px);
  }
  50% {
    transform: rotate(180deg) translate(100px, 20px);
  }
  100% {
    transform: rotate(360deg) translate(0px, 0px);
  }
}

.update-text {
  position: fixed;
  left: 4px;
  top: 4px;
  font-size: 0.6em;
  color: var(--secondary-dark);
  font-weight: 200;
}
</style>
