<template>
  <div class="home">
    <Message v-if="message.show" :message="message" />
    <div class="edit-menu">
      <div
        :class="[selected == 'questions' ? 'selected' : '', 'button']"
        @click="selected = 'questions'"
      >
        Questions
      </div>
      <div
        :class="[selected == 'answers' ? 'selected' : '', 'button']"
        @click="selected = 'answers'"
      >
        Answers {{ form.answers.length }}
      </div>
      <div
        :class="[selected == 'settings' ? 'selected' : '', 'button']"
        @click="selected = 'settings'"
      >
        Settings
      </div>
      <div
        :class="[selected == 'analytics' ? 'selected' : '', 'button']"
        @click="selected = 'analytics'"
      >
        Analytics
      </div>
    </div>
    <div class="question-wrap title-wrap">
      <div class="title">
        title: <input class="question-input" type="text" v-model="form.title" />
      </div>
      <div class="description">
        description:
        <input class="question-input" type="text" v-model="form.description" />
      </div>
    </div>

    <FormQuestions
      class="view"
      v-if="selected == 'questions'"
      :form="form"
      :sendMessage="sendMessage"
      :sendErrorMessage="sendErrorMessage"
    />
    <FormAnswers
      class="view"
      v-else-if="selected == 'answers'"
      :form="form"
      :answers="answers"
      :sendMessage="sendMessage"
      :sendErrorMessage="sendErrorMessage"
    />
    <FormSettings
      class="view"
      v-else-if="selected == 'settings'"
      :form="form"
      :sendMessage="sendMessage"
      :sendErrorMessage="sendErrorMessage"
    />
    <FormAnalytics
         class="view"
      v-else-if="selected == 'analytics'"
      :form="form"
      :sendMessage="sendMessage"
      :sendErrorMessage="sendErrorMessage"
    />
    <div @click="submit" class="button">
      Update Form {{ selected !== "answers" && selected !== "analytics" ? selected : "" }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src

import Message from "@/components/Message.vue";

import FormQuestions from "@/components/FormQuestions.vue";
import FormAnswers from "@/components/FormAnswers.vue";
import FormSettings from "@/components/FormSettings.vue";
import FormAnalytics from "@/components/FormAnalytics.vue";

export default {
  name: "HomeView",
  components: {
    Message,
    FormQuestions,
    FormAnswers,
    FormSettings,
    FormAnalytics
  },
  data() {
    return {
      selected: "questions",
      me: {},
      form: {
        answers: [],
      },
      answers: [],
      message: {
        show: false,
        error: false,
        content: "",
      },
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
      axios
        .post("/api/form/edit?id=" + this.$route.query.id, { data: this.form })
        .then((res) => this.sendMessage("updated changes"))
        .catch((er) => {
          console.log("[/api/form/edit]: " + er.stack || er);
          if (err.toString() == "Error: Request failed with status code 403") {
            this.sendErrorMessage(
              "you do not have permission to edit this form"
            );
          } else if (
            err.toString() == "Error: Request failed with status code 401"
          ) {
            this.sendErrorMessage("login required");
          } else {
            this.sendErrorMessage("there was an error updating the form");
          }
        });
    },
  },
  beforeMount() {
    axios
      .get("/api/me")
      .then((res) => (this.me = res.data))
      .catch((err) => {
        console.log("[/api/form]: " + err.stack || err);
        if (err.toString() == "Error: Request failed with status code 401") {
          window.location.href = "/login";
        }
        this.sendErrorMessage(
          "an unknow error has occurred when fetching your data"
        );
      });
    axios
      .get("/api/form?id=" + this.$route.query.id)
      .then((res) => (this.form = res.data))
      .catch((err) => {
        if (err.toString() == "Error: Request failed with status code 403") {
          this.sendErrorMessage("you do not have permission to see this form");
        } else if (
          err.toString() == "Error: Request failed with status code 401"
        ) {
          this.sendErrorMessage("login required");
        } else {
          this.sendErrorMessage("there was an error fetching");
        }
        console.log("[/api/form]: " + err.stack || err);
      });
    axios
      .get("/api/form/answers?id=" + this.$route.query.id)
      .then((res) => (this.answers = res.data))
      .catch((err) => {
        console.log("[/api/form/answers]: " + err.stack || err);
        if (err.toString() == "Error: Request failed with status code 401") {
          window.location.href = "/login";
        }
        this.sendErrorMessage(
          "an unknow error has occurred when fetching answers"
        );
      });
  },
};
</script>

<style scoped>
.title-wrap {
  margin-top: 54px;
}
.edit-menu {
  position: absolute;
  background-color: white;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 0 0 9px 9px;
  flex-direction: row;
  gap: 16px;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 55px;
}

.view {
  min-width: 100%;
  width: 100%;
  max-width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>