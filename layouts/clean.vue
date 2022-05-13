<template>
  <div class="clean">
    <header>
      <div class="col">
        <h1>M. Emre Yalcin</h1>
        <span class="location"> Istanbul/Turkey </span>
        <div class="info">
          <a href="mailto:emrreyalcin@gmail.com" target="_blank">
            <icn-mail />
            <span>emrreyalcin@gmail.com</span>
          </a>
          <a class="tel" target="_blank" href="tel:+905323459737">
            <icn-phone />
            <span>+90 532 345 97 37</span>
          </a>
        </div>
      </div>

      <div class="col navs">
        <a href="https://www.linkedin.com/in/m-emre-yalcin" target="_blank">
          <icn-linkedin />
          <span>in/m-emre-yalcin</span>
        </a>
        <a href="https://github.com/m-emre-yalcin" target="_blank">
          <icn-github />
          <span>m-emre-yalcin</span>
        </a>
        <a
          href="https://stackoverflow.com/users/10639354/m-emre-yalcin"
          target="_blank"
        >
          <icn-stackoverflow />
          <span>m-emre-yalcin</span>
        </a>
        <a href="https://m-emre-yalcin.github.io" target="_blank">
          <icn-web />
          <span>website</span>
        </a>
      </div>
    </header>

    <nuxt class="a4" />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400&display=swap');
$a4-width: 210mm;

.clean {
  font-family: 'Philosopher', sans-serif;
  background-color: white;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    margin-inline: auto;
    justify-content: space-between;
    padding: 0.5rem 0;
    width: $a4-width;
    background-color: white;
    border-bottom: 1px solid black;

    .col {
      line-height: 20px;
      a span {
        color: rgb(77, 85, 240);
        font-weight: 600;
        font-size: 0.7rem;
        white-space: nowrap;
      }
      h1 {
        padding: 0;
        margin: 0;
        font-size: 2rem;
      }
      .location {
        opacity: 0.6;
        font-size: 12px;
        margin-top: 6px;
      }
      .info {
        display: flex;
        a {
          display: flex;
          align-items: center;
          &:not(:last-child) {
            margin-right: 0.5rem;
          }
        }
        svg {
          width: 16px;
          height: 16px;
          + span {
            margin-left: 2px;
          }
        }
      }
    }
    .col:not(.navs) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .col.navs {
      display: grid;
      align-items: flex-end;
      grid-template-columns: repeat(4, auto);
      gap: 1rem;
      margin-top: 0.4rem;

      a {
        display: grid;
        align-items: center;
        flex-direction: row-reverse;
        grid-template-columns: 18px 1fr;
        font-size: 0.8rem;
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .a4 {
    width: $a4-width;
    min-height: 297mm;
    background-color: white;
    margin-inline: auto;
    // padding: 1mm 2mm;
    box-sizing: border-box;

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 0;
      padding: 0;
      > a:last-child {
        text-decoration: none;
        position: relative;
        &::before {
          content: '';
          background: url(~/assets/icons/link.svg?inline) no-repeat;
          background-size: 16px;
          background-position: center;
          width: 16px;
          height: 16px;
          display: block;
          position: absolute;
          left: -24px;
          top: 8px;
        }
      }
    }

    h2 {
      border-bottom: 1px solid var(--bg);
      padding-bottom: 0.5rem;
      margin-top: 0.75rem;
      margin-bottom: 0.5rem;
      + h3 {
        margin-top: 0.75rem;
      }
    }
    h3 {
      ~ h3:not(h2 + h3) {
        margin-top: 0.75rem;
      }
    }
    h3 + ul,
    h4 + ul {
      margin-top: 0px;
      font-size: 12px;
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
    hr {
      height: 0px;
      border: none;
      border-bottom: 1px solid var(--bg);
      margin-top: 1rem;
      + h3 {
        margin-top: 1rem;
      }
    }

    p,
    ol {
      font-size: 0.8rem;
      line-height: 1.2rem;
    }
    p,
    table,
    ul,
    ol {
      a {
        font-weight: 900;
        color: rgb(77, 85, 240);
      }
    }
    .details {
      margin: 0.5rem 0;
      summary {
        padding-bottom: 0.5rem;
        font-weight: 900;
        font-size: 0.8rem;
      }
    }
    ol {
      padding-left: 2ch;
      margin: 0;
      li {
        padding: 0;
        border-radius: 8px;
        &::marker {
          font-weight: 900;
          margin-left: 2rem;
        }
        p {
          margin-top: 0;
        }
      }
    }
    .progress-track {
      width: 100%;
      height: 10px;
      margin: 2px 0;
      background-color: var(--bg-lighter);

      .bar {
        background-color: var(--primary-light);
        height: 100%;
        border-radius: 2px;
        transition: width 1s ease-out;
      }
    }

    #activities-and-societies + p {
      margin-top: 0;
    }

    .skills-container {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      .skill-group {
        background-color: rgba(0, 0, 0, 0.02);
        padding: 0.5rem;
        border-radius: 4px;

        .header {
          font-weight: 600;
          padding: 0;
          border-bottom: unset;
        }
        .subset {
          grid-template-columns: repeat(auto-fit, minmax(50px, auto));
          padding: 0.25rem 0;
          gap: 0.5rem;

          li.item {
            &:hover {
              opacity: 1 !important;
            }

            svg {
              width: 24px;
              height: 24px;
              margin-bottom: 0.5rem;

              * {
                fill: black;
              }
              [class*='dontfill'] {
                fill: white;
              }
            }
            .name {
              font-size: 0.6rem;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              width: 7.5ch;
            }
            .progress-track {
              height: 5px;
            }
          }
        }
      }
    }

    table {
      border-spacing: 0;
      border: 1px solid black;
      font-size: 0.85rem;
      margin: 1rem 0;
      border-radius: 4px;

      td,
      th {
        text-align: left;
        &:nth-child(n + 2) {
          border-left: 1px solid black;
        }
      }
      th {
        padding: 0.5rem;
        text-transform: capitalize;
        font-weight: 900;
      }
      td {
        padding: 0.35rem 0.5rem;
        border-top: 1px solid black;
        color: var(--primary-lighter);
      }
      img {
        border-radius: 8px;
      }
    }

    blockquote {
      margin: 0;
      padding-left: 0.5rem;
      border-left: 2px solid black;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
