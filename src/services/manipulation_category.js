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
    return ManipulationCategory.mapFromList(categories);
  });
}

const ManipulationCategoryService = {
  fetchList,
  fetchMap,
}

export default ManipulationCategoryService;
