<template>
  <div class="head-container"
  >
    <el-input v-model="query.ruleName" clearable  placeholder="输入规则搜索"
              style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery"/>
    <website-select @chooseWebsite="handleChooseWebsite"/>
    <rrOperation/>
  </div>
</template>

<script>
  import {header} from '@crud/crud'
  import rrOperation from '@crud/RR.operation'
  import DateRangePicker from '@/components/DateRangePicker'
  import WebsiteSelect from "../../../components/WebsiteSelect";

  export default {
    components: {rrOperation, DateRangePicker,WebsiteSelect},
    mixins: [header()],
    props: {
      permission: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
      }
    },
    methods: {
      handleChooseWebsite(websiteId) {
        this.query.websiteId = websiteId
      },
    },
  }
</script>
