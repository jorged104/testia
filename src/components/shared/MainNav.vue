<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
  <router-link
      to="/task"
      class="text-sm font-medium transition-colors hover:text-primary"
    >
      To-Do
    </router-link>
    <router-link
      to="/process"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
     Process Catalog
    </router-link>
    <router-link
      to="/workflow"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
     Workflow
    </router-link>
    <a
      href="/workflow"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Settings
    </a>
  </nav>
</template>