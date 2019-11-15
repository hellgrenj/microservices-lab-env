<template>
  <div class="home">
    <div class="container">
      <Main msg="OSMAS Dashboard v 0.1" />
      <div class="alert alert-dismissible alert-primary">
        <strong>{{bossLocation}}</strong>
      </div>
      <div class="alert alert-dismissible alert-primary">
        <strong>{{numberOfMissedDeadlines}}</strong>
      </div>
      <div class="alert alert-dismissible alert-primary">
        <strong>{{timeToNextMeeting}}</strong>
      </div>
      System events <br/>
      <div class="system-events">
        <span v-for="event in systemEvents" :key="event">
          <span class="eventrows">{{event}}</span> <br/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:8787");

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
      bossLocation: "loading boss location...",
      numberOfMissedDeadlines: "loading number of missed deadlines...",
      timeToNextMeeting: "loading time to next meeting...",
      systemEvents: []
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
      }, 15000);
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
      }, 12000);
    }
  },
  async mounted() {
    this.monitorTheBoss();
    this.monitorDeadlines();
    this.monitorMeetings();
    socket.on("message", msg => {
      console.log("received msg", msg);
      this.systemEvents.unshift(msg);
    });
    socket.on("disconnect", function() {});
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
.system-events {
  text-align:left;
  min-height: 200px;
  max-height: 200px;
  overflow: hidden;
  font-size: 10px;
  background-color: rgb(43, 42, 42);
  color: rgb(48, 216, 48);
}
.eventrows {padding-bottom: 1px;}
</style>