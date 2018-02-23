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
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600&subset=latin-ext');

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
h2, h3, h4, h5 {
  margin-top: 0;
}
#logo{
  width: 30vmin;
}
#app {
  font-family: 'Montserrat', sans-serif;
  color: #2c3e50;
  width: 100vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

main {
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
  background: #EF420C;
  border-radius: 2vmin;
  color: #eee;
  border: none;
  /* width: 30vmin; */
  margin: 4vmin;
  padding: 4vmin 12vmin;
  box-shadow: 0 1vh 5vh 0 rgba(239, 66, 12, 0.5);
  font-size: 80%;
  text-transform: uppercase;
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
  position: relative;
  background: white;
  padding: 5vmin;
  height: 80vmin;
  box-shadow: 0 2vmin #ddd;
  overflow-y: scroll;
}
</style>
