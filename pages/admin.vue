<template>
  <div class="p-4">
    <h1 class="app-title">Admin</h1>
    <div class="mb-4 p-4 bg-gray-200">
      <nuxt-link to="/admin/homes/">Homes</nuxt-link>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import Cookie from "js-cookie";

export default {
  asyncData({ $config, redirect }) {
    if (!Cookie.get($config.auth.cookieName)) {
      redirect("/no-access");
      return;
    }
  },
};
</script>
