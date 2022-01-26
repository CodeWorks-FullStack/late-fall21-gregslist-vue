<template>
  <div class="cars row">
    <div class="col-12 d-flex justify-content-between p-5">
      <h1>Cars</h1>
      <button
        class="btn btn-outline-dark"
        data-bs-toggle="modal"
        data-bs-target="#create-car"
        v-if="account.id"
      >
        <i class="mdi mdi-plus"></i>
      </button>
    </div>
    <div v-if="loading" class="col-12">
      <i class="mdi mdi-spinner mdi-spin"></i>
    </div>
    <div v-else class="col-12">
      <div class="row">
        <div class="col-md-4 m-3" v-for="cData in cars" :key="cData.id">
          <Car :car="cData" />
        </div>
      </div>
    </div>
  </div>
  <Modal id="create-car">
    <template #modal-title> Create Car </template>
    <template #modal-body>
      <CarForm />
    </template>
  </Modal>
</template>


<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { carsService } from '../services/CarsService'
import { AppState } from '../AppState'


export default {
  setup() {
    const loading = ref(true)
    // use this method to fire a request when this page first loads
    onMounted(async () => {
      try {
        await carsService.getAllCars()
        loading.value = false
      } catch (error) {
        logger.error(error)
        Pop.toast('Unable to Get Cars', 'error')
      }
    })
    // variables on the return object are 'exposed'/usable to the template
    return {
      loading,
      cars: computed(() => AppState.cars),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>