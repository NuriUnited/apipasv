import { expect } from 'chai';
import TransactionsHelper from '../helpers/transactions.helper';
import UsersHelper from "../helpers/users.helper";
import ConfigHelper from '../helpers/config.helper';
import {getRandomItem} from "../helpers/common.helper";

describe.only('transactions',  function() {
    let transactionsHelper = new TransactionsHelper();
    let usersHelper = new UsersHelper();
    let config = new ConfigHelper();
    let userId1;
    let userId2;
    let amount = 1;
    let transactionId;

    describe('transaction creation',  function () {
        before(async function () {
            await usersHelper.create();
            userId1 = usersHelper.response.body.id;
            await usersHelper.create();
            userId2 = usersHelper.response.body.id;
            await transactionsHelper.transactionCreation(userId1, userId2, amount);

        });

        it('response body contains transaction id', async function () {
            expect(transactionsHelper.response.body.id).to.exist;
        });

        it('response status code is 200', async function () {
            expect(transactionsHelper.response.statusCode).to.eq(200);
        });

        it('response body contains correct sender user id', async function () {
            expect(transactionsHelper.response.body.from).to.eq(userId1);
        });

        it('response body contains correct receiver user id', async function () {
            expect(transactionsHelper.response.body.to).to.eq(userId2);
        });

        it('response body contains correct amount', async function () {
            expect(transactionsHelper.response.body.amount).to.eq(amount);
        });
    });

    describe('get transaction by id',  function () {
        before(async function () {
            await usersHelper.create();
            userId1 = usersHelper.response.body.id;
            await usersHelper.create();
            userId2 = usersHelper.response.body.id;
            await transactionsHelper.transactionCreation(userId1, userId2, amount);
            transactionId = transactionsHelper.response.body.id;
            await transactionsHelper.getTransactionById(transactionId);

        });

        it('response body contains correct transaction id',  async function () {
            expect(transactionsHelper.response.body.id).to.eq(transactionId);
        });

        it('response status code is 200',  async function () {
            expect(transactionsHelper.response.statusCode).to.eq(200);
        });

        it('response body contains correct sender user id', async function () {
            expect(transactionsHelper.response.body.from).to.eq(userId1);
        });

        it('response body contains correct receiver user id', async function () {
            expect(transactionsHelper.response.body.to).to.eq(userId2);
        });

        it('response body contains correct amount', async function () {
            expect(transactionsHelper.response.body.amount).to.eq(amount);
        });

    });

    describe('get all', function () {
        before(async function () {
            for await(const transaction of Array(2)) {
                await transactionsHelper.transactionCreation();
            }
            await transactionsHelper.getAllTransactions();

        });

        it('response status code is 200', function () {
            expect(transactionsHelper.response.statusCode).to.eq(200);
        });

        it('response body contains list of 2 or more items ', function () {
            expect(transactionsHelper.response.body.length).to.be.at.least(2);
        });

        it('response body list item contains user id ', function () {
            expect(getRandomItem(transactionsHelper.response.body)).not.to.be.undefined;
        });

        it('response body list item contains amount ', function () {
            expect(getRandomItem(transactionsHelper.response.body).amount).not.to.be.undefined;
        });
    });

    after(async function () {
        await config.wipeData();
    })

});




