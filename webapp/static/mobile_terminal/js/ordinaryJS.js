var app = new Vue({
    el: '#app',
    data: {
        fram:false,
        app1:true,
        app2:false,
        app3:false,
        app4:false,
        app5:false,
        app6:false,
        app7:false,
        app8:false,
        app9:false,
        message: 'Hello Vue.js!',
        Report_type:'',//点击入口
        file: {
            name:'常青',//用户姓名
            ID:'',//用户身份证号码
            phoneNumber:'',//用户手机号
            company:'',//公司名称
            type:''//所选出险类型
        },
        AjaxData:null,//用户上传图片后所返回的图片信息
        imgUrl:null,// 预留
        case_id:null,//报案号
        company_name:null,
        Bill_number:null,//票据张数
        clickImgData:null,//点击图片提交数据后所获得额数据
        separation_state:0, //当前点击的图片类型  发票/处方单
        letNonoOnBlock:0,// 解决 APP4 渲染报错问题
        fuse:null, //总览信息
        query:null,//app6中 案件列表 姓名保单号等基本信息
        ret_cd:null,
        Bill_number_Data:null,//app7中所提交保单的总数量 以及单个数量
        img_Box:null,//app8中所需要的 单案件中所提交的票据URL
        Do_uuid:null,//保存 whole函数中 AJAX所用的参数
        Do_user:null,//保存 whole函数中 AJAX所用的参数
        setT:null,//用于结束轮询
        quer:{
            card_id:'1',
            create_time:'1',
            phone_no:'1',
            user:'1',
            uuid:'1'
        },//app7 title信息
        Submit_time:null,
        login_name:null,
        zjbl:null,
        filesInputNumber:0
    },
    methods: {
        Ajax_Post:function (appurl,data) {//POST 提交
            var _this=this;
            console.log('appurl:'+appurl);
            console.log('data:'+data);
            $.ajax({
                type: "POST",
                url: appurl,
                data:data,
                cache: false,
                enctype: 'multipart/form-data',
                async:false,
                processData: false,
                contentType: false,
                success: function(msg){
                    _this.zjbl=msg;
                    return msg;
                },
                error:function () {
                    return 'error';
                }
            })
        },
        init:function () {//自执行函数
            var _this=this;
            var str=_this.GetQueryString('login_name');
            if(str!== undefined && str !== "undefined" && str !== ""){
                _this.login_name=str;
            }else{
                var sti=window.location.href
                var arr=sti.split('/');
                arr[5]='login_tion'
                sti=arr.join('/');
                window.location.href=sti;
            }
        },
        GetQueryString:function (name) {//从HTMLurl上摘取数据的函数
            var r = decodeURI(window.location.search.substr(1));
            var arr=r.split('&');
            for(var i=0;i<arr.length;i++){
                var arr1=arr[i].split('=');
                if(arr1[0]===name){
                    return arr1[1];
                }
            }
        },
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('');
        },
        Reporttype: function (sun,name) {//页面切换
            fe=this;
            if(sun!=='undefined'){
                this.Report_type=sun;
            }
            if(name===1){
                fe.app2=false;
                fe.app3=false;
                fe.app4=false;
                fe.app5=false;
            }
            fe['app'+(name+1)]=true;
            $(".daohang").show();
            $('#app'+(name+1)).animate({'right':'0'});//页面向左移动 100%
            setTimeout(function () {
                $('#app'+name).animate({'right':'100%'});//页面向左移动 100%
            },1)
        },
        changes:function () {//判断当前页面的下一步按钮是否可点击
            if(this.file.name!==''){
                if(this.file.ID!==''){
                    if(this.file.phoneNumber!==''){
                        if(this.file.company!==''){
                            if(this.file.type!=='')
                                $('#app2>button').removeAttr('disabled')
                        }
                    }
                }
            }
        },
        imgUr:function (sun) {//app4 中点击缩略图预览大图
            var _this=this;
            var _thisA=this.AjaxData;
            var image_name;
            var separation_state;
            var user;
            var uuid;
            for(var i=0;i<_thisA.length;i++){
                if(sun===_thisA[i].id){
                    image_name=_thisA[i].image_name;
                    separation_state=_thisA[i].separation_state;
                    user=_thisA[i].user;
                    uuid=_thisA[i].uuid;
                }
            }
            _this.separation_state=separation_state;
            $.ajax({
                type: "GET",
                url: "/api/ocr/check_result/?image_name="+image_name+"&separation_state="+separation_state+"&user="+user+"&uuid="+uuid,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(data){
                    if(data.data[0]===undefined){
                        _this.letNonoOnBlock=0
                    }else{
                        _this.clickImgData=data.data[0];
                        _this.letNonoOnBlock=1;
                        $("#app4>div:nth-child(2)>div:nth-child(2)").show(200);

                    }
                },
                beforeSend: function(){
                    $("#app4>div:nth-child(2)>div:nth-child(2)").hide(200)
                },
                error:function () {
                    alert('error!');
                }
            })
        },
        typeButton:function (sum,i) {//保存当前的险种类型
            this.file.type=sum;
            var hove=$('.hove');
            for(var j=0;j<=hove.length;j++){
                hove.removeClass('hove');
            }
            $(".typeB"+i).addClass('hove');
        },
        imgButton:function () {//上传图片
            var _this=this;
            var input=$('.imagesInput');
            var oMyForm = new FormData();
            for(var i=0;i<input.length-1;i++){
                var file=input[i].files[0];
                oMyForm.append("myfile", file);
            }
            _this.Bill_number=i;
            console.log(oMyForm);
            $.ajax({
                type: "POST",
                url: "/api/ocr/case_upload/?name="+_this.file.name+"&case_id="+_this.case_id+"&company_name="+_this.company_name,
                data:oMyForm,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(msg){
                    setTimeout(function () {// 等待解析结果 进入轮询
                        _this.polling(msg)
                        $("#loading>p")[0].innerText='正在对图片进行识别...';
                        $('#loading>button')[0].disabled=false;
                        _this.filesInputNumber=0;
                    },1000)
                },
                beforeSend: function(){
                    $('#loading>button')[0].disabled=true;
                    $("#loading>p")[0].innerText='正在上传图片...';
                    $('#loading').show();
                },
                error:function () {
                    alert('error!');
                    $('#loading').hide();
                }
            })
        },
        polling:function (msg) {//上传图片的轮询
            var _this=this;
            $.ajax({
                type: "POST",
                url: "/api/ocr/detect_data/?image_id="+msg.image_id+"&user="+msg.user,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(data){
                    if(data.ret_cd===201){//201状态继续轮询
                        _this.setT=setTimeout(function () {
                            _this.polling(data);
                        },3000)
                    } if(data.ret_cd===200){//200状态结束轮询
                        _this.AjaxData=data.data;
                        _this.Reporttype('undefined',3);
                        $('#loading').hide();
                    }
                },
                error:function () {
                    alert('请重新上传图片');
                    $('#loading').hide();
                }
            })
        },
        formSubmit:function () {//上传用户基本信息
            var _this=this;
            var forms=this.file;
            var name=forms.name;
            var ID=forms.ID;
            var phoneNumber=forms.phoneNumber;
            var company=forms.company;
            var type=forms.type;
            var obj=new Object();
            obj['name']=name;
            obj['ID']=ID;
            obj['phoneNumber']=phoneNumber;
            obj['company']=company;
            obj['type']=type;
            obj['company_name']=_this.login_name;
            var times=new Date();
            var data=JSON.stringify(obj);
            this.Submit_time = times.toLocaleDateString();
            var appurl='/api/ocr/create_to_report_user_the_case/';
            _this.Ajax_Post(appurl,data);
            console.log(_this.zjbl);
            if(_this.zjbl.message!=="upload image gt 50"){
                _this.case_id=_this.zjbl.case_id;
                console.log(_this.zjbl.case_id);
                _this.company_name=_this.zjbl.company_name;
                _this.Reporttype('undefined',2);
            }else{
                if (confirm("今日上传已达到上限，点击返回首页？")) {
                    _this.Return();
                }
                else {
                    _this.Return();
                }
            }
        },
        whole:function (sun,sum,quers){
            console.log(sun+'-----'+sum+'-----'+quers);
            var _this=this;
            var uuid;
            if(quers===undefined){
                _this.quer=new Object();
                _this.quer['user']=_this.file.name;
                _this.quer['create_time']=_this.Submit_time;
                _this.quer['uuid']=_this.case_id;
            }else{
                _this.quer=quers;
            }
            if(sun===1){
                uuid=_this.case_id;
                var appurl='/api/ocr/user_request_case_all/?user='+_this.file.name;
                $.ajax({
                    type: "POST",
                    url: appurl,
                    cache: false,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    success: function(msg){
                        _this.query=msg.data;
                    },
                    error:function () {
                        alert('error!');
                    }
                })
            }else{
                uuid=sun;
            }
            this.Do_uuid=uuid;
            if(sum===undefined){
                _this.Do_user=_this.file.name;
            }else{
                _this.Do_user=sum;
            }
            $(".daohang").hide();
            // $(".deBug").hide();
            var obj=new Object();
            obj["uuid"]=uuid;
            obj["user"]=_this.file.name;
            var date=JSON.stringify(obj);
            $.ajax({
                type: "POST",
                url: "/api/ocr/case_image_all/",
                cache: false,
                data:date,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(msg){
                    if(msg.data.case_quantity>=1){
                        _this.Bill_number_Data=msg.data;
                        if((msg.data.invoice_quantity+msg.data.pres_quantity+msg.data.others)===msg.data.case_quantity){

                        }else{
                            _this.Bill_number_Data=1;
                            alert('本案件未分拣完毕，请稍后');
                        }
                        $.ajax({
                            type: "POST",
                            url: "/api/ocr/list_case/?uuid="+uuid+"&user="+_this.file.name,
                            cache: false,
                            enctype: 'multipart/form-data',
                            processData: false,
                            contentType: false,
                            success: function(msg){
                                console.log(msg);
                                if(msg.ret_cd===105){
                                    alert("正在审核中");
                                    if(sun===1){
                                        _this.app1=true;
                                    }
                                }else if(msg.ret_cd===200){
                                }
                                _this.fuse=msg.data;
                                _this.app7=true;
                                _this.app2=false;
                                _this.app3=false;
                                _this.app4=false;
                                $(".daohang").show();
                                setTimeout(function () {
                                    $('#app6').show();
                                })
                                // $('#app7').animate({'right':'0'});
                                $('#app4').animate({'right':'100%'});//页面向左移动 100%
                            },
                            error:function () {
                                alert('error!');
                            }
                        })
                    }else{
                        alert('本案件未上传单据');
                    }
                },
                error:function () {
                    alert('error!');
                }
            });


        },
        Rep: function (sun,name){//页面切换
            fe=this;
            if(fe.file.name !== ''){
                fe.setApp6();
                $('#bt>p')[0].innerText='理赔查询';
                fe.app6=true;
                $('#app1').animate({'right':'100%'});//页面向左移动 100%
                $('.daohang').hide();
            }else {
                alert("您尚未上传基本资料");
            }
        },
        setApp6:function () {
            var _this=this;
            var appurl='/api/ocr/user_request_case_all/?user='+_this.file.name;
            $.ajax({
                type: "POST",
                url: appurl,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(msg){
                    _this.query=msg.data;
                }
                ,
                error:function () {
                    alert('error!');
                }
            })
        },
        Return:function () {
            var _this=this;
            _this.letNonoOnBlock=0;
            $('#app1').animate({'right':'0'});//页面向左移动 100%
            $('#loading').hide();
            $('.daohang').hide();
            clearTimeout(_this.setT);
        },
        Documents:function () {
            var _this=this;
            $.ajax({
                type: "POST",
                url: "/api/ocr/detect_data/?image_id="+_this.Do_uuid+"&user="+_this.Do_user,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(data){
                    if(data.ret_cd===201){//201状态继续轮询
                        alert('正在识别......');
                    } if(data.ret_cd===200){//200状态结束轮询
                        _this.img_Box=data.data;
                        _this.app8=true;
                        _this.app7=false;
                        _this.app4=false;
                        _this.app6=false;
                        $('#app7').animate({'right':'0'});
                        // $('#app8').animate({'right':'0'});//页面向左移动 100%
                        setTimeout(function () {
                            $('#app8').show();
                        },1)
                    }
                },
                error:function () {
                    alert('请重新上传图片');
                    $('#loading').hide();
                }
            })
        },
        fanhiu:function (sun) {
            var _this=this;
            if(sun===8){
                $('#app7').animate({'right':'0'});//页面向左移动 100%
                _this.app8=false;
                _this.app7=true;
                _this.app6=false;
                _this.app5=false;
                _this.app4=false;
            }else if(sun===7){
                $("#app6").show();
                $('#app6').animate({'right':'0'});//页面向左移动 100%
                _this.app6=true;
                _this.app7=false;
            }else if(sun===6){
                $('#bt>p')[0].innerText='理赔申请';
                $('#app1').animate({'right':'0'});//页面向左移动 100%
                _this.app6=false;
            }else if(sun==='fram'){
                _this.app9=true;
                _this.fram=false;
            }else if(sun===9){
                _this.app9=false;
                _this.app7=true;
            }
        },
        iframe:function (sun) {
            console.log(sun);
            var _this=this;
            _this.fram=true;
            _this.app7=false;
            _this.app6=false;
            _this.app8=false;
            _this.app9=false;
            $('#fram>iframe')[0].src='/api/ocr/application_form/';
        },
        Element9:function (sum) {
            var _this=this;
            if(sum===9){
                _this.app9=true;
                _this.app8=true;
                _this.app7=true;
                _this.app6=true;
            }
        }

    }
})
function enlargeImg(sun) {
    $('#enlargeImg').show();
    $('#enlargeImg>img')[0].src=sun.src;
}
function enlargeImgtogglo(sun){
    $('#enlargeImg').hide();
}
app.init();
function filesInput() {//控制 显示 缩略图
    var filesNumber=app.filesInputNumber;
    var Box=$("#imgBox");
    var imagesBox=$("#imagesBOX");
    var a_upload=$(".a-upload"+filesNumber);
    var input=$('#myfile'+filesNumber);
    var reader = new FileReader();
    reader.onload = function (e){
        var div=document.createElement("div");
        var img=document.createElement("img");
        img.src=e.target.result;
        div.onclick=function (){
            a_upload.remove()
            div.remove();
            if($("#imagesBOX>div").length<1){
                $("#app3_Button").attr('disabled','disabled');
            }
        }
        div.appendChild(img);
        imagesBox.append(div)
    }
    reader.readAsDataURL(input[0].files[0]);
    a_upload.css('display','none');
    $("#app3_Button").removeAttr('disabled');
    app.filesInputNumber++;
    Box.append('<div href="javascript:;" class="a-upload a-upload'+app.filesInputNumber+'" onclick="fn1('+app.filesInputNumber+')" ><input class="imagesInput" id="myfile'+app.filesInputNumber+'" type="file" accept="image/*" onchange="filesInput()"/></div>')
}