<template>
<div>
  <v-container class="mt-3">
      <v-data-table
    dense
      :headers="headers"
      :items="maxPrices"
      item-key="id"
      class="elevation-1 justify-center"
       :loading="isLoading"
    loading-text="Loading... Please wait"
    >
      <template v-slot:[`item.cost`]="{ item }">
     
        {{ item.cost | currency }}
    </template>
    </v-data-table>
  </v-container>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'ItemsDataGrid',
  data () {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapState(['maxPrices']),
      headers () {
        return [
          {
            text: 'ID',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          {
            text: 'Name',
            value: 'itemName',
           
          },
          { text: 'Price', value: 'cost',}
        ]
      },
    },
 async mounted() {
      await this.getAll();
  },
  methods:{
    ...mapActions(['getMaxPricesAction']),
    async getAll(){
      await this.getMaxPricesAction().finally(()=>{this.isLoading = false});
    }
}
}

</script>