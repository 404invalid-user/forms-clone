<template>
  <div>
      <div class="question-title">{{question.title}}<span v-if="question.required" style="color: red">*</span></div>
      <input class="question-input" type="text" placeholder="Your answer" v-model="question.text"/>
  </div>
</template>

<script>
export default {
  name: 'Text',
  props: {
    question: Object
  }
}
</script>
<style scoped>
</style>