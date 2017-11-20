
var addIndex=0;
function Close(str) {
    $("#" + str).fadeOut();
}
function demo() {
    var load = document.getElementById("loading");
    load.style.display="block";
    var input=document.querySelector('#myfile');
    var file=input.files[0];
    var oMyForm = new FormData();
    oMyForm.append("myfile", file);
    $.ajax({
        type: "POST",
        url: "/api/ocr/case_upload/",
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
            get_ocr_result(user,image_id);
            $(".submit").hide();
        }
    })
}
function get_ocr_result(user,image_id){
    addIndex++;
    var url = '/api/ocr/detect_data/?user=' + user+'&image_id='+ image_id;
    $.get(url, function(data) {
        if(data.ret_cd == 104){
            $('.upInfo>span').html('zip_id is None');
            return;
        }
        if(data.ret_cd == 201){
            if (addIndex <= 10000) {
                setTimeout(function(){
                    get_ocr_result(user,image_id);
                }, 1000);
                return;
            }else{
                alert('请求超时！');
                return;
            }
        }
        if(data.ret_cd == 200){
            var LeftTop=$("#LeftTop");
            var LeftButton=$("#LeftButton");
            LeftTop.html(data.image_id);
            for(var i=0;i<data.data.length;i++){
                var link  = $("<div/>");
                link.html(data.data[0].image_name);
                link.click(i,ImgSrc);
                LeftButton.append(link);
            }
            function ImgSrc(sun) {
                var imgNamei=$("#imgNamei");
                var j=sun.data;
                var url='/api/ocr/check_result/?uuid='+data.data[j].uuid+'&image_name='+data.data[j].image_name+'&separation_state='+data.data[j].separation_state+'&user='+data.data[j].user;
                $.get(url, function(dat) {
                    if(dat.ret_cd===200){
                        var app = new Vue({
                            el: '#ExhibitionRight',
                            data: {
                                diagnose: dat.data[0].diagnose,//诊断描述
                                image_name:dat.data[0].image_name,
                                sex: dat.data[0].sex,//性别
                                department: dat.data[0].department,//科室
                                cost: dat.data[0].cost,//费用
                                id:dat.data[0].id,
                                uuid: dat.data[0].uuid,
                                name: dat.data[0].name,//姓名
                                hospital: dat.data[0].hospital,//医院编号
                                times: dat.data[0].times,//时间
                                image_url:dat.data[0].image_url,
                                medicine: dat.data[0].medicine,//药物信息
                                age: dat.data[0].age//年龄
                            }
                        })
                        imgNamei.attr('src',dat.data[0].image_url);
                    }
                })
            }
        }
    })
}
