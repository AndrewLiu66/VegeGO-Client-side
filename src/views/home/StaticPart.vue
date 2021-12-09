<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe619;</span>
    {{ addressList[0]?.city }} {{ addressList[0]?.department }} Room:
    {{ addressList[0]?.houseNumber }}
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
        src="http://localhost:8080/Images/carousel/carousel3.jpeg"
      />
      <img
        class="carousel-img"
        src="http://localhost:8080/Images/carousel/carousel2.jpeg"
      />
      <img
        class="carousel-img"
        src="http://localhost:8080/Images/carousel/carousel4.jpeg"
      />
      <img
        class="carousel-img"
        src="http://localhost:8080/Images/carousel/carousel1.jpeg"
      />
    </n-carousel>
  </n-config-provider>
  <div class="icons">
    <div class="icons__item" v-for="(item, index) in iconsList" :key="index">
      <img class="icons__item__img" :src="item.img" />
      <p class="icons__item__desc">{{ item.imgName }}</p>
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
import { toRefs } from "vue";
import { useStore } from "vuex";
import useCommonAddressEffect from "../../effects/addressEffect";

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
      { imgName: "Vegetable", img: vegeImg },
      { imgName: "Fruit", img: fruitImg },
      { imgName: "Drink", img: drinkImg },
      { imgName: "Bread", img: breadImg },
      { imgName: "Seasoning", img: SeasoningImg },
      { imgName: "Frozen", img: ice_creamImg },
      { imgName: "Snacks", img: SnackImg },
      { imgName: "Eggs", img: eggImg },
    ];

    // fetch current address
    const { getAddressList } = useCommonAddressEffect();
    getAddressList(true);
    const store = useStore();
    let { addressList } = toRefs(store.state);

    return { addressList, iconsList, themeOverrides };
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
