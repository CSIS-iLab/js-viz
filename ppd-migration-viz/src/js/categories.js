const categories = {
  idp_total: {
    title: 'Total IDPs per Governate',
    groupSize: 150000
  }
}

const categoriesList = Object.keys(categories)

const categoriesSelection = categoriesList.map(d => ({
  label: categories[d].title,
  value: d
}))

export { categories, categoriesList, categoriesSelection }
