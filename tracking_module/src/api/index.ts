import axios, { AxiosResponse } from "axios";
import {GetPublicPackageDto} from "../../../backend/src/package/dto/get-package.dto"
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export async function getPackageInfo(id: string) {
  return await axios.get<GetPublicPackageDto>(`package/${id}`, {withCredentials: false});
}
