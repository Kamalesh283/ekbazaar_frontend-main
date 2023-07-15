import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Search.scss'
import { getAllProducts, setSearchKeyword } from '../../store/actions/categories'
import { searchQuery } from "../../store/actions/search"
import { getSellingCitiesApi } from "../../utils/api/location"
import { getSellingCities } from "../../store/actions/location"
import { listing } from '../../Routes/path'
import { getSeachQueryStructure, convertObjToQSobj, stringyfyQS, convertQSobjToObj, parseQS } from '../../utils/helpers'
import Loading from '../Loading/Loading'
import Select from 'react-select'
// import history from '../../Routes/history'
import { translate, localize } from 'react-i18nify';
import { bannerLang } from '../../utils/languages/home'
import { setTranslationsGetter } from 'react-i18nify';
import classNames from "classnames";
import { setSearchCountry } from '../../store/actions/app'
import { setCountryLocal } from '../../utils/utils'

setTranslationsGetter(bannerLang);
const options = [
  { value: 'All India', label: 'All India' },
  { value: 'Canada', label: 'Canada' },
  { value: 'America', label: 'America' }
]
const customStyles = {
  menuList: base => ({
    ...base,
    maxHeight: "200px" // your desired height
  }),
  option: () => ({
    fontFamily: 'OpenSans-Regular',
    fontSize: '13px',
    lineHeight: '23px',
    color: '#2B2C33',
    padding: ' 8px',
    cursor: 'pointer',
    marginLeft: '12px',
    textTransform: "capitalize",
    textAlign: "left",
  }),
  control: () => ({
    fontFamily: 'OpenSans-Regular',
    fontSize: '14px',
    borderBottom: '1px solid #dadedfc2',
    background: '#fff',
    height: '45px',

  }),
  valueContainer: (base) => ({
    ...base,
    height: '45px',
  }),

}

class Search extends Component {

  constructor(props) {

    super(props)
    this.state = {
      search: props.searchKeyword || "",
      countries: [],
      defaultKey: 'keyword',
      options: props.countries && props.countries.length && props.countries/* .slice(0, 20) */ || [],
      selected: null
    }
  }

  blur = () => {

    setTimeout(() => {

      this.setState({
        show: false
      })

    }, 280)

  }
  get = (value) => {

    const query = {
      skip: 0,
      limit: 5,
      search: value && value.toLowerCase() || "undefined"
    }
    // this.props.actions.getAllProducts(query)
    this.props.actions.searchQuery(query)

  }

  myChangeHandler = (value) => {
    this.setState(
      {
        search: value
      }, () => {
        this.get(value)
      }
    )
    // this.languageTranslator(value);
    this.props.actions.setSearchKeyword(value)

  }

  // languageTranslator = async (value) => {
  //  let lang = 'hi';
  //   const translation = await axios.post(
  //     "https://translation.googleapis.com/language/translate/v2",
  //     {},
  //     {
  //       params: {
  //         q: value,
  //         target: lang,
  //         key: "YOUR_API_KEY",
  //       },
  //     }
  //   )
  //   console.log(translation.data.data.translations[0].translatedText,"===========okkkkkkkkkkkkkkkk")
  // }

  suggestion = () => {
    const { products } = this.props

    const { search } = this.state
    if (products && products.length) {
      const data = products.map(pr => ({
        ...pr._source,
        _id: pr._id
      }))
      return data
    } else if (search) {
      return [{ name: search }]
    } else {
      return []
    }
  }

