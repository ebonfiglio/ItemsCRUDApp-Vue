<template>
  
    <v-container fluid>
       <v-container>
         <v-row >
       <v-col
        cols="12"
        md="2"
      >
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
      <MaxPriceItemName/>
      </v-col>
         <v-col
        cols="12"
        md="4"
      >
      <MaxPriceListByItemName/>
      </v-col>
      
    </v-row>
    <v-row class="mt-2" >
      <v-col
        cols="12"
        md="2"
      >
      </v-col>
       <v-col
        cols="12"
        md="8"
      >
      <ItemsDataGrid
      />
      </v-col>
       <v-col
        cols="12"
        md="2"
      >
      </v-col>
    </v-row>
    
  </v-container>
    </v-container>
</template>

<script>
import ItemsDataGrid from '@/components/ItemsDataGrid';
import MaxPriceItemName from '@/components/MaxPriceItemName';
import MaxPriceListByItemName from '@/components/MaxPriceListByItemName';
export default {
  name: 'Home',

  components: {
    ItemsDataGrid,
    MaxPriceItemName,
    MaxPriceListByItemName
  },

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
