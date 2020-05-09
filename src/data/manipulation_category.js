import { MANIPULATION_CATEGORY_NAMES } from '../consts';

export function create({ name }) {
  return {
    name,
  };
}

export function fromName(name) {
  return create({ name });
}

export function getName(category) {
  return category.name;
}

export function list() {
  return MANIPULATION_CATEGORY_NAMES.map((name) => create({ name }));
}

const ManipulationCategory = {
  create,
  fromName,
  getName,
  list,
};

export default ManipulationCategory;
