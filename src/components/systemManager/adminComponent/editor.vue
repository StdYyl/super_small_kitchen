<template>
  <div>
    <el-form ref="adminMes" :model="adminMes" :rules="rule" label-width="130px">
      <el-form-item prop="name" label="管理员姓名">
        <el-input v-model="adminMes.name" style="width: 230px" placeholder="请输入管理员姓名"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="管理员手机号">
        <el-input v-model="adminMes.mobile" style="width: 230px" placeholder="请输入管理员手机号"></el-input>
      </el-form-item>
      <el-form-item prop="role" label="管理员类型">
        <el-select v-model="adminMes.role" style="width: 230px">
          <el-option v-for="item in roleList" :label="item.name" :value="item.value" :key="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="position" label="管理员岗位">
        <el-select v-model="adminMes.position" placeholder="请选择管理员类型" style="width: 230px">
          <el-option v-for="item in positionList" :label="item.name" :value="item.value" :key="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="" label="商户选择" v-if="this.adminMes.role == 'vendor' || this.adminMes.role == 'seller'">
        <el-button type="primary" @click="dialogTableVisible = true" plain>选择商户</el-button>
        <el-dialog title="商户选择" :visible.sync="dialogTableVisible">
          <el-input v-model="searches" type="text" style="width: 300px" placeholder="商户名称"></el-input>
          <el-button  type="primary" style="margin:0 0 30px 10px" >搜索</el-button>
          <el-table :data="merchantChoose" :header-cell-style="{background:'#f5f5f8',height:'25px'}">
            <el-table-column property="imgSrc" label="商家封面" width="270"  align="center">
              <template slot-scope="scope">
                <img :src="scope.row.imgSrc" style="width: 80px">
              </template>
            </el-table-column>
            <el-table-column property="name" label="商家名称" width="230"></el-table-column>
            <el-table-column property="" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="chooseHouse(scope.row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <p class="loadinged">已加载全部</p>
        </el-dialog>
      </el-form-item>
      <el-form-item prop="" label="" v-if="chooseSelect.message != ''">
        <img :src="chooseSelect.urlSrc" style="width: 80px">
        <div style="line-height: 12px">{{chooseSelect.message}}</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createdAdmin">立即更新</el-button>
        <el-button @click="cancleCreated">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getAdminMes, reviseAdminMes } from  '@/api/admin'
  export default {
    name: 'editor',
    data() {
      return {
        adminMes: {
          managerId:'',
          name: '',
          mobile: '',
          role: '',
          position: ''
        },
        roleList: [
          { name: '超级管理员', value: '超级管理员' },
          { name: '平台管理', value: 'master' },
          { name: '中央厨房管理', value: 'vendor' },
          { name: '合作门店管理', value: 'seller' }
        ],
        positionList: [
          { name: '总管理', value: '总管理' },
          { name: '运营管理', value: '运营管理' },
          { name: '前台管理', value: '前台管理' },
          { name: '会员管理', value: '会员管理' },
          { name: '财务管理', value: '财务管理' },
        ],
        dialogTableVisible: false,
        searches:'',
        chooseSelect:{urlSrc:'',message:''},
        merchantChoose: [
          { imgSrc: require('@/assets/tips_img.png') , name: 'asdss' },
        ],
        rule: {
          name: [{ required: true, message: '请输入管理员姓名', trigger: 'blur' }],
          mobile: [{ required: true, message: '请输入正确的手机号', trigger: 'blur' }],
          role: [{ required: true, }],
          position: [{ required: true,message: '请选择' }],
        }
      };

    },
    methods: {
      createdAdmin() {
        this.$refs.adminMes.validate(async valid=>{
          if(valid){
            await reviseAdminMes(this.adminMes)
            this.$router.go(-1)
          }
        })
      },
      cancleCreated() {
        this.$router.go(-1)
      },
      chooseHouse(e){
        this.chooseSelect.message = e.name
        this.chooseSelect.urlSrc = e.imgSrc
        this.dialogTableVisible = false
      }
    },
    async created() {
      let id = this.$route.params.id
      let rs = await getAdminMes(id);
      this.adminMes = rs.data.body
    }
  };
</script>

<style scoped>
.loadinged{
  text-align: center;
  font-size: 15px;
  margin-top: 20px;
}
</style>
