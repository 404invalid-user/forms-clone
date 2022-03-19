<template>
  <div class="_Frfg6">
    <div class="movebtns"><a class="button" @click="move('-')">&#60;</a><a class="button last" @click="move('+')">&#62;</a></div>
      <div v-if="answers.length <=0">
        <div class="title">there are no answers for this form</div>
      </div>
    <div class="_Frfg6" v-if="answers.length >=1">
      <div class="question-wrap _9f9dis">
      <div class="author">
        <div>by:</div>
        <img :src="answers[selected].user.avatar" />
        <div>
          {{ answers[selected].user.username}}<span class="discriminator">#{{ answers[selected].user.discriminator }}</span>
        </div>
      </div>
    </div>
    <div
      class="question-wrap"
      v-for="question of answers[selected].questions"
      :key="question.id"
    >
      <Text v-if="question.type == 'text'" :question="question" />
      <Checkbox v-if="question.type == 'checkbox'" :question="question" />
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import Text from "@/components/Text.vue";
import Checkbox from "@/components/Checkbox.vue";

export default {
  name: "HomeView",
  components: {
    Text,
    Checkbox,
  },
  props: {
    me: Object,
    form: Object,
    answers: Object
  },

  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    move(p) {
      if (p == '-') {
        this.selected +-1;
      } else if (p == '+') {
        this.selected++;

      }
    },

  },
  beforeMount() {
    
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
.movebtns {
  display: flex;
  flex-direction: row;
      width: 80%;
}
.movebtns .last {
  margin-left: auto;
}

._9f9dis {
  margin-top: 32px;
}
._Frfg6 {
  width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>