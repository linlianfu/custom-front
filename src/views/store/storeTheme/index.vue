<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :dict="dict" :permission="permission"/>
      <!--<crudOperation :permission="permission"/>-->
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="goCreate"
      >
        新增
      </el-button>
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;"
              @selection-change="crud.selectionChangeHandler"
              border :header-cell-style="{background:'#f4f9f4', fontFamily:'Helvetica',fontSize:'14px','text-align':'center'}"
              :cell-style="cellStyle">
      <el-table-column type="index" width="55"/>
      <el-table-column prop="storeName" label="店铺"/>
      <el-table-column prop="themeName" label="主题"/>
      <el-table-column prop="upTime" label="上架时间"/>
      <el-table-column prop="productCount" label="上架产品数量"/>
      <el-table-column prop="tort" label="是否侵权"/>
      <el-table-column prop="tortType" label="侵权类型"/>
      <el-table-column prop="tortTime" label="侵权时间"/>
      <el-table-column label="是否删除"/>
      <el-table-column prop="status" label="系统提示">
          <span>严重侵权</span>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="createId" label="创建人"/>
      <!--   编辑与删除   -->
      <el-table-column
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination/>
    <!--表单渲染-->
    <eForm :job-status="dict.job_status"/>
  </div>
</template>

<script>
  import crudStoreTheme from '@/api/store/storeTheme'
  import eHeader from './module/header'
  import eForm from './module/form'
  import CRUD, {presenter} from '@crud/crud'
  import crudOperation from '@crud/CRUD.operation'
  import pagination from '@crud/Pagination'
  import udOperation from '@crud/UD.operation'

  export default {
    name: 'StoreTheme',
    components: {eHeader, eForm, crudOperation, pagination, udOperation},
    cruds() {
      return CRUD({
        title: '店铺主题管理',
        url: '/api/storeTheme',
        crudMethod: {...crudStoreTheme},
        optShow: {
          add: true,
          edit: false,
          del: false,
          reset: false,
          download: false
        },
      })
    },
    mixins: [presenter()],
    // 数据字典
    dicts: ['job_status'],
    data() {
      return {
        permission: {
          add: ['admin', 'job:add'],
          edit: ['admin', 'job:edit'],
          del: ['admin', 'job:del']
        },
        cellStyle({row, column, rowIndex, columnIndex}) {
          return {'text-align': 'center'};
        }
      }
    },
    methods: {
      // 改变状态
      changeEnabled(data, val) {
        this.$confirm('此操作将 "' + this.dict.label.job_status[val] + '" ' + data.name + '岗位, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // eslint-disable-next-line no-undef
          crudStoreTheme.edit(data).then(() => {
            // eslint-disable-next-line no-undef
            this.crud.notify(this.dict.label.job_status[val] + '成功', 'success')
          }).catch(err => {
            data.enabled = !data.enabled
            console.log(err.data.message)
          })
        }).catch(() => {
          data.enabled = !data.enabled
        })
      },
      goCreate(){
        this.$router.push({ path: '/store/store-theme/add' }); // 跳转到"/home"
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
