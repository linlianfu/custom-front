<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :dict="dict" :permission="permission" :risk-type-list="riskTypeList" :flow-list="flowList"/>
      <crudOperation :permission="permission"/>
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;"
              @selection-change="crud.selectionChangeHandler"
              border :header-cell-style="{background:'#f4f9f4', fontFamily:'Helvetica',fontSize:'14px'}">
      <el-table-column type="index" label="序号" width="55" align="center"/>
      <el-table-column prop="name" label="主题名称(中文)" width="200" show-overflow-tooltip align="center"/>
      <el-table-column prop="theme" label="主题" width="200px" show-overflow-tooltip align="center"/>
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
      <el-table-column prop="associateStoreCount" label="关联店铺数量" align="center"/>
      <el-table-column prop="create" label="创建人" align="center"/>
      <el-table-column prop="remark" label="备注" align="center"/>
      <!--<el-table-column prop="createdId" label="创建人" align="center"/>-->
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
  import crudJob from '@/api/gallery/theme'
  import eHeader from './module/header'
  import eForm from './module/form'
  import CRUD, {presenter} from '@crud/crud'
  import crudOperation from '@crud/CRUD.operation'
  import pagination from '@crud/Pagination'
  import udOperation from '@crud/UD.operation'

  export default {
    name: 'Theme',
    components: {eHeader, eForm, crudOperation, pagination, udOperation},
    cruds() {
      return CRUD({
        title: '主题管理',
        url: '/api/theme/page',
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
        permission: {
        },
        riskTypeList: [{
          value: null,
          label: '请选择侵权类型'
        }, {
          value: 1,
          label: '常规主题'
        }, {
          value: 2,
          label: '一般侵权'
        }, {
          value: 3,
          label: '资金冻结'
        }, {
          value: 4,
          label: '严重侵权'
        }],
        flowList: [{
          value: null,
          label: '请选择流量等级'
        }, {
          value: 1,
          label: '常规主题'
        }, {
          value: 2,
          label: '爆款主题'
        }]
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
      parseFlow(flow){
          if (flow === 1){
            return "常规主题";
          }else
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
