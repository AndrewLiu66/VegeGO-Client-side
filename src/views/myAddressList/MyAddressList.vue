<template>
  <div class="wrapper">
    <div class="title">
      <div class="iconfont title__back" @click="handleBackClick">&#xe6f2;</div>
      <div class="title__text">My Address</div>
      <div class="title__add" @click="handleAddClick">create</div>
    </div>
    <Address
      v-for="address in addressList"
      :key="address._id"
      :address="address"
      @click="() => handleUpdateClick(address._id)"
    />
  </div>
</template>

<script>
import Address from "../../components/Address";
import useCommonAddressEffect from "../../effects/addressEffect";

import { toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "MyAddressList",
  components: { Address },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { addressList } = toRefs(store.state);
    // console.log("addressList", addressList);
    const { getAddressList } = useCommonAddressEffect();
    getAddressList(true);
    const handleBackClick = () => {
      router.back();
    };
    const handleAddClick = () => {
      router.push({ name: "UpsertAddress" });
    };
    const handleUpdateClick = (addressId) => {
      router.push(`/upsertAddress/${addressId}`);
    };
    return { addressList, handleBackClick, handleAddClick, handleUpdateClick };
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
  bottom: 0;
  right: 0;
  background: $dark-bgColor;
}
.title {
  display: flex;
  line-height: 0.44rem;
  background: #419e5c;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
  &__back {
    width: 0.2rem;
    margin-left: 0.18rem;
    font-size: 0.2rem;
    color: #fff;
  }
  &__text {
    flex: 1;
    color: #fff;
    text-align: center;
  }
  &__add {
    color: #fff;
    margin-right: 0.2rem;
    font-size: 0.14rem;
  }
}
</style>
