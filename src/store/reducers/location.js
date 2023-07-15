import { actionTypes } from "../../utils/constants";
import _ from "lodash";
import { capitalizeFirstForAll } from "../../utils/helpers"
const { states, cities, countries } = actionTypes;

const initialState = {
  cities: {
    cities: [],
    pending: false,
    success: false,
    error: false,
  },
  sellingCities: {
    cities: [],
    pending: false,
    success: false,
    error: false,
  },
  cityLocation: {
    cities: [],
    pending: false,
    success: false,
    error: false,
  },
  states: {
    states: [],
    pending: false,
    success: false,
    error: false,
  },
  sellingStates: {
    states: [],
    pending: false,
    success: false,
    error: false,
  },
  countries: {
    countries: [],
    pending: false,
    success: false,
    error: false,
  },
  selectedCity: ""
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case cities.GET_ALL_CITIES_PENDING: {
      return {
        ...state,
        cities: {
          // cities: [],
          ...state.cities,
          pending: true,
          success: false,
          error: false,
        },
      };
    }

    case cities.GET_ALL_CITIES_SUCCESS: {
      const data = payload.filter((data) => { return  data.state && data.state.length !== 0 })

      const cities = data.length && data.map(city => {
        const _state = city.state
        return {
          alias: city.alias,
          value: `${city._id},${_state && _state._id || ''}`,
          label: `${capitalizeFirstForAll(city.name)},${_state && capitalizeFirstForAll(_state.name) || ''}`,
          type: false,
          state: city.state,
          country: _state && _state.country,
        }
      }) || []


      const cityLocation = payload.length && payload.map(city => {
        const _state = city.state
        return {
          alias: city.alias,
          value: `${city._id}`,
          label: `${capitalizeFirstForAll(city.name)}`,
          type: false,
          country: _state && _state.country,
          state: city.state
        }
      }) || []
      return {
        ...state,
        cities: {
          cities: cities,
          pending: false,
          succuss: true,
          error: false,
        },
        cityLocation: {
          cities: cityLocation,
          pending: false,
          succuss: true,
          error: false,
        },
      }
    }

    case cities.GET_ALL_CITIES_ERROR: {
      return {
        ...state,
        cities: {
          // cities: [],
          ...state.cities,
          pending: false,
          success: false,
          error: true,
        },
      };
    }

    case cities.GET_SELLING_CITIES_PENDING: {
      return {
        ...state,
        sellingCities: {
          cities: [],
          pending: false,
          succuss: true,
          error: false,
        },
      }
    }

    case cities.GET_SELLING_CITIES_SUCCESS: {
      const cityLocation = payload.length && payload.map(city => {
        const _state = city.state
        return {
          alias: city.alias,
          value: `${city._id}`,
          label: `${capitalizeFirstForAll(city.name)}`,
          type: false,
          country: _state && _state.country,
          state: _state && _state._id
        }
      }) || []
      return {
        ...state,
        sellingCities: {
          cities: cityLocation,
          pending: false,
          succuss: true,
          error: false,
        },
      }
    }

    case cities.SELECT_CITY: {
      return {
        ...state,
        selectedCity: payload
      }
    }

    case states.GET_ALL_STATES_PENDING: {
      return {
        ...state,
        states: {
          // states: [],
          ...state.states,
          pending: true,
          success: false,
          error: false,
        },
      };
    }

    case states.GET_ALL_STATES_SUCCESS: {
      const states = payload && payload.length && payload.map(state => ({
        label: capitalizeFirstForAll(state.name),
        value: state._id,
        country: state.country
      })) || []
      return {
        ...state,
        states: {
          states: states,
          pending: false,
          succuss: true,
          error: false,
        },
      };
    }

    case states.GET_ALL_STATES_ERROR: {
      return {
        ...state,
        states: {
          // states: [],
          ...state.states,
          pending: false,
          success: false,
          error: true,
        },
      };
    }

    case states.GET_SELLING_STATES_SUCCESS: {
      const states = payload && payload.length && payload.map(state => ({
        label: capitalizeFirstForAll(state.name),
        value: state._id,
        country: state.country
      })) || []
      return {
        ...state,
        sellingStates: {
          states: states,
          pending: false,
          succuss: true,
          error: false,
        },
      };
    }

    case countries.GET_ALL_COUNTRIES_PENDING: {
      return {
        ...state,
        countries: {
          // countries: [],
          ...state.countries,
          pending: true,
          success: false,
          error: false,
        },
      };
    }

    case countries.GET_ALL_COUNTRIES_SUCCESS: {
      return {
        ...state,
        countries: {
          countries: payload,
          pending: false,
          succuss: true,
          error: false,
        },
      };
    }

    case countries.GET_ALL_COUNTRIES_ERROR: {
      return {
        ...state,
        countries: {
          ...state.countries,
          pending: false,
          success: false,
          error: true,
        },
      };
    }

    default:
      return state;
  }
}
