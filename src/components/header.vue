<template>
  <div class="header">
    <div class="foldbtn" @click="foldchange">
      <i v-if="!collapse" class="el-icon-s-fold" ></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="title">后台管理系统</div>
    <div class="right">
    
    
    <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
        {{username}}<i class="el-icon-caret-bottom"></i>
  </span>
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item>项目仓库</el-dropdown-item>
    <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from './bus';
export default {
  name: 'header',
  data () {
    return {
       collapse: false,
      fullscreen:false,
      message:2,

    }
  },
  computed:{
      username(){
        let username=localStorage.getItem('ms_username') ;
           return  username?username:this.name;
  }
  },
  methods:{
      foldchange(){
          this.collapse=!this.collapse;
          bus.$emit('collapse',this.collapse)
      },
      handlescreen(){
          let element=document.documentElement;
          if(this.fullscreen)
          {
              if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
          }
          else{
              if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
                
          }
          this.fullscreen = !this.fullscreen;
      },
      handleCommand(command){
          if(command=='loginout')
          {
              console.log(1)
            localStorage.removeItem('ms_username');
            this.$router.push('/login')
          }
          else{
              console.log(2)
          }
      },
      

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{width: 100%;height: 4rem;background-color:black;}
.foldbtn{color: white;height:4rem ;line-height: 4rem;padding-left: 1rem;padding-right: 1rem;font-size: 1.5rem;float: left;cursor: pointer;}
.title{float: left;font-size: 1.7rem;color:slategrey;height:4rem ;line-height: 4rem;}
.screen,.message{color:white;height:4rem ;line-height: 4rem;font-size: 1.5rem;margin-right: 1rem;}

.right{ float: right;display: flex; align-items: center;padding-right: 2rem;
justify-content: center;height: 100%;}
.message{position: relative;}
.dian{width: 0.4rem;height: 0.4rem;border-radius: 0.2rem;position: absolute;background: red;top:1rem;right: 0;}
.tou{width: 2rem;height: 2rem;border-radius:1rem;margin-right: 0.5rem;}
</style>
