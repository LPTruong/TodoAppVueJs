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


      <h3 class="app-header">Danh sách các việc chưa làm</h3>
      <div class="app-input">
          <input type="text" autocomplete="off" placeholder="Add new task" class="task-input" v-model="tasks.description" @keyup.enter="newItem">
          <input type="submit" value = " " class="submit-task" title="Add task" @click="newItem">
      </div>
      <ul class="app-list" >
        <template v-for="task of tasks.slice().reverse()" :key="task">
          <li class="task-list-item" v-if="task.completed == false"> <!-- .slice().reverse()-->
            <input title = "Complete Task" type="checkbox"  @click="complete(task)" >
            <label class="task-list-item-label">
                <span>{{task.description}}</span>
            </label>  
            <span class="edit-btn" title = "Edit Task" @click="editItem(task)"></span>
            <span class="del-btn" title="Delete Task" @click="delItem(task)">{{task.del}}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    description: 'TodoList',
    props: {
      msg: String
    },
    data(){
      return {
        editedItem: null,
   
    }
    },
    computed: {
      tasks(){
        return this.$store.state.tasks
      }
    },

    created() {
      this.$store.dispatch("getTasks")
    },
   

    methods: {
  
      newItem: function() {
        if (!this.tasks.description) {
          return
        }
        else{
          if (this.editedItem === null){
              this.$store.dispatch("insertTask", this.tasks.description)
              
            }
          else {
            this.tasks[this.editedItem].description = this.tasks.description;
            console.log(this.tasks._id);
            this.$store.dispatch("editTask",{_id: this.tasks._id, description: this.tasks.description});
            this.editedItem = null;
          }
          this.tasks.description = ""; 
          } 
        
        

      },

      deleteTask(task) {
        this.$store.dispatch("deleteTask",task),
        this.tasks.splice(this.tasks.indexOf(task),1);
      },
      
      completeTask(task){
        task.completed = true,
        this.$store.dispatch('completeTask', task)

      },
      
      // complete: function(task){
      //   task.complete = 1,
      //   console.log(task.complete),
      //   axios.put(`http://localhost/nana-framework/edit_task`,{
           
      //         id: task.id, 
      //         complete: task.complete
     
      //     })
      // },


      editItem: function(task) {
        this.tasks.description = this.tasks[this.tasks.indexOf(task)].description;
        this.editedItem = this.tasks.indexOf(task);
        this.tasks._id = task._id;
      },

     
    

    }

}
</script>

<style scoped>

</style>
