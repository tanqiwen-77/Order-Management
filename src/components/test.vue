<template>
  <div id="app">
    
    <el-row :gutter="15" class="search">
      <el-col :span="12" :push="6">
        <el-input placeholder="请输入内容" v-model="id" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
      </el-col>
     
    </el-row>
    

  <!-- 时间线 -->
  <el-timeline>
    <el-timeline-item v-for="(activity, index) in progressInfo" :key="index" :timestamp="activity.time">
      {{activity.context}}
    </el-timeline-item>
  </el-timeline>
  </div>
</template>

<script>
export default {
data() {
    return{
  id:'',
progressInfo:[
],

}
},
methods: {
  async getUserList(){
      this.progressInfo=[]
    var id1=this.GetUrlPara();
    console.log(id1)
      var a=this.id?this.id:id1
      console.log(a)
       const  res = await this.$http.get('users/' + a)
    
                    console.log(res);
                    if (res.status !== 200) {
        return this.$message.error('获取订单失败！')
      }
      const v = res.data
          var date1=v.record1.substring(0,19); 
          date1= date1.replace(/-/g,'/'); 
          if(Date.parse(new Date())-Date.parse(date1)>=0)
          {
            var str=v.record1
            str =str.substring(20,str.length);
            this.progressInfo.push({
              context:str,
               time:date1
            })
             var date2=v.record2.substring(0,19); 
          date2 = date2.replace(/-/g,'/'); 
          if(Date.parse(new Date())-Date.parse(date2)>=0)
          {
            var str=v.record2
            str =str.substring(20,str.length);
            this.progressInfo.push({
              context:str,
               time:date2
            })
             var date3=v.record3.substring(0,19); 
          date3 = date3.replace(/-/g,'/'); 
          if(Date.parse(new Date())-Date.parse(date3)>=0)
          {
            var str=v.record3
            str =str.substring(20,str.length);
            this.progressInfo.push({
              context:str,
               time:date3
            })
            var date4=v.record4.substring(0,19); 
          date4 = date4.replace(/-/g,'/'); 
          if(Date.parse(new Date())-Date.parse(date4)>=0)
          {
            var str=v.record4
            str =str.substring(20,str.length);
            this.progressInfo.push({
              context:str,
               time:date4
            })
             if(v.lastId){
            var date = new Date()
            date5=this.dateFormat("YYYY-mm-dd HH:MM", date)
            var str=' UPS tracking number is '+v.lastId
            this.progressInfo.push({
              context:str,
               time:date5
            })
          }
          }
          }
          }
          }
         
          
         
      
      
               
            
   
      
     
  },
  dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
},
GetUrlPara()
　　{
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("?");

　　　　var para = arrUrl[1];
　　　　return para;
　　}
},
mounted() {
  this.getUserList()
},
}


</script>

<style>
.search{
    margin-bottom: 30px;
}
</style>