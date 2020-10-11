const initialState = {
  contact_list: [],
  contact: {},
  favourites: [],
};
export default function contacts(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_CONTACT": {
      return { ...state, contact_list: payload };
    }
    case "SET_SINGLEDATA": {
      return { ...state, contact: payload };
    }
    case "SET_FAVDATA": {
      return { ...state, favourites: payload };
    }
    default:
      return state;
  }
}
