const categories = {
  mobile_per_1000: {
    title: 'Mobile Phone Subscribers',
    groupSize: 300
  },
  broadband_per_1000: {
    title: 'Broadband Subscribers',
    groupSize: 50
  }
}

const categoriesList = Object.keys(categories)

const categoriesSelection = categoriesList.map(d => ({
  label: categories[d].title,
  value: d
}))

export { categories, categoriesList, categoriesSelection }
