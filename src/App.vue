<template>
  <v-app>

  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
     Items CRUD App
  </v-app-bar>

  <v-navigation-drawer  v-model="drawer"
      absolute
      bottom
      temporary>
  </v-navigation-drawer>

  <v-main>
    <v-container fluid>
       <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="2"
      >
      </v-col>
       <v-col
        cols="12"
        md="8"
      >
      <ItemsDataGrid/>
      </v-col>
       <v-col
        cols="12"
        md="2"
      >
      </v-col>
    </v-row>
  </v-container>

      <!-- If using vue-router -->
      <!--<router-view></router-view>-->

    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>
import ItemsDataGrid from '@/components/ItemsDataGrid';
export default {
  name: 'App',

  components: {
    ItemsDataGrid
  },

  data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
};
</script>
