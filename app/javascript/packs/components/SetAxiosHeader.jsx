import axios from "axios";

const SetAxiosHeader = () => {
  const csrfToken = document.querySelector("[name=csrf-token]").content;
  if (!csrfToken) {
    return;
  } else {
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  }
};

export default SetAxiosHeader;
