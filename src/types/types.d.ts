import { User } from "../modules/users/models/User";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}