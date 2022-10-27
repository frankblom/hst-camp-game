<template>
  <div class="flex w-full justify-center">
    <AnswersBlock
      v-if="isQuestion"
      :order="order"
      :responses="responses"
      :question="question"
    />
    <PenaltyBlock
      v-if="hasPenalty"
      :order="order"
      :penalties="penalties"
      :question="question"
      @fire="fire"
      @applyPenalty="$emit('applyPenalty')"
    />
    <PointsBlock
      v-if="hasPoints"
      :points="points"
      :question="question"
      :isQuestion="isQuestion"
      :order="order"
      @fire="fire"
    />
  </div>
</template>

<script>
const teams = ["blue", "pink", "orange", "green"];

import { db } from "../db";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

import { START_CLOCK_STEP, STOP_CLOCK_STEP } from "@/const/steps.js";

import PointsBlock from "./PointsBlock.vue";
import AnswersBlock from "./AnswersBlock.vue";
import PenaltyBlock from "./PenaltyBlock.vue";

export default {
  components: { PointsBlock, AnswersBlock, PenaltyBlock },
  props: {
    question: Object,
    penalties: Array,
    points: Array,
  },
  data() {
    return {
      responses: {
        blue: {
          answers: {
            A: {
              count: 0,
              label: "A",
            },
            B: {
              count: 0,
              label: "B",
            },
            C: {
              count: 0,
              label: "C",
            },
            D: {
              count: 0,
              label: "D",
            },
          },
          team: "blue",
          total: 0,
        },
        green: {
          answers: {
            A: {
              count: 0,
              label: "A",
            },
            B: {
              count: 0,
              label: "B",
            },
            C: {
              count: 0,
              label: "C",
            },
            D: {
              count: 0,
              label: "D",
            },
          },
          team: "blue",
          total: 0,
        },
        orange: {
          answers: {
            A: {
              count: 0,
              label: "A",
            },
            B: {
              count: 0,
              label: "B",
            },
            C: {
              count: 0,
              label: "C",
            },
            D: {
              count: 0,
              label: "D",
            },
          },
          team: "blue",
          total: 0,
        },
        pink: {
          answers: {
            A: {
              count: 0,
              label: "A",
            },
            B: {
              count: 0,
              label: "B",
            },
            C: {
              count: 0,
              label: "C",
            },
            D: {
              count: 0,
              label: "D",
            },
          },
          team: "blue",
          total: 0,
        },
      },
    };
  },
  computed: {
    isQuestion() {
      return this.question.type === "pre" || this.question.type === "game";
    },
    hasPoints() {
      return this.question.with_points;
    },
    hasPenalty() {
      return this.question.with_penalty;
    },
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
      if (this.hasPoints && !this.isQuestion) {
        return teams;
      }
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
    getTotalAnswersForTeam(team) {
      return Object.values(this.responses[team].answers).reduce(
        (count, answer) => count + answer.count,
        0
      );
    },
    setScore(team, option, count) {
      // new total is the current - the old total
      const total =
        this.getTotalAnswersForTeam(team) -
        this.responses[team].answers[option.label].count +
        count;

      this.$set(this.responses[team], "total", total);

      this.$set(this.responses[team].answers, option.label, {
        label: option.label,
        count,
      });
    },

    async loadScore() {
      if (!this.question || !this.isQuestion) {
        return;
      }

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
    fire(data) {
      db.collection(data.collection).doc(data.doc).set(data.data);
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      if (!this.question) return;
      if (
        this.question.step < START_CLOCK_STEP ||
        this.question.step > STOP_CLOCK_STEP
      )
        return;
      console.log("loading score");
      this.loadScore();
    }, 5000);
    this.loadScore();
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style>
.input {
  background: #333;
  border: 1px solid #aaa;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  font-size: 24px;
  width: 60px;
}

.input:disabled {
  background: black;
  color: #aaa;
  border: 1px solid gray;
}
</style>