  search = async (value, key, select) => {
    value.name = value.name.replace(/\s{2,}/g, ' ').trim()

    if (value.name === "") {
      this.setState({
        search: value.name.trim()
      })
      alert("Please Enter Valid Input")
      return false
    } else {

      this.props.actions.setSearchKeyword(value.name)
      // const allCountries = countries.all
      // let keyWordArray = value.name.split(" ")
      // let country = allCountries.find(cntry => keyWordArray.find(word => word.toLowerCase() !== "in" && word.toLowerCase() === cntry.name.toLowerCase()))
      // country = country ? country : keyWordArray.find(word => word.toLowerCase() !== "in" && countries[word.toUpperCase()])
      // country = country && country.length ? countries[country.toUpperCase()] : country

      // let _index = keyWordArray.findIndex(word => word.toLowerCase() !== "in" && country && country.name && word.toLowerCase() === country.name.toLowerCase())
      // _index = _index !== -1 ? _index : keyWordArray.findIndex(word => word.toLowerCase() !== "in" && country && country.alpha2 && country.alpha2.toLowerCase() === word.toLowerCase())
      // _index !== -1 ? keyWordArray.splice(keyWordArray.findIndex(word => (word.toLowerCase() !== "in" && country && country.name && word.toLowerCase() === country.name.toLowerCase())), 1) : ""
      // value.name = keyWordArray.join(" ")
      const objKey = key;
      let obj = {}

      let { serviceTypes, cities, states } = this.props
      serviceTypes = [
        ...serviceTypes,
        { label: "farmers", value: "5feb32b92bc90025b7807d78", type: true },
        { label: "wholesalers", value: "5fa4fac96eb907267c7d15ce", type: true },
        { label: "retailers", value: "5fe226ddcc99a97286d53e35", type: true },
        { label: "importers / exporters", value: "5fb5f268805ec7db145b4e58|5fa61d53520fd81fba4a1d6d", type: true },
        { label: "manufacturers", value: "5fb397c072e59028f0d17e32", type: true },
        { label: "dealers / distributors", value: "5fb46f021135863cd3c66664|5fa5506e0524f35f355955f2", type: true },
        { label: "traders", value: "5f97ace6b9a4b5524568716b", type: true },
        { label: "services", value: "5f97acf2b9a4b5524568716c", type: true }]
      const splitString = value.name.split(" ")
      let matchString = "xyz", index = -1, str = "", cityIndex = -1, matchCity = {}, cit = ""

      for (let i = 0; i < splitString.length; i++) {
        const key = splitString[i]
        if (key !== "in" && key !== "In") {

          // cityIndex = cities && cities.length && cities.findIndex(city => city.label.toLowerCase() === key.toLowerCase())
          // cityIndex = cities && cities.length && cities.findIndex(city => city.label.toLowerCase().match(new RegExp(key.toLowerCase())))
          let _city = cities && cities.length && cities.filter(city => city.alias.indexOf(key.toLowerCase()) !== -1)
          cityIndex = cities && cities.length && cities.findIndex(city => city.alias && city.alias.length && city.alias.indexOf(key.toLowerCase()) !== -1)

        }
        // if (cityIndex !== -1) {
        //   cit = cities && cities[cityIndex] && cities[cityIndex].label
        //   matchCity = cities[cityIndex]
        //   break;
        // }
      }
      if (cityIndex !== -1) {
        // const _query = {
        //   limit: 50,
        //   search: "",
        //   state: [matchCity && matchCity.state._id],
        //   panIndia: false
        // };
        // this.props.actions.getSellingCities(_query)
        // const response = await getSellingCitiesApi(_query)
        // const { data } = response
        // let ind = data.findIndex((elem) => elem.name === cit)

        let _cd = cities.filter((elem) => elem.label && elem.label === cit)[0]
        if (_cd) {
          _cd = {
            // c: ind + 1,
            label: /* _cd.name */ _cd.label.split(',')[0],
            value: /* _cd._id */_cd.value.split(',')[0],
            state: _cd.state && _cd.state._id,
            country: _cd.state && _cd.state.country
          }
          if (_cd.label) {
            // obj.st = _cd.state
            // obj.c = _cd.c
            obj.cityId = { label: _cd.label, value: _cd.value }
            splitString.splice(splitString.findIndex(s => s === cit), 1)
          }
        }
        localStorage.setItem("valueOfC", obj.c)
        localStorage.setItem("valueOfSt", obj.st)

      }
      for (let i = 0; i < splitString.length; i++) {
        const key = splitString[i]
        index = serviceTypes && serviceTypes.length && serviceTypes.findIndex(type => {
          const reg1 = new RegExp(`\\b${key.toLowerCase()}\\b`, "mg")
          return reg1.test(type.label.toLowerCase())
        })
        if (index !== -1) {
          str = key
          matchString = serviceTypes[index]
          break;
        }
      }
      if (index !== -1 && (matchString.label === "Dealer / Distributor" || matchString.label === "Importer / Exporter")) {
        const splitLabel = matchString.label.split("/")
        const splitValue = matchString.value.split("|")
        matchString = [
          {
            label: splitLabel[0].trim(),
            value: splitValue[0].trim()
          },
          {
            label: splitLabel[1].trim(),
            value: splitValue[1].trim()
          }
        ]
        obj["serviceType"] = matchString
        sessionStorage.setItem("serviceType", JSON.stringify(matchString))
        splitString.splice(splitString.findIndex(s => s === str), 1)
        value.name = splitString.join(" ")
      } else if (index !== -1) {
        obj["serviceType"] = matchString
        sessionStorage.setItem("serviceType", JSON.stringify(matchString))
        splitString.splice(splitString.findIndex(s => s === str), 1)
        value.name = splitString.join(" ")
      } else {
        delete obj.serviceType
      }

      if (key === "keyword") {
        obj[objKey] = {
          label: value._id,
          value: value.name.toLowerCase().trim()
        }
        sessionStorage.setItem("keyword", JSON.stringify({ label: value._id, value: value.name }))
      } else {
        if (select) obj["selected"] = 1
        obj[objKey] = {
          label: value.name,
          value: value._id
        }
      }

      // obj.country = country && country.name || this.props.IPDetails.name
      if (this.props.searchCountry && this.props.searchCountry.value) {
        obj.countryId = this.props.searchCountry
      } else {
        obj.countryId = {
          label: "all india",
          value: "5e312f978acbee60ab54de08"
        }
      }
      const strctObj = getSeachQueryStructure(obj)
      const qs = stringyfyQS(convertObjToQSobj(strctObj))
      this.setState(
        {
          search: ''
        },
        () => {

          this.redirect(qs)

        }
      )
      let searchBox = document.getElementsByClassName("searchBox")[0]
      searchBox.blur()
    }
  }

