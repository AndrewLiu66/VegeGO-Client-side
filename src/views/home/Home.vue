<template>
  <div class="header">
    <div class="title">VegeGO</div>
    <img src="../../assets/icon/share.png" alt="" class="header__img" />
  </div>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :currentIndex="0" />
</template>

<script>
import StaticPart from "./StaticPart";
import Nearby from "./Nearby";
import Docker from "../../components/Docker";
export default {
  name: "Home",
  components: { StaticPart, Nearby, Docker },
};
</script>
<style lang="scss" scoped>
.home {
  background: #fff;
}
.header {
  background: #558f3a;
  height: 0.65rem;
  width: 100%;
  position: fixed;
  z-index: 1000;
  .title {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    font-size: 0.22rem;
    color: white;
    letter-spacing: 0.005rem;
  }
  &__img {
    float: right;
    margin-right: 0.3rem;
    margin-top: 0.2rem;
    width: 0.3rem;
  }
}
.wrapper {
  overflow-y: auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 0.65rem;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.3rem 0.18rem;
}
</style>
