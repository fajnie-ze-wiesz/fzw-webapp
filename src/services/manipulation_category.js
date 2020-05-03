import ManipulationCategory from '../data/manipulation_category';

function fetchList() {
  // TODO: move to external REST API
  return new Promise((resolve) => {
    resolve([
      ManipulationCategory.create({
        name: 'clickbait',
      }),
      ManipulationCategory.create({
        name: 'fake-news',
      }),
      ManipulationCategory.create({
        name: 'image-manipulation',
      }),
      ManipulationCategory.create({
        name: 'emotional-language',
      }),
    ]);
  });
}

function fetchMap() {
  return fetchList().then((categories) => {
    const categoriesMap = {}
    categories.forEach((c) => {
      categoriesMap[c.name] = c;
    });
    return categoriesMap;
  });
}

const ManipulationCategoryService = {
  fetchList,
  fetchMap,
}

export default ManipulationCategoryService;
