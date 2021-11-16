<template>
  <div class="order">
    <div class="order__price">
      Total Price: <b>¥{{ calculations.price }}</b>
    </div>
    <div class="order__btn" @click="() => handleShowConfirmChange(true)">
      Place Order
    </div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <!-- @click.stop使得你点击中间的确认框的时候不会退出蒙层，防止冒泡 -->
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">Are you sure to place the order？</h3>
      <p class="mask__content__desc">Order will be canceled in 15 minutes</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >
          Cancel
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >
          Confirm
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { post } from "../../utils/request";
import { useCommonCartEffect } from "../../effects/cartEffects";

const useMakeOrderEffect = (shopId, shopName, productList) => {
  const store = useStore();
  const router = useRouter();
  const handleConfirmOrder = async (isCanceled) => {
    const products = [];
    for (let i in productList.value) {
      const product = productList.value[i];
      // parseInt将文字转化为数字
      products.push({ id: parseInt(product._id, 10), num: product.count });
    }
    try {
      const result = await post("/api/order", {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products,
      });
      if (result?.errno === 0) {
        store.commit("clearCartData", shopId);
        router.push({ name: "OrderList" });
      }
    } catch (e) {
      // 提示下单失败
    }
  };
  return { handleConfirmOrder };
};

//蒙层展示相关逻辑
const useShowMaskEffect = () => {
  //用来判断是否打开提交订单页面
  const showConfirm = ref(false);
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status;
  };
  return { showConfirm, handleShowConfirmChange };
};

export default {
  name: "Order",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { calculations, shopName, productList } = useCommonCartEffect(shopId);
    const { handleConfirmOrder } = useMakeOrderEffect(
      shopId,
      shopName,
      productList
    );
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect();

    const handleCancelOrder = () => {
      alert("cancel");
    };

    return {
      showConfirm,
      handleShowConfirmChange,
      calculations,
      handleConfirmOrder,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background: #fff;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: #333;
  }
  &__btn {
    width: 0.98rem;
    background: #4fb0f9;
    color: #fff;
    text-align: center;
    font-size: 0.14rem;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    text-align: center;
    border-radius: 0.04rem;
    &__title {
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
      font-size: 0.18rem;
      color: #333;
    }
    &__desc {
      font-size: 0.14rem;
      color: #666666;
      margin: 0.08rem 0 0 0;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        margin-right: 0.12rem;
        border: 0.01rem solid #4fb0f9;
        color: #4fb0f9;
      }
      &--last {
        margin-left: 0.12rem;
        background: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>
