<template>
  <div>
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <text x="25" :y="25" :font-size="this.textPercent ? 13 : 20" v-bind:style="{ fill: '#EF420C', opacity: (1.5-(this.percent-30)/30) }">{{ this.counterText }}</text>
        <text x="25" :y="25" :font-size="this.textPercent ? 13 : 20" v-bind:style="{ fill: '#0A264F', opacity: ((this.percent-30)/30) }">{{ this.counterText }}</text>
        <polyline :points="this.points.t" v-bind:style="{ stroke: '#ddd' }" />
        <polyline :points="this.points.s" v-bind:style="{ stroke: '#EF420C', opacity: (1.5-(this.percent-30)/30) }" />
        <polyline :points="this.points.s" v-bind:style="{ stroke: '#0A264F', opacity: ((this.percent-30)/30) }" />
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'pie-chart2',
    props: ['numerator', 'denominator', 'textPercent'],
    data () {
      return {
        r: 100 / this.denominator,
        total: 100,
      }
    },
    created () {
    },
    computed: {
      score () {
        return this.numerator * this.r
      },
      percent () {
        return Math.floor(this.numerator / this.denominator * 100);
      },
      counterText () {
        if (this.textPercent && this.denominator > 0) {
          return `${this.percent}%`;
        } else if (!this.textPercent) {
          return this.numerator
        } else {
          return 'N/A';
        }
      },
      points () {
        let points = {s: '', t: ''}
        let x, y, angle
        for (var i = 0; i < this.total + 1; i++) {
          angle = Math.PI * 2 / this.total * i
          x = 25 + 20 * Math.cos(angle + Math.PI / 2)
          y = 25 + 20 * -Math.sin(angle + Math.PI / 2)
          points.t += `${x},${y} `
          if (this.score >= i) {
            points.s = points.t
          }
        }
        return points
      }
    }
  }
</script>


<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  svg {
    width: 100%;
    height: 100%;
  }
  polyline {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
  }
  text {
    dominant-baseline: central;
    text-anchor: middle;
    font-weight: bold;
  }
</style>
