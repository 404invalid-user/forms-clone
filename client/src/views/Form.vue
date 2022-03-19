<template>
  <div class="home">
    <Message v-if="message.show" :message="message" />
    <div class="question-wrap">
      <div class="title">{{ form.title }}</div>
      <div class="description">{{ form.description }}</div>
      <div class="breaker"></div>
      <div class="author">
        <div>by:</div>
        <img :src="form.author.avatar" />
        <div>
          {{ form.author.username}}<span class="discriminator">#{{ form.author.discriminator }}</span>
        </div>
      </div>
    </div>
    <div
      class="question-wrap"
      v-for="question of form.questions"
      :key="question.id"
    >
      <Text v-if="question.type == 'text'" :question="question" />
      <Checkbox v-if="question.type == 'checkbox'" :question="question" />
    </div>
    <div class="button large" @click="submit">Submit</div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import Text from "@/components/Text.vue";
import Checkbox from "@/components/Checkbox.vue";

import Message from "@/components/Message.vue";

export default {
  name: "HomeView",
  components: {
    Message,
    Text,
    Checkbox,
  },
  data() {
    return {
      me: {},
      form: {
        author: {
          avatar: 'http://a.com',
          username: '',
          discriminator: ''
        }
      },
      message: { content: "", error: false, show: false },
    };
  },
  methods: {
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
    submit() {
      for (const question of this.form.questions) {
        if (question.required) {
          if (question.type == "text") {
            if (question.Text == "" || question.text == " ") {
              return this.sendErrorMessage(
                "please fill in all required questions"
              );
            }
          } else if (question.type == "checkbox") {
            let checkedOption = false;
            for (const option of question.options) {
              if (option.checked) {
                checkedOption = true;
              }
            }
            if (!checkedOption) {
              return this.sendErrorMessage(
                "please fill in all required questions"
              );
            }
          }
        }
      }
      axios
        .post("/api/form", { data: this.form })
        .then((res) => {
          this.sendMessage("form successfully submitted");
        })
        .catch((er) => {
          console.log("[/api/form]: " + er.stack || er);
          this.sendErrorMessage(
            "there was an error while submitting your form"
          );
        });
    },
  },
  async beforeMount() {
    console.log("fuin c")
    await axios
      .get("/api/me")
      .then((res) => {
        this.me = res.data;
      })
      .catch((err) => {
        console.log("[/api/me]: " + err.stack || err);
        if (err.toString() == "Error: Request failed with status code 401") {
          return (window.location.href = "/login");
        }

        this.sendErrorMessage(
          "an unknow error has occurred when fetching your data"
        );
      });
    await axios
      .get("/api/form?id=" + this.$route.query.id)
      .then((res) => {
        this.form = res.data;
        this.form.timeStart = Date.now().toString();
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
    try {
      this.deleteCookie("form");
    } catch (_) {}
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>