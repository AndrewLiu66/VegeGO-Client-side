<template>
  <div class="container">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe6f2;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe62d;</span>
        <input
          class="search__content__input"
          placeholder="Search for an item"
        />
      </div>
    </div>
    <!-- v-show的作用是当有图片的时候才会显示内容，因此文字和图片会同时出现，而不会先出现文字再出现造成延迟 -->
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
//get方法可以用来获取在home页面选中的店铺的数据
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo";
import Content from "./Content";
import Cart from "./Cart";
// 用来获取shop页面具体的商铺信息
const useShopInfoEffect = () => {
  //route用来获取网址上的params上的id
  const route = useRoute();
  const data = reactive({ item: {} });
  //在route的index.js下面定义了shop后面是:id,因此这里获取也是用的id
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    // console.log("test for result", result);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);
  return { item, getItemData };
};

//使页面的返回按钮点击后能够返回
const useBackRouterEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return handleBackClick;
};

export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    const router = useRouter();
    const { item, getItemData } = useShopInfoEffect();
    const handleBackClick = useBackRouterEffect();

    getItemData();
    return { item, handleBackClick };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.container {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.14rem 0 0.04rem 0;
  line-height: 0.32rem;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &__input {
      display: block;
      width: 100%;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: none;
      height: 0.32rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
