import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { getWord } from "@/words";

export default function LoginPage() {
  async function authenticate() {
    "use server";

    const state = Math.random().toString(36).substring(2, 20);
    cookies().set("state", state);
    redirect(
      `${process.env.KEYCLOAK_BASE_URL}realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth?client_id=${process.env.KEYCLOAK_CLIENT}&redirect_uri=${process.env.BASE_URL + "login/callback"}&response_type=code&state=${state}&scope=openid`
    );
  }

  async function createGuest() {
    "use server";

    const uuid = randomUUID();
    cookies().set("user", uuid, {
      maxAge: 365 * 86400,
    });
    console.log(await getWord(uuid));
    redirect("/");
  }

  return (
    <div className="flex h-96 w-screen flex-col items-center">
      <h1 className="mb-6 text-3xl text-center">Login or become a guest</h1>
      <form action={authenticate}>
        <button
          type="submit"
          className="m-2 h-16 w-screen sm:w-44 transform bg-gray-600 transition hover:scale-105"
        >
          Login
        </button>
      </form>
      <form action={createGuest}>
        <button
          type="submit"
          className="h-16 w-screen sm:w-44 transform bg-gray-600 transition hover:scale-105"
        >
          Guest
        </button>
      </form>
    </div>
  );
}
