<template>
  <div class="clean">
    <nuxt class="a4" />
  </div>
</template>

<style lang="scss">
.clean {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  .a4 {
    width: 210mm;
    min-height: 297mm;
    background-color: white;
    margin-inline: auto;
    padding: 1mm 2mm;
    box-sizing: border-box;

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 0;
      padding: 0;
    }

    h2 {
      border-bottom: 1px solid var(--bg);
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }
    h3 {
      ~ h3 {
        margin-top: 1rem;
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
    h2#skill-details ~ ul {
      justify-content: unset;
      flex-direction: column;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      line-height: 1rem;
      li {
        text-align: left;
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
        padding-left: 0.5rem;
        padding-bottom: 0.5rem;
        font-weight: 900;
        font-size: 0.8rem;
      }
    }
    ol {
      margin: 0;
      padding-left: 24px;
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

    #activities-and-societies ~ blockquote:not(#projects ~ blockquote) {
      display: none;
    }
    #activities-and-societies + p {
      margin-top: 0;
    }

    .skill-group {
      margin-bottom: 1rem;

      .header {
        font-weight: 600;
        padding: 0;
        border-bottom: unset;
      }
      .subset {
        padding: 0.25rem 0;
        gap: 0.5rem;
        li.item {
          svg {
            width: 24px;
            height: 24px;
            margin-bottom: 0.25rem;

            * {
              fill: black;
            }
            [class*='dontfill'] {
              fill: white;
            }
          }
          .name {
            font-size: 0.65rem;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            width: 14ch;
          }
          .progress-track {
            height: 5px;
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
