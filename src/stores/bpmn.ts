import {defineStore} from 'pinia';
import {BpmnService, TaskComment} from '@/lib/services/bpmnService';
import type {ProcessInstance, Task, GroupsCamunda, UsersCamunda} from '@/lib/services/bpmnService';
import { getTasks , claimTask , getTask } from '@/lib/services/taskService';
import { useAuthStore  } from './authStore';
export const useBpmnStore = defineStore({
    id: 'bpmn',
    state: () => ({
        tasks: [] as Task[],
        taskComment: [] as TaskComment[],
        selectedTask: null as Task | null,
        // 1 MyTask , 2MyGroupTask
        typeOfTask: 1,

        processInstance: [] as ProcessInstance[],
        selectedProcessInstance: null as ProcessInstance | null,
        selectedProcessInstanceTaskData: null as any,

        groupsCamunda: [] as GroupsCamunda[],

        usersCamunda: [] as UsersCamunda[],

    }),
    getters: {},
    actions: {

        async fetchTasks() {
            try {
                const store = useAuthStore();
                if(this.typeOfTask==1){
                    this.tasks = await getTasks(store.user.username)
                 }
                 if(this.typeOfTask==2){
                    console.log('grupos store')
                    console.log(store.user.groups)
                    this.tasks = await getTasks(null,store.user.groups)
                 }
            } catch (error) {
                console.error(error)
            }
        },
        settypeOfTask(i :number){
            this.typeOfTask = i;
            this.selectedTask = null;
        },



        async fetchProcessInstance() {
            try {
                const bpmnService = new BpmnService();
                this.processInstance = await bpmnService.getHistoryProcessInstance()
            } catch (error) {
                console.error(error)
            }
        },
        async selectTask(task: Task) {
            try {
                this.selectedTask = task
            } catch (e) {
                this.selectedTask = null;
                //lanzar error
            }
        },
        async getSelectTask(task: Task){
            try {
                this.selectedTask = await getTask(task.id);
            } catch (e) {
                this.selectedTask = null;
                //lanzar error
            }
            
        },
        async selectProcessInstance(processInstance: ProcessInstance) {
            try {
                const bpmnService = new BpmnService();
                this.selectedProcessInstanceTaskData = await bpmnService.getProcessInstanceTask(processInstance);
                this.selectedProcessInstance = processInstance;
                console.log('bpmn.ts - selectProcessInstance - this.tasks', this.selectedProcessInstanceTaskData)
            } catch (e) {
                this.selectedTask = null;
                //lanzar error
            }
        },
        async claimTask(task: Task) {
            try {
                console.log('bpmn.ts - actions - claimTask', task)
                const store = useAuthStore();
                await claimTask(task,store.user.username)
                await this.getSelectTask(task)
                //this.selectTask(task)
            } catch (e) {
                this.selectedTask = null;
                //lanzar error
            }
        },
        async claimTaskComment(task: Task) {
            try {
                console.log('bpmn.ts - actions - claimTask', task)
                const bpmnService = new BpmnService();
                this.taskComment = await bpmnService.setClaimTaskComment(task);

            } catch (e) {

            }
        },

        async addTaskComment(message: String) {
            try {
                console.log('bpmn.ts - actions - claimTask', this.selectedTask)
                let task = this.selectedTask;
                const bpmnService = new BpmnService();
                if (task) {
                    this.taskComment = await bpmnService.setAddTaskComment(task, message);
                }

            } catch (e) {

            }
        },
    }
});

export const getDetailTask = defineStore({
    id: 'bpmn',
    state: () => ({
        tasks: [] as Task,
    }),
    actions: {
        async fetchTasks() {
            console.log('getDetailTask', 'ejecutando,,,')
            try {
                const bpmnService = new BpmnService();
                this.tasks = await bpmnService.getDetailTask(this.tasks)

                console.log('bpmn.ts - fetchTask - getDetailTask', this.tasks)
            } catch (error) {
                console.error(error)
            }
        }
    }
});

export const getProcessDefinitions = defineStore({
    id: 'bpmnprocess',
    state: () => ({
        tasks: []
    }),
    getters: {},
    actions: {
        async fetchTasks() {
            console.log('getProcessDefinitions', 'ejecutando,,,')
            try {
                const bpmnService = new BpmnService();
                this.tasks = await bpmnService.searchProcessDefinitions(false)
                console.log(this.tasks)
            } catch (error) {
                console.error(error)
            }
        }
    }
});

export const getBpmnXml = defineStore({
    id: 'bpmnxml',
    state: () => ({
        bpmnxml: []
    }),
    getters: {},
    actions: {
        async fetchTasks() {
            console.log('getProcessDefinitions', 'ejecutando,,,')
            try {
                const bpmnService = new BpmnService();
                this.bpmnxml = await bpmnService.searchProcessDefinitions(false);
                console.log(this.bpmnxml)
            } catch (error) {
                console.error(error)
            }
        }
    }
});


export const useNotificationStore = defineStore({
    id: 'notification',
    state: () => ({
        notifications: [] as notificationType[],
    }),
    getters: {
        getNotifications(state) {
            return state.notifications;
        },
    },
    actions: {
        async fetchNotifications() {
            // console.log('getNotifications', 'ejecutando,,,');
            this.notifications = [];
        },
        addNotification(notification: notificationType) {
            this.notifications.push(notification);
        },
    },
});

