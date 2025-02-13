<template>
    <div class="container mx-auto px-4">
        <div class="text-center my-8">
            <h1 class="text-4xl font-bold text-primary-600"> Start Process - {{ this.process.name }}</h1>
        
        </div>
        <div class="overflow-x-auto">
            <Table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                
                <TableHeader>
                    <TableRow>
                    <TableHead class="w-[100px]">
                        Process Version
                    </TableHead>
                    <TableHead>Name Process  </TableHead>
                    <TableHead>Process Description </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell class="font-medium">
                     {{ this.process.version }}
                    </TableCell>
                    <TableCell> {{  this.process.name }}</TableCell>
                    <TableCell> {{ this.process.description  }}</TableCell>
                </TableRow>
                </TableBody>
            </Table>
            <div v-if="isload">
                
                <customform   
                :handleSubmit="handleSubmiForm"
                :data="data"
                :schema="schema"
                externalbuttonlabel = "Start Process"
                > </customform> 
            </div>
        </div>
    </div>
</template>
<script lang="ts">
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

import { getprocessinfo, 
         getStartDeployVariables,
         getStartFormDeploy,
         StartProcess
        } from '@/lib/services/processDefinitionService'

import { Button } from '@/components/ui/button'
import {
   customform
} from '@/components/customform'

export default {
  components: {
        customform,
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
        process : {},
        data : {},
        schema : null,
        isload : false
    }
   },
   computed: {
    processkey() {
      return this.$route.params.id; // Accede al parámetro 'id'
    },
  },
   mounted(){
    this.buildtable(this.$route.params.id);
   },
   methods: {
    async buildtable(id){
        const data = await getprocessinfo(id);
        this.process =  data
        this.schema = await getStartFormDeploy(id);
        if(this.process.camundaFormRef){
            
            this.data = await getStartDeployVariables(id);
        }
        this.isload = true
    },
    async handleSubmiForm(data){
        const start = await StartProcess(this.process.id,data)
        this.$router.push({ name: 'TaskView' });
    },
    startProcess(){
        console.log("Init process")
    },
    viewDiagram(){
        console.log("Init process")
    }
   }

};
</script>