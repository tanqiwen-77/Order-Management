<template>
  <div class="wrapper">
    <el-menu  :default-active="onRoutes" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router
    unique-opened>
  <template v-for="item in items">
  <template v-if="item.subs">
  <el-submenu :index="item.index" :key="item.index"> 
    <template slot="title">
      <i :class="item.icon"></i>
      <span slot="title">{{item.title}}</span>
    </template>
   <template v-for="subitem in item.subs">
    <el-submenu  v-if="subitem.subs" :index="subitem.index" :key="subitem.index">

      <span slot="title">{{subitem.title}}</span>
      <el-menu-item v-for="(threeitem,i) in subitem.subs" :key="i" :index="threeitem.index">{{threeitem.title}}</el-menu-item>
    </el-submenu>
   
    <el-menu-item v-else :index="subitem.index" :key="subitem.index" >
    {{subitem.title}}
  </el-menu-item>
     </template>
  </el-submenu>
  </template>
  <template v-else>
  <el-menu-item :index="item.index" :key="item.index">
    <i :class="item.icon"></i>
    <span slot="title">{{item.title}}</span>
  </el-menu-item>
  </template>
  </template>
</el-menu>

  </div>
</template>

<script>
import bus from './bus';
export default {

  name: 'side',
  data () {
    return {
      isCollapse: true,
      items: [
                
                {
                    icon: 'el-icon-s-order',
                    index: 'thing',
                    title: '订单管理',
                    
                },
               
            ]
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
      bus.$on('collapse',msg =>{
        this.isCollapse=!this.isCollapse;
        bus.$emit('collapse-content', msg);
      })
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-vertical-demo{background:rgb(223, 221, 221);}
.wrapper {
    display: block;
    position: absolute;
    left: 0;
    top: 4rem;
    bottom: 0;
    overflow-y: scroll;
}
.wrapper::-webkit-scrollbar {
    width: 0;
}
</style>
