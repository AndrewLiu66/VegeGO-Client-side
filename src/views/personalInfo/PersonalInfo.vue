<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__info">
        <div class="header__info__user">{{ userInfo.username }}</div>
        <div class="header__info__id">ID:{{ userInfo._id }}</div>
      </div>
      <img class="header__avatar" src="../../assets/icon/avata.png" />
    </div>
    <div class="list">
      <div class="list__item" @click="handleAddressClick">
        <div class="list__item__icon iconfont">&#xe617;</div>
        <div class="list__item__test">My address</div>
        <div class="list__item__arrow iconfont">&#xe6f2;</div>
      </div>
    </div>
    <div class="logout" @click="handleLogout">Logout</div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { get } from "../../utils/request";
import Docker from "../../components/Docker";

const useUserEffect = () => {
  const userInfo = reactive({ _id: "", username: "" });
  const getUserInfo = async () => {
    const result = await get("/api/user/info");

    if (result?.errno === 0 && result?.data) {
      const { _id, username } = result.data;
      userInfo._id = _id || "";
      userInfo.username = username || "";
    }
  };
  getUserInfo();
  return userInfo;
};

export default {
  name: "PersonalInfo",
  components: { Docker },
  setup() {
    const router = useRouter();
    const handleLogout = () => {
      localStorage.removeItem("isLogin");
      router.replace({ name: "Login" });
    };
    const handleAddressClick = () => {
      router.push({ name: "MyAddressList" });
    };
    const userInfo = useUserEffect();
    return { handleLogout, handleAddressClick, userInfo };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: $dark-bgColor;
}
.header {
  position: relative;
  height: 1.5rem;
  background-image: linear-gradient(239deg, #abd392 0%, #50c7fb 100%);
  padding-top: 0.3rem;
  &__info {
    margin: 0.7rem 0.18rem 0 0.18rem;
    padding: 0.65rem 0 0.3rem 0;
    height: 0.66rem;
    background: #fff;
    border-radius: 0.08rem;
    &__user {
      font-size: 0.24rem;
      color: #262628;
      text-align: center;
      line-height: 0.36rem;
    }
    &__id {
      margin-top: 0.04rem;
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
    }
  }
  &__avatar {
    position: absolute;
    left: 50%;
    top: 0.35rem;
    transform: translateX(-50%);
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
  }
}
.list {
  margin: 1rem 0.18rem 0 0.18rem;
  background: $bgColor;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  &__item {
    display: flex;
    padding: 0.2rem;
    line-height: 0.22rem;
    font-size: 0.14rem;
    color: #262626;
    &__icon {
      margin-right: 0.12rem;
      width: 0.22rem;
      height: 0.22rem;
      background: #32c5ff;
      border-radius: 0.08rem;
      text-align: center;
      font-weight: bold;
      color: $bgColor;
    }
    &__test {
      flex: 1;
    }
    &__arrow {
      width: 0.2rem;
      transform: rotate(180deg);
      font-weight: bold;
      color: #c2c4ca;
    }
  }
}
.logout {
  margin: 0.18rem;
  line-height: 0.32rem;
  background: $btn-bgColor;
  color: $bgColor;
  text-align: center;
  border-radius: 0.04rem;
}
</style>
