<template>
  <div>
    <div class="hidden flex-col md:flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <MainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  </div>

    <router-view></router-view>
  </div>
</template>

<script>
import MainNav from '@/components/shared/MainNav.vue'
import Search from '@/components/shared/Search.vue'
import UserNav from '@/components/shared/UserNav.vue'

export default {
  components: {
    MainNav,
    Search,
    UserNav
  }
};
</script>
