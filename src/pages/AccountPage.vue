<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row">
    <Car v-for="b in accountBids" :key="b.id" :car="b.car" class="col-md-4" />
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
export default {
  name: "Account",
  setup() {
    onMounted(() => {
      try {
        accountService.getBidsByAccount();
      } catch (error) {
        Pop.toast(error.message);
      }
    });
    return {
      accountBids: computed(() => AppState.accountBids),
      account: computed(() => AppState.account),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
