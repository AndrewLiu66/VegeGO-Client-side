<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">
        &#xe6f2;
      </div>
      Order Confirmation
    </div>
    <!-- v-show="addressConfirm" -->
    <div class="top__receiver" v-show="addressStatus">
      <div class="top__receiver__title">Address</div>
      <div class="top__receiver__address">
        University Of Washington, Seattle, WA
      </div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">Andrew Liu </span>
        <span class="top__receiver__info__name">8888888888</span>
      </div>
      <div class="iconfont top__receiver__icon">&#xe6f2;</div>
    </div>
    <!-- if no mailing address, show -->
    <div class="top__receiver" v-show="!addressStatus">
      <div class="top__receiver__msg">Add a mailing address</div>
      <span class="top__receiver__icon iconfont" @click="handleAddressClick"
        >&#xe668;</span
      >
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import useCommonAddressEffect from "../../effects/addressEffect";
import { useStore } from "vuex";
import { toRefs, ref } from "vue";

export default {
  name: "TopArea",
  setup() {
    const router = useRouter();
    const handleBackClick = () => {
      router.back();
    };

    // fetch address data
    const store = useStore();
    const { getAddressList } = useCommonAddressEffect();
    getAddressList(true);
    let { addressList } = toRefs(store.state);
    // console.log("addressList", addressList);
    let addressListLength = ref(addressList.value.length);
    let addressStatus = false;
    if (addressListLength.value !== 0) {
      addressStatus = true;
    }
    // console.log("check length", addressListLength.value === 0);

    const handleAddressClick = () => {
      router.push({ name: "MyAddressList" });
    };

    return { handleBackClick, addressStatus, handleAddressClick };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #419e5c 50%);
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: 0.2rem;
    line-height: 0.24rem;
    color: #fff;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      left: 0.18rem;
      font-size: 0.22rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: #fff;
    border-radius: 0.04rem;
    &__msg {
      text-align: center;
      font-size: 0.16rem;
      line-height: 1.11rem;
    }
    &__title {
      line-height: 0.22rem;
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: #333;
    }
    &__address {
      line-height: 0.2rem;
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      color: #333;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name {
        margin-right: 0.06rem;
        line-height: 0.18rem;
        font-size: 0.12rem;
        color: #666;
      }
    }
    &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: 0.2rem;
      top: 0.45rem;
      color: #419e5c;
      font-size: 0.2rem;
    }
  }
}
</style>
