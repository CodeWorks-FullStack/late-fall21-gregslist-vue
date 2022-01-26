import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getBidsByAccount() {
    try {
      const res = await api.get('/account/bids')
      logger.log('account res', res.data)
      AppState.accountBids = res.data
    } catch (error) {
      logger.log(error.message)
    }
  }
}

export const accountService = new AccountService()
