<template>
  <div id="app">
    <!-- <header>
      <span>Fajnie że wiesz</span>
    </header> -->

    <main>
      <router-view></router-view>
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

h1 {
  font-size: 100%;
  color: #888;
}

html{
  background: #eee;
}
body {
  font-size: 6vmin;
  margin: 0;
  font-variant: small-caps;
  user-select: none;
  display: flex;
  justify-content: center;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 75vmin;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 40px;
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
  width: 50vmin;
  margin: 5vmin;
  padding: 3vmin;
  font-size: inherit;
  font-variant: small-caps;
  font-weight: bold;
}
.input{
  display: flex;
  align-items: flex-start;
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
</style>
