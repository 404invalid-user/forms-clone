<template>
  <div>
    <div class="question-title">{{question.title}}<span v-if="question.required" style="color: red">*</span>
    </div>
    <div v-for="options of question.options" :key="options.id">
    <input :id="options.id" type="checkbox" v-model="options.checked"/>
    <label :for="options.id">
      <span></span>
      {{options.name}}
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
