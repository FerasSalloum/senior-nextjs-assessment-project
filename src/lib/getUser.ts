import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { decrypt } from "./crypto";

export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const encryptedName = cookieStore.get("name")?.value;
    const encryptedEmail = cookieStore.get("email")?.value;
    if (!token || !encryptedName || !encryptedEmail) {
      return null;
    }
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    if (!payload.id) {
      return null;
    }
    const name = decrypt(encryptedName);
    const email = decrypt(encryptedEmail);

    return {
      name,
      email,
    };
  } catch (error) {
    return null;
  }
};
