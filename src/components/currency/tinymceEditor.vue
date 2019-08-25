<template>
  <textarea :id='id' :value='value'></textarea>
</template>

<script>
  // Import TinyMCE
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver/theme'
  import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/anchor'
  import 'tinymce/plugins/insertdatetime'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/pagebreak'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/colorpicker'
  import {getImageOssToken,uploadImage} from '@/api/image';
  const INIT = 0
  const CHANGED = 2
  // var EDITOR = null
  export default {
    props: {
      value: {
        type: String,
        editor: null,
        required: true
      },
      setting: {},
      url: { // 接口
        default: 'https://umoss-cxc.oss-cn-shanghai.aliyuncs.com/',
        type: String
      },
      accept: { // 文件类型
        default: 'image/png,image/gif,image/jpg,image/jpeg',
        type: String
      },
      maxSize: { // 大小
        default: 2097152,
        type: Number
      },
      withCredentials: {
        default: false,
        type: Boolean
      }
    },
    watch: {
      value: function(val) {
        if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
          tinymce.activeEditor.setContent(val)
        }
        this.status = CHANGED
      }
    },
    data() {
      return {
        formData:{
          OSSAccessKeyId: '',
          policy: '',
          signature: '',
          key: '',
          success_action_status: 200
        },
        keyNumber:1,
        status: INIT,
        id: 'editor-' + new Date().getMilliseconds()
      }
    },
    methods: {
    },
    mounted() {
      const _this = this;
      //获取上传凭证
      getImageOssToken('/Article/').then(value => {
        if (value) {
          _this.formData.OSSAccessKeyId=value.accessid;
          _this.formData.policy=value.policy;
          _this.formData.signature=value.signature;
          _this.formData.key = value.dir;
          //this.formData.append('key', value.dir + '1.' + file.raw.type.split('/')[1]);
          //this.formData.append('success_action_status', 200);
          //this.formData.append('file', file.raw);
          /*uploadImage(formData).then(val => {
            if (val) {
              console.log(val);
            }
            this.ruleForm.cover = value.dir + '1.' + file.raw.type.split('/')[1];
          })*/
        }
      });
      const setting =
        {
          selector: '#' + _this.id,
          upload_image_url: '/api/', // 配置的上传图片的路由
          language: 'zh_CN',
          language_url: "/static/tinymce/zh_CN.js",//导入中文语言文件
          init_instance_callback: function(editor) {
            // EDITOR = editor
            //console.log('Editor: ' + editor.id + ' is now initialized.')
            editor.on('input change undo redo', () => {
              var content = editor.getContent()
              _this.$emit('show', content)
            })
          },
          content_style: `
    *                         { padding:0; margin:0; }
    html, body                { height:100%; }
    img                       { max-width:100%; display:block;height:auto; }
    a                         { text-decoration: none; }
    iframe                    { width: 100%; }
    p                         { line-height:1.6; margin: 0px; }
    table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
    .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
    ul,ol                     { list-style-position:inside; }
  `,
          insert_button_items: 'image link | inserttable',
          paste_retain_style_properties: 'all',
          paste_word_valid_elements: '*[*]', // word需要它
          paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
          paste_convert_word_fake_lists: false, // 插入word文档需要该属性
          paste_webkit_styles: 'all',
          paste_merge_formats: true,
          nonbreaking_force_tab: false,
          paste_auto_cleanup_on_paste: false,
          'plugins': [
            'advlist link image media anchor insertdatetime pagebreak preview',
            'code',
            'lists',
            'table paste'
          ], // 配置
          'toolbar_items_size': 'small',
          'block_formats': 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
          'toolbar1': 'bullist numlist table |insertfile undo redo | formatselect | link unlink | uploadimg image media | anchor | insertdatetime | pagebreak preview', // 工具栏1
          'toolbar2': ' fontsizeselect | forecolor backcolor | fontselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat', // 工具栏2
          // 图片上传
          images_upload_handler: function(blobInfo, success, failure) {
            // failure(blobInfo)
            // _this.$emit('on-ready', blobInfo.blob().size, blobInfo.blob())
            if (blobInfo.blob().size > _this.maxSize) {
              failure('文件体积过大')
            }
            if (_this.accept.indexOf(blobInfo.blob().type) >= 0) {
              uploadPic()
            } else {
              failure('图片格式错误')
            }

            /*uploadImage(formData).then(val => {
              if (val) {
                console.log(val);
              }
              this.ruleForm.cover = value.dir + '1.' + file.raw.type.split('/')[1];
            });*/
            function uploadPic() { // 发送请求
              let formData = new FormData();
              formData.append('OSSAccessKeyId', _this.formData.OSSAccessKeyId);
              formData.append('policy', _this.formData.policy);
              formData.append('signature', _this.formData.signature);
              formData.append('key', _this.formData.key + _this.keyNumber + '.' + blobInfo.blob().type.split('/')[1]);
              formData.append('success_action_status', 200);
              formData.append('file', blobInfo.blob());
              _this.keyNumber++;
              uploadImage(formData).then(val => {
                if (val) {
                  console.log(val);
                }
                success('https://image.chaoxiaochu.com/'+formData.get('key')+'/0');
                //this.ruleForm.cover = value.dir + '1.' + file.raw.type.split('/')[1];
              });
            }
          }
        }
      Object.assign(setting, _this.setting)

      tinymce.init(setting)


    },
    beforeDestroy: function() {
      tinymce.get(this.id).destroy()
    }
  }
</script>
