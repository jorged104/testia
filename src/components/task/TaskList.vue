<template>
    <ScrollArea class="h-screen flex">
        <div class="flex-1 flex flex-col gap-2 p-4 pt-0"  v-if="bpmnStore.tasks.length > 0" >
          <div  v-for="item in  bpmnStore.tasks" :key="item.id" class=" flex flex-col" >  
          <button
                class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
                @click="selectItem(item)"
                >
            <div class="flex w-full flex-col gap-1">
                <div class="flex items-center">
                <div class="flex items-center gap-2">
                    <div class="font-semibold">
                      {{ item.name }} 
                    </div>
                    <span  class="flex h-2 w-2 rounded-full bg-blue-600" />
                </div>
                <div
                    class="ml-auto text-xs text-foreground"
                >
                    Created: {{getDistanceNow(item.created) }}
                    </div>
                </div>

                <div class="text-xs font-medium">
                   {{ item.taskDefinitionKey }}
                </div>
            </div>
            <div class="line-clamp-2 text-xs text-muted-foreground">
                 Due: {{ getDistanceNow(item.due)}} | Priority: {{ item.priority }}
            </div>
            </button>
          </div>
        </div>
    </ScrollArea>
</template>
<script lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import {getBpmnXml, useBpmnStore} from "@/stores/bpmn";
import {mapActions, mapStores} from 'pinia';



export default {
  components: {
    ScrollArea,
  },
  computed: {
    ...mapStores(useBpmnStore),
    ...mapStores(getBpmnXml)
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    ...mapActions(useBpmnStore, ['fetchMyTasks', 'fetchTasks', 'selectTask', 'claimTask']),
    selectItem(item) {
      //this.claimTask(item)
      this.selectTask(item)
    },
    claimTaskItem(item) {
      this.claimTask(item)
      this.fetchTasks()
    },
    getDistanceNow(date : string){
      
      return  date ? formatDistanceToNow( new Date(date), { addSuffix: true }) : ""
      //return formatDistanceToNow( new Date(), { addSuffix: true })
    }
  },


};
</script>