<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.parseName" clearable size="small" placeholder="请输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <website-select @chooseWebsite="handleChooseWebsite"/>
    <rrOperation />
  </div>
</template>

<script>
  import {header} from '@crud/crud'
  import rrOperation from '@crud/RR.operation'
  import DateRangePicker from '@/components/DateRangePicker'
  import WebsiteSelect from "../../../components/WebsiteSelect";

  export default {
  components: { rrOperation, DateRangePicker ,WebsiteSelect},
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
  },
    methods: {
      handleChooseWebsite(websiteId) {
        this.query.websiteId = websiteId
      },
    },
}
</script>
