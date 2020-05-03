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

export function mapFromList(categories) {
  const categoriesMap = {}
  categories.forEach((c) => {
    categoriesMap[c.name] = c;
  });
  return categoriesMap;
}

const ManipulationCategory = {
  mapFromList,
  create,
  fromName,
  getName,
  getDisplayName,
};

export default ManipulationCategory;
