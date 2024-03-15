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
              border :header-cell-style="{background:'#f4f9f4', fontFamily:'Helvetica',fontSize:'14px','text-align':'center'}"
              :cell-style="cellStyle">
      <el-table-column type="index" width="55"/>
      <el-table-column prop="storeName" label="店铺名称"/>
      <el-table-column prop="legalPerson" label="法人"/>
      <el-table-column prop="businessLicense" label="营业执照"/>
      <el-table-column prop="registrationTime" label="注册时间"/>
      <el-table-column prop="tortFraction" label="侵权扣分"/>
      <el-table-column prop="seriousTrotCount" label="严重侵权次数"/>
      <el-table-column prop="status" label="店铺状态">
        <template slot-scope="scope">
          <span>{{scope.row.status === 1 ? '运营中':'退出运营'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="exitTime" label="退出时间"/>
      <el-table-column prop="shopId" label="商户 id"/>
      <el-table-column prop="platformType" label="所属平台">
        <template slot-scope="scope">
          <span>{{scope.row.platformType === 1 ? '速卖通':'Temu'}}</span>
        </template>
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
  import crudJob from '@/api/store/storeManager'
  import eHeader from './module/header'
  import eForm from './module/form'
  import CRUD, {presenter} from '@crud/crud'
  import crudOperation from '@crud/CRUD.operation'
  import pagination from '@crud/Pagination'
  import udOperation from '@crud/UD.operation'

  const defaultForm = {
    stId: null,
    storeName: null,
    legalPerson: null,
    businessLicense: null,
    registrationTime: null,
    tortFraction: null,
    seriousTrotCount: null,
    status: null,
    exitTime: null,
    shopId: null,
    platformType: null
  }

  export default {
    name: 'StoreManager',
    components: {eHeader, eForm, crudOperation, pagination, udOperation},
    cruds() {
      return CRUD({
        title: '店铺管理',
        url: '/api/store',
        crudMethod: {...crudJob},
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
          crudJob.edit(data).then(() => {
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

      [CRUD.HOOK.afterValidateCU](crud) {
        if (crud.form.status === 2 && crud.form.exitTime === null) {
          this.$message({
            message: '请选择退出时间',
            type: 'warning'
          });
          return false
        }
        return true
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
      parseFlow(flow) {
        if (flow === 1) {
          return "常规主题";
        } else
          return "爆款主题";
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
