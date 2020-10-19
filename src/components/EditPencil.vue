<template>
  <div>
    <v-icon
        small
        class="float-left"
        @click.stop="dialog = true"
      >mdi-pencil</v-icon>
      <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent>
        
        <ItemForm
:item="item"
@close="closeDialog"/>
    </v-dialog>
  </div>
</div>
</template>

<script>
import ItemForm from '../components/ItemForm';
export default {
 name: 'EditPencil',
  components:{
         ItemForm
     },
     props: {
      item: {
      type: Object,
      default: () => {},
    },
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
