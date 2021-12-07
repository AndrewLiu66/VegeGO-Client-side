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
  <div class="icons">
    <div class="icons__item">
      <img class="icons__item__img" :src="ImgList.Vegetable" />
      <p class="icons__item__desc">Vegetables</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" :src="ImgList.Fruit" />
      <p class="icons__item__desc">Fruit</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" :src="ImgList.Drink" />
      <p class="icons__item__desc">Drink</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" :src="ImgList.Bread" />
      <p class="icons__item__desc">Bread</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" :src="ImgList.Seasoning" />
      <p class="icons__item__desc">Seasoning</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" :src="ImgList.Frozen" />
      <p class="icons__item__desc">Frozen</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" :src="ImgList.Snacks" />
      <p class="icons__item__desc">Snacks</p>
    </div>
    <div class="icons__item">
      <img class="icons__item__img" :src="ImgList.Egg" />
      <p class="icons__item__desc">Egg</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, components } from "vue";
import { NCarousel } from "naive-ui";
import { NConfigProvider } from "naive-ui";
import vegeImg from "../../assets/Vegetable.png";
import fruitImg from "../../assets/apple.png";
import breadImg from "../../assets/bread.png";
import drinkImg from "../../assets/drink.png";
import eggImg from "../../assets/egg.png";
import ice_creamImg from "../../assets/ice_cream.png";
import SeasoningImg from "../../assets/Seasoning.jpeg";
import SnackImg from "../../assets/snack.png";

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

    const ImgList = {
      Vegetable: vegeImg,
      Fruit: fruitImg,
      Drink: drinkImg,
      Bread: breadImg,
      Seasoning: SeasoningImg,
      Frozen: ice_creamImg,
      Snacks: SnackImg,
      Egg: eggImg,
    };

    const iconsList = [
      { imgName: "Vegetable", desc: "Grocery" },
      { imgName: "Fruit", desc: "Vegetable" },
      { imgName: "Drink", desc: "Fruit" },
      { imgName: "Bread", desc: "Plants" },
      { imgName: "Seasoning", desc: "Health" },
      { imgName: "Frozen", desc: "Household" },
      { imgName: "Snacks", desc: "Bakery" },
      { imgName: "Eggs", desc: "Promotion" },
    ];

    return { iconsList, themeOverrides, ImgList };
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
  height: 120px;
  object-fit: cover;
}

.position {
  color: #72a759;

  @include ellipsis;
  position: relative;
  padding: 0.12rem 0.24rem 0.1rem 0;
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
    top: 0.11rem;
    font-size: 0.2rem;
    right: 0;
  }
}
.search {
  line-height: 0.32rem;
  background: #f5f5f5;
  color: #b7b7b7;
  border-radius: 0.16rem;
  font-size: 0.14rem;
  margin-bottom: 0.12rem;
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
    width: 25%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      color: #969696 !important;
      font-size: 0.15rem;
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
</style>
