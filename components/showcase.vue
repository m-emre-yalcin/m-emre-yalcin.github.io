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
          <h3>{{ item.title }}</h3>
          <h4>{{ item.date }}</h4>
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
        h3 {
          font-size: 1em;
        }
        h4 {
          font-size: 0.5em;
          opacity: 0.8;
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