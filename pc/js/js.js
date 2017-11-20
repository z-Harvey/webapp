var app = new Vue({
    el: '#app1',
    data: {
        Employee:{
            Employee_name:'常青',
            Employee_number:'4000800000',
            Employee_times:null
        },
        user_data:null,
        input_arr:{
            user:null,
            card_id:null,
            case_id:null,
            start_time:null,
            end_time:null,
            input_invoice:null
        },
        query_lis:null
    },
    methods:{
        fn1:function () {
            var time=new Date();
            this.Employee.Employee_times=time.toLocaleString();
            var _this=this;
            var appurl='/api/ocr/list_case_all/?company_name=cpic';
            setInterval(function () {
                $.ajax({
                    type: "POST",
                    url: appurl,
                    cache: false,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    success: function(msg){
                        _this.user_data=msg.data;
                    }
                })
            },4000)
        },
        clic:function (sun) {
            var _this=this;
            var user=encodeURI(sun.username);
            var Employee_name=encodeURI(_this.Employee.Employee_name);
            var Employee_number=encodeURI(_this.Employee.Employee_number);
            var Employee_times=encodeURI(_this.Employee.Employee_times);
            window.open('/api/ocr/index_list/?user='+user+'&image_id='+sun.uuid+'&Employee_name='+Employee_name+'&Employee_number='+Employee_number+'&times='+Employee_times)
        },
        search:function () {
            var _this=this;
            var appurl='/api/ocr/search/?company_name=cpic';
            var obj=new Object();
            for(i in this.input_arr){
                console.log(this.input_arr[i] !== '' && this.input_arr[i] !== null);
                if(this.input_arr[i]!==''&&this.input_arr[i]!==null){
                    obj[i]=this.input_arr[i];
                }
            }
            var data=JSON.stringify(obj);
            $.ajax({
                type: "POST",
                url: appurl,
                data:data,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function(msg){
                    console.log(msg.data);
                    _this.query_lis=msg.data;
                    $('#query').show(500)
                }
            })
        }
    }
})
