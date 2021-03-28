<template>
  <div class="container justify-content-center">
    <vue-spinner />
    <form @submit.prevent="onSubmit">
      <div class="row justify-content-center">
        <label class="form-label" for="location">Location: </label>
        <input
          v-model="location"
          class="form-control"
          type="text"
          id="location"
        />
      </div>
      <div class="row mt-3 justify-content-center">
        <button class="btn btn-primary" type="submit">Get Restaurants</button>
      </div>
    </form>
    <div class="row justify-content-center">
      <div v-if="loadingStatus" class="spinner-border text-primary mt-4" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <Winner :showModal="showModal" @modalReset="modalReset" />
      <Wheel @winnerSelected="winnerSelected(data)" />
    </div>
  </div>
</template>

<script>
//import Winner from "@/components/Winner.vue";
import Wheel from "@/components/Wheel.vue";
import Winner from "@/components/Winner.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { Wheel, Winner },
  data() {
    return {
      location: "",
      wheelDisplay: false,
      showModal: false,
    };
  },
  mounted() {},
  computed:{
    loadingStatus(){
      return this.$store.getters.loadingStatus
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("getRestaurants", this.location);
    },
    winnerSelected() {
      console.log("in home, propagating to winner");
      this.showModal = true;
    },
    modalReset() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
#redArrow {
  width: 5em;
}
</style>