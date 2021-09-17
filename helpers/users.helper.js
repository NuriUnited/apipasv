import supertest from "supertest";


class UsersHelper{
    constructor() {
        this.response = null;
    }

    async create(){
        await supertest(process.env.BASE_URL)
            .post('/users')
            .set({Authorization: `Bearer ${process.env.TOKEN}`})
            .then(res => {
               this.response = res;
            });
    }
    async delete(id){
        await supertest(process.env.BASE_URL)
            .delete('/users')
            .set({Authorization: `Bearer ${process.env.TOKEN}`})
            .send({id: id})
            .then(res => {
                this.response = res;
            });
}

    async getAll() {
    await supertest(process.env.BASE_URL)
        .get('/users')
        .set({ Authorization: `Bearer ${process.env.TOKEN}` })
        .then(res => {
            this.response = res;
        });
    }

    async getSpecific(id) {
        await supertest(process.env.BASE_URL)
            .get(`/users?id=${id}`)
            .set({ Authorization: `Bearer ${process.env.TOKEN}` })
            .then(res => {
                this.response = res;
            });
    }
}

 export default UsersHelper;