import { v4 as uuidv4 } from 'uuid';
export const getuuid = () => {
    let uuid_token = localStorage.getItem("UUID")
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem("UUID", uuid_token)
    }
    return uuid_token
}


