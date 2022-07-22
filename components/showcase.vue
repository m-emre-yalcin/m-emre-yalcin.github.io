<template>
  <div class="sc-container">
    <div
      v-for="(item, i) in sc"
      :key="item.id"
      class="sc"
      @click="setPreview(item)"
    >
      <header>
        <h3>{{ item.title }}</h3>
        <div class="btn">
          <icn-fullscreen />
        </div>
      </header>

      <div class="images">
        <ul ref="slider" class="slide-container" @click="setPreview">
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
              $refs.slider[i].scrollWidth - 220
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
          id: 3,
          title: 'Economy dictionary - Mobile app',
          date: 'February 2021',
          images: [
            'sc-ekonomi-0.png',
            'sc-ekonomi-1.webp',
            'sc-ekonomi-2.webp',
            'sc-ekonomi-3.webp',
            'sc-ekonomi-4.webp',
          ],
        },
        {
          id: 4,
          title: 'Carbon Calculator',
          date: 'April 2021',
          images: [
            'sc-calculator-1.png',
            'sc-calculator-2.png',
            'sc-calculator-3.png',
          ],
        },
        {
          id: 5,
          title: 'Blog Project - CMS',
          date: 'August 2021',
          images: [],
        },
        {
          id: 6,
          title: 'Bonapply - Web app',
          date: 'September 2020',
          images: [],
        },
        {
          id: 7,
          title: 'Bontebox - Web app',
          date: 'December 2020',
          images: [],
        },
        {
          id: 8,
          title: 'Şeffy - Mobile app',
          date: 'January 2020',
          images: [],
        },
        {
          id: 9,
          title: 'BSM web page',
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
          title: 'BSM Admin Panel',
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
    border: 1px solid white;
    border-radius: 8px;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0.5rem 0 0.5rem;

      h3 {
        font-size: 1em;
      }

      .btn {
        svg {
          width: 24px;
          height: 24px;
          fill: white;
        }
      }
    }

    .images {
      position: relative;
      padding: 0.5rem;

      ul.slide-container {
        overflow: auto;
        display: flex;
        overflow: hidden;
        gap: 0.25rem;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;

        li.img-container {
          scroll-snap-align: start;
          // opacity: 0.7;

          img {
            width: auto;
            max-height: 200px;
            border-radius: 4px;
          }

          &:hover {
            opacity: 1;
          }
        }
      }

      .chevron {
        position: absolute;
        top: 0;
        width: 20%;
        height: 100%;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(37, 37, 37, 0.106);
        color: rgb(218, 214, 214) !important;

        svg {
          width: 32px;
          height: 32px;
          fill: white !important;
        }

        &:hover {
          color: rgb(255, 255, 255) !important;
          background-color: rgba(37, 37, 37, 0.218);
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