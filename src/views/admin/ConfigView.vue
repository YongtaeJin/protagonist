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
            <config-form @save="save" :keyCheck="keyCheck">                
            </config-form>
        </ez-dialog>

  </v-container>
</template>

<script>
import TooltipBtn from '@/components/etc/TooltipBtn.vue'
import EzDialog from '@/components/etc/EzDialog.vue';
import ConfigForm from './ConfigComponent/ConfigForm.vue';
import { mapActions } from 'vuex';

export default {
  components: { TooltipBtn, EzDialog, ConfigForm },
    name : 'Adminconfig',
    methods : {  
        ...mapActions(['configDuplicate', 'configSave']),
        addConfig() {            
            this.$refs.dialog.open();
        },
        async save(form) {
            const data = this.configSave(form);
			this.$refs.dialog.close();
		},
        async keyCheck(value) {
            const payload = {
                field : 'cf_key',
                value,
            }
            return await this.configDuplicate(payload);
        },
    },
}
</script>

<style>

</style>