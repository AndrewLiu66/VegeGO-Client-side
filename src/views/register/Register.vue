<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://localhost:8080/Images/logo.png" />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="Enter a username"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="enter a password"
        type="password"
        autocomplete="new-password"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="confirm password"
        type="password"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">Register</div>
    <div class="wrapper__register-link" @click="handleLoginClick">
      use existing account
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
// useRouter能购使得js文件也能够操控路由
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";
//注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({
    username: "",
    password: "",
    ensurement: "",
  });
  const handleRegister = async () => {
    try {
      const result = await post("/api/user/register", {
        username: data.username,
        password: data.password,
      });
      //?.的作用跟.差不多,但是如果没有errono系统不会报错
      if (result?.errno === 0) {
        router.push({ name: "Login" });
      } else {
        showToast("注册失败");
      }
      // catch的作用是如果上面的接口没有用，那下面的if(result?.data?.errno === 0) {
      // 是不会被执行的，因此需要用一个catch才能看到反馈
    } catch (e) {
      showToast("请求失败");
    }
  };

  const { username, password, ensurement } = toRefs(data);
  return { username, password, ensurement, handleRegister };
};

//使得用户点击 已有账号去登陆 可以跳转到Login页面
const useLoginEffect = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push({ name: "Login" });
  };
  return { handleLoginClick };
};

export default {
  name: "Register",
  component: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, ensurement, handleRegister } =
      useRegisterEffect(showToast);
    const { handleLoginClick } = useLoginEffect();
    return {
      username,
      password,
      ensurement,
      handleRegister,
      show,
      toastMessage,
      handleLoginClick,
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
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
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
  &__register-button {
    background: #419e5c;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    line-height: 0.48rem;
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.16rem;
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    text-align: center;
  }
  &__register-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
