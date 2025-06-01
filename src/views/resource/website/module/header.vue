<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.siteName" clearable size="small" placeholder="请输入网站名称搜索" style="width: 200px;"
              class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.code" clearable size="small" placeholder="请输入网站标识搜索" style="width: 200px;"
              class="filter-item" @keyup.enter.native="crud.toQuery" />
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
  }
}
</script>
