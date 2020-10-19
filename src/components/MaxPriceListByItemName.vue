<template>
<div>

  <v-card>
        <v-card-title class="headline grey lighten-2">
          Max Price by Name
        </v-card-title>

        <v-card-text>
              <v-simple-table dense >
    <template v-slot:default>
      <thead>
        <tr>
             <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Max Price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.id"
        >
        <td>{{ item.id }}</td>
          <td>{{ item.itemName }}</td>
          <td>{{ item.cost }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn
            color="primary"
            depressed
              x-small
            @click="viewAll"
          >
            View All
          </v-btn>
        </v-card-actions>
      </v-card>
      </div>
 
</template>


<script>
import itemService from '../services/ItemService';
import Bus from "../main"; 
export default {
    name: 'MaxPriceListByItemName',
    data () {
    return {
      items: [],
    }
    },
    created () {
   let self = this;
    Bus.$on('refreshMaxPriceList', async function () {
      await self.getAll();
    })
  },
  async mounted () {
      this.items = await itemService.maxPricesOfItems();
      this.items = this.items.sort(function(a, b) { 
    return b.cost - a.cost;
}).slice(0, 3);
  },
  methods:{
      viewAll(){
           this.$router.push({name: 'MaxPriceList'}); 
      },
      async getAll(){
 this.items = await itemService.maxPricesOfItems();
      this.items = this.items.sort(function(a, b) { 
    return b.cost - a.cost;
}).slice(0, 3);
      }
  },
}
</script>
