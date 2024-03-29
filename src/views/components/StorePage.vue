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
            <el-button v-if="currentStoreId !== scope.row.id" size="medium"
                       type="primary" @click="chooseStore(scope.row)">选择</el-button>
            <el-button v-if="currentStoreId === scope.row.id" size="medium"
                       type="warning" @click="cancelChooseStore(scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <div slot="footer" class="dialog-footer">
      <!--<el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <!--<el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>-->
    </div>
  </div>
</template>

<script>
  import storeManager from '@/api/store/storeManager'

  export default {
    props: {},
    data() {
      return {
        loading: true,
        storeList: [],
        totalSize: 0,
        pageParam: {
          current: 1,
          size: 10,
        },
        currentPage: 1,
        currentStoreId:null,
        cellStyle({row, column, rowIndex, columnIndex}) {
          return {'text-align': 'center'};
        }
      }
    },

    methods: {
      chooseStore(data) {
        this.$emit("chooseStore", data.id, data.storeName);
        this.currentStoreId = data.id
      },
      cancelChooseStore(data){
        this.$emit("cancelChooseStore", data.id, data.storeName);
        this.currentStoreId = null;
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
        const params = {size: this.pageParam.size, current: this.pageParam.current};
        storeManager.pageStore(params).then(res => {
          this.totalSize = res.totalElements;
          this.storeList = res.content;
          this.loading = false
        })
      }
    },
    mounted: function () {
      storeManager.pageStore({}).then(res => {
        this.loading = false
        this.storeList = res.content;
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
