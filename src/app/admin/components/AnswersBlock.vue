<template>
  <div class="max-w-xl mx-auto mt-4">
    <h2 class="text-3xl text-center py-4 text-gray-700">Svarene</h2>
    <table>
      <tr>
        <th class="border-b py-2 text-2xl">Team</th>
        <th class="border-b py-2 text-2xl" v-for="label in labels" :key="label">
          {{ label }}
        </th>
      </tr>
      <tr v-for="team in order" :key="team">
        <td class="text-xl uppercase pr-3" :class="`text-team-${team}`">
          {{ $t(team) }}
        </td>
        <td
          v-for="label in labels"
          :key="label"
          class="text-center text-lg px-6 py-2"
        >
          {{
            getPercentage(
              responses[team].answers[label].count,
              responses[team].total
            )
          }}
          %
        </td>
      </tr>
    </table>
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

export default {
  props: {
    question: Object,
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
    correct() {
      if (!this.question || !this.question.correct) return false;
      return this.question.correct;
    },
    labels() {
      return ["A", "B", "C", "D"];
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
    getPercentage(count, total) {
      if (!count) return 0;
      return Math.round((count / total) * 10000) / 100;
    },
    async loadScore() {
      if (!this.question) {
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

<style></style>
