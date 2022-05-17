<template>
  <v-container fluid>
        <v-toolbar>
            <v-toolbar-title>설정관리</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn>
                <tooltip-btn fab small label="설정추가" @click="addConfig">                
                    <v-icon>mdi-plus</v-icon>
                </tooltip-btn>
            </v-btn>
        </v-toolbar>

        <ez-dialog label="설정 추가" ref="dialog" max-width="500" dark color="primary" persistent>
            <config-form @save="save">                
            </config-form>
        </ez-dialog>

  </v-container>
</template>

<script>
import TooltipBtn from '@/components/etc/TooltipBtn.vue'
import EzDialog from '@/components/etc/EzDialog.vue';
import ConfigForm from './ConfigComponent/ConfigForm.vue';
export default {
  components: { TooltipBtn, EzDialog, ConfigForm },
    name : 'Adminconfig',
    methods : {
        addConfig() {            
            this.$refs.dialog.open();
        },
        async save(form) {
            console.log(form);
			this.$refs.dialog.close();
		},
    }
}
</script>

<style>

</style>