<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // test for touch events support and if not supported, attach .no-touch class to the HTML tag.
    if (!('ontouchstart' in document.documentElement)) {
      document.documentElement.className += ' no-touch';
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,600,700&subset=latin-ext');

:root {
  --color-orange: #EF420C;
  --color-green: #61bd4f;
  --color-blue: #10305F;
  --color-lblue: #E4EDF2;
  --color-border-blue: #C2CBD6;
  --color-light-blue: #4368a0;
  --color-lgray: #F3F3F3;
  --color-white: #FFFFFF;
  --color-gray: #ebf1f4;
  --color-gray-text: #9dabbc;
  --color-dark-gray: #9dabbc;
}
html, option, input {
  font-family: 'Rubik', sans-serif;
  user-select: none;
}
/*
 * Allow text selection in particular cases so text inputs can work on Safari:
 * https://stackoverflow.com/questions/20495827/text-field-not-working-in-safari
 */
input[type="text"], input[type="number"] {
  user-select: text;
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
  background: url(/static/img/bg_light.png) no-repeat top 120px center var(--color-gray);
  font-size: 2.2vh;
  transition: background .5s;
}
body.dark {
  background: url(/static/img/bg_dark.png) no-repeat top 120px center var(--color-blue);
}

h1, h2, h3, h4, h5 {
    margin: 0;
    margin-bottom: 1em;
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
small {
  color:var(--color-gray-text);
}
#app {
  border-radius: 1em;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: relative;
}
.content-container {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 8%;
}
.app-container {
  height: 100%;
  width: 100%;
  overflow: auto;
  border-radius: 1em;
  box-shadow: 0 0 0 .25em rgba(150,150,150,0.15);
}
/*
 * Use 13/9 aspect ratio to avoid layout change when software keyboard pops up on mobile device:
 * https://web.archive.org/web/20160509220835/http://blog.abouthalf.com/development/orientation-media-query-challenges-in-android-browsers/
 */
@media screen and (min-aspect-ratio: 13/9) {
  #app {
    width: calc(90vh/16*9);
    height: 90vh;
  }
}

button {
  text-transform: uppercase;
  transition: background 200ms, color 200ms, box-shadow 200ms;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  padding: 1em 0;
  width: 100%;
  font-size: 90%;
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

button, button:focus, button:active, button::-moz-focus-inner {
  outline: 0;
  border: 0;
}

button.red {
    box-shadow: 0 .3em 1em #EF420C3D;
    color: white;
    background: var(--color-orange);
}

.no-touch button.blue:hover, .no-touch button.red:hover{
    box-shadow: none;
}

.no-touch button.opaque-blue:hover {
    background-color: var(--color-blue);
    color: white;
}

.no-touch button.opaque-white:hover {
    background-color: white;
    color: var(--color-orange);
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
    color: var(--color-blue);
    background: transparent;
    box-shadow: inset 0 0 0 .15em var(--color-blue);
}

.input{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap:wrap;
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
  margin: 1em 0;
  background: #F5FAFC;
  caret-color: var(--color-blue);
}
input:focus {
    border-color: var(--color-light-blue);
    outline: none;
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

.circle-icon {
  margin-right: 0;
  display: inline-flex;
  background: var(--color-orange);
  justify-content: center;
  align-items: center;
  font-size: 100%;
  transform: scale(0.55);
  transform-origin: left;
  width: 2em;
  height: 2em;
  text-align: center;
  border-radius: 100%;
  color: white;
}

ol {
  counter-reset: li; /* Initiate a counter */
  margin-left: 0; /* Remove the default left margin */
  padding-left: 0; /* Remove the default left padding */
}
ol > li {
  position: relative; /* Create a positioning context */
  margin: 0 0 6px 2em; /* Give each list item a left margin to make room for the numbers */
  padding: 4px 8px; /* Add some spacing around the content */
  list-style: none; /* Disable the normal item numbering */
}
ol > li:before {
  content: counter(li); /* Use the counter as content */
  counter-increment: li; /* Increment the counter by 1 */
  /* Position and style the number */
  position: absolute;
  top: 0.25em;
  left: -2.5em;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 75%;
  width: 2em;
  height: 2em;
  /* Some space between the number and the content in browsers that support
      generated content but not positioning it (Camino 2 is one example) */
  margin-right: 8px;
  padding: 0px;
  color: #fff;
  background: #EF420C;
  text-align: center;
  border-radius: 2em;
}
li ol,
li ul {
  margin-top: 6px;
}
ol ol li:last-child {
  margin-bottom: 0;
}
ol > li > p {
  margin-top: 0;
}

</style>
