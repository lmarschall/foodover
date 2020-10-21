<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
  import Dexie from 'dexie'

  export default {
    name: 'app',
    created: function () {
      this.initDatabase();
    },
    methods:
    {
      initDatabase: function()
      {
          console.log("Init Database")
          document.db = new Dexie("foodover_database");
          document.db.version(2).stores({
              ingredients: '++id, name',
              recipes: '++id, recipe',
              intolerances: '++id, intolerance'
              // search: '++id, recipes, ingredients',
              // recipes: '++id, recipe'
          });
      }
    }
  }
</script>

<style>
  body {
    background-color: #EEF8E3;
    margin: 0;
    height: 100%;
    color: #213409;
  }

  span.badge.badge-pill.badge-primary {
    background-color: #7FBD32;
    margin: 0.2rem;
  }

  span.badge.badge-pill.badge-secondary {
    background-color: #213409;
    padding-bottom: 0;
    margin: 0.2rem;
  }

  button.btn.btn-primary {
    background-color: #7FBD32;
    border-color: #7FBD32;
  }

  button.btn.btn-secondary {
    background-color: #213409;
    border-color: #213409;
  }

  button.btn.btn-outline-primary.rounded {
    border-color: #7FBD32;
  }
</style>
