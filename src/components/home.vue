<template>
  <div class="wrapper">
    <Head></Head>
    <Side></Side>
    
    <div :class="{'content-collapse':collapse}" class="content-box">
     
      <div class="content">
        <transition name="move" mode="out-in">
                    <keep-alive >
        <router-view></router-view>
        </keep-alive>
                </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Head from './header'
import Side from './side'

import bus from './bus'
export default {
  name: 'Home',
  data () {
    return {
      collapse:false,
      
    }
  },
  components:{
    Head,
    Side
  },
  created(){
    bus.$on('collapse-content',msg => {
      this.collapse=!this.collapse
    });
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-box {
    position: absolute;
    left: 4rem;
    right: 0;
    top: 4rem;
    bottom: 0;
    padding-bottom: 2rem;
    
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
}

.content {
    width: auto;
    height: 100%;
    padding: 1rem;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-top: 1rem;
}

.content-collapse {
    left: 8rem;
}
</style>
