<template>
<div v-if="isload">
    <customform  :key="bpmnStore.selectedTask.id" 
    :handleSubmit="handleSubmiForm"
    :data="data"
    :schema="schema"
    > </customform> 
</div>
</template>

<script lang="ts">

import { Separator } from '@/components/ui/separator'
import { useBpmnStore} from "@/stores/bpmn";
import {mapActions, mapStores} from 'pinia';
import {
   customform
} from '@/components/customform'

import { getDeployedTask , getTaskFormVariable,completeTask } from '@/lib/services/taskService';

export default {
    components: {
        Separator,
        customform
    },
    computed: {
    ...mapStores(useBpmnStore),
   },
   data(){
        return{
            schema: null,
            data : {},
            isload: false
        }
    },
   mounted(){
    this.buildForm();
   },
   methods: {
    ...mapActions(useBpmnStore, ['fetchMyTasks', 'fetchTasks', 'selectTask', 'claimTask']),
    async buildForm(){
        if(this.bpmnStore.selectedTask.camundaFormRef){
            this.schema = await getDeployedTask(this.bpmnStore.selectedTask.id)
            this.data = await getTaskFormVariable(this.bpmnStore.selectedTask.id)
        }
        this.isload = true
    },
    async handleSubmiForm(data){
        const responseComplete = await completeTask(this.bpmnStore.selectedTask.id , data)
        this.selectTask(null)
        this.fetchTasks();
    }

   }

}
</script>
