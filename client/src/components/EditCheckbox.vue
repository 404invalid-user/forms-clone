<template>
  <div>
     <div class="delete-x" @click="$emit('delete-question', question.id)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></div>
    <div class="question-title">
      <input class="question-input" type="text" v-model="question.title" /><span
        v-if="question.required"
        style="color: red"
        >*</span
      >
     </div>
    <div v-for="option of question.options" :key="option.id">
      <input
        :id="option.id"
        type="checkbox"
        v-model="option.checked"
        disabled
      />
      <label :for="option.id">
        <span></span>
        <input type="text" v-model="option.name" class="question-input" />
        <div class="delete-x" @click="$emit('delete-checkbox', question.id, option.id)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></div>
      </label>
    </div>
    <hr />
    <div class="edit">
      <button class="button" @click="$emit('new-box', question.id)">
        + option
      </button>
      <input :id="question.id" type="checkbox" v-model="question.required" />
      <label :for="question.id">
        <span></span>
        Required
      </label>
    </div>
  </div>
</template>



<script>
export default {
  name: "Checkbox",
  props: {
    question: Object,
  },
};
</script>
<style scoped>
.delete-x {
  transition-duration: 0.3s;
  border-radius: 100%;
      display: inline-flex;
    align-items: center;
    justify-content: end;
    padding: 3px;
}
.delete-x:hover {
  background-color: #F9F7FC;
}
</style>