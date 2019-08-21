<template>
  <div>
    <el-form ref="adminMes" :model="adminMes" label-width="130px" :rules="rules">
      <el-form-item label="管理员姓名" prop="name">
        <el-input v-model="adminMes.name" style="width: 300px" placeholder="请输入管理员姓名"></el-input>
      </el-form-item>
      <el-form-item label="管理员手机号" prop="mobile">
        <el-input v-model="adminMes.mobile" style="width: 300px" placeholder="请输入管理员手机号"></el-input>
      </el-form-item>
      <el-form-item label="管理员类型" prop="role">
        <el-select v-model="adminMes.role" style="width: 300px" placeholder="请选择管理员类型" @change="chooseRole">
          <el-option
            v-for="item in manageType"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员岗位" prop="position">
        <el-select v-model="adminMes.position" style="width: 300px" placeholder="请选择管理员岗位">
          <el-option
            v-for="item in positionType"
            :label="item.name"
            :key="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="showCompare" v-if="showCompare!=''">
        <el-button type="primary" @click="dialogTableVisible = true">
          {{showCompare=='商户选择'?'选择商户':showCompare}}
        </el-button>
        <el-dialog title="商户选择" :visible.sync="dialogTableVisible">
          <el-input v-model="searches" style="width: 300px" placeholder="商户名称"></el-input>
          <el-button type="primary" style="margin:0 0 30px 10px">搜索</el-button>
          <el-table :data="merchantChoose" :header-cell-style="{background:'#f5f5f8',height:'25px'}">
            <el-table-column property="imgSrc" label="商家封面" width="270" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.imgSrc" style="width: 80px">
              </template>
            </el-table-column>
            <el-table-column property="name" label="商家名称" width="270"></el-table-column>
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
      <el-form-item label="管理员密码" prop="password">
        <el-input type="password" v-model="adminMes.password" style="width: 300px" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="adminMes.password2" style="width: 300px" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createdAdmin">立即创建</el-button>
        <el-button @click="cancleCreated">取消</el-button>
      </el-form-item>

    </el-form>


  </div>
</template>

<script>
  import { addAdmin } from '@/api/admin';
  import { checkPhone } from '@/basical/methods';

  export default {
    name: 'adminAdd',
    data() {
      let checkMobile = (rule, value, callback) => {
        if (checkPhone(value)) callback(new Error('请输入正确的手机号'));
        callback();
      };
      let checkPwd = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {

          if (this.adminMes.password2 != '') {
            this.$refs.adminMes.validateField('password2');
          }
          callback();
        }
      };
      let checkPwdS = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.adminMes.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };
      return {
        adminMes: {
          'name': '',
          'mobile': '',
          'password': '',
          'password2': '',
          'role': '',
          'position': '',
          'vendorId': '',
          'sellerId': '',
          'status': 1
        },
        chooseSelect:{urlSrc:'',message:''},
        manageType: [
          { name: '平台管理', value: 'master' },
          { name: '中央厨房管理', value: 'vendor' },
          { name: '合作门店管理', value: 'seller' }
        ],
        positionType: [
          { name: '总管理', value: '总管理' },
          { name: '运营管理', value: '运营管理' },
          { name: '前台管理', value: '前台管理' },
          { name: '会员管理', value: '会员管理' },
          { name: '财务管理', value: '财务管理' },
        ],
        rules: {
          name: [{ required: true, message: '请输入管理员姓名', trigger: 'blur' }],
          mobile: [{ required: true, validator: checkMobile, trigger: 'blur' }],
          role: [{ required: true, message: '请选择管理员类型', trigger: 'blur' }],
          position: [{ required: true, message: '请选择管理员岗位', trigger: 'blur' }],
          password: [{ required: true, validator: checkPwd, trigger: 'blur' }],
          password2: [{ required: true, validator: checkPwdS, trigger: 'blur' }],
        },
        showCompare: '',
        dialogTableVisible: false,
        searches: '',
        merchantChoose: [
          { imgSrc: require('@/assets/tips_img.png'), name: 'asdss' },
        ],
      };
    },
    methods: {
      createdAdmin() {
        let that =this;
        this.$refs.adminMes.validate(async valid => {
          if (valid) {
            let rs = await addAdmin(this.adminMes);
            let type = 'success';
            let message = '创建成功';
            console.log(that.adminMes.role)
            if(that.adminMes.role == 'vendor' || that.adminMes.role == 'seller'){
              if(that.chooseSelect.urlSrc == '' || that.chooseSelect.message == ''){
                this.$message({
                  type:'warning',
                  message:'请将信息填写完整'
                });
                return ;
              }
            }
            if (rs.code == 400) {
              type = 'error';
              message = rs.desc;
            }
            this.$message({
              type,
              message
            });

            if (rs.code == 200) that.cancleCreated();
          }
        });
      },
      cancleCreated() {
        this.$emit('fun', 'index');
        this.$router.go(-1);
        this.$router.push('../adminManagement');
      },
      chooseRole(e) {
        if (e == 'vendor') {
          this.showCompare = '商户选择';
        } else if (e == 'seller') {
          this.showCompare = '合作门店管理';
        } else {
          this.showCompare = '';
        }
      },
      chooseHouse(e){
        this.chooseSelect.message = e.name
        this.chooseSelect.urlSrc = e.imgSrc
        this.dialogTableVisible = false
      }
    },

  };
</script>

<style scoped>
  .loadinged {
    text-align: center;
    font-size: 15px;
    margin-top: 20px;
  }
</style>
