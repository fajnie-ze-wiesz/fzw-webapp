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

const ManipulationCategory = {
  create,
  fromName,
  getName,
  getDisplayName,
};

export default ManipulationCategory;
