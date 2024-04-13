<template>
  <div style="max-width: 1000px;margin: 10px auto">
    <div class="head-container">
      <el-input v-model="param.name" clearable size="medium" placeholder="请输入主题名称搜索" style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="refresh"/>
      <el-input v-model="param.theme" clearable size="medium" placeholder="请输入主题搜索" style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="refresh"/>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="refresh">搜索</el-button>
    </div>
    <el-table ref="table" style="width: 100%;"
              v-loading="loading" :data="themeList"
              border
              :header-cell-style="{background:'#f4f9f4', fontFamily:'Helvetica',fontSize:'14px','text-align':'center'}"
              :cell-style="cellStyle">
      <el-table-column type="index" label="序号" width="55" align="center"/>
      <el-table-column prop="name" label="主题名称" align="center"/>
      <el-table-column prop="theme" label="主题" align="center"/>
      <el-table-column prop="label" label="标签" align="center"/>
      <el-table-column label="风险等级" align="center">
        <template slot-scope="scope">
          {{ parseRiskType(scope.row.riskType) }}
        </template>
      </el-table-column>
      <el-table-column prop="flow" label="流量等级" align="center">
        <template slot-scope="scope">
          {{ parseFlow(scope.row.flow) }}
        </template>
      </el-table-column>
      <el-table-column prop="create" label="创建人" align="center"/>
      <el-table-column prop="remark" label="备注" align="center"/>
      <!--   编辑与删除   -->
      <el-table-column
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button v-if="currentThemeId !== scope.row.id" size="medium"
                     type="primary" @click="chooseTheme(scope.row)">选择
          </el-button>
          <el-button v-if="currentThemeId === scope.row.id" size="medium"
                     type="warning" @click="cancelChooseTheme(scope.row)">取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <!--分页组件-->
    <el-pagination
      :page-size.sync="pageParam.size"
      :total="totalSize"
      :current-page.sync="pageParam.current"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
      :page-sizes="[10, 20, 30, 50]"
    />
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
        totalSize: 0,
        currentThemeId: null,
        param: {
          name: null,
          theme: null
        },
        pageParam: {
          current: 1,
          size: 10,
        },
        currentPage: 1,
        cellStyle({row, column, rowIndex, columnIndex}) {
          return {'text-align': 'center'};
        }
      }
    },

    methods: {
      chooseTheme(data) {
        this.$emit("chooseTheme", data.id, data.theme)
        this.currentThemeId = data.id
      },
      cancelChooseTheme(data) {
        this.$emit("cancelChooseTheme", data.id, data.theme)
        this.currentThemeId = null
      },
      sizeChange(e) {
        this.pageParam.size = e;
        this.refresh();
      },
      pageChange(e) {
        this.pageParam.current = e;
        this.refresh();
      },
      refresh() {
        this.loading = true
        const params = {
          size: this.pageParam.size,
          current: this.pageParam.current,
          name: this.param.name,
          theme: this.param.theme
        };
        themeApi.pageTheme(params).then(res => {
          this.totalSize = res.totalElements;
          this.themeList = res.content;
          this.loading = false
        })
      },
      /**
       * 解析风险类型
       * 1、 常规主题 2、一般侵权 3、资金冻结 4、严重侵权
       * @returns {number}
       */
      parseRiskType(riskType) {
        switch (riskType) {
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
      parseFlow(flow) {
        if (flow === 1) {
          return "常规主题";
        } else
          return "爆款主题";
      }
    },
    mounted: function () {

      themeApi.pageTheme({}).then(res => {
        this.loading = false;
        this.themeList = res.content;
        this.totalSize = res.totalElements
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
