import router from '../router';
import HTTP from '../http';

export default {
    namespaced: true,
    state: {
        registerEmail: null,
        registerPassword: null,
        registerError: null,
        loginEmail: null,
        loginPassword: null,
        loginError: null,
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
                return HTTP().post('/auth/sendEmail',{
                    email: state.registerEmail,
                }).then(() => {
                    router.push('/');
                }).catch(() =>{
                    commit('setRegisterError', 'Erro ao enviar o email!');
                });
            }).catch(() =>{
                commit('setRegisterError', 'Informação inválida! Por favor, digite novamente.');
            });
        },
        login({ commit, state }){
            commit('setLoginError',null);
            return HTTP().post('/auth/login',{
                email: state.loginEmail,
                password: state.loginPassword,
            }).then(({ data }) => {
                commit('setToken',data.token);
                router.push('/');
            }).catch(() =>{
                commit('setLoginError', 'Email ou senha incorretos!');
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
        },
        setLoginError(state, error){
            state.loginError = error;
        },
        setLoginEmail(state, email){
            state.loginEmail =  email;
        },
        setLoginPassword(state, password){
            state.loginPassword = password;
        },
    },
};