<template>
    <div class='toast'>{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
    props: ['message']
}

// 把所有跟吗toast相关的代码封装在一个函数里面
export const useToastEffect = () => {
    const toastData = reactive({
        // 用来展示是否弹窗
        show: false,
        // 如果登录失败需要显示什么信息
        toastMessage: '',
    })
    // 用来设置不同的toast信息和toast自动消失
    const showToast = (message) => { 
        toastData.show = true,
        // 此处设置要显示出来的msg内容
        toastData.toastMessage = message
        // 两秒后toast自动消失
        setTimeout(()=> {
            toastData.show = false
            toastData.message = ''
        }, 2000)
    }
    //将toastData解构出来从而使得login能直接用show和toastMessage
    const { show, toastMessage } = toRefs(toastData)

    return { show, toastMessage, showToast }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: .1rem;
  background: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  color: #FFF;
}
</style>