import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Vue from 'vue';

const app = new Vue({
    el:'#app',
    data:{
        titlt:'标题'
    }
});

//const Vue = require('vue');
// console.log(Vue)

// new Vue({
//     data() {
//         return {
//             fileName: 'fileName',
//             fileContent: 'fileContent'
//         }
//     },
//     render: h => h(MyComponent)
// }).$mount('#app');

// export default class MyComponent extends Vue {
//     // 初始数据可以直接声明为实例的 property
//     message: string = 'Hello!'
//     template: string = '<div>{{message}}</div>'
//     // 组件方法也可以直接声明为实例的方法
//     onClick(): void {
//         window.alert(this.message)
//     }
// }