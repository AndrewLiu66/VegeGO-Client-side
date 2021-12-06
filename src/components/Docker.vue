<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{
        docker__item: true,
        'docker__item--active': index === currentIndex,
      }"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Docker",
  props: ["currentIndex"],
  setup() {
    const dockerList = [
      { icon: "&#xe6f3;", text: "Home", to: { name: "Home" } },
      { icon: "&#xe7e5;", text: "Cart", to: { name: "CartList" } },
      { icon: "&#xe61e;", text: "Order", to: { name: "OrderList" } },
      { icon: "&#xe660;", text: "Me", to: { name: "Home" } },
    ];
    return { dockerList };
  },
};
</script>

<style lang="scss" scopedx>
@import "../style/variables.scss";
@import "../style/mixins.scss";
.docker {
  box-sizing: border-box;
  padding: 0 0.18rem;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font: 0.18rem;
    }
    &--active {
      a {
        color: #72a759;
      }
    }
  }
}
.docker__title {
  font-size: 0.2rem;
  transform: scale(0.5, 0.5);
  transform-origin: center top;
}
</style>
