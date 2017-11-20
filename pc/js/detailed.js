var app = new Vue({
    el: '#app1',
    data: {
        Employee_name:null,
        Employee_number:null,
        Employee_times:null,
        lis:null,//左侧小列表信息 票据类型/编号
        sum:0,//控制是否显示输入编号DIV
        arr:null,//显示 输入DIV 时 需要修改的数据
        ImgUrl:null,//输入DIV 的右侧大图 的img——url
        BoxDetails:null,//点击单张后 右侧的单张详情数据
        separation_state:0,
        BoxDetails_arr:new Array,
        uuid:null
    },
    methods:{
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
        getLocalTime:function (nS) {
            return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        },
        lod:function () {//进入页面即自动运行的函数
            var _this=this;
            _this.Employee_name=_this.GetQueryString('Employee_name');
            _this.Employee_number=_this.GetQueryString('Employee_number');
            _this.Employee_times=_this.GetQueryString('times');
            if(_this.GetQueryString('uuid')!==undefined){
                _this.uuid=_this.GetQueryString('uuid');
            }
            var appurl='/api/ocr/detect_data/?user='+_this.GetQueryString('user')+'&image_id='+_this.GetQueryString('image_id');
            _this.sum=0;
            _this.arr=[];
            $.ajax({
                type: "POST",
                url: appurl,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(msg){
                    _this.lis=msg.data;
                    for(var i=0;i<_this.lis[0].length;i++){
                        if(_this.lis[i].separation_state===1){
                            if(_this.lis[i].invoice_no===''){
                                ++_this.sum;
                                _this.arr[_this.arr.length]=i
                            }
                        }
                    }
                }
            })
        },
        imgur:function (data) {//输入DIV右侧大图
            this.ImgUrl=data
        },
        lci:function (data) {// 点击左侧小列表 请求数据
            var _this=this;
            _this.separation_state=data.separation_state;
            var appurl="/api/ocr/check_result/?image_name="+data.image_name+"&separation_state="+data.separation_state+"&user="+data.user+"&uuid="+data.uuid;
            $.ajax({
                type: "POST",
                url: appurl,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(msg){
                    if(_this.separation_state==1){
                        for(var j in msg.data[0]){
                            if(msg.data[0][j].toString().substring(0,1)=='-'){
                                msg.data[0][j]=msg.data[0][j].toString().substring(1,msg.data[0][j].length);
                            }else if(msg.data[0][j].toString().substring(0,1)==''){
                                msg.data[0][j]="----";
                            }
                        }
                        var Flog_arr=msg.data[0].flag;
                        for(var i=0;i<Flog_arr.length;i++){
                            _this.BoxDetails_arr[i]=Flog_arr.substring(i,i+1)==1?false:true;
                        }
                    }
                    _this.BoxDetails=msg;
                }
            })
        },
        DataNumber:function () {//将输入后的 编号依次上传
            var inp=$('#DataNum>div>input');
            var _this=this;
            for(var i=0;i<inp.length;i++){
                if(inp[i].value===''){
                    alert('请填写第'+(i+1)+'张！');
                    return
                }else{
                    var data=_this.lis[_this.arr[i]];
                    var appurl='/api/ocr/invoice_no_create/?uuid='+data.uuid+'&image_name='+data.image_name+'&user='+data.user+'&invoice_no='+inp[i].value;
                    $.ajax({
                        type: "POST",
                        url: appurl,
                        cache: false,
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        success: function(msg){
                            _this.lis=msg.data;
                        }
                    })
                }
            }
            $("#mote").hide();
            location.replace(location.href);
        },
        edit:function (sum,num) {//修改数据 同步数据
            this.BoxDetails.data[0][sum]=$('#span' + num)[0].innerText;
            console.log(this.BoxDetails.data[0][sum]);
        },
        modify:function (){//修改发票数据 只能修改发票
            var _this=this;
            var obj=this.BoxDetails.data[0];
            var data1=JSON.stringify(obj);//将对象转为JSON对象
            var username=this.BoxDetails.data[0].username;
            var uuid=this.BoxDetails.data[0].uuid;
            var imgname=this.BoxDetails.data[0].image_name;
            var appurl='/api/ocr/update_invoice/?uuid='+uuid+'&user='+username+'&image_name='+imgname;
            $.ajax({
                type: "POST",
                url: appurl,
                data:data1,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(msg){
                    _this.BoxDetails=msg;
                }
            })
        },
        Audit:function (sun) {
            var _this=this;
            var obj=new Object()
            obj[uuid]=_this.lis[0].uuid;
            obj[user]=_this.lis[0].user;
            obj[audit_name]=_this.Employee_name;
            obj[audit_state]=sun;
            var data=JSON.stringify(obj);
            var appurl='/api/ocr/audit_status/';
            $.ajax({
                type:"POST",
                url:appurl,
                data:data,
                cache:false,
                enctype:'multipart/form-data',
                processData:false,
                contentType:false,
                success:function (data) {

                }
            })
        },
        Reject:function () {
            alert(11)
        }
    }
})
app.lod();
