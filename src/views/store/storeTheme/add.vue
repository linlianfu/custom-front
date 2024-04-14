<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" style="margin: 6px 20%" size="small" label-width="120px">
      <el-form-item label="店铺" prop="storeName">
        <el-input v-model="form.storeName" style="width: 646px" placeholder="请选择店铺" @focus="openStoreDialog"/>
      </el-form-item>
      <el-form-item label="主题" prop="themeName">
        <el-input v-model="form.themeName" style="width: 646px" placeholder="请选择主题" @focus="openThemeDialog"/>
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
        <el-input v-model.number="form.productCount" style="width: 646px" placeholder="请输入上架产品数量"/>
      </el-form-item>
      <el-form-item label="是否侵权" prop="tort">
        <el-radio-group v-model="form.tort">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="侵权类型" v-if="form.tort === 1">
        <el-radio-group v-model="form.tortType">
          <el-radio :label="1">知产平台治理-一般侵权</el-radio>
          <el-radio :label="2">知识产权-一般侵权</el-radio>
          <el-radio :label="3">资金冻结</el-radio>
          <el-radio :label="4">严重侵权</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="侵权时间" prop="tortTime" v-if="form.tort === 1">
        <el-date-picker
          v-model="form.tortTime"
          align="right"
          type="date"
          placeholder="请选择侵权时间"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="侵权扣分" prop="tortFraction" v-if="form.tort === 1">
        <el-input v-model.number="form.tortFraction" style="width: 646px" placeholder="请输入侵权扣分"/>
      </el-form-item>
      <el-form-item label="知识产权名称" prop="intellectualPropertyName" v-if="form.tort === 1">
        <el-input v-model="form.intellectualPropertyName" style="width: 646px" placeholder="请输入备注"/>
      </el-form-item>
      <el-form-item label="是否删除">
        <el-radio-group v-model="form.hasDelete">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" style="width: 646px" placeholder="请输入备注"/>
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
      :visible="showStoreDialog"
      @close="showStoreDialog = false"
      title="我的店铺"
      width="1000px">
      <store-page @chooseStore="handleChooseStore" @cancelChooseStore="handleCancelChooseStore"/>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      :visible="showThemeDialog"
      @close="showThemeDialog = false"
      title="主题管理"
      width="1000px">
      <theme-page @chooseTheme="handleChooseTheme" @cancelChooseTheme="handleCancelChooseTheme"/>
    </el-dialog>
  </div>
</template>

<script>
  import storeTheme from '@/api/store/storeTheme'
  import {send} from '@/api/tools/email'
  import {upload} from '@/utils/upload'
  import {form} from '@crud/crud'
  import StorePage from "../../components/StorePage";
  import ThemePage from "../../components/ThemePage";

  export default {
    name: 'StoreThemeAdd',
    components: {StorePage, ThemePage},
    data() {
      return {
        loading: false,
        showStoreDialog: false,
        showThemeDialog: false,
        theme: null,
        requestMethod: "add",
        // 登记店铺主题  表单数据
        form: {
          id: null,
          storeName: null, // rules校验，需要通过视图层更新，才能校验得到
          themeName: null, // rules校验，需要通过视图层更新，才能校验得到
          storeId: null,
          themeId: null,
          upTime: null,
          productCount: null,
          // 是否侵权 0：否  1：是
          tort: null,
          // 侵权类型 2、一般侵权 3、资金冻结 4、严重侵权
          tortType: null,
          tortTime: null,
          tortFraction: null,
          intellectualPropertyName:null,
          hasDelete: false
        },
        rules: {
          // prop 应该是指表单数据模型（data）中的属性名称。
          storeName: [
            {required: true, message: '请选择店铺', trigger: 'change'}
          ],
          themeName: [
            {required: true, message: '请选择主题', trigger: 'change'}
          ],
          productCount: [
            {required: true, message: '请输入上架产品数量', trigger: 'blur', type: 'number'}
          ],
          tort: [
            {required: true, message: '请选择是否侵权', trigger: 'change'}
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
        this.form.storeName = storeName;
        this.form.storeId = storeId;
      },
      handleCancelChooseStore(storeId, storeName) {
        this.form.storeName = null;
        this.form.storeId = null;
      },
      /**
       * 处理选择主题事件
       * @param storeId
       * @param storeName
       */
      handleChooseTheme(themeId, themeName) {
        this.showThemeDialog = false;
        this.form.themeName = themeName;
        this.form.themeId = themeId;
      },
      handleCancelChooseTheme(themeId, themeName) {
        this.form.themeName = null;
        this.form.themeId = null;
      },
      doSubmit: function () {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            if (this.form.tort === 0) {
              this.form.tortType = null;
              this.form.tortTime = null;
              this.form.intellectualPropertyName = null;
            }else {
              if ( this.form.tortType === null){
                this.$message({
                  message: '请选择侵权类型',
                  type: 'warning'
                });
                return
              }
              if ( this.form.tortTime === null){
                this.$message({
                  message: '请选择侵权时间',
                  type: 'warning'
                });
                return
              }
            }
            if (this.requestMethod === 'add') {
              storeTheme.add(this.form).then((data) => {
                this.$message({
                  message: '登记成功',
                  type: 'success'
                });
                this.$router.push({path: '/store/store-theme'}); // 跳转到"/home"
              });
            } else {
              storeTheme.edit(this.form).then((data) => {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
                this.$router.push({path: '/store/store-theme'}); // 跳转到"/home"
              });
            }
          }
        })
      },

      cancel() {
        this.$router.push({path: '/store/store-theme'}); // 跳转到"/home"
      }
    },

    mounted: function () {
      if (this.$route.query.id === '-1' || this.$route.query.id === -1) {
        this.requestMethod = 'add';
      } else {
        this.form.id = this.$route.query.id;
        this.requestMethod = 'edit';
        storeTheme.getStoreTheme(this.form.id).then(data => {
          Object.assign(this.form, data)
        })
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
