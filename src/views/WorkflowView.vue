<template>
    <div >
        <workflow v-if="!processkey"/>
        <workflowedit v-if="processkey" :idprocess="processkey"/>
    </div>
     </template>
     
<script>
import {workflow} from '@/components/workflow'
import {workflowedit} from '@/components/workflow'
     export default {
       components:{
        workflow,
        workflowedit
       },
       name: 'WorkflowView',
       computed: {
            processkey() {
            return this.$route.params.id; // Accede al parámetro 'id'
            },
        },
        mounted(){
           
        },
     };
</script>