<template>
  <div class="container justify-content-center">
    <vue-spinner />
    <form class="container" @submit.prevent="onSubmit">
      <div class="row justify-content-center">
        <label class="form-label" for="location">Location: </label>
        <input
          v-model="location"
          class="form-control"
          type="text"
          id="location"
        />
      </div>
      <div class="row mt-3">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="openOnly"
            checked
          />
          <label class="form-check-label" for="flexCheckChecked">
            Open Restaurants Only
          </label>
        </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="1$"
                value="option1"
                checked
              />
              <label class="form-check-label" for="1$">$</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="2$"
                value="option2"
                checked
              />
              <label class="form-check-label" for="2$">$$</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="3$"
                value="option3"
                checked
              />
              <label class="form-check-label" for="$$$">$$$</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="4$"
                value="option2"
                checked
              />
              <label class="form-check-label" for="4$">$$$$</label>
            </div>
          </div>
          <div class="col">
           <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="1star"
                value="option1"
                checked
              />
              <label class="form-check-label" for="1star">★</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="2star"
                value="option2"
                checked
              />
              <label class="form-check-label" for="2star">★★</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="3star"
                value="option3"
                checked
              />
              <label class="form-check-label" for="3star">★★★</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="4star"
                value="option2"
                checked
              />
              <label class="form-check-label" for="4star">★★★★</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="5star"
                value="option2"
                checked
              />
              <label class="form-check-label" for="5star">★★★★★</label>
            </div>
          </div>
        </div>
      <div class="row mt-3">
        <div class="row mt-2">
          <div>
            <label for="range" class="form-label">Lookup Radius (miles)</label>
            <input
              v-model="range"
              type="range"
              class="form-range"
              min="1"
              max="20"
              id="range"
            />
          </div>
          <span>{{ range }} Miles</span>
        </div>
      </div>
      <div class="row mt-3 justify-content-center">
        <button :disabled="location.length == 0" class="btn btn-primary" type="submit">Get Restaurants</button>
      </div>
    </form>
    <div class="row justify-content-center">
      <div
        v-if="loadingStatus"
        class="spinner-border text-primary mt-4"
        role="status"
      >
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
      openOnly: true,
      price: "",
      wheelDisplay: false,
      showModal: false,
      range: "10",
      paramObj: {},
      stars: []
    };
  },
  mounted() {},
  computed: {
    loadingStatus() {
      return this.$store.getters.loadingStatus;
    },
  },
  methods: {
    onSubmit() {
      this.openOnly = document.getElementById("openOnly").checked;
      for (var i = 1; i <= 4; i++) {
        if (document.getElementById(i.toString() + "$").checked === true) {
          if (this.price == "") {
            this.price = i.toString();
          } else {
            this.price = this.price + "," + i.toString();
          }
        }
      }
      if (this.price == "") {
        this.price = "1,2,3,4";
      }
      for (var i = 1; i <= 5; i++) {
        if (document.getElementById(i.toString() + "star").checked === true) {
          if (this.stars == ""){
            this.stars = i.toString();
          }
          else{
            this.stars = this.stars + "," + i.toString();
          }
        }
      }
      if (this.stars == []){
        this.stars = ["1","2","3","4","5"]
      }
      this.paramObj = {
        location: this.location,
        price: this.price,
        openOnly: this.openOnly,
        range: this.range,
        stars: this.stars
      };

      this.$store.dispatch("getRestaurants", this.paramObj);
      this.price = "";
      this.paramObj = {};
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