  mySubmitHandler = (e) => {
    e.preventDefault()
    const { defaultKey } = this.state
    const { searchKeyword } = this.props
    localStorage.setItem('keywordSearch', searchKeyword)
    const searchQuery = { name: searchKeyword, _id: null }
    this.search(searchQuery, defaultKey)
  }

  mySubmitHandlerSelect = (value, key) => {
    if (value && value.name) value.name = value.name.replace(/\s{2,}/g, ' ').trim()
    if (value.name.includes(',')) value.name = value.name.replaceAll(",", " ");
    const { defaultKey } = this.state
    const { searchKeyword } = this.props
    if (value.search === "level1") {
      this.search(value, "parentId", true)
    } else if (value.search === "level2") {
      this.search(value, "primaryId", true)
    } else if (value.search === "level3") {
      this.search(value, "secondaryId", true)
    } else if (value.search === "level4") {
      this.search(value, "productId", true)
    } else if (value.search === "level5") {
      this.search(value, "level5Id", true)
    } else {
      const searchQuery = { name: searchKeyword, _id: null }
      this.search(searchQuery, defaultKey)
    }
    this.props.actions.setSearchKeyword(value.name || '')
    this.setState({ search: value.name })
    localStorage.setItem('keywordSearch', value.name)

  }

  redirect = (qs) => {
    this.props.history.push({
      pathname: listing,
      search: `?${qs}`
    })

  }

  handleKeyDown = async (keyCode) => {
    if (keyCode === 13) {
      const { defaultKey } = this.state
      const { searchKeyword } = this.props
      let key = searchKeyword

      const searchQuery = { name: key, _id: null }
      this.search(searchQuery, defaultKey)
      this.setState({
        show: false
      })

    }
  }

  handleKeyPress = (e) => {
  }
  handleFocus = (e) => {
    e.target.select();
  }

