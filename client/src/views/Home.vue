<template>
  <div class="home">
    <nav>
      <router-link class="nav" to="/profile">
        <img :src="me.avatar" />
        <p>{{ me.username }}#{{ me.discriminator }}</p>
      </router-link>
    </nav>
    <Message v-if="message.show" :message="message" />
    <Toast v-for="toast of toasts" :toast="toast" @click="removeToast(toast.id)"/>
    <div><a class="button new" href="/form/new">New</a></div>
    <div class="forms">
      <div v-for="form of me.forms" :key="form.id">
        <div class="question-title">{{ form.title }}</div>
        <div>views:{{ form.views }}</div>
        <div>answers: {{ form.answers }}</div>
        <div><a class="button" @click="copy(form.link)">Copy Link</a></div>
        <div>
          <router-link class="button" :to="'/form/edit?id=' + form.id">Edit</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import Message from "@/components/Message.vue";

export default {
  name: "HomeView",
  components: {
    Message,
  },
  data() {
    return {
      me: {},
      message: { content: "", error: false, show: false },

      toasts: []
    };
  },
  methods: {
    copy(link) {
      navigator.clipboard.writeText(link);
      this.sendMessage("copied link to clipboard");
    },

    new() {
      window.location.href = "/new";
    },
    addToast(t) {
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
        console.log("[/api/form]: " + err.stack || err);
        if (err.toString() == "Error: Request failed with status code 401") {
          window.location.href = "/login";
        }
        this.sendErrorMessage(
          "an unknow error has occurred when fetching your data"
        );
      });
  },
};
</script>

<style scoped>
.nav {
  display: flex;
}
.nav img {
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