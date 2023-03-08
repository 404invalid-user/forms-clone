<template>
    <Text v-if="question.type == 'text'" :question="question" />
    <Checkbox v-else-if="question.type == 'checkbox'" :question="question" />
</template>
  
<script>

import Text from "@/components/form/Text.vue";
import Checkbox from "@/components/form/Checkbox.vue";
export default {
    name: "Question",
    components: {
        Text,
        Checkbox,
    },
    props: {
        question: Object,
    },
};
</script>
  