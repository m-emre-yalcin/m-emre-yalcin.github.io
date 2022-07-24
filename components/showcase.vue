<template>
  <div class="sc-container">
    <div
      v-for="(item, i) in sc"
      :key="item.id"
      class="sc"
      draggable="true"
      @click.stop.prevent="setPreview(item)"
      @dragend.stop.prevent
      @mouseup.stop.prevent
      @drag.stop.prevent
    >
      <header>
        <div class="text">
          <div>
            <h3>{{ item.title }}</h3>
            <h4>{{ item.date }}</h4>
          </div>

          <div class="badges">
            <span v-for="role in item.roles" :key="role" class="badge">
              {{ role }}
            </span>
          </div>
        </div>
        <div class="btn-fullscreen">
          <icn-fullscreen />
        </div>
      </header>

      <div class="images" vue-dragscroll>
        <ul ref="slider" class="slide-container">
          <li v-for="img in item.images" :key="img" class="img-container">
            <img :src="img" :alt="item.title + ' screenshot'" />
          </li>
        </ul>

        <template v-if="renderChevrons">
          <a
            v-if="$refs.slider[i].scrollLeft > 0"
            href="#"
            class="chevron left"
            @mousedown="slide(i, 'left')"
            @click.prevent.stop
          >
            <icn-chevron-left />
          </a>
          <a
            v-if="
              $refs.slider[i].scrollLeft + $refs.slider[i].clientWidth <
              $refs.slider[i].scrollWidth
            "
            href="#"
            class="chevron right"
            @mousedown="slide(i, 'right')"
            @click.prevent.stop
          >
            <icn-chevron-right />
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sc: [
        {
          id: 2,
          title: 'Estefulya - Business website',
          date: 'September 2021',
          description: `Business site of a hair transplant center.`,
          roles: ['back-end', 'front-end', 'UI Design', 'dev-ops'],
          images: [
            'sc-estefulya-0.png',
            'sc-estefulya-1.png',
            'sc-estefulya-2.png',
            'sc-estefulya-3.png',
            'sc-estefulya-4.png',
            'sc-estefulya-5.png',
            'sc-estefulya-6.png',
            'sc-estefulya-7.png',
          ],
        },
        {
          id: 5,
          title: 'Malta Blog Project - CMS',
          date: 'August 2021',
          description: `A CMS that can do similar tasks to Wordpress, with its own usability features. It is linked to a blog site. The site is rendered with SSR and can have many SEO features including AMP.`,
          roles: ['back-end', 'front-end'],
          images: [
            'sc-malta-2.png',
            'sc-malta-3.png',
            'sc-malta-1.png',
            'sc-malta-4.png',
            'sc-malta-5.png',
            'sc-malta-6.png',
            'sc-malta-7.png',
          ],
        },
        {
          id: 6,
          title: 'Bonapply - Web app',
          date: 'September 2020',
          description: `Companies using this application can share surveys with users and evaluate incoming data. Limited memberships may be opened to some users, and these individuals may be assigned to some evaluations as a jury.
I developed the interface design and wrote the entire interface from scratch in Vue without using a component library, used Strapi in the back-end, provided real-time evaluations with Socket.io.`,
          roles: ['back-end', 'front-end', 'UI Design'],
          images: [
            'sc-bonapply-1.png',
            'sc-bonapply-2.png',
            'sc-bonapply-3.png',
            'sc-bonapply-4.png',
            'sc-bonapply-5.png',
            'sc-bonapply-6.png',
            'sc-bonapply-7.png',
            'sc-bonapply-8.png',
            'sc-bonapply-9.png',
            'sc-bonapply-10.png',
            'sc-bonapply-11.png',
            'sc-bonapply-12.png',
            'sc-bonapply-13.png',
            'sc-bonapply-14.png',
            'sc-bonapply-15.png',
            'sc-bonapply-16.png',
            'sc-bonapply-17.png',
            'sc-bonapply-18.png',
            'sc-bonapply-19.png',
            'sc-bonapply-20.png',
            'sc-bonapply-21.png',
            'sc-bonapply-22.png',
            'sc-bonapply-23.png',
            'sc-bonapply-24.png',
            'sc-bonapply-25.png',
            'sc-bonapply-26.png',
            'sc-bonapply-27.png',
          ],
        },
        {
          id: 7,
          title: 'Bonproject - Web app',
          date: 'December 2020',
          description: `A simple project management application. Real-time collaboration is possible. It was an app like a simplified version of Asana.`,
          roles: ['back-end', 'front-end'],
          images: [
            'sc-bonproject-4.png',
            'sc-bonproject-2.png',
            'sc-bonproject-3.png',
            'sc-bonproject-5.png',
            'sc-bonproject-6.png',
            'sc-bonproject-7.png',
            'sc-bonproject-8.png',
            'sc-bonproject-1.png',
          ],
        },
        {
          id: 8,
          title: 'Şeffy - Mobile app',
          date: 'January 2021',
          description: `A mobile application where learning recipes is gamified.`,
          roles: ['back-end', 'front-end'],
          images: [
            'sc-seffy-1.png',
            'sc-seffy-2.png',
            'sc-seffy-3.png',
            'sc-seffy-4.png',
            'sc-seffy-5.png',
            'sc-seffy-6.png',
            'sc-seffy-7.png',
          ],
        },
        {
          id: 3,
          title: 'Economy dictionary - Mobile app',
          date: 'February 2021',
          description: `Mobile application of a dictionary containing thousands of economic terms.`,
          roles: ['back-end', 'front-end', 'UI Design', 'dev-ops'],
          images: [
            'sc-ekonomi-0.png',
            'sc-ekonomi-1.webp',
            'sc-ekonomi-2.webp',
            'sc-ekonomi-3.webp',
            'sc-ekonomi-4.webp',
            'sc-ekonomi-5.webp',
          ],
        },
        {
          id: 4,
          title: 'Carbon Calculator - Web app',
          date: 'April 2021',
          description: `An application that calculates how much carbon a building will emit to the atmosphere.`,
          roles: ['front-end', 'UI Design'],
          images: [
            'sc-calculator-1.png',
            'sc-calculator-2.png',
            'sc-calculator-3.png',
          ],
        },
        {
          id: 9,
          title: 'BSM - Web page',
          date: 'August 2019',
          description: `I designed and developed the company's website, wrote the content as much as I could and put it into production.`,
          roles: ['front-end', 'UI Design', 'dev-ops'],
          images: [
            'sc-bsmweb-1.png',
            'sc-bsmweb-7.png',
            'sc-bsmweb-5.png',
            'sc-bsmweb-6.png',
            'sc-bsmweb-2.png',
            'sc-bsmweb-3.png',
            'sc-bsmweb-4.png',
          ],
        },
        {
          id: 10,
          title: 'BSM Admin panel - Web app',
          date: 'October 2019',
          description: `I developed an admin panel for the company. The panel performed important tasks for the company, such as sending offers and converting approved offers into invoices.`,
          roles: ['front-end', 'back-end', 'UI Design', 'dev-ops'],
          images: [
            'sc-bsm-1.png',
            'sc-bsm-2.png',
            'sc-bsm-3.png',
            'sc-bsm-4.png',
            'sc-bsm-5.png',
            'sc-bsm-6.png',
          ],
        },
        {
          id: 1,
          title: 'Lorinto - Social blog web app',
          date: 'May 2022',
          description: `It's my personal project. I took a break because I'm still developing my idea. I just want it to be a social blog platform where important issues for the world are discussed.`,
          roles: ['front-end', 'back-end', 'UI Design', 'dev-ops'],
          images: [
            'sc-lorinto-1.png',
            'sc-lorinto-2.png',
            'sc-lorinto-3.png',
            'sc-lorinto-4.png',
            'sc-lorinto-5.png',
            'sc-lorinto-6.png',
            'sc-lorinto-7.png',
            'sc-lorinto-8.png',
            'sc-lorinto-9.png',
            'sc-lorinto-10.png',
            'sc-lorinto-11.png',
            'sc-lorinto-12.png',
            'sc-lorinto-13.png',
            'sc-lorinto-14.png',
            'sc-lorinto-15.png',
            'sc-lorinto-16.png',
            'sc-lorinto-17.png',
            'sc-lorinto-18.png',
            'sc-lorinto-19.png',
          ],
        },
        {
          id: 11,
          title: 'Mavi - Open source project',
          date: 'May 2022',
          roles: ['back-end'],
          redirect: 'https://github.com/mavi-server/mavi#readme',
          images: ['mavi.png'],
        },
      ],
      renderChevrons: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.renderChevrons = true
    }, 1000)
  },
  methods: {
    setPreview(payload) {
      if (payload.redirect) {
        window.open(payload.redirect, '_blank')
        return
      }

      this.$store.commit('setPreview', payload)
    },
    slide(i, direction) {
      const dom = this.$refs.slider[i]
      const val = 1 * (direction === 'left' ? -1 : 1)
      const slideWidth = dom.clientWidth / 2
      this.renderChevrons = false

      if (dom) {
        dom.scrollTo({
          left: (dom.scrollLeft += val * slideWidth),
        })
      }
      this.renderChevrons = true
    },
  },
}
</script>

