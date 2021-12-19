/* globals google */
// ========================
// Functions
// ========================
/**
 * Fetch Google Maps API (JSONP).
 */
const fetchingGoogleMapsApi = _ => {
  const apiKey = 'AIzaSyD33v-1lKVtuQ5-HaB7YvZrBltoINZKBlo'
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`
  script.addEventListener('error', console.error)

  document.body.appendChild(script)
  document.body.removeChild(script)
}

/**
 * Gets search boxes
 * @returns {Array} - search box elements
 */
const getSearchBoxes = _ => {
  return [...document.querySelectorAll('.search-box')]
}

/**
 * Gets value from the search box's input element.
 * @param {HTMLElement} searchBox - The search box
 */
const getSearchBoxValue = searchBox => {
  return searchBox.querySelector('input').value.trim()
}

/**
 * Get directions from Google Map's Directions service
 * @param {Object} request - Google Directions API request object
 */
const getDirections = request => {
  return new Promise((resolve, reject) => {
    const directionService = new google.maps.DirectionsService()

    directionService.route(request, result => {
      if (result.status === 'OK') return resolve(result)
      return reject(result)
    })
  })
}

/**
 * Initializes Google Map
 * Used in findGoogleMapsApi as a callback
 */
function initGoogleMaps () {
  const mapDiv = document.querySelector('#map')
  const searchPanel = document.querySelector('.search-panel')
  const searchBoxes = getSearchBoxes()
  const errorDiv = searchPanel.querySelector('.search-panel__error')

  // Initializes Google map
  const map = new google.maps.Map(mapDiv, {
    center: { lat: -38.416097, lng: -63.616672 },
    zoom: 13
  })

  /**
   * Initializes Google Autocomplete
   * @param {HTMLElement} searchBox - The search box element
   */
  const initGoogleAutocomplete = searchBox => {
    const input = searchBox.querySelector('input')
    const autocomplete = new google.maps.places.Autocomplete(input)
    autocomplete.bindTo('bounds', map)
  }

  /**
   * Renders directions on the map
   * @param {Object} request - request object for Google Directions Service
   */
  const drawDirections = request => {
    getDirections(request)
      .then(results => {
        directionsRenderer.setDirections(results)
      })
      .catch(results => {
        const errors = {
          INVALID_REQUEST: 'Invalid request',
          MAX_WAYPOINTS_EXCEEDED: 'Maximum of 8 waypoints allowed',
          NOT_FOUND: 'At least one location cannot be geocoded',
          OVER_QUERY_LIMIT:
            'You sent too many requests in a short time. Slow down!',
          UNKNOWN_ERROR:
            'An error happened on the server. Please try again later',
          ZERO_RESULTS: 'Cannot find route between origin and destination'
        }
        const message = errors[results.status]
        errorDiv.textContent = message
      })
  }

  // Initializes the directions renderer
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map,
    panel: document.querySelector('.directions-panel')
  })

  // Initializes Autocompletes
  searchBoxes.forEach(initGoogleAutocomplete)

  // Add new searchboxes
  const addSearchboxButton = searchPanel.querySelector(
    '[data-js="add-searchbox"]'
  )
  addSearchboxButton.addEventListener('click', event => {
    let searchBoxes = getSearchBoxes()
    if (searchBoxes.length >= 10) return

    const lastSearchBox = searchBoxes[searchBoxes.length - 1]
    const clone = lastSearchBox.cloneNode(true)
    const input = clone.querySelector('input')
    input.value = ''

    // Initializes Autocompletes
    initGoogleAutocomplete(clone)

    // Add to DOM
    lastSearchBox.insertAdjacentElement('afterend', clone)
    clone.querySelector('input').focus()

    // Change the text for middle elements
    lastSearchBox.querySelector('input').placeholder = 'Waypoint'

    // Allow users to delete search boxes
    searchBoxes = getSearchBoxes()
    searchBoxes.forEach(searchBox => {
      const deleteButton = searchBox.querySelector('button')
      deleteButton.removeAttribute('hidden')
    })
  })

  // Removes search boxes
  searchPanel.addEventListener('click', event => {
    const deleteButton = event.target.closest('.search-box__delete-icon')
    if (!deleteButton) return

    const searchBox = deleteButton.parentElement
    const searchBoxParent = searchBox.parentElement
    let searchBoxes = getSearchBoxes()
    const index = searchBoxes.findIndex(sb => sb === searchBox)
    const googleAutocomplete = document.querySelectorAll('.pac-container')[
      index
    ]

    searchBoxParent.removeChild(searchBox)
    document.body.removeChild(googleAutocomplete)

    // Change text for first and last search box
    searchBoxes = getSearchBoxes()
    searchBoxes[0].querySelector('input').placeholder = 'Starting point'
    searchBoxes[searchBoxes.length - 1].querySelector('input').placeholder =
      'Ending point'

    // Prevents user from deleting search boxes if there are only two left
    if (searchBoxes.length <= 2) {
      searchBoxes.forEach(searchBox => {
        const deleteButton = searchBox.querySelector('button')
        deleteButton.setAttribute('hidden', true)
      })
    }
  })

  // Draws route between two directions
  searchPanel.addEventListener('submit', event => {
    event.preventDefault()

    // Clear errors
    errorDiv.textContent = ''

    // Constructs request
    const searchBoxes = getSearchBoxes()
    const request = {
      origin: getSearchBoxValue(searchBoxes[0]),
      destination: getSearchBoxValue(searchBoxes[searchBoxes.length - 1]),
      travelMode: 'DRIVING'
    }

    if (searchBoxes.length > 2) {
      const waypoints = searchBoxes
        .slice(1, searchBoxes.length - 1)
        .map(waypoint => {
          return {
            location: getSearchBoxValue(waypoint),
            stopover: true
          }
        })
      request.waypoints = waypoints
    }

    drawDirections(request)
  })
}

// ========================
// Execution
// ========================
fetchingGoogleMapsApi()
