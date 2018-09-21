'use strict'

const User = use('App/Models/User');

class UserController {
    async login({ request, auth }){
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);
        return token; // yes or no
    }

    async register({ request }){
        console.log('cadastro')
        const { email, password } = request.all();
        console.log(email, password)
        await User.create({
            email,
            password, 
            username: email,
        });
        return this.login(...arguments);
    }
}

module.exports = UserController
