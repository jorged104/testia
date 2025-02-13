<template>
    <div class="container mx-auto px-4">
        <div class="text-center my-8">
            <h1 class="text-4xl font-bold text-primary-600"> Bussines Process </h1>
            <p class="text-lg text-secundary-400">Select one to start </p>
        </div>
        <div class="overflow-x-auto">
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
                               <span class="text-white">Select</span> 
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                            <DropdownMenuLabel>Process</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="startProcess(item.id)">
                            
                                    <CirclePlay class="mr-2 h-4 w-4" />
                                    <span>Start Process </span>

                              
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Eye class="mr-2 h-4 w-4" />
                                <span>View Diagram</span>
                             </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
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

import {getListProcessDefinition} from '@/lib/services/processDefinitionService'

import { Button } from '@/components/ui/button'

export default {
  components: {
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
   mounted(){
    this.buildtable();
   },
   methods: {
    async buildtable(){
        const data = await getListProcessDefinition();
        this.listOfProcess=  data
    },
    startProcess(id){
        this.$router.push({ name: 'ProcessStart', params: { id } });
    },
    viewDiagram(){
        console.log("Init process")
    }
   }

};
</script>