<style lang="scss" scoped>
.sc-container {
  .sc {
    margin: 1rem 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 8px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.214);

      .btn-fullscreen {
        transform: scale(1.25);
      }
    }
    &:active {
      svg {
        transform: scale(1);
      }
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0.5rem 0 0.5rem;

      .text {
        display: flex;
        align-items: flex-start;

        h3 {
          font-size: 1em;
        }
        h4 {
          font-size: 0.5em;
          opacity: 0.8;
        }

        .badges {
          font-size: 0.4em;
          margin-left: 1rem;
          margin-top: 1px;
          display: flex;
          text-transform: capitalize;
          gap: 4px;

          .badge {
            border: 1px solid rgba(255, 255, 255, 0.614);
            border-radius: 4px;
            background-color: rgb(0, 0, 0);
            padding: 6px;
          }
        }
      }

      .btn-fullscreen {
        transition: transform 0.15s ease;

        svg {
          width: 24px;
          height: 24px;
          fill: white;
        }
      }
    }

    .images {
      display: flex;
      align-items: center;
      position: relative;
      padding: 0.5rem;

      ul.slide-container {
        overflow: auto;
        display: flex;
        overflow: hidden;
        gap: 0.25rem;
        scroll-snap-type: x aproximately;
        scroll-behavior: smooth;

        li.img-container {
          scroll-snap-align: start;
          opacity: 0.85;

          img {
            width: auto;
            max-height: 200px;
            border-radius: 4px;
          }
        }
      }

      .chevron {
        position: absolute;
        top: 8px;
        width: 20%;
        height: 200px;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(203, 199, 199) !important;

        svg {
          width: 32px;
          height: 32px;
          fill: white !important;
          transition: transform 0.15s ease;
        }

        &:hover {
          color: rgb(255, 255, 255) !important;
          background-color: rgba(37, 37, 37, 0.218);

          svg {
            transform: scale(1.25);
          }
        }
        &:active {
          svg {
            transform: scale(1);
          }
        }

        &.left {
          left: 0;
        }
        &.right {
          right: 0;
        }
      }
    }
  }
}
</style>