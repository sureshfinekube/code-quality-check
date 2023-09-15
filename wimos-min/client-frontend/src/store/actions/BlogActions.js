import { formatError, formatSuccess } from "../../services/AuthService";
import {
  BlogPost,
  BlogGet,
  BlogEdit,
  BlogDelete,
  BlogImageGet,
  BlogCategoryGet,
  BlogCategoryEdit,
  BlogCategoryDelete,
  BlogCategoryPost,
} from "../../services/BlogService";

export const BLOG_LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";

export const BLOG_POST_CONFIRM_ACTION = "[blog post action] confirm";
export const BLOG_POST_FAILED_ACTION = "[blog post action] failed";
export const BLOG_POST_COMPLETE_ACTION = "[blog post action] complete";

export const BLOG_EDIT_CONFIRM_ACTION = "[blog edit action] confirm";
export const BLOG_EDIT_FAILED_ACTION = "[blog edit action] failed";
export const BLOG_EDIT_COMPLETE_ACTION = "[blog edit action] complete";

export const BLOG_GET_CONFIRM_ACTION = "[blog get action] confirm";
export const BLOG_GET_FAILED_ACTION = "[blog get action] failed";

export const BLOG_DELETE_CONFIRM_ACTION = "[blog delete action] confirm";
export const BLOG_DELETE_FAILED_ACTION = "[blog  delete action] failed";
export const BLOG_DELETE_COMPLETE_ACTION = "[blog  delete action] complete";

export const BLOG_IMAGE_CONFIRM_ACTION = "[get blog image] complete";
export const BLOG_IMAGE_FAILED_ACTION = "[get blog image] failed";

export const BLOG_CLEAR_IMAGE = "[clear blog image] image clear";
export const BLOG_CLEAR_DATA = "[blog data] clear";

export const BLOG_CATEGORY_POST_CONFIRM_ACTION =
  "[blog category post action] confirm";
export const BLOG_CATEGORY_POST_FAILED_ACTION =
  "[blog category post action] failed";
export const BLOG_CATEGORY_POST_COMPLETE_ACTION =
  "[blog category post action] complete";

export const BLOG_CATEGORY_EDIT_CONFIRM_ACTION =
  "[blog category edit action] confirm";
export const BLOG_CATEGORY_EDIT_FAILED_ACTION =
  "[blog category edit action] failed";
export const BLOG_CATEGORY_EDIT_COMPLETE_ACTION =
  "[blog category edit action] complete";

export const BLOG_CATEGORY_GET_CONFIRM_ACTION =
  "[blog category get action] confirm";
export const BLOG_CATEGORY_GET_FAILED_ACTION =
  "[blog category get action] failed";

export const BLOG_CATEGORY_DELETE_CONFIRM_ACTION =
  "[blog delete action] confirm";
export const BLOG_CATEGORY_DELETE_FAILED_ACTION =
  "[blog  delete action] failed";
export const BLOG_CATEGORY_DELETE_COMPLETE_ACTION =
  "[blog  delete action] complete";

export function BlogGetAction(clientid) {
  return (dispatch) => {
    BlogGet(clientid)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        dispatch(bloggetConfirmAction(response.data));
        // const successMessage = formatSuccess("Blog Posted Successfully");
        // dispatch(blogpostCompleteAction(successMessage));
      })
      .catch((error) => {
        // console.log("err", error.response);
        const errorMessage = formatError("Something went wrong");
        dispatch(bloggetFailedAction(errorMessage));
      });
  };
}

export function bloggetConfirmAction(data) {
  return {
    type: BLOG_GET_CONFIRM_ACTION,
    payload: data,
  };
}
export function bloggetFailedAction(error) {
  return {
    type: BLOG_GET_FAILED_ACTION,
    payload: error,
  };
}

export function IamgeGetAction(image) {
  //console.log(image);
  return (dispatch) => {
    BlogImageGet(image)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        dispatch(imagegetConfirmAction(response.data));
        // const successMessage = formatSuccess("Blog Posted Successfully");
        // dispatch(blogpostCompleteAction(successMessage));
      })
      .catch((error) => {
        // console.log("err", error.response);
        const errorMessage = formatError("Something went wrong");
        dispatch(imagegetFailedAction(errorMessage));
      });
  };
}

