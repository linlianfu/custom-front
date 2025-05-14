<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="800px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="medium"
      label-width="180px"
    >
      <el-form-item
        label="解析名称"
        prop="parseName"
      >
        <el-input
          v-model="form.parseName"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="网站"
        prop="websiteId"
      >
        <el-select
          v-model="form.websiteId"
          style="width: 370px;"
          placeholder="请选择"
        >
          <el-option
            v-for="item in website"
            :key="item.code"
            :label="item.code"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="解析类型"
        prop="parseType"
      >
        <el-radio-group v-model="form.parseType">
          <el-radio :label="1">PNG</el-radio>
          <el-radio :label="2">JPG</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="可用范围"
        prop="availableRange"
      >
        <el-radio-group v-model="form.availableRange">
          <el-radio :label="-1">不限</el-radio>
          <el-radio :label="1">内部</el-radio>
          <el-radio :label="2">外部</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="解析地址"
        prop="parseUrl"
      >
        <el-input v-model="form.parseUrl" style="width: 370px;" rows="5" type="textarea" />
      </el-form-item>

    </el-form>
    <div
      slot="footer"
      class="dialog-footer" align="center"
    >
      <el-button
        type="text"
        @click="crud.cancelCU"
      >
        取消
      </el-button>
      <el-button
        :loading="crud.status.cu === 2"
        type="primary"
        @click="crud.submitCU"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {form} from '@crud/crud'
  import website from '@/api/resource/website'

  const defaultForm = {
    id: null,
    parseName: '',
    code: '',
    websiteId: '',
    parseUrl: '',
    parseType:null,
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      websiteId:null,
      website:[],
      rules: {
        websiteId: [
          { required: true, message: '请选择网站', trigger: 'blur' }
        ],
        parseUrl: [
          { required: true, message: '请输入网址', trigger: 'blur'}
        ],
        parseName: [
          { required: true, message: '请输入解析名称', trigger: 'blur'}
        ],
        parseType: [
          { required: true, message: '请输选择解析类型', trigger: 'blur'}
        ],
        availableRange: [
          { required: true, message: '请输选择可用范围', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleWebChange() {
      console.log(this.form.webType)
    },
  },
  mounted: function () {
    website.listWebsite().then(data => {
      Object.assign(this.website, data)
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
