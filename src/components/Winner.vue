<template>
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> -->

  <!-- Modal -->
  <div class="backdrop">
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            And the winner is...
          </h5>
          <button @click="close"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <a :href="winner.URL"
            :target="_blank"
            rel="noopener noreferrer"
            >{{ winner.fullName }}! Click for more
            information
          </a>
        </div>
        <div class="modal-footer">
          <button @click="close"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { mapGetters } from "vuex";

export default {
  name: "Winner",
  computed: {
    ...mapGetters({
      winner: "getWinner",

    }),
  },
  props:['showModal'],
  data() {
    return {
      myModal: null,
      _blank : "_blank"
    //   emitter: null
    };
  },
  // props: ['winner','restaurantUrls'],
  mounted() {
    this.myModal = new Modal(document.getElementById("exampleModal"), {});
  },
  methods: {
    showWinner() {
      this.myModal.show();
    },
    close(){
        console.log('resetting winner')
    }
  },
  watch: {
    showModal: {
      handler: function () {
        if (this.showModal == true){
            this.$emit('modalReset')
            this.showWinner()
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
</style>

