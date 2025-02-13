<template>
    <div class=" flex-col md:flex">
   <startprocess></startprocess>
    </div>
     </template>
     
     <script>
     import {index as startprocess} from '@/components/startprocess'
     export default {
       components:{
         startprocess 
       },
       name: 'ProcessView'
     };
</script>