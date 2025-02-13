import axios from "axios";
import {Service} from "./Service";


const config02 = {
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    }
};


export interface TaskComment {
    "links": string [];
    "id": string;
    "userId": string;
    "time": Date | string;
    "taskId": string;
    "message": string;
    "removalTime": null | Date | string;
    "rootProcessInstanceId": string;
    "processInstanceId": null | string;
}

export interface TaskVariable {
    type: string;
    value: string;
}

export interface Task {
    id: string;
    name: string;
    assignee: any;
    created: string;
    due: any;
    followUp: any;
    lastUpdated: any;
    delegationState: any;
    description: any;
    executionId: string;
    owner: any;
    parentTaskId: any;
    priority: number;
    processDefinitionId: string;
    processInstanceId: string;
    taskDefinitionKey: string;
    caseExecutionId: any;
    caseInstanceId: any;
    caseDefinitionId: any;
    suspended: boolean;
    formKey: string | null;
    camundaFormRef: any;
    tenantId: any;
    TaskVariable: TaskVariable[] | null;
}

export interface ProcessInstance {
    id: string;
    businessKey: string;
    processDefinitionId: string;
    processDefinitionKey: string;
    processDefinitionName: string;
    processDefinitionVersion: number;
    startTime: any;
    endTime: any;
    removalTime: any;
    durationInMillis: any;
    startUserId: any;
    startActivityId: string;
    deleteReason: string | null;
    rootProcessInstanceId: string;
    superProcessInstanceId: string | null;
    superCaseInstanceId: string | null;
    caseInstanceId: string | null;
    tenantId: string | null;
    state: string | null;
}

export interface GroupsCamunda {
    id: string;
    name: string;
    type: string;
}

export interface UsersCamunda {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

import bpmapi from "./bpmapi";

export class BpmnService extends Service {


    constructor() {
        super()
    }

   

    async getTaskDetail(processInstanceId : strig){
        try{
            let ruta = `${this.bpmnServiceUrl}engine-rest/process-instance/${element.processInstanceId}`;
        }catch(e){
            console.error(e)
        }
    }

    async getAllMyGroupTasks() {
        try {
            console.log("Haciendo petición")
            //'task?withoutTenantId=false&includeAssignedTasks=false&assigned=false&unassigned=false&withoutDueDate=false&withCandidateGroups=false&withoutCandidateGroups=false&withCandidateUsers=false&withoutCandidateUsers=false&active=false&suspended=false&variableNamesIgnoreCase=false&variableValuesIgnoreCase=false&candidateGroups=developer,PHITEC-SYS,support'

            let MyTask = 'engine-rest/task?' +
                'withoutTenantId=false&' +
                'includeAssignedTasks=false&' +
                'assigned=false&' +
                'unassigned=false&' +
                'withoutDueDate=false&' +
                'withCandidateGroups=false&' +
                'withoutCandidateGroups=false&' +
                'withCandidateUsers=false&' +
                'withoutCandidateUsers=false&' +
                'active=false&' +
                'suspended=false&' +
                'variableNamesIgnoreCase=false&' +
                'variableValuesIgnoreCase=false&' +
                'candidateGroups=' + this.keycloakStore.userProfile.value.groups +
                '&sortBy=created&' +
                'sortOrder=desc';
            const request = await axios.get(`${this.bpmnServiceUrl}${MyTask}`)

            for (let index = 0; index < request.data.length; index++) {
                const element = request.data[index];

                let ruta = `${this.bpmnServiceUrl}engine-rest/process-instance/${element.processInstanceId}`;
                const response = await axios.get(ruta);
                const businessKey = response.data.businessKey;
                console.log('response-->>', response)
                element.businessKey = businessKey;
            }
            return request.data
        } catch (e) {
            console.error(e)
        }
        return {}
    }

    async getAllMyTasks(UserName :str ) {
        try {
            console.log("Haciendo petición My Task")
            //'task?withoutTenantId=false&includeAssignedTasks=false&assigned=false&unassigned=false&withoutDueDate=false&withCandidateGroups=false&withoutCandidateGroups=false&withCandidateUsers=false&withoutCandidateUsers=false&active=false&suspended=false&variableNamesIgnoreCase=false&variableValuesIgnoreCase=false&candidateGroups=developer,PHITEC-SYS,support'

            const MyTask = `task?assignee=${UserName}&sortBy=created&sortOrder=desc`;

            const request = await bpmapi.get(`${MyTask}`)

            for (let index = 0; index < request.data.length; index++) {
                const element = request.data[index];

                let ruta = `process-instance/${element.processInstanceId}`;
                const response = await bpmapi.get(ruta);
                const businessKey = response.data.businessKey;
                console.log('response-->>', response)
                element.businessKey = businessKey;
            }
            return request.data
        } catch (e) {
            console.error(e)
        }
        return {}
    }

