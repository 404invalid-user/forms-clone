<template>
  <div>
    <div class="question-wrap">
      <div class="title">{{ form.title }}</div>
      <div class="description">{{ form.description }}</div>
    </div>
    
     <div class="question-wrap">
      <div class="title">views</div>
      <img :src="'/form/analytics-views.png?id=' + this.$route.query.id" />
    </div>
     <div class="question-wrap">
      <div class="title">answers</div>
      <img :src="'/form/analytics-answers.png?id=' + this.$route.query.id" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import Text from "@/components/form/Text.vue";
import Checkbox from "@/components/form/Checkbox.vue";

export default {
  name: "FormAnalytics",
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
</style>