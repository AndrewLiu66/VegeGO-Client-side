<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe619;</span>
    4041 Roosevelt Way NE, Seatte, WA
    <span class="iconfont position__notice">&#xe60b;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe62d;</span>
    <span class="search__text">Search an item</span>
  </div>
  <div class="banner">
    <n-config-provider :theme-overrides="themeOverrides">
      <n-carousel class="n-carousel .n-carousel__dots">
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        />
      </n-carousel>
    </n-config-provider>
  </div>
  <div class="icons">
    <div class="icons__item" v-for="item in iconsList" :key="item.desc">
      <img
        class="icons__item__img"
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
      />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, components } from "vue";
import { NCarousel } from "naive-ui";
import { NConfigProvider } from "naive-ui";

export default {
  name: "StaticPart",
  components: {
    NCarousel,
    NConfigProvider,
  },
  setup() {
    const themeOverrides = {
      Carousel: {
        dotSize: "10px",
      },
      // ...
    };

    const iconsList = [
      { imgName: "超市", desc: "Grocery" },
      { imgName: "菜市场", desc: "Vegetable" },
      { imgName: "水果店", desc: "Fruit" },
      { imgName: "鲜花", desc: "Plants" },
      { imgName: "医药健康", desc: "Health" },
      { imgName: "家居", desc: "Household" },
      { imgName: "蛋糕", desc: "Bakery" },
      { imgName: "签到", desc: "Promotion" },
      { imgName: "大牌免运", desc: "Drink" },
      { imgName: "红包", desc: "Meat" },
    ];
    return { iconsList, themeOverrides };
  },
};
</script>

<style lang='scss' scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";

.n-carousel {
  border-radius: 5px;
}

.carousel-img {
  width: 100%;
  height: 80px;
  object-fit: cover;
}

.position {
  color: $content-fontcolor;

  @include ellipsis;
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  margin-right: 0.24rem;
  .position__icon {
    top: -0.01rem;
    position: relative;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    top: 0.17rem;
    font-size: 0.2rem;
    right: 0;
  }
}

.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background: #f5f5f5;
  color: #b7b7b7;
  border-radius: 0.16rem;
  font-size: 0.14rem;
  .iconfont {
    display: inline-block;
    padding: 0 0.08rem 0 0.16rem;
    font-size: 0.16rem;
  }
  &__text {
    display: inline-block;
    font-size: 0.14rem;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
</style>
