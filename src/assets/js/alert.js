import Vue from 'vue'
import Alert from '../../components/plugins/Alert'

const AlertBox = Vue.extend(Alert)

let AlertModal = (text,title) => {
    let alertDom = new AlertBox({
        el: document.createElement('div') //将Alert组件挂载到新创建的div上
    })
    document.body.appendChild(alertDom.$el); //把Alert组件的dom添加到body里

    // 标题
    alertDom.title = title || '信息'
    alertDom.alertContent = text;
    alertDom.show();

}

export default AlertModal
