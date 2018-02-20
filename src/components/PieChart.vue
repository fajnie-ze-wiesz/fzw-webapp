<template>
  <div>
    <!-- {{this.points}} -->
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <!-- <path :d="path" stroke="black" fill="transparent"/> -->
        <text x="25" y="28" font-size="10" text-anchor="middle" dominant-baseline="center">{{ this.numerator }}</text>
        <polyline :points="this.points.t" style="fill:none;stroke:white;stroke-width:2" />
        <polyline :points="this.points.s" style="fill:none;stroke:gray;stroke-width:2" />
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'pie-chart2',
    props: ['numerator', 'denominator'],
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
      percentString () {
        if (this.total > 0) {
          const percent = Math.floor(this.nominator / this.denominator * 100);
          return `${percent}%`;
        } else {
          return 'N/A';
        }
      },
      points () {
        let points = {s: '', t: ''}
        let x, y, angle
        for (var i = 0; i < this.total + 1; i++) {
          angle = Math.PI * 2 / this.total * i
          x = 25 + 15 * Math.cos(angle + Math.PI / 2)
          y = 25 + 15 * -Math.sin(angle + Math.PI / 2)
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

</style>
