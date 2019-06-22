import * as Cookies from "es-cookie";

/**
 * Sign a user in.
 *
 * @param username The username of the user to sign in.
 * @param address The address of the user to sign in.
 * @param token The token of the user to sign in.
 */
export const setIsSignedIn = (username: string, address: string, token: string) => {
    Cookies.set("username", username); // Set username cookie
    Cookies.set("address", address); // Set address cookie
    Cookies.set("token", token); // Set token cookie
};

/**
 * Check if a user is signed in.
 */
export const isSignedIn = (): boolean => {
    const username = Cookies.get("username"); // Load username cookie

    return username !== undefined && username !== ""; // Return not signed in
};
