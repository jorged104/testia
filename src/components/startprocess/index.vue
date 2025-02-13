<script setup lang="ts">

import { Button } from '@/components/ui/button'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {  startprocess } from '@/components/startprocess';

</script>
<template>
<div class="flex flex-col h-full ">

<div class="m-3">
<startprocess></startprocess>
</div>
</div>
    </template>