<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" style="margin: 6px 20%" size="small" label-width="120px">

      <el-form-item label="替换规则名称" prop="productCount">
        <el-input v-model="form.ruleName" style="width: 646px" placeholder="请输入字符替换规则名称"/>
      </el-form-item>

      <el-form-item
        label="网站"
        prop="websiteId"
      >
        <website-select @chooseWebsite="handleChooseWebsite"/>
      </el-form-item>

      <el-form-item label="字符替换规则" >
          <el-input style="width: 320px" placeholder="请输入原字符"v-model="prepareAddOriginCharacter"/>
          <span>替换为</span>
          <el-input style="width: 320px" placeholder="请输入替换后的字符，为空表示删除" v-model="prepareAddNewCharacter"/>
          <el-button :loading="loading" style="margin-left: 2px" size="medium" type="primary"
                     @click="addRuleItem">新增规则</el-button>
          <el-divider content-position="left">生效中的规则</el-divider>
          <p v-for="item in form.ruleItem" :key="item.value" :label="item.label" :value="item.value">
            <el-input style="width: 320px" placeholder="请输入原字符" v-model="item.originCharacter"/>
            <span>替换为</span>
            <el-input style="width: 320px" placeholder="请输入替换后的字符，为空表示删除" v-model="item.newCharacter"/>
            <el-button :loading="loading" style="margin-left: 2px" size="medium" type="danger" @click="removeRuleItem(item)">移除规则</el-button>
          </p>
      </el-form-item>

      <el-button :loading="loading" style="margin-left:40%;margin-bottom: 30px" size="medium"
                 type="primary" @click="doSubmit">保存
      </el-button>
      <el-button :loading="loading" style="margin-left:10px;margin-bottom: 30px;" size="medium"
                 type="danger" @click="cancel">取消
      </el-button>
    </el-form>


  </div>
</template>

<script>
  import characterReplaceRule from '@/api/resource/characterReplaceRule'
  import {send} from '@/api/tools/email'
  import {upload} from '@/utils/upload'
  import {form} from '@crud/crud'
  import WebsiteSelect from "../../components/WebsiteSelect";

  export default {
    name: 'CharacterReplaceRuleAdd',
    components: {WebsiteSelect},
    data() {
      return {
        showWebsite:false,
        websiteData:[],
        prepareAddOriginCharacter:'',
        prepareAddNewCharacter:'',

        loading: false,
        requestMethod: "add",
        // 新增替换规则
        form: {
          id: null,
          ruleName: null, // rules校验，需要通过视图层更新，才能校验得到
          websiteId: null, // rules校验，需要通过视图层更新，才能校验得到
          ruleItem:[],
        },
        rules: {
          // prop 应该是指表单数据模型（data）中的属性名称。
          ruleName: [
            {required: true, message: '请输入规则名称', trigger: 'change'}
          ],
          websiteId: [
            {required: true, message: '请选择网站', trigger: 'change'}
          ]
        },
      }
    },
    methods: {
      addRuleItem:function(){
        const item = {
          originCharacter:this.prepareAddOriginCharacter,
          newCharacter:this.prepareAddNewCharacter
        };
        this.form.ruleItem.push(item)
        this.prepareAddOriginCharacter = ''
        this.prepareAddNewCharacter = ''
      },
      removeRuleItem:function(item){
        this.form.ruleItem.pop(item)
      },

      handleChooseWebsite(websiteId) {
        this.form.websiteId = websiteId
      },
      doSubmit: function () {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            if( this.requestMethod === 'add'){
              characterReplaceRule.add(this.form).then((data) => {
                this.$message({
                  message: '创建成功',
                  type: 'success'
                });
                this.$router.push({path: '/resource/character-replace-rule'}); // 跳转到"/home"
              });
            }else {
              characterReplaceRule.edit(this.form).then((data) => {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
                this.$router.push({path: '/resource/character-replace-rule'}); // 跳转到"/home"
              });
            }
          }
        })
      },

      cancel() {
        this.$router.push({path: '/resource/character-replace-rule'}); // 跳转到"/home"
      }
    },

    mounted: function () {
      if (this.$route.query.id === '-1' || this.$route.query.id === -1) {
        this.requestMethod = 'add';
      } else {
        this.form.id = this.$route.query.id;
        this.requestMethod = 'edit';
        characterReplaceRule.getCharacterReplaceRule(this.form.id).then(data => {
          Object.assign(this.form, data)
          this.form.ruleItem = data.characterReplaceGroup
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
