import { v4 as uuidv4 } from "uuid";

export default function generatePassword() {
  const uuid = uuidv4();
  const password = uuid.replace(/-/g, "").slice(0, 6);
  return password;
}
