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
import { mapActions, mapState } from 'vuex';
import AddItemButton from '@/components/AddItemButton';
import EditPencil from '@/components/EditPencil';
export default {
    name: 'ItemsDataGrid',
    components: {
    AddItemButton, EditPencil
  },
  data () {
    return {
      isLoading: true,
      search: '',
    }
  },
    mounted () {
      this.getAll();
   },
  computed: {
    ...mapState(['items']),
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
  methods:{
    ...mapActions(['getItemsAction', 'deleteItemAction']),
    async deleteItem(item){
      var response = await this.deleteItemAction(item);
      if(response == 200)
      {
        await this.getAll();
      }
    },
    async getAll(){
      await this.getItemsAction().finally(()=>{this.isLoading = false});
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