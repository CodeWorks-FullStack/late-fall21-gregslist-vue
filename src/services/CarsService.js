import { AppState } from "../AppState"
import { Car } from "../models/Car"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CarsService {
  async getAllCars() {
    const res = await api.get('api/cars')
    logger.log(res.data)
    AppState.cars = res.data.map(c => new Car(c))
  }

  async getById(id) {
    const res = await api.get('api/cars/' + id)
    logger.log(res.data)
    AppState.activeCar = new Car(res.data)
  }

  async createCar(newCar) {
    const res = await api.post('api/cars', newCar)
    logger.log(res.data)
    AppState.cars.push(new Car(res.data))
  }

  async editCar(updatedCar) {
    const res = await api.put('api/cars/' + updatedCar.id, updatedCar)
    logger.log(res.data)
    AppState.activeCar = new Car(res.data)
  }

  async getBidsByCar(carId) {
    const res = await api.get(`api/cars/${carId}/bids`)
    logger.log('get bids res', res.data)
    AppState.bids = res.data
  }

  async createBid(carId) {
    let rate = 0
    if (AppState.bids[0]) {
      rate = AppState.bids[0].rate + 100
    } else {
      rate = AppState.activeCar.price + 100
    }
    const res = await api.post(`api/cars/${carId}/bids`, { rate })
    logger.log('create bid res', res.data)
    AppState.bids.unshift(res.data)
  }

  async increaseBid(carId, bidderId) {
    let rate = AppState.bids[0].rate + 100
    const res = await api.put(`api/cars/${carId}/bids`, { rate })
    logger.log('increase bid res', res.data)
    AppState.bids = AppState.bids.filter(b => b.accountId !== bidderId)
    AppState.bids.unshift(res.data)
  }

  // async getComments(carId) {
  //   const res = await api.get(`api/cars/${carId}/comments`)
  //   logger.log(res.data)
  //   AppState.comments = res.data
  // }

}

export const carsService = new CarsService()
