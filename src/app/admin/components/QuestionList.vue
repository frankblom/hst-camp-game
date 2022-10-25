<template>
  <div class="text-white w-full overflow-y-auto pb-12">
    <QuestionBlock
      v-for="q in questions"
      :question="q"
      :key="q.id"
      @open="select"
      :opened="q.id === selected"
      :points="pointsForQuestion(q.id)"
      :active="activeQuestion === q.id"
    />
  </div>
</template>

<script>
import QuestionBlock from "./QuestionBlock.vue";
export default {
  components: { QuestionBlock },
  props: {
    questions: Array,
    game: Object,
    points: Array,
  },
  data() {
    return {
      selected: "G-3",
    };
  },
  computed: {
    activeQuestion() {
      return this.game && this.game.question && this.game.question.id;
    },
  },
  methods: {
    select(id) {
      if (this.selected === id) {
        this.selected = null;
      } else {
        this.selected = id;
      }
    },
    pointsForQuestion(id) {
      return this.points.filter((p) => p.question_id === id);
    },
  },
};
</script>

<style></style>
