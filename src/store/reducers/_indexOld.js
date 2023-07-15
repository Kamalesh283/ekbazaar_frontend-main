import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';

import app from './app'
import sellers from './sellers'
import categories from './categories'
import location from './location'
import buyers from './buyers'
import search from './search'
import common from './common'

export default (history) => combineReducers({
    router: connectRouter(history),
    app,
    categories,
    location,
    sellers,
    buyers,
    search,
    common
});