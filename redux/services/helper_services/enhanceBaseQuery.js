import authBaseQuery from "./authBaseQuery";
import { handleTokenRefresh } from "./accessExpired";

const enhancedBaseQuery = async (args, api, extraOptions) => {
  let result = await authBaseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    result = await handleTokenRefresh(args, api, extraOptions, authBaseQuery);
  }
  return result;
};
export default enhancedBaseQuery;
