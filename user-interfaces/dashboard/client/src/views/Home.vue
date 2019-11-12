<template>
  <div class="home">
    <Main msg="OSMAS Dashboard v 0.1" />
    <div>
     <span>Location of the boss: {{bossLocation}}</span>
    </div>
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
  data() {
    return {
      bossLocation: '',
    };
  },
  methods: {
    demo: async function demo() {
      await axios
        .get('http://localhost:8585')
        .then((res) => {
          console.log(res.data);
          this.bossLocation = res.data;
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
