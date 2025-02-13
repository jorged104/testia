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

import {processcards , processlist } from '@/components/process';

</script>
<template>
<div class="flex flex-col h-full ">
<processcards></processcards>
<div class="m-3">
<processlist></processlist>
</div>
</div>
    </template>