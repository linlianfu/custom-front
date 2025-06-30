<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :dict="dict" :permission="permission"/>
      <crudOperation :permission="permission"/>
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;font-size: 14px"
              @selection-change="crud.selectionChangeHandler"
              border :header-cell-style="{background:'#f4f9f4', fontFamily:'Helvetica',fontSize:'14px'}">
      <el-table-column type="index" label="序号" width="55" align="center"/>
      <el-table-column prop="name" label="名称" width="120" show-overflow-tooltip align="center"/>
      <el-table-column prop="secretKey" label="Token" width="120" show-overflow-tooltip align="center"/>
      <el-table-column prop="identityType" label="角色" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.identityType === 1 ? '管理员':'员工'}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="belong" label="归属" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.belong === 1 ? '内部':'外部'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="webType" label="授权网站" align="center">
        <template slot-scope="scope">
          <div v-for="item in scope.row.webType">
            <p style="margin-left: 10px;font-size: 15px">{{item}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="previewImageParse" label="预览图片解析" align="center" width="180px">
        <template slot-scope="scope">
          <div v-for="item in scope.row.previewImageParse">
            <p style="font-size: 15px">{{item.parseName}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="authImageParse" label="下载图片解析" align="center" width="180px">
        <template slot-scope="scope">
          <div v-for="item in scope.row.authImageParse">
            <p style="font-size: 15px">{{item.parseName}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="deviceNumber" label="设备号" align="center" width="190px"/>
      <el-table-column prop="lastLoginTime" label="最后登录时间" align="center" width="190px"/>
      <el-table-column label="状态" align="center" prop="enable"width="85">
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
        width="230px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <!--<udOperation-->
            <!--:data="scope.row"-->
            <!--:permission="permission"-->
          <!--/>-->

          <el-button :loading="crud.status.cu === 2"
                     size="mini" type="primary" icon="el-icon-edit" @click.stop="crud.toEdit(scope.row)">编辑</el-button>

          <el-popover v-model="scope.row.pop" placement="top" width="180" trigger="manual"
                      :ref="`node-${scope.row.id}`"
                      style="margin-top: 5px">
            <p>确定重置设备号吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="doCancel(scope.row)">取消</el-button>
              <el-button type="primary" size="mini" @click="resetDeviceNumber(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" type="primary" icon="el-icon-refresh" size="mini"
                       class="el-button el-button--success el-button--mini"
                       @click.stop="toResetDeviceNumber(scope.row)"  style="margin-top: 5px">
              重置设备
            </el-button>
          </el-popover>
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
        title: 'Token配置',
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
        this.$confirm('此操作将' + this.dict.label.job_status[val] + ' [ ' + data.secretKey + ' ]Token, 是否继续？', '提示', {
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
      toResetDeviceNumber(row) {
        row.pop = true
      },
      resetDeviceNumber(row){
        crudJob.resetDeviceNumber(row.id).then(() => {
          this.crud.notify('重置设备号成功', 'success')
          row.pop = false
        }).catch(err => {
          console.log(err.data.message)
        })
      },
      doCancel(row) {
        row.pop = false
      },
      // 回调钩子函数
      [CRUD.HOOK.beforeToEdit](crud, form) {
        form.authImageParseId = []
        form.previewImageParseId = []
        form.authImageParse.forEach(function(imageParse, index) {
          form.authImageParseId.push(imageParse.id)
        })
        form.previewImageParse.forEach(function(imageParse, index) {
          form.previewImageParseId.push(imageParse.id)
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
