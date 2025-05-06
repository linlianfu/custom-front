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
        label="角色"
        prop="identityType"
      >
        <el-radio-group v-model="form.identityType">
          <el-radio :label="1">管理员</el-radio>
          <el-radio :label="2">员工</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="授权网站"
      >
        <el-checkbox-group v-model="form.webType" @change="handleWebChange()">
          <el-checkbox v-for="web in defaultWebList" :key="web.code" :label="web.code">
            {{web.code}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        label="授权图片解析"
        prop="websiteId"
      >
        <el-select
          v-model="form.authImageParseId"
          style="width: 370px;"
          placeholder="请选择授权图片解析"
          multiple
        >
          <el-option
            v-for="item in imageParseList"
            :key="item.id"
            :label="item.parseName"
            :value="item.id"
          />
        </el-select>
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
  import imageParse from '@/api/resource/imageParse'

  const defaultForm = {
    id: null,
    name: '',
    deviceNumber: '',
    identityType :null,
    secretKey: '',
    webType:[],
    authImageParseId:[]
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      imageParseList:[],
      defaultWebList:[{
          code:"TP",
          webSite:"teepublic"
        },{
          code:"TL",
          webSite:"threadless"
        },{
          code:"DB",
          webSite:"designbyhumans"
        },{
          code:"AS",
          webSite:"artistshot"
        },{
          code:"PI",
          webSite:"pinterest"
        },{
          code:"TD",
          webSite:"tostadora"
        },{
          code:"TSP",
          webSite:"teeshirtpalace"
        },{
          code:"INK",
          webSite:"inkspired" //https://www.inkspired.ro/
        },{
        code:"RDB",
        webSite:"redbubble" //https://www.redbubble.ro/
      }
      ],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        secretKey: [
          { required: true, message: '请输入密钥', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleWebChange() {
      // console.log(this.form.webType)
    },
  },

  mounted: function () {
    imageParse.listImageParse().then(data => {
      Object.assign(this.imageParseList, data)
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
