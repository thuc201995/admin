import { configureStore } from "@reduxjs/toolkit";
import sidebar from "../features/sidebar/sidebarSlice";
import { logger } from "redux-logger";
export default configureStore({
  reducer: {
    sidebar,
  },
  middleware: [logger],
});
