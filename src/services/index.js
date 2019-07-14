const { BACKEND_HTTP_SCHEME, BACKEND_HOST } = process.env
process.env.API_BASE_URL = `${BACKEND_HTTP_SCHEME}://${BACKEND_HOST}/api/v1/`