import { authGuard } from "../middleware/auth-guard";
export default ({ router }) => {
  router.beforeEach(authGuard);
};
