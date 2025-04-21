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
      <el-table-column type="index" label="序号" width="55" align="center"/>
      <el-table-column prop="name" label="名称" width="150" show-overflow-tooltip align="center"/>
      <el-table-column prop="secretKey" label="密钥" width="150" show-overflow-tooltip align="center"/>
      <el-table-column prop="identityType" label="角色" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.identityType === 1 ? '管理员':'员工'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="webType" label="授权网站" align="center">
        <template slot-scope="scope">
          <span v-for="item in scope.row.webType">
            <span style="margin-left: 10px;font-size: 15px">{{item}}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="authImageParse" label="授权图片解析" align="center">
        <template slot-scope="scope">
          <span v-for="item in scope.row.authImageParse">
            <span style="margin-left: 10px;font-size: 15px">{{item.websiteCode}}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="deviceNumber" label="设备号" align="center" width="150px"/>
      <el-table-column label="状态" align="center" prop="enable">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            @change="changeEnabled(scope.row, scope.row.enable)"
          />
        </template>
      </el-table-column>

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
  import crudJob from '@/api/basicConfig/secretKeyConfig'
  import eHeader from './module/header'
  import eForm from './module/form'
  import CRUD, {presenter} from '@crud/crud'
  import crudOperation from '@crud/CRUD.operation'
  import pagination from '@crud/Pagination'
  import udOperation from '@crud/UD.operation'

  export default {
    name: 'SecretKeyConfig',
    components: {eHeader, eForm, crudOperation, pagination, udOperation},
    cruds() {
      return CRUD({
        title: '密钥配置',
        url: '/api/secretKey/page',
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
      },
      // 回调钩子函数
      [CRUD.HOOK.beforeToEdit](crud, form) {
        form.authImageParseId = []
        form.authImageParse.forEach(function(imageParse, index) {
          form.authImageParseId.push(imageParse.id)
        })
        debugger
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
