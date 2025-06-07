<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :tort-type-list="tortTypeList" :risk-type-list="riskTypeList" :tort-list="tortList"
               :permission="permission"/>
      <div class="crud-opts">

        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="goCreate(-1)"
        >
          新增
        </el-button>

        <el-button-group class="crud-opts-right">
          <el-button
            size="mini"
            plain
            type="info"
            icon="el-icon-search"
          />
          <el-button
            size="mini"
            icon="el-icon-refresh"
          />
          <el-popover
            placement="bottom-end"
            width="150"
            trigger="click"
          >
            <el-button
              slot="reference"
              size="mini"
              icon="el-icon-s-grid"
            >
              <i
                class="fa fa-caret-down"
                aria-hidden="true"
              />
            </el-button>
          </el-popover>
        </el-button-group>
      </div>
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;font-size: 14px"
              @selection-change="crud.selectionChangeHandler"
              border
              :header-cell-style="{background:'#f4f9f4', fontFamily:'Helvetica',fontSize:'14px','text-align':'center'}"
              :cell-style="cellStyle"
              :default-sort="{prop: 'upTime', order: 'descending'}"
              @sort-change="sortChange">
      <el-table-column type="index" width="55" label="序号"/>
      <el-table-column prop="ruleName"  label="字符替换名称"/>
      <el-table-column prop="website" label="网站" show-overflow-tooltip />
      <el-table-column label="替换规则">
        <template slot-scope="scope">
          <p v-for="item in scope.row.characterReplaceGroup" :key="item.value" :label="item.label" :value="item.value">
            <span>
              {{item.originCharacter}}
            </span>
            <span>替换为</span>
            <span>
              {{item.newCharacter}}
            </span>
          </p>
        </template>
      </el-table-column>
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
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="goCreate(scope.row.id)"/>
          <el-popover v-model="scope.row.pop" placement="top" width="180" trigger="manual"
                      :ref="`node-${scope.row.id}`">
            <p>确定删除本条数据吗</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="doCancel(scope.row)">取消</el-button>
              <el-button type="primary" size="mini" @click="crud.doDelete(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"
                       @click.stop="toDelete(scope.row)"/>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination/>
  </div>
</template>

<script>
  import crudCharacterReplaceRule from '@/api/resource/characterReplaceRule'
  import eHeader from './module/header'
  import eForm from './module/form'
  import CRUD, {presenter} from '@crud/crud'
  import crudOperation from '@crud/CRUD.operation'
  import pagination from '@crud/Pagination'
  import udOperation from '@crud/UD.operation'

  export default {
    name: 'CharacterReplaceRule',
    components: {eHeader, eForm, crudOperation, pagination, udOperation},
    cruds() {
      return CRUD({
        title: '字符替换规则',
        url: '/api/characterReplaceRule/page',
        crudMethod: {...crudCharacterReplaceRule},
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
    // 数据字典
    dicts: ['job_status'],

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
        tortList: [{
          value: null,
          label: '请选择是否侵权'
        }, {
          value: 0,
          label: '否'
        }, {
          value: 1,
          label: '是'
        }],
        permission: {},
        cellStyle({row, column, rowIndex, columnIndex}) {
          return {'text-align': 'center'};
        },
        pop: false
      }
    },
    methods: {
      goCreate(id) {
        this.$router.push({path: '/resource/character-replace-rule/add', query: {id: id}}); // 跳转到"/home"
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
      sortChange(sortField) {
        if (sortField.order === 'descending') {
          this.crud.query.sortMethod = 1
        } else if (sortField.order === 'ascending') {
          this.crud.query.sortMethod = 2
        }

        this.crud.query.sortField = sortField.prop
        this.crud.toQuery();
      },

      changeEnabled(data, val) {
        this.$confirm('此操作将' + this.dict.label.job_status[val] + ' [ ' + data.ruleName + ' ]规则, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          crudCharacterReplaceRule.updateStatus(data.id).then(() => {
            this.crud.notify(this.dict.label.job_status[val] + '成功', 'success')
            data.enabled = !data.enabled
          }).catch(err => {
            console.log(err.data.message)
          })
        }).catch(() => {
        })
      },
      /**
       * 解析侵权类型
       * 1、 常规主题 2、一般侵权 3、资金冻结 4、严重侵权
       * @returns {number}
       */
      parseTortType(tortType) {
        if (tortType == null) {
          return '无';
        }
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
