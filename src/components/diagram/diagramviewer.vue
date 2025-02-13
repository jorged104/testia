<template>
    <div class="flex h-full flex-col ">
        <div clss="flex h-full " v-if="bpmnStore.selectedTask">
            <Separator />
            <div class="flex  h-full    p-4 ">
              
                <div class="flex-grow ">
                    <div >
                        <div   ref="bpmnContainer" id="bpmnContainer" class="h-full w-full" >
            
                        </div>

                    </div>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Separator } from '@/components/ui/separator'
import {getBpmnXml, useBpmnStore} from "@/stores/bpmn";
import {mapActions, mapStores} from 'pinia';

import { getProcessDiagramXML } from '@/lib/services/processDefinitionService';
import { Button } from '@/components/ui/button'

import BpmnViewer from 'bpmn-js';


export default {
    components: {
        Separator,
        Button
    },
    computed: {
    ...mapStores(useBpmnStore),
   },
   data(){
    return{

    }
   },
   mounted(){
    this.initBpmn();
   },
   methods: {
    async initBpmn()  {
        let viewer = new BpmnViewer({
          container: '#bpmnContainer',
          keyboard: {
            bindTo: document
          }
        });
        const xml = await getProcessDiagramXML(this.bpmnStore.selectedTask.processDefinitionId)
        let me = this
        viewer.importXML(xml).then(function(result) {
          const { warnings } = result;
          console.log('succes !', warnings);
          viewer.get("canvas").zoom('fit-viewport');
          let canvas  =  viewer.get("canvas");
          canvas.addMarker(me.bpmnStore.selectedTask.taskDefinitionKey,'highlight');
          //let elementRegistry = viewer.get('elementRegistry');
          //let elementToColor = elementRegistry.get(me.bpmnStore.selectedTask.taskDefinitionKey);
        }).catch(function(err) {
          const { warnings, message } = err;
          console.log('someting went wrong:', warnings, message);
        })
    },
    getDiagramTest(){
        console.log('hola')
        getProcessDiagramXML(this.bpmnStore.selectedTask.processDefinitionId)
    }
   }

}
</script>

<style >
#bpmnContainer{
    display: flex;
  flex-direction: column;
  width: 100%;
  height: 1000;
}
.highlight:not(.djs-connection) .djs-visual > :nth-child(1) {
fill: green !important; /* color elements as green */
}
</style>