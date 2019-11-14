<template>
  <div class="home">
    <Main msg="OSMAS Dashboard v 0.1" />
    <div class="container">
      <div class="alert alert-dismissible alert-danger">
        <strong>The boss is {{bossLocation}}</strong>
      </div>
      <div class="alert alert-dismissible alert-danger">
        <strong>{{numberOfMissedDeadlines}}</strong>
      </div>
      <div class="alert alert-dismissible alert-danger">
        <strong>{{timeToNextMeeting}}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// @ is an alias to /src
import Main from "@/components/Main.vue";

export default {
  name: "home",
  components: {
    Main
  },
  data() {
    return {
      bossLocation: "loading boss location....",
      numberOfMissedDeadlines: 'loading number of missed deadlines',
      timeToNextMeeting: "loading time to next meeting"
    };
  },
  methods: {
    monitorTheBoss: function demo() {
      setInterval(async () => {
        await axios
          .get("http://localhost:8585/boss/location")
          .then(res => {
            console.log(res.data);
            this.bossLocation = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }, 3000);
    },
    monitorDeadlines: function demo() {
      setInterval(async () => {
        await axios
          .get("http://localhost:8585/deadlines/numberofmissed")
          .then(res => {
            console.log(res.data);
            this.numberOfMissedDeadlines = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }, 10000);
    },
    monitorMeetings: function demo() {
      setInterval(async () => {
        await axios
          .get("http://localhost:8585/meetings/timetonextmeeting")
          .then(res => {
            console.log(res.data);
            this.timeToNextMeeting = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }, 5000);
    }
  },
  async mounted() {
    this.monitorTheBoss();
    this.monitorDeadlines();
    this.monitorMeetings();
  }
};
</script>

<style scoped>
.container {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}
</style>