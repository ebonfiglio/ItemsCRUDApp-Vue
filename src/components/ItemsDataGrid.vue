<template>
  <div>
      <v-data-table
    dense
      :headers="headers"
      :items="items"
      item-key="id"
      class="elevation-1 justify-center"
       :loading="isLoading"
    loading-text="Loading... Please wait"
       :search="search"
      :custom-filter="filterText"
    >
      <template v-slot:top>
      <v-toolbar flat>
        <v-text-field
        v-model="search"
          label="Search (case sensitive)"
          class="mx-4"
        ></v-text-field>
       <v-spacer></v-spacer>
      
        <AddItemButton :showDialog="false"/>
      </v-toolbar>

      </template>
      <template v-slot:[`item.cost`]="{ item }">
     
        {{ item.cost | currency }}
    </template>
     <template v-slot:[`item.actions`]="{ item }">
      <EditPencil :item="item"/>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
  </div>
</template>

<script>
import itemService from '../services/ItemService';
import AddItemButton from '@/components/AddItemButton';
import EditPencil from '@/components/EditPencil';
import Bus from "../main"; 
export default {
    name: 'ItemsDataGrid',
    components: {
    AddItemButton, EditPencil
  },
  data () {
    return {
      items: [],
      isLoading: true,
      search: '',
    }
  },
   created () {
   let self = this;
    Bus.$on('refreshItemList', async function () {
      await self.getAll();
    })
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
          { text: 'Price', value: 'cost',},
          { text: 'Actions', value: 'actions', sortable: false },
        ]
      },
    },
  async mounted () {
      this.items = await itemService.getAll().finally(()=>{this.isLoading = false});
  },
  methods:{
    async deleteItem(item){
      var response = await itemService.delete(item.id);
      if(response == 200)
      {
        this.getAll();
        this.refreshMaxPriceList();
      }
    },
    async getAll(){
      this.items = await itemService.getAll().finally(()=>{this.isLoading = false});
    },
    refreshMaxPriceList() {
      Bus.$emit('refreshMaxPriceList');
  },
  filterText (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1
      },
    },
}
</script>