<!--分页-->
<template>
  <el-pagination
    :page-size.sync="page.size"
    :total="page.total"
    :current-page.sync="page.page"
    style="margin-top: 8px;"
    layout="total, prev, pager, next, sizes"
    @size-change="crud.sizeChangeHandler($event)"
    @current-change="crud.pageChangeHandler"
    :page-sizes="[10, 20, 30, 50]"
  />
</template>
<script>
  import {pagination} from '@crud/crud'

  export default {
  mixins: [pagination()]
}
</script>
