<template>
  <div>
    <div style="max-width: 1000px;margin: 10px auto">
      <el-table ref="table" style="width: 100%;"
                v-loading="loading" :data="storeList"
                border
                :header-cell-style="{background:'#f4f9f4', fontFamily:'Helvetica',fontSize:'14px','text-align':'center'}"
                :cell-style="cellStyle">
        <el-table-column type="index" width="55"/>
        <el-table-column prop="storeName" label="店铺名称"/>
        <el-table-column prop="legalPerson" label="法人"/>
        <el-table-column prop="businessLicense" label="营业执照"/>
        <el-table-column prop="registrationTime" label="注册时间"/>
        <el-table-column prop="tortFraction" label="侵权扣分"/>
        <el-table-column prop="seriousTrotCount" label="严重侵权次数"/>
        <!--   编辑与删除   -->
        <el-table-column
          label="操作"
          width="130px"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button size="medium" type="primary" @click="chooseStore(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="refresh"
        @current-change="refresh"
        :page-sizes="[2,10, 20, 30, 50]"
      />
    </div>
    <div slot="footer" class="dialog-footer">
      <!--<el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <!--<el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>-->
    </div>
  </div>
</template>

<script>
  import storeManager from '@/api/store/storeManager'
  import pagination from '@crud/Pagination'

  export default {
    components: {pagination},
    props: {},
    data() {
      return {
        loading: true,
        storeList: [],
        cellStyle({row, column, rowIndex, columnIndex}) {
          return {'text-align': 'center'};
        }
      }
    },

    methods: {
      chooseStore(data) {
        this.$emit("chooseStore", data.id, data.storeName)
      },
      refresh(){
        storeManager.pageStore({}).then(res => {
          this.loading = false
          this.storeList = res.content;
        })
      }
    },
    mounted: function () {

      storeManager.pageStore({}).then(res => {
        this.loading = false
        this.storeList = res.content;
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
