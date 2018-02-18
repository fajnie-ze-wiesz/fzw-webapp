<template>
  <div>
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <g>
        <!-- <path :d="path" stroke="black" fill="transparent"/> -->
        <polyline :points="points" style="fill:none;stroke:black;stroke-width:3" />
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'pie-chart2',
    props: ['time', 'label'],
    data () {
      return {
        path: '',
        points: '20,20 40,25 60,40 80,120 120,140 200,180'
      }
    },
    created () {
      this.points = this.generateCircle(this.time)
    },
    methods: {
      generateCircle (n) {
        let x, y
        for (var i = 0; i < n; i++) {

        }
      }
    }
  }
</script>


<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>

</style>
