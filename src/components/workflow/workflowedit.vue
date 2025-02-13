<template>
    <div class="container mx-auto px-4 flex flex-col h-screen">
        <div class="text-center my-8">
            <h1 class="text-4xl font-bold text-primary-600"> Edit process </h1>
        </div>
        <div class="flex-grow-0">
            <Table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <TableCaption>A list of process.</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead class="w-[100px]">
                        Process Version
                    </TableHead>
                    <TableHead>Name Process  </TableHead>
                    <TableHead>Process Description </TableHead>
                    <TableHead class="text-right">
                        Action 
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow v-for="item in listOfProcess">
                    <TableCell class="font-medium">
                     {{ item.version }}
                    </TableCell>
                    <TableCell> {{  item.name }}</TableCell>
                    <TableCell> {{ item.description  }}</TableCell>
                    <TableCell class="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-current px-4 py-2 rounded-md hover:bg-current-700">
                               <span class="text-white">Action</span> 
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                            <DropdownMenuLabel>Process</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="startProcess(item.id)">
                            
                                    <CirclePlay class="mr-2 h-4 w-4" />
                                    <span>Deploy Process  </span>

                              
                            </DropdownMenuItem>
                            
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </div>
        <div class="flex flex-grow w-full ">
            <ResizablePanelGroup
                id="demo-group-1"
                direction="horizontal"
                class="w-full h-full border border-gray-200 rounded-lg"
            >
            <ResizablePanel id="demo-panel-1" :default-size="500">
                <div class="flex-1 border border-gray-200 rounded-lg shadow-md h-full" >
                    <div ref="bpmnContainer" id="bpmnContainer" class="h-full w-full">
                    
                    </div>
                </div>
            </ResizablePanel>
            <ResizableHandle id="demo-handle-1" with-handle />
            <ResizablePanel id="demo-panel-2" :default-size="200">   
                <div >
                    <div id="js-properties-panel" class="h-full w-full">
                    
                    </div>
                </div>
            </ResizablePanel>
            </ResizablePanelGroup>
       </div>  
    </div>
</template>
<script lang="ts">
import BpmnViewer from 'bpmn-js';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    CirclePlay,
    Eye
} from 'lucide-vue-next'

import {getListProcessDefinition , getProcessDiagramXML} from '@/lib/services/processDefinitionService'

import { Button } from '@/components/ui/button'
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { 
  BpmnPropertiesPanelModule, 
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from 'bpmn-js-properties-panel';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'
export default {
  components: {
        ResizableHandle,
        ResizablePanel,
        ResizablePanelGroup,
        Button,
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
        CirclePlay,
        Eye
  },
  data(){
    return{
        listOfProcess : {}
    }
   },
   props:{
    idprocess: String
   },
   mounted(){
    this.buildtable();
    this.initdiagram(this.idprocess);
   },
   methods: {
    async buildtable(){
        const data = await getListProcessDefinition();
        this.listOfProcess=  data
    },
    async initdiagram(idprocess){
        let viewer = new BpmnModeler({
          container: '#bpmnContainer',
          keyboard: {
            bindTo: document
          },
          propertiesPanel: {
                parent: '#js-properties-panel'
            },
            additionalModules: [
                BpmnPropertiesPanelModule,
                BpmnPropertiesProviderModule,
                CamundaPlatformPropertiesProviderModule
            ],
            moddleExtensions: {
                camunda: CamundaBpmnModdle
            }
        });
        
        const xml = await getProcessDiagramXML(idprocess)
        let me = this
        viewer.importXML(xml).then(function(result) {
          const { warnings } = result;
          console.log('succes !', warnings);
          viewer.get("canvas").zoom('fit-viewport');
          let canvas  =  viewer.get("canvas");
        }).catch(function(err) {
          const { warnings, message } = err;
          console.log('someting went wrong:', warnings, message);
        })
    },

   }

};
</script>