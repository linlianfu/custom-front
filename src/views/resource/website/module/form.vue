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
        label="网站名称"
        prop="siteName"
      >
        <el-input
          v-model="form.siteName"
          style="width: 370px;"
        />
      </el-form-item>

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
      <el-form-item label="图片像素长度" prop="pixelLength">
        <el-input v-model.number="form.pixelLength" style="width: 370px" placeholder="请输入图片像素长度"/>
      </el-form-item>
      <el-form-item label="图片像素宽度" prop="pixelWidth">
        <el-input v-model.number="form.pixelWidth" style="width: 370px" placeholder="请输入图片像素宽度"/>
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
  siteName: '',
  code: '',
  address: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      rules: {
        siteName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入网站标识', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入网址', trigger: 'blur'}
        ],
        pixelLength: [
          {required: true, message: '请输入像素大小', trigger: 'blur'}
        ],
        pixelWidth: [
          {required: true, message: '请输入像素大小', trigger: 'blur'}
        ],
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
