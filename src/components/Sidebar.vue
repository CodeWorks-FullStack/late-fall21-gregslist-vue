<template>
  <div
    class="
      sidebar
      d-md-flex
      flex-column
      justify-content-between
      bg-success
      d-none d-md-block
      text-dark
    "
  >
    <div class="top-part">
      <div class="text-dark py-3">
        <h3 class="">Gregslist</h3>
      </div>
      <div class="links">
        <ul class="nav-links ps-0">
          <li class="nav-link">
            <router-link
              class="selectable rounded p-2 text-dark lighten-30"
              :to="{ name: 'Cars' }"
            >
              Cars
            </router-link>
          </li>
          <li class="nav-link">
            <router-link
              class="selectable rounded p-2 text-dark lighten-30"
              :to="{ name: 'Home' }"
            >
              Houses
            </router-link>
          </li>
          <li class="nav-link">
            <router-link
              class="selectable rounded p-2 text-dark lighten-30"
              :to="{ name: 'Home' }"
            >
              Jobs
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom-part">
      <Auth />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.a {
  color: black;
}
</style>