export function imagegetConfirmAction(data) {
  return {
    type: BLOG_IMAGE_CONFIRM_ACTION,
    payload: data,
  };
}
export function imagegetFailedAction(error) {
  return {
    type: BLOG_IMAGE_FAILED_ACTION,
    payload: error,
  };
}

export function clearImageAction() {
  return {
    type: BLOG_CLEAR_IMAGE,
  };
}

export function BlogPostAction(data, history, SetBtnLoader) {
  //console.log("628c83f4bcfd060092c76f49", data);

  return (dispatch) => {
    BlogPost(data)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        dispatch(blogpostConfirmAction(response.data));
        const successMessage = formatSuccess("Blog Posted Successfully");
        dispatch(blogpostCompleteAction(successMessage));
        history.push("/blogs");
        SetBtnLoader(false);
      })
      .catch((error) => {
        // console.log("err", error.response.data?.errors);
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Blog added error");
        }

        dispatch(blogpostFailedAction(errorMessage));
        SetBtnLoader(false);
      });
  };
}

export function blogpostConfirmAction(data) {
  return {
    type: BLOG_POST_CONFIRM_ACTION,
    payload: data,
  };
}

export function blogpostCompleteAction(message) {
  return {
    type: BLOG_POST_COMPLETE_ACTION,
    payload: message,
  };
}

export function blogpostFailedAction(error) {
  return {
    type: BLOG_POST_FAILED_ACTION,
    payload: error,
  };
}

export function loadingToggleAction(status) {
  return {
    type: BLOG_LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function BlogEditAction(data, history, SetLoader) {
  return (dispatch) => {
    BlogEdit(data)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        dispatch(blogeditConfirmAction(response.data));
        const successMessage = formatSuccess("Blog Updated Successfully");
        dispatch(blogeditCompleteAction(successMessage));
        history.push("/blogs");
        SetLoader(false);
      })
      .catch((error) => {
        //console.log("err", error.response);

        const errorMessage = formatError("Something went wrong");
        dispatch(blogeditFailedAction(errorMessage));
        SetLoader(false);
      });
  };
}

export function blogeditConfirmAction(data) {
  return {
    type: BLOG_EDIT_CONFIRM_ACTION,
    payload: data,
  };
}

export function blogeditCompleteAction(message) {
  return {
    type: BLOG_EDIT_COMPLETE_ACTION,
    payload: message,
  };
}

export function blogeditFailedAction(error) {
  return {
    type: BLOG_EDIT_FAILED_ACTION,
    payload: error,
  };
}

export function BlogDeleteAction(
  blogid,
  storeid,
  SetBtnLoader,
  SetDeleteModal
) {
  return (dispatch) => {
    BlogDelete(blogid)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        dispatch(blogdeleteConfirmAction(response.data));
        const successMessage = formatSuccess("Blog Removed Successfully");
        dispatch(blogdeleteCompleteAction(successMessage));
        dispatch(BlogCategoryGetAction(storeid));
        SetBtnLoader(false);
        SetDeleteModal(false);
      })
      .catch((error) => {
        // console.log("err", error.response);
        const errorMessage = formatError("Something went wrong");
        dispatch(blogdeleteFailedAction(errorMessage));
        SetBtnLoader(false);
      });
  };
}

export function blogdeleteConfirmAction(data) {
  return {
    type: BLOG_DELETE_CONFIRM_ACTION,
    payload: data,
  };
}

export function blogdeleteCompleteAction(message) {
  return {
    type: BLOG_DELETE_COMPLETE_ACTION,
    payload: message,
  };
}

export function blogdeleteFailedAction(error) {
  return {
    type: BLOG_DELETE_FAILED_ACTION,
    payload: error,
  };
}

export function ClearBlog() {
  return {
    type: BLOG_CLEAR_DATA,
  };
}

export function BlogCategoryPostAction(
  data,
  history,
  SetBtnLoadeAdd,
  SetAddCategoryModal,
  storeid
) {
  //console.log("628c83f4bcfd060092c76f49", data);

  return (dispatch) => {
    BlogCategoryPost(data)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        dispatch(blogcategorypostConfirmAction(response.data));
        const successMessage = formatSuccess(
          "Blog Category Posted Successfully"
        );
        dispatch(blogcategorypostCompleteAction(successMessage));
        history.push("/blog-category");
        dispatch(BlogCategoryGetAction(storeid));

        SetBtnLoadeAdd(false);
        SetAddCategoryModal(false);
      })
      .catch((error) => {
        // console.log("err", error.response);

        const errorMessage = formatError("Something went wrong");
        dispatch(blogcategorypostFailedAction(errorMessage));
        SetBtnLoadeAdd(false);
      });
  };
}

