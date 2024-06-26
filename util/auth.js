import axios from "axios"

const API_KEY = "AIzaSyDuikg4h9A1Wkj7kqDBEchpdvNCn07u6os";

export async function authenticate(mode, email, password) {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
        {
            email: email,
            password: password,
            returnSecureToken: true
        });

        return response.data.idToken;
}