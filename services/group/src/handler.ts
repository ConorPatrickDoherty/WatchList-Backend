import { ApiHandler, UnitOfWork } from "../../../data-access";
import { GroupController } from "./group.controller";

const userRepo = new UnitOfWork();
const controller = new GroupController(userRepo)

export const getGroup: ApiHandler = controller.getGroup;
export const createGroup: ApiHandler = controller.createGroup;
export const addUserWithCode: ApiHandler = controller.addUserWithCode;