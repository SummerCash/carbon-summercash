import * as Cookies from 'es-cookie';

export class cookieUtility {
    public static isSignedIn(): boolean {
        const username = Cookies.get("username"); // Load username cookie

        return (username !== undefined && username !== ""); // Return not signed in
    }
}
