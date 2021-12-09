<template>
  <div class="wrapper">
    <div class="title">
      <div class="iconfont title__back" @click="handleBackClick">&#xe6f2;</div>
      <div class="title__text">
        {{ addressId ? "Edit your address" : "create" }}
      </div>
      <div class="title__save" @click="upsertAddress">save</div>
    </div>
    <div class="form">
      <div class="form__item">
        <div class="form__item__label">City:</div>
        <input
          class="form__item__content"
          placeholder="E.g. Seattle"
          v-model="formData.city"
        />
      </div>
      <div class="form__item">
        <div class="form__item__label">Street address:</div>
        <input
          class="form__item__content"
          placeholder="E.g. 4060 9th Ave"
          v-model="formData.department"
        />
      </div>
      <div class="form__item">
        <div class="form__item__label">Unit:</div>
        <input
          class="form__item__content"
          placeholder="E.g. 888"
          v-model="formData.houseNumber"
        />
      </div>
      <div class="form__item">
        <div class="form__item__label">Name:</div>
        <input
          class="form__item__content"
          placeholder="E.g. Andrew"
          v-model="formData.name"
        />
      </div>
      <div class="form__item">
        <div class="form__item__label">Phone number:</div>
        <input
          class="form__item__content"
          placeholder="E.g. 1888888888"
          v-model="formData.phone"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { post, get, patch } from "../../utils/request";
import useCommonAddressEffect from "../../effects/addressEffect";

const useAddressEffect = () => {
  const store = useStore();
  const { addressList } = toRefs(store.state);
  const { getAddressList } = useCommonAddressEffect();
  getAddressList();
  return { addressList };
};

const useFormEffect = (addressId) => {
  const router = useRouter();
  const formData = reactive({
    city: "",
    department: "",
    houseNumber: "",
    name: "",
    phone: "",
  });
  const getAddressItem = async () => {
    const result = await get(`/api/user/address/${addressId}`);
    if (result?.errno === 0 && result?.data) {
      const { city, department, houseNumber, name, phone } = result.data;
      formData.city = city;
      formData.department = department;
      formData.houseNumber = houseNumber;
      formData.name = name;
      formData.phone = phone;
    }
  };
  const upsertAddress = async () => {
    if (addressId) {
      const result = await patch(`/api/user/address/${addressId}`, formData);
      if (result?.errno === 0) {
        router.back();
      }
    } else {
      const result = await post("/api/user/address", formData);
      if (result?.errno === 0) {
        router.back();
      }
    }
  };
  if (addressId) {
    getAddressItem();
  }
  return { formData, upsertAddress };
};

export default {
  name: "MyAddressList",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const addressId = route?.params?.id;
    const { addressList } = useAddressEffect();
    const { formData, upsertAddress } = useFormEffect(addressId);
    const handleBackClick = () => {
      router.back();
    };
    return { addressId, addressList, formData, handleBackClick, upsertAddress };
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
  background: $bgColor;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
  &__back {
    width: 0.2rem;
    margin-left: 0.18rem;
    font-size: 0.2rem;
    color: $search-fontColor;
  }
  &__text {
    flex: 1;
    text-align: center;
  }
  &__save {
    margin-right: 0.2rem;
    font-size: 0.14rem;
  }
}
.form {
  padding: 0 0.2rem;
  margin-top: 0.12rem;
  background: $bgColor;
  border-top: 0.01rem solid $content-bgColor;
  border-bottom: 0.01rem solid $content-bgColor;
  &__item {
    display: flex;
    padding: 0.12rem 0;
    line-height: 0.2rem;
    font-size: 0.14rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &:last-of-type {
      border-bottom: none;
    }
    &__label {
      margin-right: 0.05rem;
      color: $medium-fontColor;
    }
    &__content {
      flex: 1;
      border: none;
      outline: none;
      color: #3f3f3f;
      &::placeholder {
        color: #959595;
      }
    }
  }
}
</style>