    async getAllGroups() {
        try {
            let apiUrl = `${this.bpmnServiceUrl}engine-rest/group?type=user`
            const request = await axios.get(apiUrl)
            return request.data
        } catch (e) {
            console.error(e)
        }
        return {}
    }

    async getAllUsers() {
        try {
            let apiUrl = `${this.bpmnServiceUrl}engine-rest/user`
            const request = await axios.get(apiUrl)
            return request.data
        } catch (e) {
            console.error(e)
        }
        return {}
    }

    async getProcessInstanceTask(processInstance: ProcessInstance) {
        try {
            const request = await axios.get(`${this.bpmnServiceUrl}engine-rest/history/task?processInstanceId=${processInstance.id}`)

            for (let index = 0; index < request.data.length; index++) {
                const element = request.data[index];
                element.businessKey = processInstance.businessKey;
            }
            return request.data
        } catch (e) {
            console.error(e)
        }
        return {}
    }

    async searchProcessDefinitions(latestVersion: any) {
        console.log('searchProcessDefinitions', 'Paso por aquí Linea 32')
        let result: never[] = []
        try {
            let ruta = this.bpmnServiceUrl + "engine-rest/process-definition?sortBy=version&sortOrder=desc"
            if (latestVersion != undefined) {
                if (latestVersion === true) {
                    ruta = this.bpmnServiceUrl + "engine-rest/process-definition?sortBy=version&sortOrder=desc&latestVersion=true";
                }
            }

            const response = await axios.get(ruta);
            if (response.status == 200) {
                return response.data;
            }
            return result

        } catch (e) {
            console.error(e)
        }
        return result
    }

    async deployProcess(upload: any, deploymentName: any, tenantId: any) {
        console.log('bpmnService.ts - deployProcess', 'Paso por aquí Linea 32')
        let apiUrl = this.bpmnServiceUrl + "engine-rest/deployment/create"
        // Configuración de la solicitud
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
            }
        };

        const bpmnBlob = new Blob([upload], {type: 'application/xml'});
        // Crear un objeto FormData para enviar el archivo BPMN
        const formData = new FormData();
        formData.append('tenant-id', tenantId);
        formData.append('deployment-source', 'PhiBPM Design');
        formData.append('deploy-changed-only', 'false');
        formData.append('enable-duplicate-filtering', 'false');
        formData.append('deployment-name', deploymentName);
        formData.append('deployment-activation-time', '2023-11-13T00:24:58.473+0000');
        formData.append('data', bpmnBlob, 'diagram.bpmn');

