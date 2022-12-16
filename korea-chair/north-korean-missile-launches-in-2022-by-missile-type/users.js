const ICONS = []
const CATEGORIES = []
const sortedData = {}
const URL = "https://content-sheets.googleapis.com/v4/spreadsheets/1YZ0D6cqMnk0kDCbtXcq2kp4hgUlGFCeUBnpjhbkgXAQ/values/Sheet1?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS"
let windowWidthSize = 0

async function getData() {
  windowWidthSize = window.innerWidth
  const RESPONSE = await fetch( URL )
  const DATA = await RESPONSE.json()

  if ( DATA ) {
    const columnNames = DATA.values.shift()
    DATA.values.forEach( element  => {
      ICONS.push( {
        date: new Date( element[0] ).toLocaleDateString( "en-US" ),
        category: element[1],
        id: element[2],
        name: element[3],
      } )
      CATEGORIES.push( element[1] )
    } )
    getCategories( CATEGORIES )
    formatCategories( 'category' )
  }

  const wrapper = document.querySelector( ".wrapper" )
  const wrapperMobile = document.querySelector( ".wrapper-mobile" )
  const interactive = document.querySelector( ".interactive" )
  const interactiveMobile = document.querySelector( ".interactive-mobile" )

  function addTippy() {
    if ( windowWidthSize > 499 ) {
        ICONS.forEach( ( icon ) => {
          tippy( "#" + icon.id, {
            // append to an Element
            appendTo: wrapper,
            content: `
              <div class="icon-container">
                  <div class="tip-header">
                    <h3 class="header">${icon.name}</h3>
                  </div>
                  <h3 class="title">Date launched:</h3>
                  <p class="info"> ${icon.date}</p>
                </div>
            `,
            allowHTML: true,
            arrow: true,
            interactive: true,
            placement: "auto",
            followCursor: "initial",
          } )
        } )
      interactiveMobile.classList.add( "hide" )
      interactive.classList.remove( "hide" )
    } else {
      interactiveMobile.classList.remove( "hide" )
      interactive.classList.add( "hide" )
      const dates = []
      for ( let [missileName] of Object.entries( sortedData ) ) {
          const dates = []
          sortedData[missileName].forEach( el => {
            dates.push( el.date )
          } )
          Object.assign( sortedData[missileName], { dates:  [...new Set( dates )]} )
          let datesLaunched = ''
          const datesLength = sortedData[missileName].dates.length
          for ( let index = 0; index < datesLength; index++ ) {
            datesLaunched += sortedData[missileName].dates[index] + '</br>'
          }
          const title = ( datesLength > 1 ) ? 'Dates launched:' : 'Date launched:'

          tippy("#" + missileName, {
            // append to an Element
            appendTo: wrapperMobile,
            content: `
              <div class="icon-container">
                <div class="tip-header">
                  <h3 class="header">${missileName}</h3>
                </div>
                <h3 class="title">${title}</h3>

                <p class="info"> ${datesLaunched}</p>
              </div>
            `,
            allowHTML: true,
            arrow: true,
            interactive: true,
            placement: "auto",
            followCursor: "initial",
          })
        }
    }
  }
  addTippy()
}

function getCategories( categories ) {
  return [...new Set( categories )]
}

function formatCategories( columnName ) {
  const iconsLength =  ICONS.length

  for (var i = 0; i < iconsLength; i++) {
    var object = ICONS[i]

    if ( Object.keys( sortedData ).indexOf( object[columnName] ) === -1 ) {
      sortedData[object[columnName]] = []
    }

    sortedData[object[columnName]].push( object )
  }
  for ( let key in sortedData ) {
    sortedData[key].sort( ( a, b ) => new Date( b.date ) - new Date( a.date ) )
  }
  return sortedData
}

document.addEventListener( "DOMContentLoaded", ( event ) => {
  getData()
})

window.addEventListener( 'resize', function( e ) {
  getData()
}) 
