<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :dict="dict" :permission="permission"/>
      <crudOperation :permission="permission"/>
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;"
              @selection-change="crud.selectionChangeHandler"
              border :header-cell-style="{background:'#f4f9f4', fontFamily:'Helvetica',fontSize:'14px'}">
      <el-table-column type="index" label="序号" width="100" align="center"/>
      <el-table-column prop="parseName" label="解析名称" show-overflow-tooltip align="center"/>
      <el-table-column prop="websiteCode" label="网站" show-overflow-tooltip align="center"/>
      <!--<el-table-column prop="parseUrl" label="解析地址" show-overflow-tooltip align="center"/>-->
      <el-table-column prop="parseUrl" label="解析地址" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <a :href="`${scope.row.parseUrl}`" target="_blank" style="color: blue">{{scope.row.parseUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="parseType" label="解析类型" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.parseType === 1 ? 'PNG':'JPG'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="authUserCount" label="已授权用户数" show-overflow-tooltip align="center"/>
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
    <eForm/>
  </div>
</template>

<script>
  import crudJob from '@/api/resource/imageParse'
  import eHeader from './module/header'
  import eForm from './module/form'
  import CRUD, {presenter} from '@crud/crud'
  import crudOperation from '@crud/CRUD.operation'
  import pagination from '@crud/Pagination'
  import udOperation from '@crud/UD.operation'

  export default {
    name: 'ImageParse',
    components: {eHeader, eForm, crudOperation, pagination, udOperation},
    cruds() {
      return CRUD({
        title: '图片解析地址管理',
        url: '/api/imageParse/page',
        crudMethod: {...crudJob},
        optShow: {
          add: true,
          edit: false,
          del: false,
          reset: false,
          download :false
        },
      })
    },
    mixins: [presenter()],
    // 数据字典
    dicts: ['job_status'],
    data() {
      return {
        permission: {},
      }
    },
    methods: {
      // 改变状态
      changeEnabled(data, val) {
        this.$confirm('此操作将' + this.dict.label.job_status[val] + ' [ ' + data.secretKey + ' ]密钥, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          crudJob.updateStatus(data.id).then(() => {
            this.crud.notify(this.dict.label.job_status[val] + '成功', 'success')
            data.enabled = !data.enabled
          }).catch(err => {
            console.log(err.data.message)
          })
        }).catch(() => {
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
