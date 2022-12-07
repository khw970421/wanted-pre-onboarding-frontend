import axios from "axios";

const API = "https://pre-onboarding-selection-task.shop";

// Todos : 중복된 아이디 만들경우 에러 핸들링
const request = async (subUrl, body, token = "") => {
  try {
    if (token) {
      const res = await axios.post(`${API}${subUrl}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // 호출 중 에러가 발생했을 때의 처리
      if (res.status === 201 || res.status === 200) {
        return res.data;
      }
      // 오류가 발생한 경우를 체크
      throw new Error("API 호출 오류");
    } else {
      const res = await axios.post(`${API}${subUrl}`, body);
      // 호출 중 에러가 발생했을 때의 처리
      if (res.status === 201 || res.status === 200) {
        return res.data;
      }
      // 오류가 발생한 경우를 체크
      throw new Error("API 호출 오류");
    }
  } catch (e) {
    // 오류가 발생했음을 사용자에게 인지
    alert(e.message);
    return { access_token: "" };
  }
};

const getRequest = async (subUrl, token = "") => {
  try {
    if (token) {
      const res = await axios.get(`${API}${subUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // 호출 중 에러가 발생했을 때의 처리
      if (res.status === 200) {
        return res.data;
      }
      // 오류가 발생한 경우를 체크
      throw new Error("API 호출 오류");
    }
  } catch (e) {
    // 오류가 발생했음을 사용자에게 인지
    alert(e.message);
    return { access_token: "" };
  }
};

const putRequest = async (subUrl, body, token = "") => {
  try {
    console.log(subUrl, body);
    if (token) {
      const res = await axios.put(`${API}${subUrl}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // 호출 중 에러가 발생했을 때의 처리
      if (res.status === 200) {
        return res.data;
      }
      // 오류가 발생한 경우를 체크
      throw new Error("API 호출 오류");
    }
  } catch (e) {
    // 오류가 발생했음을 사용자에게 인지
    alert(e.message);
    return { access_token: "" };
  }
};

export { getRequest, putRequest };
export default request;
