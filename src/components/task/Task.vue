<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import Search from '@/components/shared/Search.vue'

import { TaskList } from '@/components/task'
import { TaskDetail , TaskForm} from '@/components/task'
import {
   customform
} from '@/components/customform'
import {getBpmnXml, useBpmnStore} from "@/stores/bpmn";
import { ref, onMounted, onUnmounted , computed } from 'vue';

import { diagramviewer } from "@/components/diagram"
import { Button } from '@/components/ui/button'
const  bpmnStore = useBpmnStore()

const direction = ref('horizontal');

const updateDirection = () => {
  direction.value = window.innerWidth < 768 ? 'vertical' : 'horizontal';
};

onMounted(() => {
  window.addEventListener('resize', updateDirection);
  updateDirection(); // Llamar al montar para establecer la dirección inicial
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDirection);
});

const blurForm =  computed(() => {
  if(bpmnStore.selectedTask){
    if(bpmnStore.selectedTask.assignee){
      return ''
    }
  }
  return 'blurred-div '
})

</script>

<template>
   <div class="form-container">
  <ResizablePanelGroup
    id="resizepanel-group-1"
     :direction="direction"
    class="resizable-panel-group"
  >
    <ResizablePanel id="demo-panel-1" :default-size="200"  :min-size="20"  class="resizable-panel"> 
        <Tabs default-value="task" class="tabs">
            <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">
              To-Do
            </h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="task" class="text-zinc-600 dark:text-zinc-200" @click="bpmnStore.settypeOfTask(1)">
                My Task
              </TabsTrigger>
              <TabsTrigger value="gtask" class="text-zinc-600 dark:text-zinc-200" @click="bpmnStore.settypeOfTask(2)" >
                My Group Task
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Search  />
          </div>
          <TabsContent value="task" class="m-0">
            <TaskList :key="bpmnStore.typeOfTask"></TaskList>
          </TabsContent>
          <TabsContent value="gtask" class="m-0">
            <TaskList :key="bpmnStore.typeOfTask"></TaskList>
          </TabsContent>
        </Tabs>
    </ResizablePanel>

    <ResizableHandle id="demo-handle-1"  with-handle />
    <ResizablePanel id="resize-panel-2" :default-size="655"   class="resizable-panel">
        <Tabs default-value="form" class="tabs">
        <div class="flex items-center px-4 py-2">
            <TabsList class="ml-auto">
              <TabsTrigger value="form" class="text-zinc-600 dark:text-zinc-200">
                 Form
              </TabsTrigger>
              <TabsTrigger value="diagram" class="text-zinc-600 dark:text-zinc-200">
                 Diagram
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
            <TabsContent value="form" class="m-0">
                <TaskDetail v-if="bpmnStore.selectedTask" ></TaskDetail>
                <div class="blur-container"  v-if="bpmnStore.selectedTask" >
                  <div :class="blurForm">
                    <TaskForm  :key="bpmnStore.selectedTask.id" > </TaskForm>  
                  </div>
                  <Button class="button-over" v-if="!bpmnStore.selectedTask.assignee" @click="bpmnStore.claimTask(bpmnStore.selectedTask)"> Start Task </button>
                </div>
            </TabsContent>
            <TabsContent value="diagram" class="m-0">
              <TaskDetail v-if="bpmnStore.selectedTask" ></TaskDetail>
              <diagramviewer :key="bpmnStore.selectedTask.id" />
            </TabsContent>
        </Tabs>
    </ResizablePanel>
  </ResizablePanelGroup>
</div>
</template>
<style scoped>
    .blurred-div {
      filter: blur(5px); /* Aplicar efecto de blur */
    }
  .blur-container {
      position: relative;
      overflow: hidden; /* Asegura que el contenido se recorte al tamaño del div */
    }
    .button-over {
      position: absolute; /* Posicionamiento absoluto respecto al contenedor */
      top: 50%; /* Centrado vertical */
      left: 50%; /* Centrado horizontal */
      transform: translate(-50%, -50%); /* Ajuste para centrar el botón */
      z-index: 1; /* Asegura que el botón esté encima del blur */
    }
/* Estilos generales para los paneles y tabs */
.form-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.resizable-panel-group {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* Paneles dentro del grupo de paneles */
.resizable-panel {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}


/* Media queries para pantallas pequeñas */
@media (max-width: 768px) {
  .resizable-panel-group {
    flex-direction: column;
  }

  .resizable-panel {
    min-height: 300px; /* Ajusta según tus necesidades */
  }
}
</style>
