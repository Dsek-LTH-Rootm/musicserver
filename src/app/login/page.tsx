import { url_encode } from "@/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function authenticate() {
    "use server";

    const state = Math.random().toString(36).substring(2, 20);

    cookies().set("state", state);
    redirect(
      `${process.env.KEYCLOAK_BASEURL}realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth?client_id=${process.env.KEYCLOAK_CLIENT}&redirect_uri=${url_encode(process.env.BASE_URL + "/callback")}&response_type=code&state=${state}&scope=openid`
    );
  }

  async function createGuest() {
    "use server";

    console.log("creating guest");
  }

  return (
    <main className="w-full flex flex-col items-center h-96">
      <h1 className="text-5xl mb-6">Authenticate</h1>
      <form action={authenticate}>
        <button
          type="submit"
          className="bg-gray-600 h-16 w-44 m-2 transform transition hover:scale-105"
        >
          Login
        </button>
      </form>
      <form action={createGuest}>
        <button
          type="submit"
          className="bg-gray-600 h-16 w-44 transform transition hover:scale-105"
        >
          Guest
        </button>
      </form>
    </main>
  );
}
