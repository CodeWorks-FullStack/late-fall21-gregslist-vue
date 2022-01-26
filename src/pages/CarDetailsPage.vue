<template>
  <div v-if="car.id" class="py-4">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 m-auto">
          <Car :car="car" />
        </div>
      </div>

      <!-- CAR -->
      <div class="row">
        <div class="col-lg-8 m-auto">
          <div class="bg-white rounded p-4 elevation-2">
            <!-- DETAILS -->
            <div class="car-details">
              <h3
                class="
                  d-flex
                  align-items-center
                  justify-content-between
                  text-capitalize
                "
              >
                <span> {{ car.year }} {{ car.make }} - {{ car.model }} </span>
                <span>${{ car.price }}</span>
              </h3>
              <p class="mt-3 pt-3 border-top">
                {{ car.description }}
              </p>
            </div>

            <div class="seller-info mt-3">
              <p>
                <b>Contact Seller</b>
              </p>
              <div class="d-flex clip-text align-items-center">
                <img
                  :src="car.creator.picture"
                  alt=""
                  class="rounded"
                  height="40"
                />
                <b class="ms-3">
                  <i class="mdi mdi-account"></i>
                  {{ car.creator.name }}
                </b>
              </div>
            </div>

            <!-- Creator Controls -->
            <div
              class="d-flex justify-content-around"
              v-if="car.creatorId == account.id"
            >
              <i
                class="mdi mdi-pencil selectable"
                data-bs-toggle="modal"
                data-bs-target="#edit-modal"
              ></i>
              <button>Delete Car</button>
            </div>
            <div>
              <p>Comments:</p>

              <div v-for="c in comments" :key="c.id">
                <p>
                  {{ c.body }} - <img :src="c.creator.picture" height="20" />{{
                    c.creator.name
                  }}
                </p>
              </div>
            </div>
            <div>
              <p>Bids:</p>
              <div
                class="d-flex align-items-center"
                v-for="(b, i) in bids"
                :key="b.id"
              >
                ${{ b.rate }} - <img :src="b.bidder.picture" height="20" />
                {{ b.bidder.name }}
                <div class="flex-grow-1 text-end">
                  <i
                    class="mdi mdi-plus btn btn-info"
                    :title="'bid: ' + (bids[0].rate + 50)"
                    v-if="i !== 0 && b.bidder.id == account.id"
                    @click="increaseBid(b.bidder.id)"
                  >
                  </i>
                </div>
              </div>
              <div class="d-flex">
                <button
                  class="btn btn-success"
                  v-if="!hasBid"
                  @click="createBid()"
                >
                  Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT CAR MODAL -->
    <Modal id="edit-modal">
      <template #modal-title>
        {{ car.year }} {{ car.make }} - {{ car.model }}
      </template>
      <template #modal-body>
        <CarForm :car="car" />
      </template>
    </Modal>
  </div>
  <div v-else>loading.....</div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { carsService } from "../services/CarsService.js";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      carsService.getById(route.params.id);
      carsService.getBidsByCar(route.params.id);
    });
    return {
      async createBid() {
        try {
          await carsService.createBid(route.params.id);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error);
        }
      },
      async increaseBid(bidderId) {
        try {
          await carsService.increaseBid(route.params.id, bidderId);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error);
        }
      },
      account: computed(() => AppState.account),
      car: computed(() => AppState.activeCar),
      comments: computed(() => AppState.comments),
      bids: computed(() => AppState.bids),
      hasBid: computed(() =>
        AppState.bids.find((b) => b.accountId == AppState.account.id)
      ),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
