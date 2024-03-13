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
        label="主题名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          style="width: 370px;"
        />
      </el-form-item>

      <el-form-item
        label="关键字"
        prop="keyword"
      >
        <el-input
          v-model="form.keyword"
          style="width: 370px;"
        />
      </el-form-item>

      <el-form-item
        label="风险等级"
        prop="tortType"
      >
        <el-radio-group v-model="form.tortType" style="width: 478px">
          <el-radio label="1">常规主题</el-radio>
          <el-radio label="2">一般侵权</el-radio>
          <el-radio label="3">资金冻结</el-radio>
          <el-radio label="4">严重侵权</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="流量"
        prop="flow"
      >
        <el-radio-group v-model="form.flow" style="width: 378px">
          <el-radio label="1">常规主题</el-radio>
          <el-radio label="2">爆款主题</el-radio>
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
  keyword: '',
  tortType: true,
  flow: true,
  remark: '',
}
export default {
  mixins: [form(defaultForm)],
  props: {
    jobStatus: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        jobSort: [
          { required: true, message: '请输入序号', trigger: 'blur', type: 'number' }
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
