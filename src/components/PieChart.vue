<template>
  <div>
    <div class="counter">
      <span class="ouro ouro3">
        <span class="left"><span class="anim"></span></span>
        <span class="right"><span class="anim"></span></span>
        <div class="countdown">
          {{ time }}
        </div>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pie-chart',
    props: ['time']

  }
</script>


<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  .counter {
    height: 46px;
    width: 46px;
  }
  .countdown{
    position: relative;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    height: 46px;
    width: 46px;
  }

  .ouro {
    position: relative;
    display:inline-block;
    height: 46px;
    width: 46px;
    border-radius: 50%;
    background: none repeat scroll 0 0 #DDDDDD;
    overflow:hidden;
    box-shadow: 0 0 10px rgba(0,0,0,.1) inset, 0 0 25px rgba(0,0,255,0.075);
  }

  .ouro:after {
    content: "";
    position: absolute;
    top: 9px; left: 9px;
    display: block;
    height: 28px;
    width: 28px;
    background: none repeat scroll 0 0 #F2F2F2;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
  }
  .ouro > span {
    position: absolute;
    height: 100%; width: 50%;
    overflow: hidden;
  }
  .left  { left:0   }
  .right { left:50% }

  .anim {
    position: absolute;
    left: 100%; top: 0;
    height: 100%; width: 100%;
    border-radius: 999px;
    background: none repeat scroll 0 0 #508EC3;
    opacity: 0.8;
    animation: ui-spinner-rotate-left 14s infinite;
    transform-origin: 0 50% 0;
  }
  .resetAnimation{
  animation: none;
  }
  .left .anim {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  .right .anim {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    left: -100%;
    transform-origin: 100% 50% 0;
  }

  /* v3 */
  .ouro3 .anim {
   animation-delay: 0s;
   animation-duration:14s;
   animation-timing-function: linear;
  }
  .ouro3 .right .anim{
   /* -webkit-animation-delay: 1.5s; */
   animation-name: ui-spinner-rotate-right;
   animation-delay:0;
   /* animation-delay: 1.5s; */
  }

  /* round variation */
  .round .ouro:after {display:none }

  /* double variation */
  .double .ouro:after {
  height: 13px; width: 13px;
  left: 7px; top: 7px;
  border: 10px solid #ddd;
  background: transparent;
  box-shadow: none;
  }

  @keyframes ui-spinner-rotate-right{
  0%{transform:rotate(0deg)}
  25%{transform:rotate(180deg)}
  50%{transform:rotate(180deg)}
  75%{transform:rotate(360deg)}
  100%{transform:rotate(360deg)}
  }
  @keyframes ui-spinner-rotate-left{
  0%{transform:rotate(0deg)}
  25%{transform:rotate(0deg)}
  50%{transform:rotate(180deg)}
  75%{transform:rotate(180deg)}
  100%{transform:rotate(360deg)}
  }
</style>
