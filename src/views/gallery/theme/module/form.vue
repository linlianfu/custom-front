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
        label="主题名称(中文)"
        prop="name"
      >
        <el-input
          v-model="form.name"
          style="width: 370px;"
        />
      </el-form-item>

      <el-form-item
        label="主题"
        prop="theme"
      >
        <el-input
          v-model="form.theme"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="标签"
        prop="label"
      >
        <el-input
          v-model="form.label"
          style="width: 370px;"
        />
      </el-form-item>

      <el-form-item
        label="风险等级"
        prop="riskType"
      >
        <el-radio-group v-model="form.riskType" style="width: 478px">
          <el-radio :label="1">常规主题</el-radio>
          <el-radio :label="2">一般侵权</el-radio>
          <el-radio :label="3">资金冻结</el-radio>
          <el-radio :label="4">严重侵权</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="流量"
        prop="flow"
      >
        <el-radio-group v-model="form.flow" style="width: 378px">
          <el-radio :label="1">常规主题</el-radio>
          <el-radio :label="2">爆款主题</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="备注"
        prop="remark"
      >
        <el-input
          v-model="form.remark"
          style="width: 370px;"
          type="textarea"
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
  theme: '',
  label: '',
  riskType: null,
  flow: null,
  remark: '',
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        theme: [
          { required: true, message: '请输入主题', trigger: 'blur'}
        ],
        riskType: [
          { required: true, message: '请选择风险等级', trigger: 'change' }
        ],
        flow: [
          { required: true, message: '请选择流量', trigger: 'change' }
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
