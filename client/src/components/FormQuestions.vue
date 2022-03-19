<template>
  <div>
    <div
      class="question-wrap questions"
      v-for="question of form.questions"
      :key="question.id"
    >
      <Text
        v-if="question.type == 'text'"
        :question="question"
        @delete-question="deleteQuestion"
      />
      <Checkbox
        v-if="question.type == 'checkbox'"
        :question="question"
        @new-box="newCheckboxBox"
        @delete-checkbox="deleteCheckbox"
        @delete-question="deleteQuestion"
      />
    </div>
       <div class="edit">
      <div class="button" @click="newCheckbox">new checkbox</div>
      <div class="button" @click="newText">new text</div>
    </div>
  </div>
</template>

<script>
import Text from "@/components/EditText.vue";
import Checkbox from "@/components/EditCheckbox.vue";
export default {
  name: "FormEdit",
  components: {
    Text,
    Checkbox,
  },
  props: {
    form: Object,
  },
  methods: {
    deleteCheckbox(id, boxid) {
      console.log("dele");
      for (let question of this.form.questions) {
        if (question.id == id) {
          console.log(question.options);
          for (let i = 0; i < question.options.length; i++) {
            if (question.options[i].id == boxid) {
              question.options.splice(i, 1);
            }
          }
          console.log(question.options);
        }
      }
    },
    deleteQuestion(id) {
      for (let i = 0; i < this.form.questions.length; i++) {
        if (this.form.questions[i].id == id) {
          this.form.questions.splice(i, 1);
        }
      }
    },
    newCheckboxBox(id) {
      for (let q of this.form.questions) {
        if (q.id == id) {
          q.options.push({
            id: Math.floor(Math.random() * 6000),
            name: "option " + (q.options.length + 1).toString(),
            checked: false,
          });
        }
      }
    },
    newCheckbox() {
      const id = Math.floor(Math.random() * 6000);
      this.form.questions.push({
        id: id,
        type: "checkbox",
        title: "example checkbox?",
        options: [
          {
            id: Math.floor(Math.random() * 6000),
            name: "option 1",
            checked: false,
          },
        ],
        text: "",
        required: false,
      });
    },
    newText() {
      const id = Math.floor(Math.random() * 6);
      this.form.questions.push({
        id: id,
        type: "text",
        title: "example text?",
        options: [],
        text: "",
        required: false,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.edit {
  position: fixed;
  bottom: 0;
  max-width: 800px;
  min-width: 200px;
      padding: 9px 30px;
    border-radius: 7px 7px 0 0;
  background-color: white;
}
</style>
