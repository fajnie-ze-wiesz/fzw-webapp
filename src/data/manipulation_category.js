export function create({ name, displayName }) {
  if (!displayName) {
    displayName = name;
  }
  return {
    name,
    displayName,
  };
}

export function fromName(name) {
  return create({ name });
}

export function getName(category) {
  return category.name;
}

export function getDisplayName(category) {
  return category.displayName;
}

export function list() {
  // TODO: move to service
  return [
    create({name: 'clickbait'}),
    create({name: 'fake-news'}),
    create({name: 'image-manipulation'}),
    create({name: 'emotional-language'}),
  ]
}

const ManipulationCategory = {
  create,
  fromName,
  getName,
  getDisplayName,
  list,
};

export default ManipulationCategory;
