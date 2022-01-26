<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="make" class="">Make:</label>
      <select
        v-model="editable.make"
        name="make"
        id="make"
        required
        class="form-control"
      >
        <option disabled selected value="">Please Choose your car make</option>
        <option>honda</option>
        <option>hyundai</option>
        <option>tesla</option>
        <option>toyota</option>
        <option>other</option>
      </select>
    </div>
    <div class="form-group">
      <label for="model" class="">Model:</label>
      <input
        placeholder="Model"
        v-model="editable.model"
        type="text"
        class="form-control"
        name="model"
        id="model"
        required
      />
    </div>
    <div class="form-group">
      <label for="price" class="">Price:</label>
      <input
        placeholder="Price"
        v-model="editable.price"
        type="number"
        class="form-control"
        name="price"
        id="price"
        min="0"
        max="9999999"
      />
    </div>
    <div class="form-group">
      <label for="year" class="">year:</label>
      <input
        placeholder="year"
        v-model="editable.year"
        type="year"
        class="form-control"
        name="year"
        id="year"
      />
    </div>
    <div class="form-group">
      <label for="description" class="">description:</label>
      <textarea
        placeholder="Description"
        v-model="editable.description"
        type="text"
        class="form-control"
        name="description"
        id="description"
        rows="5"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="img" class="">img:</label>
      <input
        placeholder="https://imgurl.com"
        v-model="editable.imgUrl"
        type="url"
        class="form-control"
        name="img"
        id="img"
        required
      />
    </div>
    <div class="d-flex justify-content-between my-3">
      <button
        type="button"
        data-bs-dismiss="modal"
        aria-label="Close"
        class="btn text-dark lighten-20 text-uppercase selectable"
      >
        <b> cancel </b>
      </button>
      <button
        type="submit"
        class="btn btn-success text-primary text-uppercase selectable"
      >
        <b> submit </b>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { Car } from '../models/Car.js'
import { computed, watchEffect } from '@vue/runtime-core'
import { carsService } from '../services/CarsService.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
export default {
  // REVIEW PROPS
  props: {
    car: { type: Car, default: () => new Car() }
  },
  setup(props) {
    // create an object we can edit (NOTE this is for a form that edits and creates)
    const editable = ref({})
    // watch for data coming in (triggered by change in prop values)
    watchEffect(() => {
      // if data come in break reference and set to the editable
      editable.value = { ...props.car }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          // anytime you need to interact with ref objects you need to use 'value'
          if (editable.value.id) {
            // Edit
            await carsService.editCar(editable.value)
            Modal.getOrCreateInstance(document.getElementById('edit-modal')).hide()
          } else {
            // Create
            await carsService.createCar(editable.value)
            Modal.getOrCreateInstance(document.getElementById('create-car')).hide()
            // TODO after creating, push to the details page
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>