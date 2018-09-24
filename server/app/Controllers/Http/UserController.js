'use strict'

const Mail = use('Mail');
const User = use('App/Models/User');

class UserController {
    async login({ request, auth }){
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);
        return token; // yes or no
    }

    async register({ request }){
        const { email, password } = request.all();
        await User.create({
            email,
            password, 
            username: email,
        });
        return this.login(...arguments);
    }

    async welcome({ request }){
        const name = "Usuário";
        const { email } = request.only(['email']);
        await Mail.send('emails.welcome', { name: name}, (message) => {
            message.from('Vue-adonis-js <noreply@example.com>')
            message.to(email)
            message.subject('Bem-vindo ao nosso sistema!')
            console.log('enviado')
        })
    }
}

module.exports = UserController
