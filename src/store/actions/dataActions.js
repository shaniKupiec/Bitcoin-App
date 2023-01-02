import dynamicService from "../../services/dynamicAPICalls.service";

export function loadDynamicRate(coin, days) {
  return async (dispatch) => {
    try {
      const data = await dynamicService.dynamicRate(coin, days);
      const key = coin + "-" + days;
      dispatch({ type: "SET_DYNAMIC_DATA", data, key });
    } catch (err) {
      console.log("err:", err);
    }
  };
}
