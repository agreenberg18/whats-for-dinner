<template>
  <img v-if="theWheel" id="prizePointer" src="../assets/red_triangle.png" />
  <canvas
    id="canvas"
    data-responsiveMargin="75"
    style="background-image: url('../assets/basic_wheel_background2.png')"
    width="500"
    height="500"
    data-responsiveMinWidth="180"
    data-responsiveScaleHeight="true"
  >
    Canvas not supported, use another browser.
  </canvas>
  <button v-if="theWheel" @click="spinWheel" class="btn btn-success mt-2">
    Spin that wheel!
  </button>
</template>

<script>
import TweenMax from "@/assets/TweenMax.min.js";
import Winwheel from "winwheel/lib/Winwheel.js";
import { mapGetters } from "vuex";

export default {
  name: "Wheel",
  watch: {
    loadingStatus: {
      handler: function () {
        this.options = [];
        for (var i = 0; i < this.restaurants.length; i++) {
          var firstWord = this.restaurants[i].substring(0, 20);
          var color = "";
          if (i % 4 == 0) {
            color = "#0d6efd";
          } else if (i % 3 == 0) {
            color = "#6f42c1";
          } else if (i % 2 == 0) {
            color = "#198754";
          } else {
            color = "#ffc107";
          }
          this.options.push({
            //textFillStyle: color,
            fillStyle: color,
            text: firstWord,
            fullName: this.restaurants[i],
            URL: this.restaurantUrls[this.restaurants[i]],
          });
        }
        if (this.dataReceived == 1) {
          this.generateWheel();
        }
      },
      deep: true,
    },
    
  },
  mounted() {},
  data() {
    return {
      options: [],
      theWheel: null,
      //restLength: null,
    };
  },
  computed: {
    ...mapGetters({
      restaurants: "allRestaurants",
      restaurantUrls: "restaurantUrls",
      dataReceived: "dataReceived",
      loadingStatus: "loadingStatus",
    }),
  },
  methods: {
    spinWheel() {
      this.theWheel.startAnimation();
    },
    generateWheel() {
      this.theWheel = new Winwheel({
        numSegments: this.restaurants.length,
        responsive: true,
        segments: this.options,
        pins: {
          outerRadius: 6,
          responsive: true, // This must be set to true if pin size is to be responsive, if not just location is.
        },
        // Note animation properties passed in constructor parameters.
        animation: {
          type: "spinToStop", // Type of animation.
          duration: 5, // How long the animation is to take in seconds.
          spins: 8,
          callbackFinished: this.alertPrize,
        },
      });
    },
    alertPrize() {
      // Call getIndicatedSegment() function to return pointer to the segment pointed to on wheel.
      let winningSegment = this.theWheel.getIndicatedSegment();
      this.$store.dispatch("setWinner", winningSegment);
      this.$emit("winnerSelected");
      this.theWheel.rotationAngle = this.theWheel.rotationAngle % 360;
      // Basic alert of the segment text which is the prize name.
      //alert(winningSegment.text + " Won!");
    },
  },
};
</script>

<style scoped>
#prizePointer {
  width: 3rem;
  height: 1.5rem;
  z-index: 999;
  margin-top: 10px;
  /* position: absolute;
  left: 440px;
  top:
  width: 50px;
  z-index: 999; */
}
#canvas {
  z-index: 1;
  background-repeat: no-repeat; /* Ensure that background does not repeat */
  background-position: center; /* Ensure image is centred */
}
</style>