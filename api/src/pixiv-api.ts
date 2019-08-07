import Axios from "axios"
import querystring from "querystring"

// TODO: make interfaces w/ io-ts

// login response:
/*
{
  response: {
    access_token: '...',
    expires_in: 3600,
    token_type: 'bearer',
    scope: '',
    refresh_token: '...',
    user: {
      profile_image_urls: {
        px_16x16: 'https://i.pximg.net/user-profile/img/(...).png',
        px_50x50: 'https://i.pximg.net/user-profile/img/(...).png',
        px_170x170: 'https://i.pximg.net/user-profile/img/(...).png',
      },
      id: '...', // user ID
      name: '...', // display name
      account: '...', // username
      mail_address: '...',
      is_premium: true,
      x_restrict: 2,
      is_mail_authorized: true
    },
    device_token: '...'
  }
}
*/

const clientId = "MOBrBDS8blbauoSck0ZfDbtuzpyT"
const clientSecret = "lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj"

export class PixivApi {
  async login(username: string, password: string) {
    const requestData = {
      client_id: clientId,
      client_secret: clientSecret,
      get_secure_url: 1,
      grant_type: "password",
      username,
      password,
    }

    const { data } = await Axios({
      url: "https://oauth.secure.pixiv.net/auth/token",
      method: "post",
      data: querystring.stringify(requestData),
    })

    return data
  }
}
