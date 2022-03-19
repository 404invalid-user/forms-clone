<template>
  <div class="home">
    <nav>
      <img :src="me.avatar" />
      <p>{{ me.username }}#{{ me.discriminator }}</p>
    </nav>
    <Message v-if="message.show" :message="message" />
    <label for="location">timezone</label>
    <input list="location" v-model="me.timezone" />
    <datalist id="location">
      <option
        v-for="timezone of timezones"
        :key="timezone"
        :value="timezone"
      ></option>
    </datalist>
    <div class="buttons">
      <div class="button" @click="update">Update Profile</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import Message from "@/components/Message.vue";

export default {
  name: "Profile",
  components: {
    Message,
  },
  data() {
    return {
      me: {
        timezone: "",
      },
      timezones: [],
      message: { content: "", error: false, show: false },
    };
  },
  methods: {
    update() {
      axios
        .post("/api/me", { data: this.me })
        .then((res) => this.sendMessage("updated your profile"))
        .catch((err) => {
          console.log("[/api/me]: " + err.stack || err);
          if (err.toString() == "Error: Request failed with status code 401") {
            window.location.href = "/login";
          }
          this.sendErrorMessage(
            "an unknow error has occurred when fetching your data"
          );
        });
    },

    sendMessage(t) {
      this.message.content = t;
      this.message.error = false;
      this.message.show = true;
      setTimeout(() => {
        this.message.show = false;
      }, 5000);
    },
    sendErrorMessage(t) {
      this.message.content = t;
      this.message.error = true;
      this.message.show = true;
      setTimeout(() => {
        this.message.show = false;
      }, 5000);
    },
  },
  beforeMount() {
    axios
      .get("/api/me")
      .then((res) => {
        this.me = res.data;
      })
      .catch((err) => {
        console.log("[/api/me]: " + err.stack || err);
        if (err.toString() == "Error: Request failed with status code 401") {
          window.location.href = "/login";
        }
        this.sendErrorMessage(
          "an unknow error has occurred when fetching your data"
        );
      });
    axios
      .get("/api/timezones")
      .then((res) => {
        this.timezones = res.data;
      })
      .catch((err) => {
        console.log("[/api/timezones]: " + err.stack || err);
        if (err.toString() == "Error: Request failed with status code 401") {
          window.location.href = "/login";
        }
        this.sendErrorMessage(
          "an unknow error has occurred when fetching timezones"
        );
      });
  },
};
</script>

<style scoped>
nav {
  display: flex;
}
nav img {
  border-radius: 100%;
  height: 40px;
}
.forms {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
}
.forms div {
  display: flex;
  background: white;
  padding: 5px;
  flex-direction: column;
  border-radius: 5px;
  min-width: 200px;
}
.button.new {
  height: 40px;
  width: 80%;
  align-self: center;
  padding: 0;
  margin: 12px auto;
}
</style>