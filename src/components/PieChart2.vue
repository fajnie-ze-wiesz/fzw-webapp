<template>
  <div>
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <!-- <path :d="path" stroke="black" fill="transparent"/> -->
        <text x="25" y="28" font-size="10" text-anchor="middle" dominant-baseline="center">{{ percentString }}</text>
        <polyline :points="points" style="fill:none;stroke:white;stroke-width:2" />
        <polyline :points="points2" style="fill:none;stroke:gray;stroke-width:2" />
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'pie-chart2',
    props: ['score', 'total'],
    data () {
      return {
        path: '',
        points: '',
        points2: ''
      }
    },
    created () {
      this.generateCircle(this.score, this.total)
    },
    computed: {
      percentString () {
        if (this.total > 0) {
          const percent = Math.floor(this.score / this.total * 100);
          return `${percent}%`;
        } else {
          return 'N/A';
        }
      }
    },
    methods: {
      generateCircle (s, n) {
        let r = 100 / n
        n = 100
        s *= r
        let x, y, angle
        for (var i = 0; i < n + 2; i++) {
          angle = Math.PI * 2 / n * i
          x = 25 + 15 * Math.cos(angle + Math.PI / 2)
          y = 25 + 15 * -Math.sin(angle + Math.PI / 2)
          this.points += `${x},${y} `
          if (s >= i) {
            this.points2 = this.points
          }
        }
      }
    }
  }
</script>


<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>

</style>
