/**
 * Created by Administrator on 2017/11/3.
 */
function login() {
    var name=$("#ZHname").val();
    var password=$("#password").val();
    if(name!==''&&password!==''){
        var Base=new Base64();
        var obj=new Object();
        obj['username']=Base.encode(name);
        obj['password']=Base.encode(password);
        var data=JSON.stringify(obj);
        $.ajax({
            type: "POST",
            url: '/api/ocr/api_login/',
            data:data,
            cache: false,
            enctype: 'multipart/form-data',
            async:false,
            processData:false,
            contentType:false,
            success:function(msg){
                if(msg.message==="用户名不存在or密码错误"){
                    alert("用户名不存在or密码错误");
                }else if(msg.message==="succeed"){
                    window.location.href='index.html/login_name='+msg.company_name;
                }
            },
            error:function () {
                return 'error';
            }
        })

    }
}
console.log(window);
var add = function () {
    var counter = 0;
    this.a=function () {return counter += 1;}
};
var tion=function() {
    this.a=4;
}
tion.prototype.s=function (){
    return this.a++;
}
