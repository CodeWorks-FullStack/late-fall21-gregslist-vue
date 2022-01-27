import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('NEW_CAR', this.onNewCar)
      .on('NEW_BID', this.onNewBid)
      .on('INCREASED_BID', this.onIncreasedBid)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

  onNewCar(payload) {
    AppState.cars.push(payload)
  }

  joinRoom(roomName) {
    this.socket.emit('JOIN_ROOM', { room: roomName })
  }

  leaveRoom(roomName) {
    this.socket.emit('LEAVE_ROOM', { room: roomName })
  }

  onNewBid(bid) {
    AppState.bids.unshift(bid)
  }

  onIncreasedBid(bid) {
    AppState.bids = AppState.bids.filter(b => b.accountId !== bid.accountId)
    AppState.bids.unshift(bid)
  }
}

export const socketService = new SocketService()
