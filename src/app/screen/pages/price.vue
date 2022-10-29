<template>
  <div class="page border border-red-200">
    <transition name="fade">
      <div class="flex flex-wrap mx-auto names" v-if="show">
        <div
          class="w-1/2 text-white text-center name"
          v-for="p in players"
          :key="p.id"
        >
          {{ p.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { db } from "./../db";
export default {
  props: {
    team: Object,
  },
  data() {
    return {
      show: false,
      players: [],
    };
  },
  methods: {
    randomArray(max) {
      console.log(`SHOWING ${max} players`);
      let array = [];
      if (max < 10) {
        for (let i = 0; i < max; i++) {
          array.push(i);
        }
        return array;
      }

      while (array.length < 10) {
        const number = Math.round(Math.random() * max);
        if (array.indexOf(number) < 0) {
          array.push(number);
        }
      }
      return array;
    },
    getPlayers() {
      console.log("SHOWING NEW LIST OF WINNERS");
      db.collection("players")
        .where("team_id", "==", this.team.name)
        .where("logged_in", "==", true)
        .where("kicked", "==", false)
        .get()
        .then((ref) => {
          this.players = [];
          this.randomArray(ref.size).forEach((key) => {
            const p = ref.docs[key].data();
            console.log(
              `Showing player name: "${p.name}", Fellowship: "${p.church}"`
            );
            this.players.push(p);
          });
          this.show = true;
        });
    },
  },
  watch: {
    team: {
      immediate: true,
      deep: true,
      handler() {
        if (!this.team) return;
        this.show = false;
        this.getPlayers();
      },
    },
  },
};
</script>

<style>
.names {
  margin-top: 100px;
}
.name {
  color: #e5e5e5;
  font-weight: 700;
  font-size: 48px;
  margin-bottom: 60px;
  text-align: center;
}

.name i {
  font-size: 32px;
  font-weight: 400;
}
</style>
