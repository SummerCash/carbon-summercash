import * as Cookies from "es-cookie";

export const isSignedIn = (): boolean => {
    const username = Cookies.get("username"); // Load username cookie

    return username !== undefined && username !== ""; // Return not signed in
};
