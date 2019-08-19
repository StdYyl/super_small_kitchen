<template>
  <div id="app" class="directive">
    <div class="header">
      <breadcrumb></breadcrumb>
    </div>
    <div class="directiveTable" id="directive">
      <el-button @click="directiveAdd" style="float: right" type="primary">添加指令</el-button>
      <div style="clear: both;"></div>
      <el-table
        :header-cell-style="{background: '#f5f5f8'}"
        :data="tableData"
        highlight-current-row
        style="width:100%;margin-top: 20px;">
        <el-table-column
          type="index"
          label="序号"
          align="left">
        </el-table-column>
        <el-table-column
          property="name"
          label="指令名称"
          align="left">
        </el-table-column>
        <el-table-column
          property="description"
          align="left"
          label="指令描述">
        </el-table-column>
        <el-table-column
          property="operation"
          label="操作"
          align="center">
          <template slot-scope="scope">
          <span class="templateSpan" style="color:#409eff">
            <span @click="directiveEdit(scope.row)">修改</span>
            <span
              @click="ban(scope.row)"
              :style="scope.row.status === 1?'color:#409eff':'color:#fe6a58'">
              {{scope.row.status ===1 ? '禁用':'解禁'}}</span>
            <span @click="directiveDel(scope.row.directiveId)" style="color: #fe6a58">删除</span>
          </span>
          </template>
        </el-table-column>
      </el-table>

<!--      弹窗-->
      <el-dialog :title="formLabel.name" style="min-width: 1000px;" width="40%" :visible.sync="editWindow">
        <el-form label-position="top" :model="form">
          <div class="directiveForm">
            <el-form-item label="名称">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <div class="directiveFormInner"></div>
            <el-form-item label="地址">
              <el-input v-model="form.address" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="directiveForm">
            <el-form-item label="命令">
              <el-input v-model="form.command" auto-complete="off"></el-input>
            </el-form-item>
            <div class="directiveFormInner"></div>
            <el-form-item label="参数">
              <el-input v-model="form.param" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="directiveForm">
            <el-form-item label="描述">
              <el-input v-model="form.description" auto-complete="off"></el-input>
            </el-form-item>
            <div class="directiveFormInner"></div>
            <el-form-item label="备注1">
              <el-input v-model="form.remark1" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="directiveForm">
            <el-form-item label="备注2">
              <el-input v-model="form.remark2" auto-complete="off"></el-input>
            </el-form-item>
            <div class="directiveFormInner"></div>
            <el-form-item label="备注3">
              <el-input v-model="form.remark3" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="directiveForm">
            <el-form-item label="排序">
              <el-input v-model="form.sort" auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="default" @click="editWindow=false">取 消</el-button>
          <el-button type="primary" @click="formDo">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import {getDirectiveList,editDirective,delDirective,addDirective} from '@/api/directive';
  import breadcrumb from '@/components/currency/breadcrumb';
  export default {
    name:"directive",
    components:{breadcrumb},
    data() {
      return {
        editWindow:false,
        formLabel:{name:'更新指令',caozuo:'edit'},
        tableData: [],
        form:{},
      }
    },
    methods: {
      directiveEdit:function (row) {
        this.formLabel = {name:'更新指令',caozuo:'edit'};
        this.form = row;
        this.editWindow = true;
      },
      directiveAdd:function () {
        this.formLabel = {name:'更新指令',caozuo:'add'};
        this.form = {};
        this.editWindow = true;
      },
      ban:function(row){
        this.form = row;
        this.form.status = this.form.status === 1?2:1;
        editDirective(this.form).then(value => {
          if (value.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.init();
          }else {
            this.$message({
              type: 'error',
              message: value.desc
            });
          }
        });
      },
      directiveDel:function (id) {
        var form1 = {};
        form1.directiveId = id;
        this.$confirm('此操作将永久删除该指令, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDirective(form1).then(value => {
            if (value.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.init();
            }else {
              this.$message({
                type: 'error',
                message: value.desc
              });
            }
          });
        })
      },
      formDo:function(){
        this.editWindow = false;
        if (this.formLabel.caozuo==='edit') {
          editDirective(this.form).then(value => {
            if (value.code === 200) {
              this.$message({
                type: 'success',
                message: '更新成功'
              });
              this.init();
            }else {
              this.$message({
                type: 'error',
                message: value.desc
              });
            }
          });
        }else if (this.formLabel.caozuo === 'add') {
          addDirective(this.form).then(value => {
            if (value.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              this.init();
            }else {
              this.$message({
                type: 'error',
                message: value.desc
              });
            }
          });
        }
      },
      init:function () {
        getDirectiveList().then(val => {
          this.tableData = val;
        });
      }
    },
    mounted() {
      this.init();
    }
  }
</script>
<style lang="scss">
  /*以下样式不会影响全局*/
  .directiveForm{
    display: flex;
    .el-form-item{
      flex: 1;
    }
    .directiveFormInner{
      width: 10px;
    }
  }
  /*以下样式将被所有菜谱相关页面继承*/
  .directive {
    .header{
      margin: 34px 0 20px 0 ;
      padding-left: 20px;
      padding-top: 20px;
      border: 1px solid #ddd;
      background-color: #fff;
      font-weight: 400;
    }
  .el-table th, .el-table tr {
    background: none;
  }

  .templateSpan span {
    cursor: pointer;
  }

  .templateSpan span:after {
    content: " | ";
    color: #999999;
  }

  .templateSpan span:last-child:after {
    content: "";
  }


  /*控制表格外框和白背景*/
  .directiveTable {
    padding: 23px 30px;
    margin-top: 30px;
    min-height: 800px;
    border: 1px solid #ddd;
    background: white;
  }
  }


</style>

