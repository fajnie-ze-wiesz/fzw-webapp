export function create({ name = 'test' }) {
  return {
    name,
  };
}

export function getName(user) {
  return user.name;
}

export function setName(user, name) {
  user.name = name;
}

const User = {
  create,
  getName,
  setName,
};

export default User;
