

function Close(str) {
    $("#" + str).fadeOut();
}
var app = new Vue({
    el: '#app1',
    data: {
        msg:{
            "image_id": "正在获取",
            "ret_ts": 0000000000,
            "ret_cd": 000,
            "data":[]
        },
        addIndex:0,
        Img_Url:'',
        separation_state:false
    },
    methods: {
        demo:function () {
            obj=this;
            var load = document.getElementById("loading");
            load.style.display="block";
            var input=document.querySelector('#myfile');
            var file=input.files[0];
            var oMyForm = new FormData();
            oMyForm.append("myfile", file);
            $.ajax({
                type: "POST",
                url: "http://182.92.106.16:8021/api/ocr/case_upload/",
                data:oMyForm,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(msg){
                    if(msg['ret_cd']==104){
                        $('.upInfo').show();
                        $('.upInfo>span').html('请上传zip文件！');
                        return;
                    }
                    if(msg['ret_cd']==500){
                        $('.upInfo').show();
                        $('.upInfo>span').html('请重新上传zip文件！');
                        return;
                    }
                    var user  = msg.user ;
                    var image_id=msg. image_id;
                    obj.get_ocr_result(user,image_id);
                    $(".submit").hide();
                }
            })

        },
        get_ocr_result:function (user,image_id){
            file=this;
            this.addIndex++;
            var url = '/api/ocr/detect_data/?user=' + user+'&image_id='+ image_id;
            $.get(url, function(data) {
                if(data.ret_cd == 104){
                    $('.upInfo>span').html('zip_id is None');
                    return;
                }
                if(data.ret_cd == 201){
                    if (file.addIndex <= 10000) {
                        setTimeout(function(){
                            file.get_ocr_result(user,image_id);
                        }, 1000);
                        return;
                    }else{
                        alert('请求超时！');
                        return;
                    }
                }
                if(data.ret_cd == 200){
                    console.log(data);
                    file.msg=data;
                }
            })
        },
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        },
        ClickImg: function (url,separation_state){
            this.Img_Url=url;
            if(separation_state===3){
                this.separation_state=true;
            }else{
                this.separation_state=false;
            }
        },
        Confirm_change: function () {
            console.log('点击');
            this.$http.get('/someUrl',[data], [options]).then(function(response){
                // 响应成功回调
                alert("响应成功");
            }, function(response){
                // 响应错误回调
            });
        }
    }
})
