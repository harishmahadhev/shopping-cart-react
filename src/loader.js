import { createContext } from "react";
import ReactLoading from "react-loading";
export const varCtx = createContext(null);
export const initialState = [];
export const Loading = ({ color }) => (
  <ReactLoading type="cylon" color={color ? color : "#ff8640"} />
);
