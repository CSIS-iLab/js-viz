function slugify(string) {
  if (!string) {
    return ''
  }
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

// Taken from: https://stackoverflow.com/a/39466341
const nth = function(n) {
  let ordinal = ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th'
  return n + '<sup>' + ordinal + '</sup>'
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1)
}

function groupBy({ objectArray, key, sortBy }) {
  let result = objectArray.reduce(function(acc, obj) {
    const { id, province, ...partialObj } = obj
    acc[obj[key]] = acc[obj[key]] || { values: [], id, province }

    acc[obj[key]].values.push(partialObj)

    acc[obj[key]].values.sort((a, b) => a[sortBy] - b[sortBy])

    return acc
  }, {})
  return Object.values(result)
}

function roundNumTo(number, roundTo) {
  return Math.round(number / roundTo) * roundTo
}

export { slugify, nth, capitalizeFirstLetter, groupBy, roundNumTo }
