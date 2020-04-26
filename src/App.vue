<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
      this.calcVH()
      window.addEventListener('onorientationchange', this.calcVH);
    }
    document.querySelector('body').setAttribute('style', 'font-size:' + document.documentElement.clientHeight * 0.024 + 'px;');
  },
  methods: {
    calcVH () {
      var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      document.querySelector('#app').setAttribute('style', 'height:' + vH + 'px;');
      // document.querySelector('#app > div').setAttribute('style', 'height:' + vH + 'px;');
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,600,700&subset=latin-ext');

:root {
  --color-orange: #EF420C;
  --color-blue: #10305F;
  --color-gray: #B8B8B8;
  --color-lgray: #F3F3F3;
  --color-white: #FFFFFF;
}
:root {
    --gray: #ebf1f4;
    --gray-text: #9dabbc;
}
html, option, input {
  font-family: 'Rubik', sans-serif;
  color: var(--color-blue);
  user-select: none;
}
body {
  position: fixed;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  line-height: 1.6em;
  background: black;
}
.numbering {
    display: inline-block;
    
    background: var(--color-orange);
    font-size: 50%;
    width: 1rem;
    height: 1rem;
    text-align: center;
    border-radius: 100%;
    color: white;
}
h1, h2, h3, h4, h5 {
    text-transform: uppercase;
}
h1 {
  font-size: 150%;
  font-weight: bold;
}
h2 {
  font-size: 120%;
  font-weight: light;
}
h3 {
  font-size: 110%;
  font-weight: light;
}
h4 {
  font-size: 90%;
  font-weight: bold;
  text-transform: uppercase;
}
li {
  margin: 1em 0;
}
#logo {
  height: 15%;
}
#logo.land {
  height: 30%;
}
#app {
  border-radius: 1em;
  width: 100%;
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: space-around;
  background: #EBF1F4;
}
#app > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 10%;
}
@media screen and (min-device-aspect-ratio: 1/1) {
  #app {
    width: calc(100vh/16*10);
  }
}

.button {
    text-transform: uppercase;
    transition: background 200ms, color 200ms, box-shadow 200ms;
}


button {
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    padding: 1em 2em;
    width: 100%;
    border-radius: .5em;
  font-family: 'Rubik', sans-serif;
  letter-spacing: .1em;
  border: none;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  color: var(--color-white);
  text-decoration: none;
  letter-spacing: 0.1em;
  transition: .5s;
}

button:focus {
  outline:0;
}

button.red {
    box-shadow: 0 .3em 1em #EF420C3D;
    color: white;
    background: var(--color-orange);
}

button.blue:hover, button.red:hover{
    box-shadow: none;
}

button.opaque-blue:hover {
    background-color: var(--blue);
    color: white;
}

button.opaque-white:hover {
    background-color: white;
    color: var(--red);
}

button.blue {
    box-shadow: 0 .3em 1em #10305F3D;
    color: white;
    background: var(--color-blue);
}

button.opaque-white {
    color: white;
    background: rgba(0,0,0,0);
    box-shadow: inset 0 0 0 .15em white;
}

button.opaque-blue {
    color: var(--blue);
    box-shadow: inset 0 0 0 .15em var(--blue);
}

.input{
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.radio{
  display: flex;
  font-size: inherit;
}
input{
  font-family: 'Rubik', sans-serif;
  border: none;
  box-sizing: border-box;
  font-size: 100%;
  color: inherit;
  border: .15em solid #E4EDF2;
  border-radius: .4em;
  padding: .6em .8em;
  background: #F5FAFC;
  caret-color: var(--color-blue);
}
input:focus {
    border-color: var(--color-blue);
}

input[type='text'], input[type='number']{
  width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter-active {
  /* transition-delay: .5s; */
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
