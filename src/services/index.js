import vAxios from '../axios';

const { BACKEND_HTTP_SCHEME, BACKEND_HOST } = process.env
const API_BASE_URL = `${BACKEND_HTTP_SCHEME}://${BACKEND_HOST}/api/v1/`

export default vAxios.create({
  baseURL: API_BASE_URL,
})
