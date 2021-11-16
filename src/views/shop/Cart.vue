<template>
  <div
    class="mask"
    v-if="showCart && calculations.total > 0"
    @click="handleCartShowChange"
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => setCartItemsChecked(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allChecked ? '&#xe652;' : '&#xe667;'"
          >
          </span>
          Select All
        </div>
        <div class="product__header__clear">
          <span
            class="product__header__clear__btn"
            @click="() => cleanCartProducts(shopId)"
            >Empty Cart</span
          >
        </div>
      </div>

      <!-- 只有当购物车的商品大于0的时候，才显示购物车的内容 -->
      <div class="product__item" v-for="item in productList" :key="item._id">
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe652;' : '&#xe667;'"
          @click="() => changeCartItemChecked(shopId, item._id)"
        ></div>
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, -1);
              }
            "
            >&#xe691;</span
          >
          <!-- 获取购物车中的数量然后显示出来 -->
          {{ item.count || 0 }}
          <span
            class="product__number__plus iconfont"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, 1);
              }
            "
            >&#xe668;</span
          >
        </div>
      </div>
    </div>

    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        Total Price:
        <span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn" v-show="calculations.total > 0">
        <!-- 点击 去结算 能够跳到结算页面 -->
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
          Check Out
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/cartEffects";

const useCartEffect = (shopId) => {
  const { changeCartItemInfo, cartList } = useCommonCartEffect(shopId);
  const store = useStore();

  // 将购物车的东西拿出来
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || [];
    return productList;
  });

  const calculations = computed(() => {
    // 计算同一家商店下面所有购买商品的数量和
    const productList = cartList[shopId]?.productList;
    const result = { total: 0, price: 0, allChecked: true };
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        result.total += product.count;
        if (product.check) {
          result.price += product.count * product.price;
        }
        // 当购物车内的所有商品都被选中的时候，全选图标点亮
        if (product.count > 0 && !product.check) {
          result.allChecked = false;
        }
      }
    }
    result.price = result.price.toFixed(2);
    return result;
  });

  // 点击全选按钮，则所有被选中的商品被点亮
  const setCartItemsChecked = (shopId) => {
    store.commit("setCartItemsChecked", { shopId });
  };

  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", {
      shopId,
      productId,
    });
  };
  // 清空购物车逻辑
  const cleanCartProducts = (shopId) => {
    store.commit("cleanCartProducts", {
      shopId,
    });
  };
  console.log("test for productList", productList);
  return {
    calculations,
    cartList,
    setCartItemsChecked,
    cleanCartProducts,
    productList,
    changeCartItemInfo,
    changeCartItemChecked,
  };
};

// 展示购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  };
  return { showCart, handleCartShowChange };
};

export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const {
      calculations,
      productList,
      setCartItemsChecked,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
    } = useCartEffect(shopId);
    const { showCart, handleCartShowChange } = toggleCartEffect();
    return {
      calculations,
      productList,
      handleCartShowChange,
      showCart,
      setCartItemsChecked,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
    };
  },
};
</script>

<style lang='scss' scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  /* 为了能让蒙层在底部展示 */
  z-index: 2;
  background: #fff;
}

.product {
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;
  &__header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: 0.01rem solid $content-bgColor;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &__all {
      width: 1rem;
      margin-left: 0.18rem;
    }
    &__icon {
      display: inline-block;
      margin-right: 0.1rem;
      vertical-align: top;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &__clear {
      flex: 1;
      margin-right: 0.16rem;
      text-align: right;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__checked {
      line-height: 0.5rem;
      margin-right: 0.2rem;
      color: #0091ff;
      font-size: 0.2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.26rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        position: relative;
        top: 0.02rem;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &__plus {
        position: relative;
        top: 0.02rem;
        color: $btn-bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
.check {
  display: flex;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $hightlight-fontColor;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: #fff;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &__price {
      line-height: 0.49rem;
      color: $hightlight-fontColor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    font-size: 0.14rem;
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>
