import axios from "axios";

const API = "https://pre-onboarding-selection-task.shop";

// Todos : 중복된 아이디 만들경우 에러 핸들링
const request = async (subUrl, email, password) => {
  try {
    console.log(
      `${API}${subUrl}`,
      {
        email: `${email}`,
        password: `${password}`,
      },
      {
        Authorization: `Bearer ${process.env.REACT_APP_SERVICE_KEY}`,
      }
    );
    const res = await axios.post(
      `${API}${subUrl}`,
      {
        email: `${email}`,
        password: `${password}`,
      },
      {
        Authorization: `Bearer ${process.env.SERVICE_KEY}`,
      }
    );
    // 호출 중 에러가 발생했을 때의 처리
    if (res.status === 201) {
      return res.data;
    }
    // 오류가 발생한 경우를 체크
    throw new Error("API 호출 오류");
  } catch (e) {
    // 오류가 발생했음을 사용자에게 인지
    alert(e.message);
    return { access_token: "" };
  }
};

export default request;
