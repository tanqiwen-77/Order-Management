<template>
  <div class="login">
<div class="login-ms">
<div class="title">后台管理系统</div>
<div class="content">
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm">
  <el-form-item  prop="name">
    <el-input v-model="ruleForm.userName" autocomplete="off" placeholder="username">
      <el-button slot="prepend" type="primary" icon="el-icon-user"></el-button>
    </el-input>
  </el-form-item>
  <el-form-item  prop="pass">
    <el-input type="password" v-model="ruleForm.passWord" autocomplete="off" placeholder="password"
    @keyup.enter.native="submitForm('ruleForm')">
      <el-button slot="prepend" type="primary" icon="el-icon-lock"></el-button>
    </el-input>
  </el-form-item>
  
  <el-form-item>
    <div class="btn">
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    </div>
  </el-form-item>
<p class="tip"></p>
</el-form>
</div>

</div>
  </div>
</template>

<script>
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
     
      return {
        ruleForm: 
           {
             userName: 'user',
             passWord: '123456'
          },

        rules: {
          name: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2,trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
             
              const res = await this.$http.post('login', this.$qs.stringify(this.ruleForm))
        console.log(res)
        if (res.data == 'false') return this.$message.error('登录失败！')
        if(res.data == 'success'){
            this.$message.success('登录成功');
            localStorage.setItem('ms_username',this.ruleForm.userName);
            this.$router.push('/home/thing')}
          } else {
            this.$message.error('登录失败');
            return false;
          }
        });
      },
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
    position: relative;
width: 100%;
height: 100%;
background-image: url('../assets/img/login-bg.jpg');
background-size: cover;}
.login-ms{
    position: absolute;
    top:50%;
    left: 50%;
    width: 22rem;
    margin-left: -11rem;
    margin-top: -10rem;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 1rem;
    border: azure 0.1rem solid;
}
.title{text-align: center;
line-height: 3rem;
height: 3rem;
font-size: 1.3rem;
border-bottom: beige 0.1rem solid;
color:dimgrey;}
.content{
  padding: 2rem;
}
.btn button{width: 100%;}
.tip{font-size: 0.7rem;color: blanchedalmond;}
</style>
