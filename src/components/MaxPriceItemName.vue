<template>
<div>

 <v-card>
     <v-alert type="error" :value="false">
      {{errorMsg}}
    </v-alert>
        <v-card-title class="headline grey lighten-2">
          Find Max Price
        </v-card-title>

        <v-card-text>
          <v-container>
              <v-text-field
            v-model="itemName"
            label="Item Name"
            @keyup="checkRules"
          ></v-text-field>
          </v-container>
          <v-alert
      v-model="validPrice"
      color="green"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-currency-usd"
    >
    Max Price: <strong>{{maxPrice | currency}}</strong>
    </v-alert>
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn
            color="primary"
            depressed
            @click="getMaxPrice"
            :disabled="disabled"
          >
            Get Max Price
          </v-btn>
        </v-card-actions>
      </v-card>
      </div>
</template>

<script>
import itemService from '../services/ItemService';
export default {
 name: 'MaxPriceItemName',
  data () {
      return {
        errorMsg: '',
        itemName: '',
        maxPrice: 0,
        disabled: true,
        validPrice: false
      }
    },
  methods:{
      async getMaxPrice(){
      var response = null;
    response = await itemService.maxPriceByItemName(this.itemName);
    if(response)
    { this.validPrice = true;
    this.maxPrice = response;
    }
    else
    {
        this.validPrice = false;
    }

},
 checkRules(){
      this.showAlert = false;
      this.disabled = this.itemName == "";
    },
  },
   mounted(){
   this.checkRules();
  },

}
</script>