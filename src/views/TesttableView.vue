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

export default {    
	name :"TesttableView",
	title : "TestTable Page"	,    
    data () {
      return {
        headers: [
          {
            text: '시간',
            value: 'D_OPENTIME',
          },
          { text: 'ID', value: 'I_SYSTEM' },
          { text: '구분', value: 'I_WINDOW' },
          { text: '생일', value: 'N_WINDOW' },
          { text: '이메일', value: 'I_USERID' },
          { text: '연락처', value: 'N_USERNM' },

        ],
        desserts : [],
      }
    },
     mounted() {
         this.fetchData();
    },
    methods : {
       async fetchData() {                
        
        this.desserts = await this.$axios.post("/api/testtableview");
      //    console.log("호출전");
      //    const data = await this.$axios.post("/api/testtableview");
      //    console.log(data);
      //    console.log("호출후");
      //    this.desserts = data;
       },
     },

}
</script>
