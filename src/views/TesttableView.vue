<template>
  <div>
    <h1>TestTable Page</h1>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="15"
        :sort-by="['mb_name']"
        :sort-desc="[false, true]"
        multi-sort
        class="elevation-2"
    ></v-data-table>
  </div>
</template>

<script>
import de from 'vuetify/es5/locale/de';

export default {    
	name :"TesttableView",
	title : "TestTable Page"	,    
    data () {
      return {
        headers: [
          {
            text: '성명',
            value: 'mb_name',
          },
          { text: 'ID', value: 'mb_id' },
          { text: '구분', value: 'mb_provider' },
          { text: '생일', value: 'mb_birth' },
          { text: '이메일', value: 'mb_email' },
          { text: '연락처', value: 'mb_phone' },
        ],
        desserts : [],
      }
    },
     mounted() {
         this.fetchData();
     },
     methods : {
         async fetchData() {
             this.desserts = await this.$axios.get('/api/testtableview');             
         },
     },

}
</script>
