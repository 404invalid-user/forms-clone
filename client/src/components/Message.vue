<script>
// @ is an alias to /src
export default {
  name: 'Message',
  methods: {},
  props: {
    message: Object
  }
}
</script>

<style scoped>
.message-wrap {
    z-index: 999;
  display: flex;
  justify-content: center;
  position: fixed;
  
  border-radius: 5px;
  top: 10px;
}
.message {
    z-index: 999;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  
  border-radius: 5px;
}
.message.ok {
  background-color: rgb(27, 194, 27);
  color: black;
}
.message.error {
  background-color: rgb(255, 0, 0);
  color: white;
}
</style>
<template>
  <div class="message-wrap">
    <div :class="[message.error ? 'error' : 'ok', 'message']">
    {{message.content}}
    </div>
  </div>
</template>