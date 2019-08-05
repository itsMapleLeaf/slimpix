import Axios from "axios"
import querystring from "querystring"

const clientId = "MOBrBDS8blbauoSck0ZfDbtuzpyT"
const clientSecret = "lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj"

export default class PixivApi {
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
