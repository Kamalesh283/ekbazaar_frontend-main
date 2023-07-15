import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Overlay from '../../Components/Overlay/Overlay'
import Title from '../../Components/Title/Title'
import './BuyerRequestOffer.scss'
import close from '../../Assets/Images/xclose.svg'
import Form from '../../Components/Form/Form'
import Input from '../../Components/Input/Input'
import Select from "react-select";
import arrow from "../../Assets/Images/angledown.svg";
import { searchQuery } from "../../store/actions/search"
import { getSuggestionDataStruct } from "../../utils/helpers";
import { getAllCities } from '../../store/actions/location'
import { postBuyerRequest } from '../../store/actions/offers'
import moment from 'moment'

const individualselect = {
    option: () => ({
        color: "red",
        fontFamily: "OpenSans-Regular",
        fontSize: "14px",
        lineHeight: "23px",
        color: "#2B2C33",
        padding: " 8px",
        cursor: "pointer",
        textTransform: "capitalize"
    }),
    singleValue: (provided, state) => {
        const fontFamily = "OpenSans-Regular";
        const fontSize = "14px";
        const lineHeight = "23px";
        const color = "#16181D";
        const cursor = "pointer";
        // const backgroundImage = `url(${arrow})`;
        const backgroundRepeat = "no-repeat !important";
        const backgroundPosition = "90% !important";
        const width = "80%";
        const textTransform = "capitalize";

        return {
            ...provided,
            width,
            fontFamily,
            fontSize,
            lineHeight,
            color,
            cursor,
            // backgroundImage,
            backgroundRepeat,
            backgroundPosition,
            textTransform
        };
    },
    control: () => ({
        // none of react-select's styles are passed to <Control />
        height: "48px",
        height: "48px",
        fontFamily: "OpenSans-Regular",
        fontSize: "14px",
        lineHeight: "10px",
        border: "1px solid #ADB7BA",
        borderRadius: "4px",
        background: "#fff",
        opacity: ".46",
    }),
};
const customStyles = {
    option: () => ({
        color: "red",
        fontFamily: "OpenSans-Regular",
        fontSize: "14px",
        lineHeight: "23px",
        color: "#2B2C33",
        padding: " 8px",
        cursor: "pointer",
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: "100%",
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const width = "100%";
        const fontFamily = "OpenSans-Regular";
        const fontSize = "14px";
        const lineHeight = "23px";
        const color = "#2B2C33";
        const cursor = "pointer";
        const backgroundColor = "#F2F2F2";
        const height = "36px";
        const display = "flex";
        const alignItems = "center";
        const justifyContent = "left";
        const border = " 1px solid #DEE2E4 ";
        const borderRadius = "4px";
        const padding = "12px";
        const backgroundImage = `url(${arrow})`;
        const backgroundRepeat = "no-repeat !important";
        const backgroundPosition = "90% !important";

        return {
            ...provided,
            opacity,
            backgroundColor,
            backgroundRepeat,
            backgroundPosition,
            borderRadius,
            border,
            padding,
            transition,
            width,
            fontFamily,
            fontSize,
            lineHeight,
            color,
            cursor,
            backgroundImage,
            height,
            display,
            alignItems,
            justifyContent,
        };
    },
};
const options = [
    { value: "Banglore", label: "Banglore" },
    { value: "Mysore", label: "Mysore" },
    { value: "SilkBoard", label: "SilkBoard" },
];
const weightoptions = [
    { value: "Bags", label: "Bags" },
    { value: "Kgs", label: "Kgs" },
    { value: "Litres", label: "Litres" },
    { value: "Packs", label: "Packs" },
    { value: "Pieces", label: "Pieces" },
    { value: "Tons", label: "Tons" },

    { value: "grams", label: "grams" },
    { value: "kms", label: "kms" },
    { value: "miles", label: "miles" },
    { value: "Boxes", label: "Boxes" },
    { value: "Strips", label: "Strips" },
    { value: "Pairs", label: "Pairs" },
    { value: "Inches", label: "Inches" }
];
function BuyerRequestOffer(props) {
    const [startDate, setStartDate] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [weight, setWeight] = useState(weightoptions[0]);
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [submitted, setSubmit] = useState(false);
    useEffect(() => {
        const query = {
            skip: 0,
            limit: 50,
            restrictl1: true
            // search: product && product.label || '',
            // sellerId: !product && sellerId || '',
            // productId: product && product.value || '',
            // oneToOne
        }
        props.actions.searchQuery(query);
        let query1 = {
            skip: 0,
            limit: 50,
        }
        props.actions.getAllCities(query1)
    }, [])

    const onChange = (key, value) => {
        // value = new Date(value).toDateString()
        switch (key) {
            case "product": {
                setProduct(value)
                break;
            }
            case "quantity": {
                const regex = /^[0-9]*$/
                setQuantity(value)
                break;
            }
            case "weight": {
                setWeight(value)
                break;
            }
            case "price": {
                setPrice(value)
                break;
            }
            case "validity": {
                setStartDate(value)
                break;
            }
            // case "mobile": {
            //     const regex = /[ `a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            //     const condition = regex.test(value)
            //     if (value.length <= 10)
            //         this.setState({
            //             mobile: !condition ? value : this.state.mobile || "",
            //             "errors.mobile": ""
            //         });
            //     break;
            // }
            // case "email": {
            //     this.setState({
            //         email: value,
            //         "errors.email": ""
            //     });
            //     break;
            // }
            case "location": {
                setLocation(value)
                break;
            }
            default:
                return;
        }
    };

    const getRelavent = (val, key) => {
        const { product, sellerId } = props
        let query = {
            limit: 50,
            search: val
        }
        switch (key) {
            case 'cityId':
                props.actions.getAllCities(query)
                break

            case 'product':
                let query1 = {
                    //   product: true,
                    skip: 0,
                    limit: 50,
                    search: val,
                    //   sellerId: !product && sellerId || '',
                    restrictl1: true
                }
                props.actions.searchQuery(query1);
                break

            default:
                break
        }
    }

    const getSearchProducts = () => {
        const { getProducts } = props
        let filteredProducts = getProducts && getProducts.length && getProducts.map(prod => getSuggestionDataStruct(prod)) || []
        return filteredProducts
    }

    const validate = (submitted, value, key) => {
        if (!submitted) return ""
        else {
            if (key === "product" && !value) {
                return 'Product name is required'
            }
            if (key === "quantity" && !value) {
                return 'Quantity is required'
            }
            if (key === "date" && !value) {
                return 'Date is required'
            }
            if (key === "price" && !value) {
                return 'Price is required'
            }
            if (key === "location" && !value) {
                return 'Location is required'
            }
            //   if (key === "ownershipType" && !value) {
            //       return 'Ownership type is required'
            //   }

        }

    }

    const onSubmit = (e) => {
        e.preventDefault()
        setSubmit(true)
        const { buyer, seller } = props

        const date = new Date(startDate);
        const offset = date.getTimezoneOffset();
        if (offset < 0) {
            date.setHours(12, 0, 0);
        }
        // var DatePickerDate = startDate;
        // var myDate = new Date(DatePickerDate).toISOString();
        // // var d = new Date(startDate);
        // // d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        if (product && quantity && price && location && startDate) {

            const _location = location && location.value && location.value.split(',')
            const _locationName = location && location.label && location.label.split(',')
            const city = _location && _location[0]
            const data = {
                productDetails: {

                    name: product,
                    quantity: quantity,
                    weight: weight && weight.value,
                    price,
                    location: {
                        city: {
                            label: location && _locationName && _locationName[0],
                            value: location && city
                        },
                        state: {
                            label: location && location.state && location.state.name,
                            value: location && location.state && location.state._id

                        },
                    },
                    validity: date.toISOString().substring(0, 10), //startDate
                },
                buyerDetails: {
                    name: buyer && buyer.name,
                    email: buyer && buyer.email,
                    mobile: buyer && buyer.mobile,
                },
                buyerId: buyer && buyer._id || "",
                sellerId: seller && seller._id || '',
                userId: seller && seller.userId || "",
                requestType: 11,
            }
            props.actions.postBuyerRequest({ details: data, closeModel: props.buyerrequestclose })

        }
    }
    return (
        <div className="BuyerRequestOffer">
            <Overlay>
                <Title title="Request Form">
                    <img onClick={props.buyerrequestclose} src={close} />
                </Title>
                <Form
                    multi
                    submitname="Submit"
                    resetvalue="Close"
                    onClick={onSubmit}
                    reset={props.buyerrequestclose}
                >

                    {/* <Input type="text" placeholdertext="Product Name*" /> */}
                    <div className="selct-cities" style={{ width: '48%' }}>
                        <Select
                            value={product}
                            onChange={(value) => onChange("product", value)}
                            options={getSearchProducts()}
                            className="custom-city"
                            isSearchable={true}
                            styles={individualselect}
                            classNamePrefix="location-select"
                            placeholder="Select product*"
                            components={{
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                            }}
                            onInputChange={(value) => getRelavent(value, 'product')}
                            required={true}
                        />
                        <span className="error">{validate(submitted, product, 'product')}</span>
                    </div>
                    <Input
                        type="number"
                        placeholdertext="Quantity"
                        value={quantity}
                        onChange={(value) => onChange('quantity', value)}
                        required={true}
                        error={validate(submitted, quantity, 'quantity')}
                    >
                        <Select
                            value={weight}
                            styles={customStyles}
                            className="Quantity-container"
                            options={weightoptions}
                            classNamePrefix="custom-select"
                            isSearchable={false}
                            components={{
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                            }}
                            onChange={(value) => onChange("weight", value)}
                            required={true}
                        />
                    </Input>

                    <Input
                        type="number"
                        placeholdertext="Request price"
                        value={price}
                        onChange={(value) => onChange("price", value)}
                        required={true}
                        error={validate(submitted, price, 'price')}
                    />
                    <div className="selct-cities" style={{ width: '48%' }}>
                        <Select
                            value={location}
                            options={props.cities}
                            className="custom-city"
                            isSearchable={true}
                            styles={individualselect}
                            classNamePrefix="location-select"
                            placeholder="Location"
                            components={{
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                            }}
                            onChange={(value) => onChange("location", value)}
                            onInputChange={(value) => getRelavent(value, 'cityId')}
                            required={true}
                            // menuIsOpen={true}
                        />
                        <span className="error">{validate(submitted, location, 'location')}</span>
                    </div>

                    <div className="validity">
                        <DatePicker
                            // locale="IST"
                            selected={startDate}
                            onChange={(value) => onChange("validity", value)}
                            // dateFormat="dd-MM-yyyy"
                            // dateFormat="yyyy/MM/dd"
                            // placeholderText={'Offer valid till'}
                            customInput={<p className="putdate">{startDate?moment(startDate).format('DD-MM-YYYY'):<span className="placeholder">Offer valid till</span>}</p>}
                            minDate={new Date()}
                            maxDate={new Date().setDate(new Date().getDate() + 30)}
                        />
                        <span className="error">{validate(submitted, startDate, 'date')}</span>
                    </div>

                </Form>
            </Overlay>

        </div>
    )
}


const mapStateToProps = (state) => ({
    getProducts: state.search.products.product,
    cities: state.location.cities.cities,
    buyer: state.common.user.buyer,
    seller: state.common.user.seller,
    hasAccess: state.app.auth,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {
            searchQuery,
            getAllCities,
            postBuyerRequest
        },
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRequestOffer);
