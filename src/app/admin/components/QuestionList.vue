<template>
  <div class="text-white w-full pb-12 md:px-10">
    <QuestionBlock
      v-for="q in questions"
      :question="q"
      :key="q.id"
      @open="select"
      :opened="q.id === selected"
      :points="pointsForQuestion(q.id)"
      :penalties="penaltiesForQuestion(q.id)"
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
    penalties: Array,
  },
  data() {
    return {
      selected: "",
    };
  },
  computed: {
    activeQuestion() {
      return this.game && this.game.question && this.game.question.id;
    },
  },
  methods: {
    select(id) {
      if (id == "next") {
        return this.selectNext();
      }

      if (this.selected === id) {
        this.selected = null;
      } else {
        this.selected = id;
      }
    },
    selectNext() {
      if (!this.selected) return;

      const current_index = this.questions.findIndex(
        (q) => q.id === this.selected
      );
      if (this.questions.length <= current_index + 1) {
        this.select(null);
      } else {
        const next = this.questions[current_index + 1];
        this.select(next.id);
      }
    },
    pointsForQuestion(id) {
      return this.points.filter((p) => p.question_id === id);
    },
    penaltiesForQuestion(id) {
      return this.penalties.filter((p) => p.question_id === id);
    },
  },
};
</script>

<style></style>
