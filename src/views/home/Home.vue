<template>
  <div class="header">
    <div class="title">VegeGO</div>
    <img src="../../assets/icon/share.png" alt="" class="header__img" />
    <!-- <img src="http://localhost:8080/Images/logo.png" alt="" class="logo" /> -->
  </div>
  <div class="container">
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
.header {
  background: #419e5c;
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
    letter-spacing: 0.008rem;
    font-weight: bold;
  }
  &__img {
    float: right;
    margin-right: 0.3rem;
    margin-top: 0.2rem;
    width: 0.3rem;
  }
}
.container {
  overflow-y: auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 0.65rem;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.3rem 0.18rem;
}
</style>
