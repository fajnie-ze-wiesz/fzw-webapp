<template>
  <div id="app">
    <!-- <header>
      <span>Fajnie że wiesz</span>
    </header> -->

    <main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&subset=latin-ext');

html{
  background: #eee;
}
body {
  font-size: 5vmin;
  margin: 0;
  user-select: none;
  display: flex;
  justify-content: center;
}

#app {
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  width: 100vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  font-variant: small-caps;
  font-size: 100%;
  color: #888;
}

main {
  margin-top: 40px;
  width: 80vmin;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #fff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

button {
  background: #666;
  color: #eee;
  border: none;
  /* width: 30vmin; */
  margin: 4vmin;
  padding: 2vmin 3vmin;
  font-size: inherit;
  font-variant: small-caps;
  font-weight: bold;
}
.input{
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #aaa;
  font-weight: bold;
  font-size: 80%;
}
.radio{
  display: flex;
  font-size: inherit;
}
input{
  border: none;
  padding: 3vmin;
  font-size: inherit;
  color: #777;
}
input[type='text'], input[type='number']{
  width: 75vmin;
}
.input, label {
  font-variant: small-caps;
}

.card{
  background: white;
  padding: 5vmin;
  height: 80vmin;
  box-shadow: 0 2vmin #ddd;
  overflow-y: scroll;
}
</style>
