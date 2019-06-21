import { Accounts } from "@summercash/summercash-wallet.ts/src/accounts";

/**
    Authenticate a user.
 */
export const authUser = (e) async => {
    e.preventDefault(); // Prevent default

    const accounts = new Accounts('https://summer.cash:2053/api'); // Init accounts API


};