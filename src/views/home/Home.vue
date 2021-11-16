<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :currentIndex="0"/>
</template>

<script>
import StaticPart from './StaticPart'
import Nearby from './Nearby'
import Docker from '../../components/Docker'
export default {
  name: 'Home',
  components: { StaticPart, Nearby, Docker }
}
</script>
<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: .5rem;
  padding: 0 .18rem .3rem .18rem;
}

</style>
