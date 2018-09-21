<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs6 offset-xs3>
                <h1>Cadastro</h1>
                <v-text-field 
                label="Email" 
                placeholder="Email"
                :value="registerEmail"
                @input="setRegisterEmail"
                >

                </v-text-field>

                <v-text-field 
                label="Password" 
                placeholder="Password"
                type="password"
                autocomplete="new-password"
                :value="registerPassword"
                @input="setRegisterPassword"
                >

                </v-text-field>
                <v-alert
                    type="error"
                    :value="registerError"
                >
                {{ registerError }}
                </v-alert>
                
                <v-btn @click="register" color="green" dark>
                    <v-icon>
                        account_circle
                    </v-icon>
                    Cadastro
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState('authentication',[
            'registerEmail',
            'registerPassword',
            'registerError',
        ]),
    },
    methods: {
        ...mapMutations('authentication', [
            'setRegisterEmail',
            'setRegisterPassword',
            'setRegisterError',
        ]),
        ...mapActions('authentication',[
            'register',
        ]),
    },
};
</script>

<style>

</style>