<template>
<div>

  <v-card>
     <v-alert type="error" :value="showAlert">
      Error saving Item.
    </v-alert>
        <v-card-title class="headline grey lighten-2">
          {{type}} Item
        </v-card-title>

        <v-card-text>
          <v-container>
              <v-text-field
            v-model="itemName"
            required
            label="Item Name"
            :rules="[rules.required]"
            @keyup="checkRules"
          ></v-text-field>
          <v-text-field
            v-model="cost"
            type="number"
            min="0"
            required
            label="Price"
            :rules="[rules.required]"
            @keyup="checkRules"
            >
            </v-text-field>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="closeDialog"
          >
            Cancel
          </v-btn>
            <v-btn
            color="success"
            text
            @click="saveItem"
            :disabled="disabled"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </div>
</template>

<script>
import itemService from '../services/ItemService';
import Bus from "../main"; 
export default {
     name: 'ItemForm',
     props: {
      item: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      type: "New",
      disabled: true,
      itemName: this.item.itemName,
      cost: this.item.cost,
      id: this.item.id,
      showAlert: false,
      rules: {
          required: value => !!value || 'Required.',
      }
    }
  },

  methods: {
     setTitle(){
      if(this.id > 0) this.type = "Update"
    },
    closeDialog() {
      this.$emit('close', false);
    },
    checkRules(){
      this.showAlert = false;
      this.disabled = (this.cost == "" || this.itemName == "");
    },
    async saveItem(){
      var item = {
        id: this.id,
        itemName: this.itemName,
        cost: parseInt(this.cost)
      }
      var response = null;
      if(this.id > 0)
      {
        response = await itemService.update(item);
        if(response) this.closeDialog();
        this.showAlert = true;
      }
      else
      {
        response = await itemService.create(item);
        if(response) this.closeDialog();
        this.showAlert = true;
      }
this.refreshMaxPriceList();
this.refreshItemList();
    },
    refreshMaxPriceList() {
      Bus.$emit('refreshMaxPriceList');
  },
  refreshItemList(){
    Bus.$emit('refreshItemList');
  }
  },
  mounted(){
   this.setTitle();
   this.checkRules();
  },
}
</script>
