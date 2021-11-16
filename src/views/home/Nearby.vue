<template>
  <div class="nearby">
    <h3 class="nearby__title">Nearby Stores</h3>
    <!-- <p>asdf</p> -->

    <router-link
      :to="`/shop/${item._id}`"
      v-for="item in nearbyList"
      :key="item._id"
    >
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo";

const useNearbyListEffect = () => {
  const nearbyList = ref([]);

  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    //?.的作用跟.差不多,但是如果没有errono系统不会报错;result?.data?.length表示data里面有数据
    if (result?.errno === 0 && result?.result?.length) {
      nearbyList.value = result.result;
    }
  };
  return { nearbyList, getNearbyList };
};

export default {
  name: "Nearby",
  components: { ShopInfo },
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect();
    getNearbyList();
    return { nearbyList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}
</style>
