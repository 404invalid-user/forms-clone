<template>
  <div>
    <div class="edit">
      <div>
        limit access to server:
        <input
          class="question-input"
          type="text"
          v-model="form.settings.guild"
          placeholder="server id"
        />
      </div>
     </div>
  </div>
</template>

<script>
export default {
  name: "FormSettings",
  components: {
  },
  props: {
    form: Object,
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
