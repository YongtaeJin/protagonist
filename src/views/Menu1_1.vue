<template>
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>SY_TEMP6 Table</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>                
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2 mr-2" @click="fetchData">Search</v-btn>
                <v-dialog v-model="dialog" max-width="500px">                
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.S_SER" label="일련번호"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.VAL1" label="COL 1"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.VAL2" label="COL 2"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.VAL3" label="COL 3"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.VAL4" label="COL 4"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">취소</v-btn>
                        <v-btn color="blue darken-1" text @click="save">저장</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">삭제 합니다....?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">아니오</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">예</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>    
    </v-data-table>
</template>
<script>

import { mapActions } from "vuex";

export default {
    name :"ListTable",
	title : "ListTable Page",    
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
            text: '일련번호',
            align: 'start',
            sortable: false,
            value: 'S_SER',
            },
            { text: 'COL 1', value: 'VAL1' },
            { text: 'COL 2', value: 'VAL2' },
            { text: 'COL 3', value: 'VAL3' },
            { number: 'COL 4', value: 'VAL4' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            S_SER: '',
            VAL1: '',
            VAL2: '',
            VAL3: '',
            VAL4: 0,
        },
        defaultItem: {
            S_SER: '',
            VAL1: '',
            VAL2: '',
            VAL3: '',
            VAL4: 0,
        },
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },

    created () {
        this.initialize()
    },

    mounted() {
        //this.fetchData();
    },

    methods: {        
        ...mapActions(["syTable6Save", "syTable6Updtae"]),
        //...mapActions(["configDuplicate", "configSave"]),

        initialize () {
            this.desserts = []
        },
        async fetchData() {            
            this.desserts= await this.$axios.get("/api/goodman/sytemp6")            
        },
        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            const data = this.$axios.delete(`/api/goodman/${this.editedItem.S_SER}`);
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
                const data = this.syTable6Updtae(this.editedItem);
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                const data =  this.syTable6Save(this.editedItem)
                if (data) {
                    this.desserts.push(this.editedItem)
                }
            }
            this.close()
        },
    },
}
</script>

<style>

</style>