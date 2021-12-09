<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://localhost:8080/Images/logo.png" />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="username"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="password"
        type="password"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">Login</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">Register</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
// useRouter能购使得js文件也能够操控路由
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

// 所有跟login相关的代码
const useLoginEffect = (showToast) => {
  const data = reactive({
    username: "",
    password: "",
  });
  const router = useRouter();
  //async表示后面🈶️异步操作,await表示等待返回结果
  const handleLogin = async () => {
    try {
      const result = await post("/api/user/login", {
        username: data.username,
        password: data.password,
      });
      //?.的作用跟.差不多,但是如果没有errono系统不会报错
      if (result?.errno === 0) {
        localStorage.isLogin = true;
        //router.push使用户点击登录后自动跳转到home页面，下面向接口传输的数据绑定了用户输入的数据
        router.push({ name: "Home" });
      } else {
        showToast("登录失败");
      }
      // catch的作用是如果上面的接口没有用，那下面的if(result?.data?.errno === 0) {
      // 是不会被执行的，因此需要用一个catch才能看到反馈
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};

// 所有跟注册相关的逻辑
const useRegisterEffect = () => {
  const router = useRouter();
  //使得用户点击 立即注册 可以跳转到resgiste页面
  const handleRegisterClick = () => {
    router.push({ name: "Register" });
  };
  return { handleRegisterClick };
};

export default {
  name: "Login",
  components: { Toast },
  setup() {
    //从toast的文件中引入跟toast相关的所有东西
    const { show, toastMessage, showToast } = useToastEffect();

    //把所有跟login相关的代码封装在useLoginEffect然后调用
    const { username, password, handleLogin } = useLoginEffect(showToast);

    const { handleRegisterClick } = useRegisterEffect();
    return {
      username,
      password,
      handleLogin,
      handleRegisterClick,
      show,
      toastMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    height: 0.5rem;
  }
  &__input {
    height: 0.45rem;
    margin: 0 0.5rem 0.16rem 0.5rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    border-radius: 0.06rem;
    font-size: 0.16rem;
    &__content {
      margin-top: 0.12rem;
      line-height: 0.22rem;
      width: 100%;
      border: none;
      outline: none;
      background: none;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login-button {
    background: #419e5c;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    line-height: 0.48rem;
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.16rem;
    margin: 0.32rem 0.5rem 0.16rem 0.5rem;
    text-align: center;
  }
  &__login-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
