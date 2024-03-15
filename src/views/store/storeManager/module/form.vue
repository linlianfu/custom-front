<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="1000px"
  >
    <div style="max-width: 1000px;margin: 10px auto">
      <el-form ref="form" :model="form" :rules="rules" size="medium" :inline="true"
              style=" display:flex;flex-wrap: wrap;justify-content: space-between;">
        <el-form-item label="店铺名称" prop="storeName">
          <el-input v-model="form.storeName"/>
        </el-form-item>
        <el-form-item label="法人">
          <el-input v-model="form.legalPerson" style="margin-left: 28px"/>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-input v-model="form.businessLicense"/>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="form.registrationTime"
            align="right"
            type="date"
            placeholder="选择注册时间"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="侵权扣分" prop="tortFraction">
          <el-input v-model.number="form.tortFraction"/>
        </el-form-item>
        <el-form-item label="严重侵权次数" prop="seriousTrotCount">
          <el-input v-model.number="form.seriousTrotCount"/>
        </el-form-item>
        <el-form-item label="店铺状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">运营</el-radio>
            <el-radio :label="2">退出运营</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="退出时间">
          <el-date-picker
            v-model="form.exitTime"
            align="right"
            type="date"
            placeholder="选择退出时间"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商户id">
          <el-input v-model="form.shopId"/>
        </el-form-item>
        <el-form-item label="所属平台" prop="platformType">
          <el-radio-group v-model="form.platformType">
            <el-radio :label="1">速卖通</el-radio>
            <el-radio :label="2">Temu</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="crud.cancelCU">取消</el-button>
      <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {form} from '@crud/crud'

  const defaultForm = {
    id: null,
    storeName: '',
    legalPerson: '',
    businessLicense: '',
    registrationTime: null,
    tortFraction: null,
    seriousTrotCount: null,
    status: null,
    exitTime: null,
    shopId: '',
    platformType: null,
  }
  export default {
    mixins: [form(defaultForm)],
    data() {
      return {
        rules: {
          storeName: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'}
          ],
          tortFraction: [
            { required: true, message: '请输入侵权扣分', trigger: 'blur',type: 'number',}
          ],
          seriousTrotCount: [
            {required: true, message: '请输入严重侵权次数', trigger: 'blur', type: 'number'}
          ],
          status: [
            {required: true, message: '请选择店铺状态', trigger: 'change'}
          ],
          platformType: [
            {required: true, message: '请选择所属平台', trigger: 'change'}
          ]
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
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
    .el-input{
      margin-right: 0;
      width: 170%;
    }
    .el-date-picker{
      margin-right: 0;
      width: 170%;
    }
  }
</style>
