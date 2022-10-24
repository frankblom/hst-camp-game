<template>
  <div class="page">
    <h2 class="title">Resultat:</h2>
    <TransitionGroup class="scorebox" tag="div" name="slide-down">
      <ScoreLine
        v-for="(score, index) in result"
        :answers="score.answers"
        :team="score.team"
        :total="score.total"
        :key="index"
        :style="{ '--i': index }"
        :highlighted="correct"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import ScoreLine from "../components/ScoreLine.vue";

import { db } from "../db";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

const teams = ["blue", "pink", "orange", "green"];

export default {
  components: { ScoreLine },
  props: {
    question: Object,
  },
  data() {
    return {
      responses: {},
    };
  },
  computed: {
    correct() {
      if (!this.question || !this.question.correct) return false;
      return this.question.correct;
    },
    isLoading() {
      // 4 for 4 teams
      if (Object.keys(this.responses).length < 4) return true;

      if (Object.keys(this.responses[teams[0]].answers).length < 4) return true;
      if (Object.keys(this.responses[teams[1]].answers).length < 4) return true;
      if (Object.keys(this.responses[teams[2]].answers).length < 4) return true;
      if (Object.keys(this.responses[teams[3]].answers).length < 4) return true;

      return false;
    },
    order() {
      if (this.isLoading || !this.correct) return [];
      // order the teams so the one with the most correct answers is on top
      return teams.sort((a, b) => {
        const per_a =
          this.responses[a].total > 0
            ? this.responses[a].answers[this.correct].count /
              this.responses[a].total
            : 0;
        const per_b =
          this.responses[b].total > 0
            ? this.responses[b].answers[this.correct].count /
              this.responses[b].total
            : 0;

        if (per_a > per_b) return -1;
        if (per_a < per_b) return 1;
        return 0;
      });
    },
    result() {
      if (this.isLoading) return [];

      return this.order.map((team, index) => ({
        ...this.responses[team],
        pos: index,
        team: team,
      }));
    },
  },
  methods: {
    async teamAnswersCount(team_id, answer_id) {
      const query_ = query(
        collection(db, "answers"),
        where("answer_id", "==", answer_id),
        where("team_id", "==", team_id)
      );

      const snapshot = await getCountFromServer(query_);
      return snapshot.data().count;
    },
    setScore(team, option, count) {
      if (!this.responses[team]) {
        this.$set(this.responses, team, {
          team,
          answers: {},
          total: count,
        });
      } else {
        this.$set(
          this.responses[team],
          "total",
          this.responses[team].total + count
        );
      }

      this.$set(this.responses[team].answers, option.label, {
        label: option.label,
        count,
      });
    },
    clear() {
      this.$set(this, "responses", {});
    },
  },
  watch: {
    question: {
      deep: true,
      immediate: true,
      async handler() {
        if (!this.question) {
          console.log("TEST");
          return;
        }
        this.clear();

        const options = this.question.options;
        const answer_ids = Object.keys(options);

        teams.forEach((team) =>
          answer_ids.forEach((answer_id) => {
            this.teamAnswersCount(team, answer_id).then((count) => {
              this.setScore(team, options[answer_id], count);
            });
          })
        );
      },
    },
  },
};
</script>

<style>
.title {
  color: #e6e7e7;
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
  max-width: 400px;
  margin: 118px auto 0 auto;
}

.scorebox {
  position: absolute;
  width: 850px;
  top: 286px;
  left: 440px;
  height: 200px;
}

.slide-down-move {
  transition: opacity 0.5s linear, transform 0.5s ease-in-out;
}
.slide-down-leave-active {
  transition: opacity 0.4s linear, transform 0.4s cubic-bezier(0.5, 0, 0.7, 0.4);
  transition-delay: calc(0.05s * (0 - var(--i)));
}
.slide-down-enter-active {
  transition: opacity 0.5s linear, transform 0.5s cubic-bezier(0.2, 0.5, 0.1, 1);
  transition-delay: calc(0.1s * var(--i));
}
.slide-down-enter,
.slide-down-leave-to {
  opacity: 0;
}
.slide-down-enter {
  transform: translateY(-4em);
}
.slide-down-leave-to {
  transform: translateY(-4em);
}
</style>
