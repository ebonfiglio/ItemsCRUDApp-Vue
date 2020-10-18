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
    >
      <template v-slot:top>
        <v-text-field
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.cost`]="{ item }">
     
        {{ item.cost | currency }}
    </template>
     <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
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
import * as axios from 'axios';

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
          { text: 'Price', value: 'cost',},
          { text: 'Actions', value: 'actions', sortable: false },
        ]
      },
    },
  mounted () {
    axios
      .get('https://itemscrudappapi20201017151829.azurewebsites.net/api/item')
      .then(response => (this.items = response.data))
      .finally(this.isLoading = false)
  }
}

</script>