export function blogcategorypostConfirmAction(data) {
  return {
    type: BLOG_CATEGORY_POST_CONFIRM_ACTION,
    payload: data,
  };
}

export function blogcategorypostCompleteAction(message) {
  return {
    type: BLOG_CATEGORY_POST_COMPLETE_ACTION,
    payload: message,
  };
}

export function blogcategorypostFailedAction(error) {
  return {
    type: BLOG_CATEGORY_POST_FAILED_ACTION,
    payload: error,
  };
}

export function BlogCategoryGetAction(clientid) {
  return (dispatch) => {
    BlogCategoryGet(clientid)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        dispatch(blogcategorygetConfirmAction(response.data));
        // const successMessage = formatSuccess("Blog Posted Successfully");
        // dispatch(blogpostCompleteAction(successMessage));
      })
      .catch((error) => {
        // console.log("err", error.response);
        const errorMessage = formatError("Something went wrong");
        dispatch(blogcategorygetFailedAction(errorMessage));
      });
  };
}

export function blogcategorygetConfirmAction(data) {
  return {
    type: BLOG_CATEGORY_GET_CONFIRM_ACTION,
    payload: data,
  };
}
export function blogcategorygetFailedAction(error) {
  return {
    type: BLOG_CATEGORY_GET_FAILED_ACTION,
    payload: error,
  };
}

export function BlogCategoryEditAction(
  data,
  history,
  SetBtnLoaderEdit,
  SetEditCategoryModal,
  storeid
) {
  return (dispatch) => {
    BlogCategoryEdit(data)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        dispatch(blogcategoryeditConfirmAction(response.data));
        const successMessage = formatSuccess(
          "Blog Category Updated Successfully"
        );
        dispatch(blogcategoryeditCompleteAction(successMessage));
        history.push("/blog-category");
        dispatch(BlogCategoryGetAction(storeid));
        SetBtnLoaderEdit(false);
        SetEditCategoryModal(false);
      })
      .catch((error) => {
        console.log("err", error.response);

        const errorMessage = formatError("Something went wrong");
        dispatch(blogcategoryeditFailedAction(errorMessage));
        SetBtnLoaderEdit(false);
      });
  };
}

export function blogcategoryeditConfirmAction(data) {
  return {
    type: BLOG_CATEGORY_EDIT_CONFIRM_ACTION,
    payload: data,
  };
}

export function blogcategoryeditCompleteAction(message) {
  return {
    type: BLOG_CATEGORY_EDIT_COMPLETE_ACTION,
    payload: message,
  };
}

export function blogcategoryeditFailedAction(error) {
  return {
    type: BLOG_CATEGORY_EDIT_FAILED_ACTION,
    payload: error,
  };
}

export function BlogCategoryDeleteAction(
  blogid,
  storeid,
  SetBtnLoader,
  SetDeleteModal
) {
  return (dispatch) => {
    BlogCategoryDelete(blogid)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        dispatch(blogcategorydeleteConfirmAction(response.data));
        dispatch(BlogCategoryGetAction(storeid));
        const successMessage = formatSuccess(
          "Blog Category Removed Successfully"
        );
        dispatch(blogcategorydeleteCompleteAction(successMessage));
        SetBtnLoader(false);
        SetDeleteModal(false);
      })
      .catch((error) => {
        // console.log("err", error.response);
        const errorMessage = formatError("Something went wrong");
        dispatch(blogcategorydeleteFailedAction(errorMessage));
        SetBtnLoader(false);
      });
  };
}

export function blogcategorydeleteConfirmAction(data) {
  return {
    type: BLOG_CATEGORY_DELETE_CONFIRM_ACTION,
    payload: data,
  };
}

export function blogcategorydeleteCompleteAction(message) {
  return {
    type: BLOG_CATEGORY_DELETE_COMPLETE_ACTION,
    payload: message,
  };
}

export function blogcategorydeleteFailedAction(error) {
  return {
    type: BLOG_CATEGORY_DELETE_FAILED_ACTION,
    payload: error,
  };
}
