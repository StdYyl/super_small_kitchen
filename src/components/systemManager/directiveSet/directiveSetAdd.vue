<template>
  <div id="directiveSetAdd">
    <div class="header">
      <breadcrumb></breadcrumb>
    </div>
    <div class="directiveSetTable">
      <el-form :model="tableData" :rules="rules" ref="tableData" label-width="100px" class="demo-ruleForm">
        <el-form-item label-width="0" prop="name">
          <el-input class="titleName" placeholder="指令集名称" v-model="tableData.name"></el-input>
        </el-form-item>
        <el-table
          :header-cell-style="{background: '#f5f5f8'}"
          :data="tableData.content"
          highlight-current-row
          style="width: 100%;margin-top: 20px;">
          <el-table-column
            type="index"
            label="指令步骤"
            align="center">
          </el-table-column>
          <el-table-column
            property="directiveId"
            label="指令名称"
            align="center">
            <template slot-scope="scope">
              <el-form-item label-width="0">
                <el-select v-model="scope.row.directiveId" placeholder="请选择" value="scope.row.directiveId">
                  <el-option
                    v-for="directiveItem in directiveList"
                    :key="directiveItem.directiveId"
                    :label="directiveItem.name"
                    :value="directiveItem.directiveId"></el-option>
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
          <a @click="addLine" href="javascript:0;" style="color: #1890ff">增加一行</a>
          <a @click="delLine" href="javascript:0;" style="margin-left: 20px;color: #f56c6c">删除一行</a>
        </div>
        <el-form-item label-width="0">
          <el-button type="primary" @click="submitForm('tableData')">立即添加</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { addDirectiveSet } from '@/api/directiveSet';
  import { getDirectiveList} from '@/api/directive';
  import breadcrumb from '@/components/currency/breadcrumb';

  export default {
    name: 'directiveSetAdd',
    components: { breadcrumb },
    data() {
      return {
        directiveList: [],
        tableData: {
          content: [
            {
              capacity: "",
              directiveId: "",
              power: "",
              remark1: "",
              remark2: "",
              step: 1,
              temperature: "",
              time: ""
            },
          ],
          name: "",
          sort: 1,
          status: 1,
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var isDo = true;
            for (var i = 0; i < this.tableData.content.length; i++) {
              if (this.tableData.content[i].directiveId==='') {
                isDo = false;
                break;
              }
            }
            if (isDo) {
              addDirectiveSet(this.tableData)
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
            }else {
              this.$message({
                type: 'error',
                message: '请选择指令名称'
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$router.back(-1);
      },
      addLine:function(){
        this.tableData.content.push(
          {
            capacity: "",
            directiveId: "",
            power: "",
            remark1: "",
            remark2: "",
            step: 1,
            temperature: "",
            time: ""
          }
        )
      },
      delLine:function(){
        this.tableData.content.pop();
      },
      init: function () {
        /*getDirective(this.$route.params.id)
          .then(val => {
            //登录实现后，将该语句改为
            //this.ruleForm.parentId = val.parentId;
            if (val) {
              this.ruleForm.region = val.categoryId;
            }
            //this.ruleForm = {"code":200,"body":{"categoryId":"RQP8HV8GDLL5Z96","parentId":"","name":"营养早餐","cover":"d0/goodsCategory/190219/y630codxqplokk61.jpg","description":"营养早餐，真的棒666","tags":{"hot":true,"search":false},"sort":1,"status":1},"time":1565943605947}.body;
          });*/
        getDirectiveList()
          .then(val => {
            this.directiveList = val;
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