  handleChange = (obj) => {
    const queryobj = convertQSobjToObj(parseQS(/*history.location.search*/));
    if (queryobj.countryId) {
      queryobj.countryId = obj
      let validQuery = getSeachQueryStructure(queryobj);
      validQuery = convertObjToQSobj(validQuery);
      if (obj && obj.value && obj.value !== "5e312f978acbee60ab54de08") {
        delete validQuery.city_id
      }
      const newUrlString = stringyfyQS(validQuery);
      // history.push({
      //   search: newUrlString
      // })
      this.redirect(newUrlString)
      this.setState({ selected: obj })
      this.props.actions.setSearchCountry(obj)
      setCountryLocal(obj, 'set')
    } else {
      this.setState({ selected: obj })
      this.props.actions.setSearchCountry(obj)
      setCountryLocal(obj, 'set')
    }
  }

  handleInputChange = (value) => {
    let { countries } = this.props;
    if (value) {
      countries = countries && countries.length && countries.filter(country => country.label && country.label.includes(value))
      this.setState({ options: countries/* .slice(0, 20) */ })
    } else {
      this.setState({
        options: countries/* .slice(0, 20) */
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.countries && nextProps.countries.length && this.props.countries && nextProps.countries.length !== this.props.countries.length) {
      const { countries } = nextProps
      this.setState({ options: countries/* .slice(0, 20) */ })
      return false
    }
    return true
  }
  // componentWillUnmount() {
  //   this.setState({search:''})
  // }


  render() {
    let { loader, searchCountry } = this.props
    const products = this.suggestion()
    const queryobj = convertQSobjToObj(parseQS(/*history.location.search*/));
    let option
    if (queryobj.countryId) option = queryobj.countryId
    searchCountry = (localStorage.getItem('countryFilter') !== '' && localStorage.getItem('countryFilter') !== 'undefined') ? JSON.parse(localStorage.getItem('countryFilter')) : searchCountry
    return (
      <div className="search-container">
        <form onSubmit={(e) => this.mySubmitHandler(e)}>
          <Select
            options={this.state.options}
            isSearchable={true}
            styles={customStyles}
            value={searchCountry /* ||  *//* this.state.selected ||  *//* option || */ /* options[0] */}
            classNamePrefix="prefer-location"
            className="prefer-location"
            placeholder="All India"
            // menuIsOpen={true}
            components={
              {
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null
              }
            }
            onChange={(value) => this.handleChange(value)}
            onInputChange={value => this.handleInputChange(value)}
          />
          {/* <div className={classNames("notranslate")}> */}
          <input
            type="text"
            value={this.props.searchKeyword || /* this.state.search ||  */""}
            placeholder='Search Products/Services'
            // placeholder={translate('application.search_placeholder')}
            onFocus={(e) => {
              e.preventDefault();
              e.target.focus({ preventScroll: true });
              console.log('test')
              this.setState({
                show: true
              })
              this.handleFocus(e)
            }
            }
            // onClick="this.select()"
            // id="search"
            className="searchBox"
            onChange={(e) => this.myChangeHandler(e.target.value)}
            onBlur={() => this.blur()}
            // onKeyDown={(e) => this.handleKeyDown(e.keyCode)}
            onKeyPress={(e) => this.handleKeyPress(e)}
          />
          {/* </div> */}
          <input type="submit" />
          <div className="search-res">
            {this.state.show && (
              <div className="search-pop-over">
                <div className="content" style={{ height: "fit-content" }}>
                  {!products.length ? <Loading />
                    :
                    products && products.map((list) =>
                      <p
                        onClick={() => this.mySubmitHandlerSelect(list, 'productId')}
                      ><span> {list.name || ''} </span> </p>
                    )}
                </div>
              </div>
            )}

          </div>

        </form>
      </div>
    )

  }

  componentDidMount() {
    this.get()
  }

}

Search.propTypes = {
  actions: PropTypes.object,
  products: PropTypes.array,
  loader: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  searchCountry: state.app.searchCountry,
  products: state.search.products.product,
  loader: state.categories.products.pending,
  searchKeyword: state.categories.searchKeyword,
  serviceTypes: state.categories.sellerType.types,
  cities: state.location.cities.cities,
  states: state.location.states.states,
  countries: state.location.countries && state.location.countries.countries && state.location.countries.countries.map(country => ({ label: country.name === 'india' ? 'all india' : country.name, value: country._id })),
  IPDetails: state.app.IPDetails
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      setSearchCountry,
      searchQuery,
      getAllProducts,
      setSearchKeyword,
      getSellingCities
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
