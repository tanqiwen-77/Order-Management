<template>
  <div>
    <!-- 面包屑导航区域 -->
    

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.Id" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3" size="small">
          <el-button type="primary" @click="addDialogVisible = true">单条录入</el-button>
        </el-col> 
         <el-col :span="3">
          <el-button type="primary" @click="daochu">批量导出</el-button>
        </el-col>
         <el-col :span="3">
          <el-button type="primary" @click="shanchu">批量删除</el-button>
        </el-col>
         <el-col :span="3">
          <el-button type="primary" @click="toggleSelection">取消选择</el-button>
        </el-col>
         
        
        <el-col :span="2">
          
 <el-button type="primary" @click="daoru">批量导入</el-button>


</el-col>
        
      
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe @selection-change="handleSelectionChange" ref="multipleTable">
          <el-table-column
      type="selection"
      >
    </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单上传时间" prop="upTime"></el-table-column>
        <el-table-column label="订单号" prop="id"></el-table-column>
        <el-table-column label="是否加急" prop="status">
             <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="流转数据1" prop="record1"></el-table-column>
         <el-table-column label="流转数据2" prop="record2"></el-table-column>
          <el-table-column label="流转数据3" prop="record3"></el-table-column>
           <el-table-column label="流转数据4" prop="record4"></el-table-column>
            <el-table-column label="最终单号" prop="lastId"></el-table-column>
             
        
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            <!-- 分配角色按钮 -->
            
          </template>
        </el-table-column>
      </el-table>
     
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNumber" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      
       
     
    </el-card>
      
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="订单号" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
       
        
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="150px">
        
        <el-form-item label="订单号" prop="id">
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>
        <el-form-item label="订单上传时间" prop="upTime">
          <el-input v-model="editForm.upTime"></el-input>
        </el-form-item>
        <el-form-item label="流转记录1" prop="record1">
          <el-input v-model="editForm.record1"></el-input>
        </el-form-item>
        <el-form-item label="流转记录2" prop="record2">
          <el-input v-model="editForm.record2"></el-input>
        </el-form-item>
         <el-form-item label="流转记录3" prop="record3">
          <el-input v-model="editForm.record3"></el-input>
        </el-form-item>
         <el-form-item label="流转记录4" prop="record4">
          <el-input v-model="editForm.record4"></el-input>
        </el-form-item>
        <el-form-item label="流转记录5" prop="record5">
          <el-input v-model="editForm.record5"></el-input>
        </el-form-item>
       <el-form-item label="流转记录6" prop="record6">
          <el-input v-model="editForm.record6"></el-input>
        </el-form-item>
        <el-form-item label="流转记录7" prop="record7">
          <el-input v-model="editForm.record7"></el-input>
        </el-form-item>
        <el-form-item label="流转记录8" prop="record8">
          <el-input v-model="editForm.record8"></el-input>
        </el-form-item>
        <el-form-item label="流转记录9" prop="record9">
          <el-input v-model="editForm.record9"></el-input>
        </el-form-item>
        <el-form-item label="流转记录10" prop="record10">
          <el-input v-model="editForm.record10"></el-input>
        </el-form-item>
         <el-form-item label="流转记录11" prop="record11">
          <el-input v-model="editForm.record11"></el-input>
        </el-form-item>
         <el-form-item label="流转记录12" prop="record12">
          <el-input v-model="editForm.record12"></el-input>
        </el-form-item>
         <el-form-item label="流转记录13" prop="record13">
          <el-input v-model="editForm.record13"></el-input>
        </el-form-item>
         <el-form-item label="流转记录14" prop="record14">
          <el-input v-model="editForm.record14"></el-input>
        </el-form-item>
        <el-form-item label="最终单号" prop="lastId">
          <el-input v-model="editForm.lastId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的规则
    
    // 验证手机号的规则
   

    return {
      // 获取用户列表的参数对象
      queryInfo: {
       Id:'',
        // 当前的页数
        pageNumber: 1,
        // 当前每页显示多少条数据
        pageSize: 2
      },
      userlist: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        id: '',
        
       
      },
      // 添加表单的验证规则对象
      addFormRules: {
          id: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
          
        ],
        
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {
         
      },
      // 修改表单的验证规则对象
      editFormRules: {
            id: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
          
        ],
      },
      // 控制分配角色对话框的显示与隐藏
     multipleSelection: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
        
       
      const res = await this.$http.get('users',{params:this.queryInfo})
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error('获取订单列表失败！')
      }
      else{
      this.userlist = res.data.users
      this.total = res.data.totalpage}
      
     
      
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pageNumber = newPage
      this.getUserList()
    },
    // 监听 switch 开关状态的改变
    async userStateChanged(userinfo) {
      console.log(userinfo)
      const  res  = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.status}`
      )
      console.log(res)
      if (res.status !== 200) {
       userinfo.status = !userinfo.status
        return this.$message.error('更新加急状态失败！')
      }
       
      this.$message.success('更新加急状态成功！')
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const res  = await this.$http.post('users',this.$qs.stringify({Id:this.addForm.id}))
      console.log(res)
        if (res.status !== 201) {
          this.$message.error('添加订单失败！')
        }

        this.$message.success('添加订单成功！')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
        this.getUserList()
      })
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      // console.log(id)
      const  res = await this.$http.get('users/' + id)
     console.log(res)
      if (res.status !== 200) {
        return this.$message.error('查询订单信息失败！')
      }

      this.editForm = res.data
      this.editDialogVisible = true
      console.log(this.editForm)
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const  res  = await this.$http.put(
          'users/' + this.editForm.id,
          {
            Id: this.editForm.id,
            lastId: this.editForm.lastId,
            upTime:this.editForm.upTime,
            status:this.editForm.status,
            record1:this.editForm.record1,
             record2:this.editForm.record2,
              record3:this.editForm.record3,
               record4:this.editForm.record4,
             record5:this.editForm.record5,
              record6:this.editForm.record6,
               record7:this.editForm.record7,
                record8:this.editForm.record8,

                 record9:this.editForm.record9,
                  record10:this.editForm.record10,
                   record11:this.editForm.record11,
                    record12:this.editForm.record12,
                     record13:this.editForm.record13,
                      record14:this.editForm.record14,

          }
        )
       console.log(res)
        if (res.status !== 200) {
          return this.$message.error('更新订单信息失败！')
        }

        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该订单, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const  res = await this.$http.delete('users/' + id)
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error('删除订单失败！')
      }

      this.$message.success('删除订单成功！')
      this.getUserList()
    },
    daochu(){
        var storageObj = {
      title:["订单上传时间","订单号","是否加急","流转记录1","流转记录2","流转记录3","流转记录4","流转记录5","流转记录6","流转记录7","流转记录8","流转记录9","流转记录10","流转记录11","流转记录12","流转记录13","流转记录14","最终单号"],
      titleForKey:["upTime","id","status","record1","record2","record3","record4","record5","record6","record7","record8","record9","record10","record11","record12","record13","record14","lastId"],
      data:this.multipleSelection
};
console.log('你点击了导出')
console.log(storageObj.data)
        var title = storageObj.title;
            var titleForKey = storageObj.titleForKey;
            var data = storageObj.data;
            var str = [];
            str.push(storageObj.title.join(",")+"\n");
            for(var i=0;i<data.length;i++){
                var temp = [];
                for(var j=0;j<titleForKey.length;j++){
                    temp.push(data[i][titleForKey[j]]);
                }
                str.push(temp.join(",")+"\n");
            }
            var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str.join(""));
            var downloadLink = document.createElement("a");
            downloadLink.href = uri;
            downloadLink.download = new Date().toISOString().substring(0,10)+"-labelDetail.csv";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

    },
    async daoru(){
      console.log('批量导入是真的！！！')
       
       
      
        window.open('http://182.92.83.129/static/daoru.html','_blank','width=600,height=400,top=100px,left=0px')
      } ,
        toggleSelection() {
      console.log('你点击了取消选择')
       
          this.$refs.multipleTable.clearSelection();
          console.log('选择已清空')
        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('你选择了')
        console.log(this.multipleSelection)
      },
     shanchu(){
       console.log('你点击了批量删除')
       console.log(this.multipleSelection)
          var ids= this.multipleSelection.map(item => item.id)//获取所有选中行的id组成的字符串，以逗号分隔
        console.log(ids)
        this.$confirm('此操作将永久删除该文件及其子文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {     
            const  res = await this.$http.post('deleteMoreUsers/' + ids)
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error('删除订单失败！')
      }

      this.$message.success('删除订单成功！')
      this.getUserList()
            
          })
        

      },
      search(){
          this.$router.push('/test')} 
    },
    
      }
    // 展示分配角色的对话框
    
  

</script>

<style lang="less" scoped>
</style>
