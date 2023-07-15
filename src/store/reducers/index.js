import { combineReducers } from 'redux'
import app from './app'
import sellers from './sellers'
import categories from './categories'
import location from './location'
import buyers from './buyers'
import search from './search'
import common from './common'
import contactus from './contactus'
import removeListing from './removeListing'
import plans from './plans'
import chat from './chat'
import offers from './offers'
import commodities from './commodities'

const rootReducer = combineReducers({
    app,
    categories,
    location,
    sellers,
    buyers,
    search,
    common,
    contactus,
    removeListing,
    plans,
    chat,
    offers,
    commodities
})

export default rootReducer;
