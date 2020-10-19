<template>
<div>
  <v-container class="mt-3">
      <v-data-table
    dense
      :headers="headers"
      :items="items"
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
import itemService from '../services/ItemService';
export default {
    name: 'ItemsDataGrid',
  data () {
    return {
      items: [],
      isLoading: true
    }
  },
  computed: {
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
  async mounted () {
      this.getAll();
  },
  methods:{
    async getAll(){
      this.items = await itemService.maxPricesOfItems().finally(()=>{this.isLoading = false});
    }
}
}

</script>