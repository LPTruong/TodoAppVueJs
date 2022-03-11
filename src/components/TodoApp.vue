<template>
  <div class="f35-1">
    <img src="../assets/kisspng-aircraft-general-dynamics-f-16-fighting-falcon-air-5adadda2adc302.6025893615242930267117.png"/>
  </div>
  <div class = "width-500" id="tasklist">
    <div class ="formTodo">
      <h3 class="app-header">Danh sách các việc cần làm</h3>
      <div class="app-input">
          <input type="text" autocomplete="off" placeholder="Add new task" class="task-input" v-model="tasks.name" @keyup.enter="newItem">
          <input type="submit" value = " " class="submit-task" title="Add task" @click="newItem">
      </div>
      <ul class="app-list" >
        <li class="task-list-item" v-for="task in tasks.slice().reverse()" :key="task">
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
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },

    data() {
      return {
        editedItem: null,
        
        title: 'to do list',
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
        }
        else {
          this.tasks[this.editedItem].name = this.tasks.name;
          this.editedItem = null;

        }
        
        this.tasks.name = "";

      },

      
      delItem: function(task) {
        this.tasks.splice(this.tasks.indexOf(task),1)
      },
      editItem: function(task) {
        this.tasks.name = this.tasks[this.tasks.indexOf(task)].name;
        this.editedItem = this.tasks.indexOf(task)
      }

    }

}
</script>

<style scoped>

</style>
