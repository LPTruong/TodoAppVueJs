<template>
  <div class="f35-1">
    <img src="../assets/kisspng-aircraft-general-dynamics-f-16-fighting-falcon-air-5adadda2adc302.6025893615242930267117.png"/>
  </div>
  <div class = "width-500" id="tasklist">
    <div class ="formTodo">
      <div class="square" style="--i:0;"> </div>
      <div class="square" style="--i:1;"> </div>
      <div class="square" style="--i:2;"> </div>
      <div class="square" style="--i:3;"> </div>
      <div class="square" style="--i:4;"> </div>
      <div class="square" style="--i:5;"> </div>
      <div class="square" style="--i:6;"> </div>


      <h3 class="app-header">Danh sách các việc cần làm</h3>
      <div class="app-input">
          <input type="text" autocomplete="off" placeholder="Add new task" class="task-input" v-model="tasks.name" @keyup.enter="newItem">
          <input type="submit" value = " " class="submit-task" title="Add task" @click="newItem">
      </div>
      <ul class="app-list" >
        <li class="task-list-item" v-for="task of tasks.slice().reverse()" :key="task"> <!-- .slice().reverse()-->
          <input title = "Complete Task" type="checkbox">
          <label class="task-list-item-label">
              <span>{{task.name}}</span>
          </label>  
          <span class="edit-btn" title = "Edit Task" @click="editItem(task)"></span>
          <span class="del-btn" title="Delete Task" @click="delItem(task)">{{task.del}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'TodoList',
    props: {
      msg: String
    },

    data() {
      return {
        editedItem: null,
        title: 'To Do List',
        tasks: [],
        
    
      }
    },
    watch: {
      tasks: {
        handler() {
          localStorage.setItem('tasks',JSON.stringify(this.tasks))
        },
        deep: true
      }
    },
    mounted() {
      if (localStorage.getItem("tasks")){
        this.tasks = JSON.parse(localStorage.getItem("tasks"))
      }
    },
   
    created(){
        axios.get(`http://localhost/nana-framework/list_task`)
        .then(response => {
          console.log(response.data)
          this.tasks = response.data['data']
         
        })
        .catch(e =>{
          console.log(e)
        })
      },

    methods: {
      newItem: function() {
        if (!this.tasks.name) {
          return
        }
        if (this.editedItem === null){
          this.tasks.push ({
            del: '',
            name: this.tasks.name,
            complete: false
          });
          axios.post(`http://localhost/nana-framework/insert_task`, { 
              name: this.tasks.name
          }).then(response => {
            console.log(response.data)
            this.tasks = response.data['data']
          })


        }
        else {
          this.tasks[this.editedItem].name = this.tasks.name;
          axios.put(`http://localhost/nana-framework/edit_task`,{
           
              id: this.tasks.id, 
              name: this.tasks.name
     
          })
          console.log(this.tasks.id)
          console.log(this.tasks.name)
          this.editedItem = null;      
        }
        
        this.tasks.name = "";

      },

      
      delItem: function(task) {
        axios.delete(`http://localhost/nana-framework/delete_task`,{
            data: {
              id: task.id
            }
          }),

        console.log(task.id)
        this.tasks.splice(this.tasks.indexOf(task),1);
        

      },

      editItem: function(task) {
        this.tasks.name = this.tasks[this.tasks.indexOf(task)].name;
        this.editedItem = this.tasks.indexOf(task);
        this.tasks.id = task.id;
        console.log(this.tasks.id)
      
      },
    

    }

}
</script>

<style scoped>

</style>
