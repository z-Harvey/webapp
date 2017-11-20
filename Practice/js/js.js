// Vue.component('roun',{
//     template:'<h1>asdfasdf</h1>'
// })
// var chou={
//     template: '<h2>a654sdfasdf</h2>'
// }
// var Child = {
//     template: '<h1>自定义组件!</h1>'
// }
//
//
// var app=new Vue({
//     el: '#app',
//     components: {
//         'runoob': Child
//     }
// })
//
// var app1=new Vue({
//     el: '#app',
//     components: {
//         'root': Child
//     }
// })
// 注册
// Vue.component('child', {
//     // 声明 props
//     props: ['msg'],
//     // 同样也可以在 vm 实例中像 "this.message" 这样使用
//     template: '<span>{{ msg }}</span>'
// })
// // 创建根实例
// new Vue({
//     el: '#app',
//     data:{
//         hel:'asdf'
//     }
// })
// Vue.component('root',{
//     props:{
//         'msg':Number
//     },
//     template: '<h1>{{msg}}</h1>'
// })
// var app=new Vue({
//     el:'#app',
//     data:{
//         times:[1,2,3,4,5]
//     }
// })
//////////////*****************
// Vue.component('button-counter', {
//     template: '<button v-on:click="increment">{{ counter }}</button>',
//     data: function () {
//         return {
//             counter: 0
//         }
//     },
//     methods: {
//         increment: function () {
//             this.counter += 1
//             this.$emit('increment')
//         }
//     },
// })
// new Vue({
//     el: '#counter-event-example',
//     data: {
//         total: 0
//     },
//     methods: {
//         incrementTotal: function () {
//             this.total += 1;
//             alert(1)
//         }
//     }
// })
////////////////////////////////
Vue.component('button-counter',{
    template:'<button @click="onck">{{msg}}</button>',
    data:function () {
        return{
            msg:0
        }
    },
    methods:{
        onck:function () {
            console.log(this.msg);
            console.log(this.$children);
            this.$emit('onck')
        }
    }
})
new Vue({
    el:'#app',
    data:{
        msg:0,
        time:0
    },
    methods:{
        hehe:function () {
            alert(1)
        }
    }
})