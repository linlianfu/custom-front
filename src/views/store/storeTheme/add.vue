<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" style="margin: 6px 20%" size="small" label-width="120px">
      <el-form-item label="店铺" prop="store">
        <el-input v-model="form.subject" style="width: 646px" placeholder="请选择店铺" @focus="openStoreDialog"/>
      </el-form-item>
      <el-form-item label="主题" prop="theme">
        <el-input v-model="form.tos" style="width: 646px" placeholder="请选择主题"/>
      </el-form-item>
      <el-form-item label="上架时间" prop="upTime">
        <el-date-picker
          v-model="form.upTime"
          align="right"
          type="date"
          placeholder="请选择上架时间"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上架产品数量" prop="productCount">
        <el-input v-model="form.productCount" style="width: 646px" placeholder="请输入上架产品数量"/>
      </el-form-item>
      <el-form-item label="是否侵权" prop="tort">
        <el-radio-group v-model="form.tort">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="侵权类型" prop="tortType">
        <el-radio-group v-model="form.tortType">
          <el-radio :label="1">一般侵权</el-radio>
          <el-radio :label="2">资金冻结</el-radio>
          <el-radio :label="3">严重侵权</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button :loading="loading" style="margin-left:40%;margin-bottom: 30px" size="medium"
                 type="primary" @click="doSubmit">保存
      </el-button>
      <el-button :loading="loading" style="margin-left:10px;margin-bottom: 30px;" size="medium"
                 type="danger" @click="cancel">取消
      </el-button>
    </el-form>

    <el-dialog
      :close-on-click-modal="false"
      :visible="showStore"
      @close="showStore = false"
      title="我的店铺"
      width="1000px">
      <store-page/>
    </el-dialog>
  </div>
</template>

<script>
  import storeTheme from '@/api/store/storeTheme'
  import {send} from '@/api/tools/email'
  import {upload} from '@/utils/upload'
  import {form} from '@crud/crud'
  import StorePage from "../../components/StorePage";

  export default {
    name: 'StoreThemeAdd',
    components: {StorePage},
    data() {
      return {
        loading: false, form: {subject: '', tos: '', content: ''},
        showStore: false,
        rules: {
          store: [
            {required: true, message: '请选择店铺', trigger: 'blur'}
          ],
          theme: [
            {required: true, message: '请选择主题', trigger: 'blur'}
          ],
          productCount: [
            {required: true, message: '请输入上架产品数量', trigger: 'blur', type: 'number'}
          ],
          tort: [
            {required: true, message: '请选择是否侵权', trigger: 'change'}
          ],
          tortType: [
            {required: true, message: '请选择侵权类型', trigger: 'change'}
          ],
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
    },
    methods: {
      openStoreDialog() {
        this.showStore = true;
      },
      doSubmit() {
        storeTheme.add({
          storeId: "1768644093925756930",
          themeId: "16f7ac6d850f9b05aaffe24c035a9faf"
        });
        this.$router.push({path: '/store/store-theme'}); // 跳转到"/home"
      },

      cancel() {
        this.$router.push({path: '/store/store-theme'}); // 跳转到"/home"
      }

    }
  }
</script>

<style scoped>
  .editor {
    text-align: left;
    margin: 20px;
    width: 730px;
  }

  ::v-deep .w-e-text-container {
    height: 360px !important;
  }
</style>
