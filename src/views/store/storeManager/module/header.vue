<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.storeName" clearable size="small" placeholder="输入店铺名称搜索"
              style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery"/>

    <el-input v-model="query.legalPerson" clearable size="small" placeholder="输入法人搜索"
              style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery"/>

    <el-input v-model="query.businessLicense" clearable size="small" placeholder="输入营业执照搜索"
              style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery"/>
    <el-select v-model="query.hasTortFraction" clearable size="small" placeholder="请选择是否扣分" class="filter-item"
               style="width: 200px" @change="crud.toQuery">
      <el-option v-for="item in hasTortFraction" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select v-model="query.hasSeriousTrot" clearable size="small" placeholder="请选择是否严重侵权" class="filter-item"
               style="width: 200px" @change="crud.toQuery">
      <el-option v-for="item in hasSeriousTrot" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select v-model="query.status" clearable size="small" placeholder="请选择店铺状态" class="filter-item"
               style="width: 200px" @change="crud.toQuery">
      <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <!--<date-range-picker v-model="query.createTime" class="date-item" />-->
    <!--<el-select v-model="query.enabled" clearable size="small" placeholder="状态" class="filter-item" style="width: 90px" @change="crud.toQuery">-->
    <!--<el-option v-for="item in dict.dict.job_status" :key="item.value" :label="item.label" :value="item.value" />-->
    <!--</el-select>-->
    <rrOperation/>
  </div>
</template>

<script>
  import {header} from '@crud/crud'
  import rrOperation from '@crud/RR.operation'
  import DateRangePicker from '@/components/DateRangePicker'

  export default {
    components: {rrOperation, DateRangePicker},
    mixins: [header()],
    props: {
      dict: {
        type: Object,
        required: true
      },
      permission: {
        type: Object,
        required: true
      },
      statusList: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        hasTortFraction: [{
          value: null,
          label: '请选择是否扣分'
        }, {
          value: 'false',
          label: '否'
        }, {
          value: 'true',
          label: '是'
        }],
        hasSeriousTrot: [{
          value: null,
          label: '请选择是否严重侵权'
        }, {
          value: 'false',
          label: '否'
        }, {
          value: 'true',
          label: '是'
        }]
      }
    }
  }
</script>
