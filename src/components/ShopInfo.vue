<template>
  <div class="shop">
    <!-- <div>{{ item.imgUrl }}</div> -->
    <!-- <img :src="item.imgUrl" class="shop__img" /> -->
    <img :src="item.imgUrl" class="shop__img" />
    <div
      :class="{
        shop__content: true,
        'shop__content--bordered': hideBorder ? false : true,
      }"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <div>
          <span class="shop__content__tag">items sold: {{ item.sales }}</span>
          <span class="shop__content__tag"
            >delivery from: {{ item.expressLimit }}</span
          >
        </div>
        <span class="shop__content__tag"
          >delivery fee: {{ item.expressPrice }}</span
        >
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  // 从父元素拿nearbyList里面的项
  // hideBorder的作用是让shop这个组件下面的border消失
  props: ["item", "hideBorder"],
};
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";
@import "../style/mixins.scss";
.shop {
  display: flex;
  padding-top: 0.12rem;
  &__img {
    margin-right: 0.16rem;
    width: 0.56rem;
    height: 0.56rem;
  }
  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    &--bordered {
      border-bottom: 0.01rem solid $content-bgColor;
    }
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__tags {
      margin-top: 0.08rem;
      line-height: 0.25rem;
      font-size: 0.13rem;
      color: $content-fontcolor;
    }
    &__tag {
      margin-right: 0.12rem;
    }
    &__highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $hightlight-fontColor;
    }
  }
}
</style>
