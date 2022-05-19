import { createStore } from 'vuex'
import axios from 'axios'
const store = createStore({
    state:{
        editedItem: null,
        tasks:[]
    },
    actions:{
        getTasks(vuexContext){
            axios.get(`https://api-nodejs-todolist.herokuapp.com/task`,
            {
              headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg2ODljMDEyZmY2YjAwMTc3ODE0MjQiLCJpYXQiOjE2NTI5ODQzMjR9.FiGYAOkZX19SwNADIFBYIxMOjHzbNTlICsRCR2VVNLc`,
                'Content-Type' : 'application/json'
            }
            }
            
            )
            .then(response => {
            console.log(response.data['data'])
            // this.tasks = response.data['data']
            vuexContext.commit('get_tasks', response.data['data'])
            
            }
            )
            .catch(e =>{
            console.log(e)
            })
        },

        insertTask(vuexContext, content){
            axios.post(`https://api-nodejs-todolist.herokuapp.com/task`,{ 
              description: content
        
          },
          {
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg2ODljMDEyZmY2YjAwMTc3ODE0MjQiLCJpYXQiOjE2NTI5ODQzMjR9.FiGYAOkZX19SwNADIFBYIxMOjHzbNTlICsRCR2VVNLc`,
              'Content-Type' : 'application/json'
          }
          }
          ).then(response => {
            // console.log(response.data)
            // this.tasks = response.data['data']
            vuexContext.commit('get_tasks', response.data['data'])
          })
        },

        deleteTask(vuexContext, task){
            axios.delete(`https://api-nodejs-todolist.herokuapp.com/task/${task._id}`,
            {
              headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg2ODljMDEyZmY2YjAwMTc3ODE0MjQiLCJpYXQiOjE2NTI5ODQzMjR9.FiGYAOkZX19SwNADIFBYIxMOjHzbNTlICsRCR2VVNLc`,
                'Content-Type' : 'application/json'
            }
            }
            )
        },
       
        editTask(vuexContext,data){
            
             axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${data._id}`,{
           
              description: data.description
          },
          {
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg2ODljMDEyZmY2YjAwMTc3ODE0MjQiLCJpYXQiOjE2NTI5ODQzMjR9.FiGYAOkZX19SwNADIFBYIxMOjHzbNTlICsRCR2VVNLc`,
              'Content-Type' : 'application/json'
          }
          }
          )
          .then(response => {
            vuexContext.commit('get_tasks', response.data['data'])
          })
        },

        completeTask(vuexContext,task){
            axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${task._id}`,{
              
              completed: task.completed
     
          },
          {
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg2ODljMDEyZmY2YjAwMTc3ODE0MjQiLCJpYXQiOjE2NTI5ODQzMjR9.FiGYAOkZX19SwNADIFBYIxMOjHzbNTlICsRCR2VVNLc`,
              'Content-Type' : 'application/json'
          }
          })
          .then(response => {
            vuexContext.commit('get_tasks', response.data['data'])
          })
        }

    },

    mutations: {
        get_tasks(state, tasks) {
            state.tasks = tasks
        },
        
    }
  

})



export default store