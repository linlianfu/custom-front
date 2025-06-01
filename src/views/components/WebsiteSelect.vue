<template>
    <el-select
      v-if="showWebsite"
      v-model="websiteId"
      style="width: 270px;"
      placeholder="请选择网站"
      @change="chooseWebsite"
    >
      <el-option
        v-for="item in websiteData"
        :key="item.id"
        :label="item.siteName"
        :value="item.id"
      />
    </el-select>
</template>

<script>
  import website from '@/api/resource/website'

  export default {
    props: {
    },
    data() {
      return {
        websiteId:'',
        showWebsite:false,
        websiteData:[],
      }
    },

    methods: {
      chooseWebsite() {
        this.$emit("chooseWebsite", this.websiteId)
      },
    },
    created(){
      website.listWebsite().then(data => {
        Object.assign(this.websiteData, data)
        this.showWebsite = true
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }

  .el-form {
    .el-form-item {
      width: calc(50% - 30px); /* 每行宽度为50%，减去间隔为20px */
      margin-bottom: 20px;
    }
    .el-input {
      margin-right: 0;
      width: 170%;
    }
    .el-date-picker {
      margin-right: 0;
      width: 170%;
    }
  }
</style>
