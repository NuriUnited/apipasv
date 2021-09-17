import { config } from 'dotenv';
import AuthHelper from '../helpers/auth.helpers';

config();
before(async function() {
    const authHelper = new AuthHelper();
    await authHelper.get(process.env.LOGIN, process.env.PASSWORD);
    process.env.TOKEN = authHelper.response.body.token;
});
