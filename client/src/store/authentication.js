import router from '../router';
import HTTP from '../http';

export default {
    namespaced: true,
    state: {
        registerEmail: null,
        registerPassword: null,
        registerError: null,
        token: null,
    },
    actions: {
        logout({ commit }){
            commit('setToken',null);
            router.push('/login');
        },
        register({ commit, state }){
            commit('setRegisterError',null);
            return HTTP().post('/auth/register',{
                email: state.registerEmail,
                password: state.registerPassword,
            }).then(({ data }) => {
                commit('setToken',data.token);
                router.push('/');
            }).catch(() =>{
                commit('setRegisterError', 'Informação inválida! Por favor, digite novamente.');
            });
        },
    },
    getters:{
        isLoggedIn(state){
            return !!state.token;
        },
    },
    mutations: {
        setRegisterError(state, error){
            state.registerError = error;
        },
        setToken(state, token){
            state.token = token;
        },
        setRegisterEmail(state, email){
            state.registerEmail =  email;
        },
        setRegisterPassword(state, password){
            state.registerPassword = password;
        }
    },
};