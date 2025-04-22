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
        label="网站标识"
        prop="code"
      >
        <el-input
          v-model="form.code"
          style="width: 370px;"
        />
      </el-form-item>

      <el-form-item
        label="网址"
        prop="address"
      >
        <el-input
          v-model="form.address"
          style="width: 370px;"
        />
      </el-form-item>

    </el-form>
    <div
      slot="footer"
      class="dialog-footer"align="center"
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

  const defaultForm = {
  id: null,
  code: '',
  address: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      rules: {
        code: [
          { required: true, message: '请输入网站标识', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入网址', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleWebChange() {
      console.log(this.form.webType)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
