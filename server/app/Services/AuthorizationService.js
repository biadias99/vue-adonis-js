const InvalidAccessException = use('App/Exceptions/InvalidAccessException');
const ResourceNotExistException = use('App/Exceptions/ResourceNotExistException');

class AuthorizationService{
    verifyPermission(resource, user){
        if(!resource){
            throw new ResourceNotExistException();
        }

        if(resource.user_id !== user.id){
            console.log('Invalid access')
            throw new InvalidAccessException();
        } // um usuário não pode excluir o que o outro usuário adicionou

    }
}

module.exports = new AuthorizationService();