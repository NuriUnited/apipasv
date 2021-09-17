import supertest from 'supertest';

class AuthHelper {
    constructor() {
        this.response = null;
    }

   async get(login, password) {
       await supertest(process.env.BASE_URL)
           .post('/auth')
           .send({login: login, password: password})
           .then(res =>  {
               this.response = res;
           });
   }
}

export default AuthHelper;