
export function ping() {
  return fetch(`https://fzw-backend.herokuapp.com/api/v1/ping/`).then(response => {
    return response.json();
  });
}
