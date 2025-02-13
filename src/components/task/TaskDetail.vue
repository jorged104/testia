
<template>
    <div class="flex h-full flex-col">
        <div clss="flex flex-1 flex-col" v-if="bpmnStore.selectedTask">
            <div class="flex items-start p-4">
                <div class="flex items-start gap-4 text-sm">
                    <div class="grid gap-1">
                        <div class="font-semibold">
                        {{ bpmnStore.selectedTask.name }}
                        </div>
                        <div class="line-clamp-1 text-xs">
                            {{ bpmnStore.selectedTask.taskDefinitionKey }}
                        </div>
                        <div class="line-clamp-1 text-xs">
                        <span class="font-medium">Created:</span>  {{ getDistanceNow(bpmnStore.selectedTask.created) }}
                        <div class="line-clamp-1 text-xs">
                        <span class="font-semibold">Assignee:</span> {{  bpmnStore.selectedTask.assignee}}
                        </div>
                        </div>
                    </div>
                </div>
                <div class="ml-auto text-xs text-muted-foreground">
                    {{ bpmnStore.selectedTask.executionId}}
                </div>
            </div>
            <Separator />
        </div>
    </div>
</template>

<script lang="ts">

import { Separator } from '@/components/ui/separator'
import { useBpmnStore} from "@/stores/bpmn";
import {mapStores} from 'pinia';
import { formatDistanceToNow } from 'date-fns'

export default {
    components: {
        Separator
    },
    computed: {
    ...mapStores(useBpmnStore),
   },
   mounted(){

   },
   methods: {
    getDistanceNow(date : string){
      
      return  date ? formatDistanceToNow( new Date(date), { addSuffix: true }) : ""
      //return formatDistanceToNow( new Date(), { addSuffix: true })
    }

   }

}
</script>
