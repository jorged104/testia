<template>
    <div class="flex h-full flex-col">
        <div clss="flex flex-1 flex-col" >
            <Separator />
            <div class="flex-1 whitespace-pre-wrap p-4 text-sm">
                <div id="form"></div>
                <div class="flex items-start p-4">
                    <div class="ml-auto">
                        <Button @click="completeFormExternal" class="flex" >
                            {{externalbuttonlabel}}
                        </Button>
                    </div>
                </div>
                <Toaster />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Separator } from '@/components/ui/separator'
import {getBpmnXml, useBpmnStore} from "@/stores/bpmn";
import {mapActions, mapStores} from 'pinia';
import { Form  } from '@bpmn-io/form-js';

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'vue-sonner'

export default {
    components: {
        Separator,
        Button,
        Toaster
    },
    props:{
        handleSubmit : Function,
        data : Object,
        schema : Object,
        externalbuttonlabel :{
            type: String,
            default: "Complete Task"
        }
    },
    computed: {
    ...mapStores(useBpmnStore),
   },
   data(){
    return{
        formdata: {},
        form : null,
    }
   },
   mounted(){
    this.buildForm();
   },
   methods: {
    
     toast(description:string,meta :any){
        toast(description,meta)
     },
     async buildForm(){
        if(this.schema){
            this.form = new Form({
                container: document.querySelector('#form'),
            });

            await this.form.importSchema(this.schema , this.data);

            this.form.on('submit', (event) => {
                const errors =  this.form .validate();
                if (Object.keys(errors).length) {
                    console.error('Form has errors', errors);
                        this.toast("Form has errors ", {
                            description: "Please review the form",
                            action: {
                            label: 'Clear',
                            onClick: () => console.log('Undo'),
                        }})
                    return
                }
                this.completeForm(event)
                
            });
                this.form .on('changed', 500, (event) => {
                this.formdata = event.data
                });
        }
        },
    async completeForm(event : any){
        const responseComplete =  this.handleSubmit( event.data)
    },
    async completeFormExternal(){
        if(this.form){
        const errors =  this.form.validate();
                if (Object.keys(errors).length) {

                    console.error('Form has errors', errors);
                        this.toast("Form has errors ", {
                            description: "Please review the form",
                            action: {
                            label: 'Clear',
                            onClick: () => console.log('Undo'),
                            }})
                    
                return
         }
        }
        const responseComplete =  this.handleSubmit(this.formdata)
    }

   }

}
</script>
