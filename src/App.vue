<template>
  <v-app>

  <v-app-bar app color="indigo darken-3">
    <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer">
   
      </v-app-bar-nav-icon>
     <div style="color: white">Items CRUD App</div>
  </v-app-bar>

  <v-navigation-drawer  v-model="drawer"
      absolute
      
      temporary>
          <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title><router-link to="/fullmaxpricelist">Max Price List</router-link></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
       </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view/>
</v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    }
};
</script>
