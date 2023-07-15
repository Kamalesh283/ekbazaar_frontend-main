/* eslint-disable import/no-anonymous-default-export */
import { actionTypes } from "../../utils/constants";
const { categories, common } = actionTypes;

const initialState = {
  specificCategories: {
    category: [],
    pending: false,
    success: false,
    error: false,
  },
  categories: {
    category: [],
    pending: false,
    success: false,
    error: false,
  },
  parentCategory: {
    category: {},
    pending: false,
    success: false,
    error: false,
  },
  sellerType: {
    types: [],
    pending: false,
    success: false,
    error: false,
  },
  products: {
    product: [],
    pending: false,
    success: false,
    error: false
  },
  primaryCategories: {
    categories: {},
    pending: false,
    success: false,
    error: false
  },
  levelFiveProducts: {
    products: [],
    pending: false,
    success: false,
    error: false
  },
  secondaryCategories: [],
  productsCategories: [],
  searchKeyword: "",
  selectedL2: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case categories.GET_SPECIFIC_PENDING: {
      return {
        ...state,
        specificCategories: {
          category: [],
          pending: true,
          success: false,
          error: false
        }
      }
    }
    case categories.GET_SPECIFIC_SUCCESS: {
      return {
        ...state,
        specificCategories: {
          category: payload,
          pending: false,
          success: true,
          error: false
        }
      }
    }
    case categories.GET_SPECIFIC_ERROR: {
      return {
        ...state,
        specificCategories: {
          category: [],
          pending: false,
          success: false,
          error: true
        }
      }
    }

    case categories.GET_ALL_CATEGORIES_PENDING: {
      return {
        ...state,
        categories: {
          ...state.categories,
          pending: payload,
        },
      };
    }

    case common.SET_USER_TYPE:
      return {
        ...state,
        searchKeyword: ""
      }

    case categories.GET_ALL_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: {
          category: payload,
          pending: false,
          succuss: true,
          error: false,
        },
      };
    }

    case categories.GET_ALL_CATEGORIES_ERROR: {
      return {
        ...state,
        categories: {
          ...state.categories,
          error: true,
          pending: false,
        },
      };
    }

    case categories.GET_CATEGORY_PENDING: {
      return {
        ...state,
        parentCategory: {
          ...state.parentCategory,
          pending: true,
          category: []
        },
      };
    }

    case categories.GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        parentCategory: {
          category: payload,
          pending: false,
          succuss: true,
          error: false,
        },
      };
    }

    case categories.GET_CATEGORY_ERROR: {
      return {
        ...state,
        parentCategory: {
          ...state.parentCategory,
          error: true,
          pending: false,
        },
      };
    }

    case categories.GET_SELLER_TYPES_PENDING: {
      return {
        ...state,
        sellerType: {
          types: [],
          pending: true,
          success: false,
          error: false,
        },
      };
    }

    case categories.GET_SELLER_TYPES_SUCCESS: {
      payload.sort((a, b) => a.sequence - b.sequence)
      return {
        ...state,
        sellerType: {
          types: payload.length && payload.map(type => ({
            label: type.name,
            value: type._id,
            type: true
          })) || [],
          pending: false,
          success: true,
          error: false,
        },
      };
    }

    case categories.GET_SELLER_TYPES_ERROR: {
      return {
        ...state,
        sellerType: {
          types: [],
          pending: false,
          success: false,
          error: true,
        },
      };
    }
    // All Profucts
    case categories.GET_ALL_PRODUCTS_PENDING: {
      return {
        ...state,
        products: {
          ...state.product,
          pending: payload
        }
      }

    }

    case categories.GET_ALL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: {
          product: payload,
          pending: false,
          succuss: true,
          error: false
        }
      }

    }

    case categories.GET_ALL_PRODUCTS_ERROR: {
      return {
        ...state,
        products: {
          ...state.product,
          error: true,
          pending: false
        }
      }

    }

    case categories.SET_SEARCH_KEYWORD: {
      return {
        ...state,
        searchKeyword: payload
      }
    }
    case categories.GET_SECONDARY_CATEGORIES_SUCCESS: {
      if(payload._secondaryCategories) {
        payload["secondaryCategories"][3]["productId"] = payload._secondaryCategories || []
      }
      return {
        ...state,
        secondaryCategories: payload["secondaryCategories"]
      }
    }
    case categories.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsCategories: payload
      }
    case categories.SELECTED_L2:
      return {
        ...state,
        selectedL2: payload
      }
    case categories.GET_PRIMARY_CATEGORY_PENDING:
      return {
        ...state,
        primaryCategories: {
          categories: {},
          pending: true,
          success: false,
          error: false
        },
      }
    case categories.GET_PRIMARY_CATEGORY_SUCCESS:
      return {
        ...state,
        primaryCategories: {
          categories: payload,
          pending: false,
          success: true,
          error: false
        },
      }
    case categories.GET_PRIMARY_CATEGORY_ERROR:
      return {
        ...state,
        primaryCategories: {
          categories: {},
          pending: false,
          success: true,
          error: false
        },
      }

    // All Profucts
    case categories.GET_ALL_LEVEL5_PRODUCTS_PENDING: {
      return {
        ...state,
        levelFiveProducts: {
          ...state.products,
          pending: payload
        }
      }

    }

    case categories.GET_ALL_LEVEL5_PRODUCTS_SUCCESS: {
      return {
        ...state,
        levelFiveProducts: {
          products: payload,
          pending: false,
          succuss: true,
          error: false
        }
      }

    }

    case categories.GET_ALL_LEVEL5_PRODUCTS_ERROR: {
      return {
        ...state,
        levelFiveProducts: {
          ...state.products,
          error: true,
          pending: false
        }
      }

    }

    default:
      return state;
  }
}
