

import bpmapi from "./bpmapi";
import { useAuthStore  } from '@/stores/authStore';

async function getTasks(username ? : string , candidateGroups ? : [string]) {

  const store = useAuthStore();
  const tenantid = store.user.tenantid
  console.log('grups')
  console.log(candidateGroups)
  try {
      if(username){
      const urlAssigned = `task?assignee=${username}&tenantIdIn=${tenantid}` 
      const urlCamdidateUser = `task?includeAssignedTasks=true&withCandidateUsers=true&candidateUser=${username}&tenantIdIn=${tenantid}`
      const requestAssigned = await bpmapi.get(`${urlAssigned}`)
      const requestCandidate = await bpmapi.get(`${urlCamdidateUser}`)
      
      const withoutDuplicates = [...requestAssigned.data , ...requestCandidate.data ].filter(
        (item,index,self) => index === self.findIndex((t) => t.id === item.id)
      )
      return withoutDuplicates
      }
      if(candidateGroups){
        const urlCandidateGroups = `task?includeAssignedTasks=true&candidateGroups=${candidateGroups.join(',')}&tenantIdIn=${tenantid}` 
        const requestCandidateGroups = await bpmapi.get(`${urlCandidateGroups}`)
        return requestCandidateGroups.data
      }
  } catch (e) {
      console.error(e)
  }
  return {}
}

async function claimTask(task  , username : string ) {

    try {
        const clamTaskUrl = `task/${task.id}/claim`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            }
        };

        const formData = new FormData();
        formData.append('userId', username);
        const request = await bpmapi.post(clamTaskUrl, formData, config);
        return request.data
    } catch (e) {
        console.error(e)
    }
    return {}
}


async function  getDeployedTask(id: string){
    try {
        let MyTask = `task/${id}/deployed-form`
        const request = await bpmapi.get(`${MyTask}`)

        return request.data
    } catch (e) {
        console.error(e)
    }
    return {}
}
async function  getTaskFormVariable(id: string){
    try {
        let MyTask = `task/${id}/form-variables`
        const request = await bpmapi.get(`${MyTask}`)

        return transformApiResponse(request.data)
    } catch (e) {
        console.error(e)
    }
    return {}
}

async function completeTask(id:string,variables : any ){
    try {
        let MyTask = `task/${id}/complete`
        const request = await bpmapi.post(`${MyTask}`,transformPayload(variables))

        return request.data
    } catch (e) {
        console.error(e)
    }
    return {}
}
async function  getTask(taskId :string){
    try {
      let MyTask = `task/${taskId}`
      const request = await bpmapi.get(`${MyTask}`)

      return request.data
    } catch (e) {
        console.error(e)
    }
    return {}
}

function transformPayload(payload: Record<string, any>): Record<string, any> {
    const transformedVariables: Record<string, any> = {};
  
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        transformedVariables[key] = { value: payload[key] };
      }
    }
  
    return {
      variables: transformedVariables,
      withVariablesInReturn: true,
    };
  }

  function transformApiResponse(apiResponse: Record<string, any>): Record<string, any> {
    const transformedData: Record<string, any> = {};
  
    for (const key in apiResponse) {
      if (apiResponse.hasOwnProperty(key)) {
        transformedData[key] = apiResponse[key].value;
      }
    }
  
    return transformedData;
  }

export{
    getDeployedTask,
    getTaskFormVariable,
    completeTask,
    getTasks,
    getTask,
    claimTask,
    transformPayload,
    transformApiResponse
}