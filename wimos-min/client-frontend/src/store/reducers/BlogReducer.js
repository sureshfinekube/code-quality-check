import {
  BLOG_LOADING_TOGGLE_ACTION,
  BLOG_POST_CONFIRM_ACTION,
  BLOG_POST_FAILED_ACTION,
  BLOG_POST_COMPLETE_ACTION,
  BLOG_GET_CONFIRM_ACTION,
  BLOG_GET_FAILED_ACTION,
  BLOG_EDIT_COMPLETE_ACTION,
  BLOG_EDIT_CONFIRM_ACTION,
  BLOG_EDIT_FAILED_ACTION,
  BLOG_DELETE_COMPLETE_ACTION,
  BLOG_DELETE_CONFIRM_ACTION,
  BLOG_DELETE_FAILED_ACTION,
  BLOG_IMAGE_CONFIRM_ACTION,
  BLOG_IMAGE_FAILED_ACTION,
  BLOG_CLEAR_IMAGE,
  BLOG_CLEAR_DATA,
  BLOG_CATEGORY_POST_CONFIRM_ACTION,
  BLOG_CATEGORY_POST_COMPLETE_ACTION,
  BLOG_CATEGORY_POST_FAILED_ACTION,
  BLOG_CATEGORY_GET_CONFIRM_ACTION,
  BLOG_CATEGORY_GET_FAILED_ACTION,
  BLOG_CATEGORY_EDIT_CONFIRM_ACTION,
  BLOG_CATEGORY_EDIT_COMPLETE_ACTION,
  BLOG_CATEGORY_EDIT_FAILED_ACTION,
  BLOG_CATEGORY_DELETE_CONFIRM_ACTION,
  BLOG_CATEGORY_DELETE_COMPLETE_ACTION,
  BLOG_CATEGORY_DELETE_FAILED_ACTION,
} from "../actions/BlogActions";

const initialState = {
  blogpostSuccess: false,
  blogeditSuccess: false,
  blogdeleteSuccess: false,
  blogErrorMessage: "",
  blogSuccessMessage: "",
  showLoading: false,
  bloggetSuccess: false,
  blogs: "",
  blogimage: "",
  blogcategorypostSuccess: false,
  blogcategoryeditSuccess: false,
  blogcategorydeleteSuccess: false,
  blogsCategory: "",
  blogCategoryErrorMessage: "",
  blogCategorySuccessMessage: "",
};

export function BlogReducer(state = initialState, action) {
  if (action.type === BLOG_GET_CONFIRM_ACTION) {
    return {
      ...state,
      bloggetSuccess: true,
      blogs: action.payload,
      blogErrorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === BLOG_DELETE_CONFIRM_ACTION) {
    return {
      ...state,
      blogdeleteSuccess: true,
      blogErrorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === BLOG_EDIT_CONFIRM_ACTION) {
    return {
      ...state,
      blogeditSuccess: true,
      blogErrorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === BLOG_POST_CONFIRM_ACTION) {
    return {
      ...state,
      blogpostSuccess: true,
      blogErrorMessage: "",
      blogSuccessMessage: action.payload,
      showLoading: false,
    };
  }
  if (action.type === BLOG_IMAGE_CONFIRM_ACTION) {
    return {
      ...state,
      blogimage: action.payload,
      blogErrorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === BLOG_CLEAR_IMAGE) {
    return {
      ...state,
      blogimage: "",
    };
  }
  if (action.type === BLOG_CATEGORY_GET_CONFIRM_ACTION) {
    return {
      ...state,
      blogCategorySuccessMessage: true,
      blogsCategory: action.payload,
      blogCategoryErrorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === BLOG_CATEGORY_DELETE_CONFIRM_ACTION) {
    return {
      ...state,
      blogcategorydeleteSuccess: true,
      blogCategoryErrorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === BLOG_CATEGORY_EDIT_CONFIRM_ACTION) {
    return {
      ...state,
      blogcategoryeditSuccess: true,
      blogCategoryErrorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === BLOG_CATEGORY_POST_CONFIRM_ACTION) {
    return {
      ...state,
      blogcategorypostSuccess: true,
      blogCategoryErrorMessage: "",
      blogCategorySuccessMessage: action.payload,
      showLoading: false,
    };
  }
  if (
    action.type === BLOG_GET_FAILED_ACTION ||
    BLOG_POST_FAILED_ACTION ||
    BLOG_EDIT_FAILED_ACTION ||
    BLOG_DELETE_FAILED_ACTION ||
    BLOG_IMAGE_FAILED_ACTION ||
    BLOG_CATEGORY_POST_FAILED_ACTION ||
    BLOG_CATEGORY_GET_FAILED_ACTION ||
    BLOG_CATEGORY_EDIT_FAILED_ACTION ||
    BLOG_CATEGORY_DELETE_FAILED_ACTION
  ) {
    return {
      ...state,
      blogpostSuccess: false,
      blogeditSuccess: false,
      blogErrorMessage: "Error",
      showLoading: false,
      blogcategorypostSuccess: false,
      blogcategoryeditSuccess: false,
      blogCategoryErrorMessage: "Error",
    };
  }

  if (
    action.type === BLOG_POST_COMPLETE_ACTION ||
    BLOG_EDIT_COMPLETE_ACTION ||
    BLOG_DELETE_COMPLETE_ACTION ||
    BLOG_CATEGORY_POST_COMPLETE_ACTION ||
    BLOG_CATEGORY_EDIT_COMPLETE_ACTION ||
    BLOG_CATEGORY_DELETE_COMPLETE_ACTION
  ) {
    return {
      ...state,
      blogSuccessMessage: action.payload,
      blogErrorMessage: "",
    };
  }

  if (action.type === BLOG_LOADING_TOGGLE_ACTION) {
    return {
      ...state,
      showLoading: action.payload,
      blogpostSuccess: false,
      blogeditSuccess: false,
      blogdeleteSuccess: false,
      blogimage: "",
      blogcategorypostSuccess: false,
      blogcategoryeditSuccess: false,
      blogcategorydeleteSuccess: false,
    };
  }
  if (action.type === BLOG_CLEAR_DATA) {
    return {
      ...state,
      blogpostSuccess: false,
      blogeditSuccess: false,
      blogdeleteSuccess: false,
      blogErrorMessage: "",
      blogSuccessMessage: "",
      showLoading: false,
      bloggetSuccess: false,
      blogs: "",
      blogimage: "",
      blogcategorypostSuccess: false,
      blogcategoryeditSuccess: false,
      blogcategorydeleteSuccess: false,
      blogsCategory: "",
      blogCategoryErrorMessage: "",
      blogCategorySuccessMessage: "",
    };
  }

  return state;
}
