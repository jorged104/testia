import bpmapi from "./bpmapi";
import { useAuthStore  } from '@/stores/authStore';
import {transformPayload , transformApiResponse } from '@/lib/services/taskService';


async function  getProcessDiagramXML(processDefinitionId: string){
    try {
        let processDiagramUrl = `process-definition/${processDefinitionId}/xml`
        const response = await bpmapi.get(`${processDiagramUrl}`)
        console.debug(response.data)
        return response.data.bpmn20Xml
    } catch (e) {
        console.error(`Error fetching BPMN XML: ${e.message}`)
    }
    return {
    }
}

async function getListProcessDefinition() {
    const store = useAuthStore();
    const tenantid = store.user.tenantid
    try {
        let processDefinitionList = `process-definition?tenantIdIn=${tenantid}&latestVersion=true`
        const response = await bpmapi.get(`${processDefinitionList}`)
        return response.data
    } catch (e) {
        console.error(`Error fetching BPMN XML: ${e.message}`)
    }
    return {
    }
}
async function getprocessinfo(id) {

    try {
        let processDefinitionList = `process-definition/${id}`
        const response = await bpmapi.get(`${processDefinitionList}`)
        return response.data
    } catch (e) {
        console.error(`Error fetching BPMN XML: ${e.message}`)
    }
    return {
    }
}

async function getStartFormDeploy(id) {

    try {
        let processDefinitionList = `process-definition/${id}/deployed-start-form`
        const response = await bpmapi.get(`${processDefinitionList}`)
        if(response.status== 200){
        return response.data
        }
    } catch (e) {
        console.error(`Not  form : ${e.message}`)
    }
    return null
}
async function getStartDeployVariables(id) {

    try {
        let processDefinitionList = `process-definition/${id}/form-variables`
        const response = await bpmapi.get(`${processDefinitionList}`)
        return transformApiResponse(response.data)
    } catch (e) {
        console.error(`Error fetching BPMN XML: ${e.message}`)
    }
    return {
    }
}
async function StartProcess(id,data) {

    try {
        let processDefinitionList = `process-definition/${id}/start`
        // TODO: Add Bussines Key
        const response = await bpmapi.post(`${processDefinitionList}`,transformPayload(data))
        return response.data
    } catch (e) {
        console.error(`Error fetching BPMN XML: ${e.message}`)
    }
    return {
    }
}


export{
    getProcessDiagramXML,
    getListProcessDefinition,
    getprocessinfo,
    getStartDeployVariables,
    getStartFormDeploy,
    StartProcess
}