/**
 * Created by Administrator on 2017/11/1.
 */

var notice=function () {


}
var noti=new Vue({
    el:notice.prototype.foo,
    data:{
        msg:'123123'
    }
})
notice.prototype.foo='<div id="notice" style="font-size:0.8em;background: #fff">'
    +'<div class="txt1">{{msg}}'
    +'<h1>商业保险理赔通知书</h1>'
    +'<p>尊敬的 <span> Harvey </span> 先生：</p>'
    +'<p>您好！您的赔付申请我们已经收到，经过审慎核定您的申请资料，将本次理赔结果向您通知如下：</p>'
    +'</div>'
    +'<hr>'
    +'<div class="txt2">'
    +'<ul>'
    +'<li><span>申请号码：<span>MC02000052097092</span></span><span>受理日期：<span>2017/10/19</span></span></li>'
    +'<li><span>批次号码：</span></li>'
    +'</ul>'
    +'<ul>'
    +'<li><span>保单号：<span>GP01422017409090</span></span><span>投保单位：<span>爱立信（中国）通信有限公司</span></span></li>'
    +'<li><span>客户代码：<span>GC01431028817524</span></span></li>'
    +'<li><span>员工号/部门：<span>23075647/CBC</span></span></li>'
    +'<li><span>身份证号码：<span>610220199502457884</span></span><span>主被保险人(身份证号码)：<span>610220199502457884</span></span></li>'
    +'<li><span>与被保险人关系：<span>本人</span></span></li>'
    +'</ul>'
    +'<hr>'
    +'<ul>'
    +'<li><span>申请人：<span>Harvey</span></span><span>与出险人关系：<span>本人</span></span></li>'
    +'<li><span>开户地：<span>北京/北京地区</span></span><span>银行：<span>建行（北京市分行）</span></span></li>'
    +'<li><span>账号：<span>6215400300012154852</span></span><span>户主姓名：<span>Harvey</span></span></li>'
    +'</ul>'
    +'<ul>'
    +'<li>'
    +'<span>您本次申请赔付账单合计金额：<span>427.4</span></span><span>合计赔付金额：<span>375.75</span></span>'
    +'</li>'
    +'<hr>'
    +'<li>'
    +'<span  style="width:100%;">保单：<span>GP01422017409090（保险期限：2017年10月8日起到2018年10月8日止）</span>项下，理赔概要如下：</span>'
    +'</li>'
    +'</ul>'
    +'</div>'
    +'<div class="txt3">'
    +'<table border="1">'
    +'<tr>'
    +'<td>赔付责任</td>'
    +'<td>理赔结论</td>'
    +'<td>赔付金额</td>'
    +'<td>理赔说明</td>'
    +'<td>本保单已累计赔付金额</td>'
    +'</tr>'
    +'<tr>'
    +'<td>门诊急诊医疗责任</td>'
    +'<td>正常给付</td>'
    +'<td>375.75</td>'
    +'<td>详见费用型责任赔付明细</td>'
    +'<td>1509.78</td>'
    +'</tr>'
    +'</table>'
    +'<p>费用型责任赔付明细如下：</p>'
    +'<table border="1">'
    +'<tr>'
    +'<td>账单号</td>'
    +'<td>  就诊日期  </td>'
    +'<td>  账单金额  </td>'
    +'<td>  费用分类  </td>'
    +'<td>  对应金额  </td>'
    +'<td>  赔付金额  </td>'
    +'<td>对应责任</td>'
    +'<td>理算说明</td>'
    +'<td>备注</td>'
    +'</tr>'
    +'<tr>'
    +'<td rowspan="2">27657837</td>'
    +'<td rowspan="2">2017/10/19</td>'
    +'<td rowspan="2">427.4</td>'
    +'<td>全额自费</td>'
    +'<td>9.9</td>'
    +'<td rowspan="2">375.75</td>'
    +'<td rowspan="2">门诊急诊医疗责任</td>'
    +'<td rowspan="2">可理算费用为<span>417.5</span>元，理算金额=<span>417.5</span>*0.9=<span>375.75</span>元。理赔金额=<span>375.75</span>元。</td>'
    +'<td rowspan="2">全额自费<span>9.9</span>元</td>'
    +'</tr>'
    +'<tr>'
    +'<td>合理费用</td>'
    +'<td>417.5</td>'
    +'</tr>'
    +'<tr>'
    +'<td rowspan="2" colspan="2">合计</td>'
    +'<td rowspan="2">427.4</td>'
    +'<td>全额自费</td>'
    +'<td>9.9</td>'
    +'<td rowspan="2">375.75</td>'
    +'<td rowspan="2"> </td>'
    +'<td rowspan="2" colspan="2">各项费用分类，见下方释义说明</td>'
    +'</tr>'
    +'<tr>'
    +'<td>合理费用</td>'
    +'<td>417.5</td>'
    +'</tr>'
    +'</table>'
    +'</div>'
    +'<div class="txt4">'
    +'<p>'
    +'说明：“第三方已支付”指您从社会保险或其他途径获得的医疗补偿费用；“部分自费费用”指不属于社保支付范围内的乙类药品和诊疗项目先行自费部分费用；“全额自费费用”指不属于社保支付范围内的自费药品和诊疗项目费用；“其他不合理费用”指经我司审核不属于保险责任的费用；“合理费用”=就诊金额-全额自费-部分自费-其他不合理费用-第三方支付。'
    +'</p>'
    +'<span>*本通知书是我们对您此次理赔申请处理结果的详细说明，不作为领款凭证，如有赔付则保险金款项将于本清单打印后二到十个工作日内以银行转账或其它方式是给付。</span>'
    +'<span>*如果您的单位申请了网上理赔查询服务，您在收到本通知书后，可随时登录http://www.shumei.com，凭您的客户代码以及密码查询相关赔付信息。</span>'
    +'<ul>'
    +'<li>*如您对理赔结果有疑问，可在收到本通知后30个工作日内通过以下方式进行处理：</li>'
    +'<li>1.拨打本公司全国服务热线4000800000</li>'
    +'<li>2.下载“保数通”APP，通过在线客服查询。</li>'
    +'<li style="width:100%;text-align: right">北京数美科技有限公司</li>'
    +'<li style="width:100%;text-align: right">日期 <span>2017/10/19</span></li>'
    +'</ul>'
    +'</div>'
    +'</div>';