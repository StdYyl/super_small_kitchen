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
          <el-option label="超级管理" value="超级管理"></el-option>
          <el-option label="平台管理" value="平台管理"></el-option>
          <el-option label="中央厨房管理" value="中央厨房管理"></el-option>
          <el-option label="合作门店管理" value="合作门店管理"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="position" label="管理员岗位">
        <el-select v-model="adminMes.position" placeholder="请选择管理员类型" style="width: 230px">
          <el-option v-for="item in positionList" :label="item.name" :value="item.value" :key="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="" label="商户选择">
        <el-button type="primary" @click="chooseMerchants" plain>选择商户</el-button>
        <el-dialog title="商户选择" :visible.sync="dialogTableVisible">
          <el-input style="width: 300px" placeholder="商户名称"></el-input>
          <el-button type="primary" style="margin:0 0 30px 10px" >搜索</el-button>
          <el-table :data="merchantChoose" :header-cell-style="{background:'#f5f5f8',height:'25px'}">
            <el-table-column property="imgSrc" label="商家封面" width="270"  align="center">
              <template slot-scope="scope">
                <img :src="scope.row.imgSrc" style="width: 80px">
              </template>
            </el-table-column>
            <el-table-column property="name" label="商家名称" width="270"></el-table-column>
            <el-table-column property="" label="操作">
              <el-button type="text" @click="">选择</el-button>
            </el-table-column>
          </el-table>
          <p class="loadinged">已加载全部</p>
        </el-dialog>
      </el-form-item>
      <el-form-item prop="" label="">
        <img src="@/assets/tips_img.png" style="width: 80px">
        <div style="line-height: 12px">222</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createdAdmin">立即更新</el-button>
        <el-button @click="cancleCreated">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: 'editor',
    data() {
      return {
        adminMes: {
          name: '1',
          mobile: '15738258511',
          role: '超级管理员',
          position: ''
        },
        roleList: [
          { name: '超级管理员', value: '超级管理员' },
          { name: '平台管理', value: '平台管理' },
          { name: '中央厨房管理', value: '中央厨房管理' },
          { name: '合作门店管理', value: '合作门店管理' }
        ],
        positionList: [
          { name: '总管理', value: '总管理' },
          { name: '运营管理', value: '运营管理' },
          { name: '前台管理', value: '前台管理' },
          { name: '会员管理', value: '会员管理' },
          { name: '财务管理', value: '财务管理' },
        ],
        dialogTableVisible: false,
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
        this.$refs.adminMes.validate(valid=>{
          if(valid){
            this.$emit('fun', 'index');
            this.$router.go(-1)
          }
        })
      },
      cancleCreated() {
        this.$router.go(-1)
      },
      chooseMerchants() {
        this.dialogTableVisible = true;
      }
    },
    created() {

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
