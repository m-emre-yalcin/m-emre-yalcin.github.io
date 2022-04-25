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
   Created by Me
  </div>
  <div class="sparks">
   <span>
    <div></div>
    <div></div>
    <div></div>
   </span>
  </div>

  <div class="overlay beginning">
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
      v-for="item in contact"
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
   class="overlay content"
   :class="{
    sticky: $store.state.scrollY > windowheight + 10,
    active: $store.state.scrollY > windowheight - 300,
   }"
  >
   <div class="container spaces">
    <aside class="card">
     <div class="head">
      <div class="circle-card">
       <img
        src="~assets/images/mehmet-emre-yalcin.jpg"
        title="M. Emre Yalcin"
        alt="M. Emre Yalcin"
       />
      </div>
      <div class="namespace">
       <h1>M. Emre Yalçın</h1>
       <h2>Full Stack Developer</h2>
      </div>
     </div>

     <div class="body">
      <ul class="list">
       <li
        v-for="toc in asideList"
        :key="toc.id"
        :class="{ col: 'list' in toc }"
       >
        <nuxt-link :to="`#${toc.id}`">{{ toc.text }}</nuxt-link>

        <ul v-if="'list' in toc">
         <li v-for="toc in toc.list" :key="toc.id">
          <nuxt-link :to="`#${toc.id}`">{{ toc.text }}</nuxt-link>
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

    <aside class="card skills" style="padding: 1rem">
     <h2>My Skill</h2>
     <ul>
      <li
       v-for="skill in page.skills"
       :key="skill.name"
       :title="`My ${skill.name} skill is ${skill.value} out of 10`"
      >
       <div class="name">{{ skill.name }}</div>
       <div class="progress-track">
        <div
         class="bar"
         :style="{
          width: (skill.value / 10) * 100 + '%',
          background: skill.color || '',
         }"
        />
       </div>
       <div class="description">{{ skill.description }}</div>
      </li>
     </ul>

     <small style="font-size: 0.6em">
      * The values are correlated with my professional experience and the rate
      of my successful problem solving on the subject
     </small>
    </aside>
   </div>
  </div>
 </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
  const contact = [
   {
    label: 'M. Emre Yalçın',
    htmltag: 'h1',
   },
   {
    label: 'Full Stack Developer',
    htmltag: 'h2',
   },
   {
    name: 'location',
    label: 'Istanbul, Turkey',
    htmltag: 'span',
   },
   {
    name: 'github',
    link: 'https://github.com/m-emre-yalcin',
   },
   {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/m-emre-yalcin/',
   },
   {
    name: 'stackoverflow',
    link: 'https://stackoverflow.com/users/10639354/m-emre-yalçın',
   },
   {
    name: 'mail',
    link: 'mailto:emrreyalcin@gmail.com',
   },
  ]

  return { contact, page }
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
 head: {
  title: 'M. Emre Yalçın - Portfolio',
 },
})
</script>

<style lang="scss">
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
 width: 100%;
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
 }
 .spaces {
  margin: 0 10%;
 }
}

.overlay.beginning {
 scroll-snap-align: start;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;

 .contact-container {
  z-index: 1;
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
   grid-template-columns: repeat(auto-fit, 40px);
   justify-content: space-between;
   column-gap: 1.5rem;

   nav {
    display: flex;
    align-items: center;
    justify-content: center;

    &.fullspan {
     grid-column: span 4;
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
   font-size: 1.2rem;
   display: grid;
   grid-template-columns: 300px 1fr 300px;
   gap: 1rem;
   padding: 1rem;
   transform: scale(1);
   opacity: 1;
   transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

   main {
    .content {
     scroll-snap-align: start;
     margin-bottom: 2rem;
     height: calc(100vh - 2rem);
     overflow: auto;
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

     .circle-card {
      position: relative;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      transition: width 0.2s ease, height 0.2s ease;

      img {
       border-radius: 50%;
       width: 100%;
       box-shadow: var(--shadow);
      }
     }

     .namespace {
      max-width: calc(200px - 4px);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;
      border-left: 4px solid var(--secondary-lighter);
      transition: border-left 0.25s ease;
      margin-top: 0.5rem;
      padding-left: 0.5rem;
      white-space: nowrap;
     }
    }

    .body {
     padding: 1.2rem;

     ul.list {
      > li {
       margin-bottom: 0.5rem;
       > ul {
        line-height: -0rem;
        height: 0;
        opacity: 0;
        pointer-events: none;
        transition: line-height 0.5s ease;
        > li {
         margin-bottom: 0.25rem;
        }
       }
      }
     }

     ul,
     ul.list {
      display: flex;
      flex-direction: column;
      color: var(--secondary-dark);

      a.nuxt-link-exact-active {
       font-weight: 900;
       color: var(--secondary-lighter);
      }

      a,
      li {
       display: flex;
       justify-content: center;
      }

      li.col {
       flex-direction: column;
       justify-content: center;
       align-items: flex-start;
       padding: 0;
       > a {
        padding: 0.25rem 2rem;
       }

       ul {
        font-size: 0.8rem;
        padding-left: 0.5rem;
       }
      }
      li.row,
      li:not(.col) {
       flex-direction: row;
       align-items: center;
       justify-content: flex-start;
       padding: 0.25rem 2rem;
      }
     }
    }
   }

   aside.skills {
    ul {
     li {
      margin: 1rem 0;

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

       .bar {
        background-color: var(--secondary-darker);
        height: 100%;
        border-radius: 2px;
        margin: 1px 0;
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
   transform: scale(1.1);
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
    .namespace {
     border-left: 4px solid transparent;
    }
   }

   .body {
    ul.list {
     > li > .nuxt-link-exact-active + ul {
      line-height: 1rem;
      opacity: 1;
      height: max-content;
      pointer-events: visible;
     }
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