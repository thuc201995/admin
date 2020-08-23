import {
  createSlice,
  createEntityAdapter,
  createReducer,
  createAction,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";

/************** group menu *******************/
const groupsAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    return a.index - b.index;
  },
});

export const gruopsSlice = createSlice({
  name: "sidebarGroups",
  initialState: groupsAdapter.getInitialState(),
  reducers: {
    groupReceived: (state, action) => {
      groupsAdapter.setAll(state, action.payload);
    },
  },
});
export const groupSelector = groupsAdapter.getSelectors((state) => {
  return state.sidebar.groups;
});
export const { groupReceived } = gruopsSlice.actions;
/************** group menu *******************/

export const menusSlices = createSlice({
  name: "sidebarMenus",
  initialState: {
    ids: [],
    entities: [],
    groupByGroupId: [],
    groupByParentId: [],
  },
  reducers: {
    menusReceived: (state, action) => {
      const { payload } = action;
      const byId = payload.reduce((result, item) => {
        result = { ...result, [item.id]: item };
        return result;
      }, {});
      const groupByGroupId = payload.reduce((result, item) => {
        result = {
          ...result,
          [item.group]: [...(result[item.group] || []), item.id],
        };
        return result;
      }, {});
      const groupByParentId = payload.reduce((result, item) => {
        result = {
          ...result,
          [item.parent]: [...(result[item.parent] || []), item.id],
        };
        return result;
      }, {});
      state.entities = byId;
      state.ids = payload.map((item) => item.id);
      state.groupByGroupId = groupByGroupId;
      state.groupByParentId = groupByParentId;
    },
  },
});
export const selectMenus = (state) => state.sidebar.menus;
export const { menusReceived } = menusSlices.actions;

/*************** isOpen ************************/
export const toggleSidebar = createAction("toggleSidebar");
export const setIsOpen = createAction("setIsOpen");
const isOpen = createReducer(window.innerWidth > 768, {
  [setIsOpen]: (_, action) => action.payload,
  [toggleSidebar]: (state) => !state,
});
export const selectIsOpen = (state) => state.sidebar.isOpen;
/*************** isOpen ************************/

export default combineReducers({
  groups: gruopsSlice.reducer,
  menus: menusSlices.reducer,
  isOpen: isOpen,
});
