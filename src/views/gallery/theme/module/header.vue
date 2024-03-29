<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="请输入主题名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.keyword" clearable size="small" placeholder="请输入关键词搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.riskType" clearable size="small" placeholder="请选择风险类型" class="filter-item"
               style="width: 200px" @change="crud.toQuery">
      <el-option v-for="item in riskTypeList" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select v-model="query.flow" clearable size="small" placeholder="请选择流量等级" class="filter-item"
               style="width: 200px" @change="crud.toQuery">
      <el-option v-for="item in flowList" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
  import {header} from '@crud/crud'
  import rrOperation from '@crud/RR.operation'
  import DateRangePicker from '@/components/DateRangePicker'

  export default {
  components: { rrOperation, DateRangePicker },
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
    riskTypeList: {
      type: Array,
      required: true
    },
    flowList: {
      type: Array,
      required: true
    }
  }
}
</script>
