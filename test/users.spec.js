import { expect } from 'chai';
import UsersHelper from '../helpers/users.helper';
import ConfigHelper from '../helpers/config.helper';
import {getRandomItem} from '../helpers/common.helper';

describe.only('users',function() {
    let usersHelper = new UsersHelper();
    let config = new ConfigHelper();

    describe('user creation', function () {
        before(async function () {
            await usersHelper.create();
        });

        it('response status code is 200', function () {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('response body contains user id', function () {
            expect(usersHelper.response.body.id).not.to.be.undefined;
        });

        it('response body contains amount', function () {
            expect(usersHelper.response.body.amount).not.to.be.undefined;
        });

    });

    describe('user deletion', function () {
        before(async function () {
            await usersHelper.create();
            await usersHelper.delete(usersHelper.response.body.id);
        });

        it('response status code is 200', function () {
            expect(usersHelper.response.statusCode).to.eq(200);
        });
        it('response body contains success message ', function () {
            expect(usersHelper.response.body.message).to.eq('User deleted.');
        });
    });

    describe('get all', function () {
        before(async function () {
            for await(const user of Array(3)) {
                await usersHelper.create();
            }
            await usersHelper.getAll();

        });

        it('response status code is 200', function () {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('response body contains list of 3 or more items ', function () {
            expect(usersHelper.response.body.length).to.be.at.least(3);
        });

        it('response body list item contains user id ', function () {
            expect(getRandomItem(usersHelper.response.body)).not.to.be.undefined;
        });

        it('response body list item contains amount ', function () {
            expect(getRandomItem(usersHelper.response.body).amount).not.to.be.undefined;
        });
    });

    describe('get specific user', function () {
        before(async function () {
            await usersHelper.create();
            await usersHelper.getSpecific(usersHelper.response.body.id);
        });

        it('response status code is 200', function () {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('response body contains user id', function () {
            expect(usersHelper.response.body.id).not.to.be.undefined;
        });

        it('response body contains amount', function () {
            expect(usersHelper.response.body.amount).not.to.be.undefined;
        });
    });

    after(async function() {
        await config.wipeData();
    })
});




