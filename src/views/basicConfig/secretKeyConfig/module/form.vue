<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="1000px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="medium"
      label-width="180px"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          style="width: 370px;"
        />
      </el-form-item>

      <el-form-item
        label="密钥"
        prop="secretKey"
      >
        <el-input
          v-model="form.secretKey"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="设备号"
        prop="deviceNumber"
      >
        <el-input
          v-model="form.deviceNumber"
          style="width: 370px;"
        />
      </el-form-item>

    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
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
  name: '',
  deviceNumber: '',
  secretKey: '',
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        secretKey: [
          { required: true, message: '请输入密钥', trigger: 'blur'}
        ],
        deviceNumber: [
          { required: true, message: '请输入设备号', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
