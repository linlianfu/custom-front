<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :tort-type-list="tortTypeList" :risk-type-list="riskTypeList" :permission="permission"/>
      <!--<crudOperation :permission="permission"/>-->
      <crudOperation :permission="permission"/>
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="goCreate(-1)"
      >
        新增
      </el-button>
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;"
              @selection-change="crud.selectionChangeHandler"
              border
              :header-cell-style="{background:'#f4f9f4', fontFamily:'Helvetica',fontSize:'14px','text-align':'center'}"
              :cell-style="cellStyle">
      <el-table-column type="index" width="55"/>
      <el-table-column prop="storeName" label="店铺"/>
      <el-table-column prop="themeName" label="主题" title="themeName"/>
      <el-table-column prop="riskType" label="主题风险">
        <template slot-scope="scope">
          {{ parseRiskType(scope.row.riskType) }}
        </template>
      </el-table-column>
      <el-table-column prop="upTime" label="上架时间"/>
      <el-table-column prop="productCount" label="上架产品数量"/>
      <el-table-column prop="tort" label="是否侵权">
        <template slot-scope="scope">
          <span>{{scope.row.tort === 0 ? '是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tortType" label="侵权类型">
        <template slot-scope="scope">
          {{ parseTortType(scope.row.tortType) }}
        </template>
      </el-table-column>
      <el-table-column prop="tortTime" label="侵权时间"/>
      <el-table-column prop="intellectualPropertyName" label="知识产权名称"/>
      <!--<el-table-column label="是否删除"/>-->
      <!--<el-table-column prop="status" label="系统提示">-->
        <!--<span>严重侵权</span>-->
      <!--</el-table-column>-->
      <el-table-column prop="remark" label="备注"/>
      <!--<el-table-column prop="createTime" label="创建时间"/>-->
      <!--<el-table-column prop="createId" label="创建人"/>-->
      <!--   编辑与删除   -->
      <el-table-column
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="goCreate(scope.row.id)" />
          <el-popover v-model="scope.row.pop" placement="top" width="180" trigger="manual" @show="onPopoverShow" @hide="onPopoverHide">
            <p>确定删除本条数据吗</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="doCancel(scope.row)">取消</el-button>
              <el-button type="primary" size="mini" @click="crud.doDelete(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop="toDelete(scope.row)" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination/>
    <!--表单渲染-->
    <!--<eForm :job-status="dict.job_status"/>-->
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
          add: false,
          edit: false,
          del: false,
          reset: false,
          download: false
        },
      })
    },
    mixins: [presenter()],

    data() {
      return {
        // 数据字典
        tortTypeList: [{
          value: null,
          label: '请选择侵权类型'
        }, {
          value: 1,
          label: '知产平台治理-一般侵权'
        }, {
          value: 2,
          label: '知识产权-一般侵权'
        }, {
          value: 3,
          label: '资金冻结'
        }, {
          value: 4,
          label: '严重侵权'
        }],
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
        permission: {
        },
        cellStyle({row, column, rowIndex, columnIndex}) {
          return {'text-align': 'center'};
        },
        pop: false
      }
    },
    methods: {
      goCreate(id) {
        this.$router.push({path: '/store/store-theme/add',query:{id:id}}); // 跳转到"/home"
      },
      toDelete(row) {
        row.pop = true
      },
      onPopoverShow() {
        setTimeout(() => {
          document.addEventListener('click', this.handleDocumentClick)
        }, 0)
      },
      onPopoverHide() {
        document.removeEventListener('click', this.handleDocumentClick)
      },
      doCancel(row) {
        row.pop = false
      },
      handleDocumentClick(event) {
        row.pop = false
      },
      /**
       * 解析侵权类型
       * 1、 常规主题 2、一般侵权 3、资金冻结 4、严重侵权
       * @returns {number}
       */
      parseTortType(tortType) {
        switch (tortType) {
          case 1:
            return '知产平台治理-一般侵权';
          case 2:
            return '知识产权-一般侵权';
          case 3:
            return '资金冻结';
          case 4:
            return '严重侵权';
          default:
            return '未识别';
        }
      },
      /**
       * 解析主题风险类型
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
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
