<template>
  <div class="head-container"
  >
    <!--<el-input v-model="query.name" clearable size="small" placeholder="输入岗位名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
    <!--<date-range-picker v-model="query.createTime" class="date-item" />-->
    <el-input v-model="storeName" style="width: 200px" placeholder="请选择店铺" @focus="openStoreDialog"  class="filter-item"/>
    <el-input v-model="themeName" style="width: 200px" placeholder="请选择主题" @focus="openThemeDialog"  class="filter-item"/>
    <el-select v-model="query.riskType" clearable size="small" placeholder="请选择主题风险类型" class="filter-item"
               style="width: 200px" @change="crud.toQuery">
      <el-option v-for="item in riskTypeList" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select
      v-model="query.tortType"
      clearable
      size="small"
      placeholder="请选择侵权类型"
      class="filter-item"
      style="width: 200px"
      @change="crud.toQuery">
      <el-option
        v-for="item in tortTypeList"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>

    <!--弹窗对话框-->
    <el-dialog
      :close-on-click-modal="false"
      :visible="showStoreDialog"
      @close="showStoreDialog = false"
      title="我的店铺"
      width="1000px">
      <store-page @chooseStore="handleChooseStore"/>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :visible="showThemeDialog"
      @close="showThemeDialog = false"
      title="主题管理"
      width="1000px">
      <theme-page @chooseTheme="handleChooseTheme"/>
    </el-dialog>
    <rrOperation/>
  </div>
</template>

<script>
  import {header} from '@crud/crud'
  import rrOperation from '@crud/RR.operation'
  import DateRangePicker from '@/components/DateRangePicker'
  import StorePage from "../../../components/StorePage";
  import ThemePage from "../../../components/ThemePage";

  export default {
    components: {rrOperation, DateRangePicker, StorePage, ThemePage},
    mixins: [header()],
    props: {
      tortTypeList: {
        type: Array,
        required: true
      },
      riskTypeList: {
        type: Array,
        required: true
      },
      permission: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        storeName:null,
        themeName:null,
        showStoreDialog: false,
        showThemeDialog: false,
      }
    },
    methods: {
      openStoreDialog() {
        this.showStoreDialog = true;
      },
      openThemeDialog() {
        this.showThemeDialog = true;
      },
      /**
       * 处理选择店铺事件
       */
      handleChooseStore(storeId, storeName) {
        this.showStoreDialog = false;
        this.storeName = storeName;
        this.query.storeId = storeId;
      },
      handleChooseTheme(themeId, themeName) {
        this.showThemeDialog = false;
        this.themeName = themeName;
        this.query.themeId = themeId;
      }
    }
  }
</script>
