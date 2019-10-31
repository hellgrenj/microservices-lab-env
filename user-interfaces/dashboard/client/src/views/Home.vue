<template>
  <div class="home">
    <Main msg="OSMAS Dashboard v 0.1"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main.vue';

export default {
  name: 'home',
  components: {
    Main,
  },
};
</script>
