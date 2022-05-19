<template>
  <nav>
      <ul>
        <li><router-link to="/">List Of Tasks </router-link></li>
        <li><router-link to="/tasksdone">Tasks Finished </router-link></li>
        <li><router-link to="/tasksundone">Tasks Unfinished </router-link></li>
      </ul>
  </nav>
</template>

<script>
export default {
    name: "Header_Nav"

}
</script>

<style>
    nav {
        color: #272727;
        width: 500px;
        padding: 15px;
        margin-bottom: 20px;
        
    }

    nav ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        list-style: none;
        padding: 0;
        
    }
    nav ul li a{
        text-decoration: none;
        font-size: 18px;
        color: #272727;
        font-weight: 600;
    }
    nav ul li {
        list-style: none;
        display: inline-block;
        position: relative;
    }
    nav ul li::after {
        content: '';
        height: 4px;
        width: 0;
        background:#272727;
        position: absolute;
        bottom: -10px;
        left: 0;
        transition: 0.4s;
    }
    nav ul li:hover::after {
        width: 100%;
        
    }
    
</style>
