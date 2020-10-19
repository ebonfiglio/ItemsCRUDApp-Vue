
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <template v-slot:activator="{ on, attrs }">
         <v-btn
        class="ma-2"
        color="success"
    v-bind="attrs"
        v-on="on"
      >
        Add Item
        <v-icon
          dark
          right
        >
          mdi-plus
        </v-icon>
      </v-btn>
      </template>
<ItemForm
:id="0"
@close="closeDialog"
:item="{}"/>
    </v-dialog>
  </div>
</template>

<script>
import ItemForm from '../components/ItemForm';
export default {
     name: 'AddItemButton',

     components:{
         ItemForm
     },
     data () {
      return {
        dialog: false,
      }
    },
    methods:{
       closeDialog(show) { 
       this.dialog = show;
       }
    },
}
</script>
