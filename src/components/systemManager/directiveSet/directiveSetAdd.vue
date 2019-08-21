<template>
  <div id="directiveSetAdd">
    <div class="header">
      <breadcrumb></breadcrumb>
    </div>
    <div class="directiveSetTable">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label-width="0" prop="name">
          <el-input class="titleName" placeholder="指令集名称" v-model="name"></el-input>
        </el-form-item>
        <el-table
          :header-cell-style="{background: '#f5f5f8'}"
          :data="tableData"
          highlight-current-row
          style="width: 100%;margin-top: 20px;">
          <el-table-column
            type="index"
            property="name"
            label="指令步骤"
            align="center">
          </el-table-column>
          <el-table-column
            property="directiveId"
            label="指令名称"
            align="center">
            <template slot-scope="scope">
              <el-form-item label-width="0">
                <el-select v-model="ruleForm.region" placeholder="请选择" value="ruleForm.region">
                  <el-option
                    v-for="goodsCategoryItem in goodsCategoryList"
                    :key="goodsCategoryItem.categoryId"
                    :label="goodsCategoryItem.name"
                    :value="goodsCategoryItem.categoryId"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            property="temperature"
            label="温度（摄氏度）"
            align="center">
            <template slot-scope="scope">
              <el-input
                placeholder="指令温度"
                v-model="scope.row.temperature"
                type="text"
                :value="scope.row.temperature">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="time"
            label="时间（秒）"
            align="center">
            <template slot-scope="scope">
              <el-input
                placeholder="指令时间"
                v-model="scope.row.time"
                type="text"
                :value="scope.row.time">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="capacity"
            label="容量（毫升）"
            align="center">
            <template slot-scope="scope">
              <el-input
                placeholder="指令容量"
                v-model="scope.row.capacity"
                type="text"
                :value="scope.row.capacity">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="power"
            label="功率（瓦）"
            align="center">
            <template slot-scope="scope">
              <el-input
                placeholder="指令功率"
                v-model="scope.row.power"
                type="text"
                :value="scope.row.power">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="position"
            label="位置"
            align="center">
            <template slot-scope="scope">
              <el-input
                placeholder="位置"
                v-model="scope.row.position"
                type="text"
                :value="scope.row.position">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="remark1"
            label="备注"
            align="center">
            <template slot-scope="scope">
              <el-input
                placeholder="指令备注"
                v-model="scope.row.remark1"
                type="text"
                :value="scope.row.remark1">
              </el-input>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;padding-top: 20px">
          <a @click="" href="javascript:0;" style="color: #1890ff">增加一行</a>
          <a @click="" href="javascript:0;" style="margin-left: 20px;color: #f56c6c">删除一行</a>
        </div>
        <el-form-item label-width="0">
          <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { getGoodsCategory, getGoodsCategoryList, addGoodsCategory } from '@/api/goodsCategory';
  import breadcrumb from '@/components/currency/breadcrumb';

  export default {
    name: 'directiveSetAdd',
    components: { breadcrumb },
    data() {
      return {
        name:'',
        goodsCategoryList: [],
        tableData: [
          {
            capacity: 13,
            directiveId: 'RKX4UOQVD3EL2VW',
            power: 14,
            remark1: '16',
            remark2: '',
            position: '15',
            step: 1,
            temperature: 11,
            time: 12
          }
        ],
        ruleForm: {
          categoryId: '',
          parentId: '',
          region: '',
          name: '',
          sort: '',
          cover: '',
          tags: {
            hot: false,
            search: false
          },
          description: '',
        },
        rules: {
          name: [
            { required: true, message: '请填写指令集名称', trigger: 'blur' },
          ]
        }

      };
    },
    methods: {
      submitForm(formName) {
        this.ruleForm.parentId = this.ruleForm.region;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //接收到的分类信息中tags是json对象"tags":{"hot":true,"search":false}，而修改时接口期望数组"tags": ["hot"]
            //在此进行转化
            /*var tag = [];
            for (var item in this.ruleForm.tags)
              if (`this.ruleForm.tags.${item}`)
                tag.push(item);
            this.ruleForm.tags = tag;*/
            //over
            addGoodsCategory(this.ruleForm)
              .then(value => {
                if (value.code === 200) {
                  this.$router.back(-1);
                  this.$message({
                    type: 'success',
                    message: '添加成功'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: value.desc
                  });
                }
              });
            //console.log(this.ruleForm);
            //console.log(editGoodsCategory(this.ruleForm));
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$router.back(-1);
      },
      init: function () {
        getGoodsCategory(this.$route.params.id)
          .then(val => {
            //登录实现后，将该语句改为
            //this.ruleForm.parentId = val.parentId;
            if (val) {
              this.ruleForm.region = val.categoryId;
            }
            //this.ruleForm = {"code":200,"body":{"categoryId":"RQP8HV8GDLL5Z96","parentId":"","name":"营养早餐","cover":"d0/goodsCategory/190219/y630codxqplokk61.jpg","description":"营养早餐，真的棒666","tags":{"hot":true,"search":false},"sort":1,"status":1},"time":1565943605947}.body;
          });
        getGoodsCategoryList()
          .then(val => {
            this.goodsCategoryList = val;
          });
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style lang="scss">
  #directiveSetAdd{
    .titleName{
      input{
        font-size: 21px;
        width: 200px;
        border: none;
      }
    }
    input{
      font-weight: 100;
    }
    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>
