<template>
  <div class="home">
    <Main msg="OSMAS Dashboard v 0.1" />
  </div>
</template>

<script>
import axios from 'axios';

// @ is an alias to /src
import Main from '@/components/Main.vue';

export default {
  name: 'home',
  components: {
    Main,
  },
  methods: {
    demo: async function demo() {
      await axios
        .get('http://localhost:8585')
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    await this.demo();
  },
};
</script>
