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
        <el-select v-model="adminMes.role" style="width: 300px" placeholder="请选择管理员类型">
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
      <el-form-item label="管理员密码" prop="password">
        <el-input v-model="adminMes.password" style="width: 300px" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="adminMes.password2" style="width: 300px" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createdAdmin">立即创建</el-button>
        <el-button @click="cancleCreated">取消</el-button>
      </el-form-item>

    </el-form>


  </div>
</template>

<script>
  export default {
    name: 'adminAdd',
    data() {
      return {
        adminMes: {
          name: '',
          mobile: '',
          password: '',
          password2: '',
          role: '',
          position: ''
        },
        manageType: [
          { name: '平台管理', value: '平台管理' },
          { name: '中央厨房管理', value: '中央厨房管理' },
          { name: '合作门店管理', value: '合作门店管理' }
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
          mobile: [{ required: true, message: '请输入正确的手机号', trigger: 'blur' }],
          role: [{ required: true, message: '请选择管理员类型', trigger: 'blur' }],
          position: [{ required: true, message: '请选择管理员岗位', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          password2: [{ required: true, message: '请确认密码', trigger: 'blur' }],

        }
      };
    },
    methods: {
      createdAdmin() {
        this.$refs.adminMes.validate(valid => {
          if (valid) {
            console.log(this.adminMes);
            this.$message({
              type: 'success',
              message: '创建成功'
            });
            this.cancleCreated();
          }
        });
      },
      cancleCreated() {
        this.$emit('fun', 'index');
        this.$router.push('../adminManagement');
      }
    }
  };
</script>

<style scoped>

</style>