        try {
            // Realizar la solicitud POST
            const response = await axios.post(apiUrl, formData, config);
            // Manejar la respuesta de la API de Camunda
            console.log('Respuesta de Camunda:', response.data);
            return response.data;
        } catch (error) {
            // Manejar errores
            console.error('Error al realizar la solicitud a Camunda:', error);
        }
        return false;
    }

    async getBpmnXml(processDefinitionKey: any, tenantID: any) {
        console.log('bpmnService.ts - processDefinitionKey', processDefinitionKey)
        console.log('bpmnService.ts - tenantID', tenantID)
        let result: never[] = []
        // var vm = this;

        try {
            let urlXml = "";
            // if (tenantID!= undefined) {
            //     urlXml = `${this.bpmnserviceurl}engine-rest/process-definition/key/${processDefinitionKey}/tenant-id/${tenantID}/xml`
            // } else {
            urlXml = `${this.bpmnServiceUrl}engine-rest/process-definition/key/${processDefinitionKey}/xml`
            // }
            console.log('bpmnService.ts - urlxm', urlXml)
            const response = await axios.get(urlXml)
            if (response.status == 200) {
                return response.data.bpmn20Xml;
            }
            return result;
        } catch (error) {
            throw new Error(`Error fetching BPMN XML: ${error.message}`);
        }
        //return result
    }

    form2data(data: any) {
        const request: any = {}
        for (const item in data) {
            if (item == 'submit') {
                continue;
            }
            const localObject: any = {}

            localObject["value"] = data[item]
            localObject["type"] = this.mapperTypes(typeof data[item])
            if (typeof data[item] == "object") {
                localObject["value"] = JSON.stringify(data[item]);
                //localObject["type"]
            }
            request[item] = localObject
        }
        console.log(request)
        return {variables: request}
    }

    data2form(input: any) {

        let data: any = {};

        for (const [key, value] of Object.entries(input)) {
            // Ignoramos las propiedades que no necesitamos convertir
            if (key == 'submit') {
                continue;
            }
            // Agregamos la propiedad al objeto `data` con su valor correspondiente
            data[key] = value.value;
            try {
                if (typeof value.value == "string") {
                    data[key] = JSON.parse(value.value);
                }
            } catch (e) {
            }


        }
        return {data}

    }

    async getDetailTask(task: Task) {
        const varTask = `engine-rest/task/` + task.id + `/variables?deserializeValues=true`

        try {

            const response = await axios.get(this.bpmnServiceUrl + varTask);
            return response.data
        } catch (e) {
            console.error(e);
        }
        return {};
    }

    async sendDataTask(formData: any, investigation_Process: string) {
        const varTask = `engine-rest/process-definition/key/` + investigation_Process + `/start`

        try {
            const response = await axios.post(this.bpmnServiceUrl + varTask, JSON.stringify(formData), config02)
                .then(response => {
                    console.log(response.data); // Mostrar la respuesta en la consola
                    // this.formSubmitted = true;  // Establecer formSubmitted en true para mostrar el aviso
                    // this.resetForm();
                    // this.showSuccessMessage = true;
                })
                .catch(error => {
                    console.error(error); // Manejo de errores
                });
        } catch (e) {
            console.error(e);
        }
        return {};

    }

    async sendDataForm(taskId: string, variables: object) {
        const varSend = `engine-rest/task/${taskId}/complete`
        try {
            const request = await axios.post(this.bpmnServiceUrl + varSend, variables)
            return 'ok'
        } catch (e) {
            console.log(e)
            if (e.response) {
                return e.response.data
            }
            return e.message
        }
        //return 'error';
    }

    mapperTypes(type: any) {
        if (type == "number") {
            return "double"
        }
        if (type == "object") {
            return "string"
        }
        return type
    }

    async processDefinitionStartForm(processDefinitionKey: string, processTenantId: string) {
        console.log('processDefinitionStartForm', `processTenantId: ${processDefinitionKey} y processTenantId: ${processTenantId}`)
        try {
            let url;
            if (processTenantId != undefined) {
                url = `${this.bpmnServiceUrl}engine-rest/process-definition/key/${processDefinitionKey}/tenant-id/${processTenantId}/startForm`
            } else {
                url = `${this.bpmnServiceUrl}engine-rest/process-definition/key/${processDefinitionKey}/startForm`
            }

            const response = await axios.get(url)
            if (response.status == 200) {
                return response.data;
            }

        } catch (error) {
            throw new Error(`Error al traer definicion: ${error.message}`);
        }
        return {key: null}
    }

    async processStartProcess(processDefinitionKey: string, processTenantId: string, variables: object) {

        console.log('processStartProcess - variables', variables)

        let url;
        if (processTenantId != undefined) {
            url = `${this.bpmnServiceUrl}engine-rest/process-definition/key/${processDefinitionKey}/tenant-id/${processTenantId}/start`
        } else {
            url = `${this.bpmnServiceUrl}engine-rest/process-definition/key/${processDefinitionKey}/start`
        }

        const data = {
            id: null,
            name: null,
            ...variables,
            withVariablesInReturn: true,
            "businessKey": "myBusinessKey",
            owner: "PruebaOwner"
        }

        console.log('processStartProcess - data', data)
        try {
            const request = await axios.post(url, data)
            return request.data
        } catch (error) {
            console.error("Error start process", error)
        }
        return false
    }

    async setClaimTask(task: Task) {
        try {
            let apiUrl = `${this.bpmnServiceUrl}engine-rest/task/${task.id}/claim`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                }
            };

            const formData = new FormData();
            formData.append('userId', 'memo');

            const request = await axios.post(apiUrl, formData, config);
            return request.data
        } catch (e) {
            console.error(e)
        }
        return {}
    }

    async setClaimTaskComment(task: Task) {
        try {
            let apiUrl = `${this.bpmnServiceUrl}engine-rest/task/${task.id}/comment`;

            const request = await axios.get(apiUrl);
            return request.data
        } catch (e) {
            console.error(e)
        }
        return {}
    }

    async setAddTaskComment(task: Task, message: String) {
        try {
            let apiUrl = `${this.bpmnServiceUrl}engine-rest/task/${task.id}/comment/create`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                }
            };

            const formData = new FormData();
            formData.append('message', message);
            formData.append('processInstanceId', task.processInstanceId);

            const request = await axios.post(apiUrl, formData, config);
            return request.data
        } catch (e) {
            console.error(e)
        }
        return {}
    }

    async getHistoryProcessInstance() {
        const url = `${this.bpmnServiceUrl}engine-rest/history/process-instance`
        try {
            const request = await axios.get(url)
            console.log("getHistoryProcessInstance", request.data)
            return request.data
        } catch (error) {
            console.error("Error start process", error)
        }
        return false
    }
}