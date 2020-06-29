<template>
  <div id="app">
    <img
      id="logo"
      src="static/img/icons/fzw_logo.svg"
      alt="Fajnie, że wiesz! Logo"
    >
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,600,700&subset=latin-ext');

:root {
  --color-orange: #EF420C;
  --color-green: #61bd4f;
  --color-blue: #10305F;
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
  background: var(--color-gray);
  font-size: 16px;
  transition: background .5s;
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
#logo {
  position: absolute;
  right: 0;
  left: 0;
  height: 20%;
  top: -20%;
  margin: auto;
  z-index: -10;
  padding: 1.5em;
  box-sizing: border-box;
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
#app > div {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 8%;
  border-radius: 1em;
  box-shadow: 0 0 0 .25em rgba(150,150,150,0.15);
}
/*
 * Use 13/9 aspect ratio to avoid layout change when software keyboard pops up on mobile device:
 * https://web.archive.org/web/20160509220835/http://blog.abouthalf.com/development/orientation-media-query-challenges-in-android-browsers/
 */
@media screen and (min-aspect-ratio: 13/9) {
  #app {
    width: calc(70vh/16*9);
    height: 70vh;
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

button.blue:hover, button.red:hover{
    box-shadow: none;
}

button.opaque-blue:hover {
    background-color: var(--color-blue);
    color: white;
}

button.opaque-white:hover {
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

</style>
