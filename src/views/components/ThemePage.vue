<template>
  <div>
    <div style="max-width: 1000px;margin: 10px auto">
      <el-table ref="table" style="width: 100%;"
                v-loading="loading" :data="themeList"
                border
                :header-cell-style="{background:'#f4f9f4', fontFamily:'Helvetica',fontSize:'14px','text-align':'center'}"
                :cell-style="cellStyle">
        <el-table-column type="index" label="序号" width="55" align="center"/>
        <el-table-column prop="name" label="主题名称" width="355" align="center"/>
        <el-table-column prop="keyword" label="关键字" align="center"/>
        <el-table-column label="风险等级" align="center">
          <template slot-scope="scope">
            {{ parseTortType(scope.row.tortType) }}
          </template>
        </el-table-column>
        <el-table-column prop="flow" label="流量等级" align="center">
          <template slot-scope="scope">
            {{ parseFlow(scope.row.flow) }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"/>
        <!--   编辑与删除   -->
        <el-table-column
          label="操作"
          width="130px"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button size="medium" type="primary" @click="chooseTheme(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <!--<pagination/>-->
    </div>
    <div slot="footer" class="dialog-footer">
      <!--<el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <!--<el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>-->
    </div>
  </div>
</template>

<script>
  import themeApi from '@/api/gallery/theme'

  export default {
    props: {},
    data() {
      return {
        loading: true,
        themeList: [],
        cellStyle({row, column, rowIndex, columnIndex}) {
          return {'text-align': 'center'};
        }
      }
    },

    methods: {
      chooseTheme(data) {
        this.$emit("chooseTheme", data.id, data.name)
      },
      /**
       * 解析风险类型
       * 1、 常规主题 2、一般侵权 3、资金冻结 4、严重侵权
       * @returns {number}
       */
      parseTortType(tortType) {
        switch (tortType) {
          case 1:
            return "常规主题";
          case 2:
            return '一般侵权';
          case 3:
            return '资金冻结';
          case 4:
            return '严重侵权';
          default:
            return '未识别';
        }
      },

      /**
       * 解析流量等级
       * @param flow
       * @returns {string}
       */
      parseFlow(flow){
        if (flow === 1){
          return "常规主题";
        }else
          return "爆款主题";
      }
    },
    mounted: function () {

      themeApi.pageTheme({}).then(res => {
        this.loading = false;
        this.themeList = res.content;
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }

  .el-form {
    .el-form-item {
      width: calc(50% - 30px); /* 每行宽度为50%，减去间隔为20px */
      margin-bottom: 20px;
    }
    .el-input {
      margin-right: 0;
      width: 170%;
    }
    .el-date-picker {
      margin-right: 0;
      width: 170%;
    }
  }
</style>
