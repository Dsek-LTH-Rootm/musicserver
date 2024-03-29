"use server";
import { redirect } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { log } from "@/utils";

export async function GET(req: NextRequest) {
  const callback = async () => {
    "use server";

    const url = encodeURIComponent(process.env.BASE_URL + "login/callback");
    const code = req.nextUrl.searchParams.get("code");
    if (!code) {
      log("Authentication callback return with empty code");
      redirect("/login");
    } else {
      const token = await axios
        .post(
          `${process.env.KEYCLOAK_BASE_URL}realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: url,
            client_id: process.env.KEYCLOAK_CLIENT as string,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .catch((err) => {
          log(code);
          log(err.response.status);
          log(JSON.stringify(err.response.data));
        });

      const res = NextResponse.redirect(
        new URL("/", req.nextUrl.protocol + req.headers.get("host"))
      );
      res.cookies.set(
        "accessToken",
        (token as AxiosResponse<any, any>)?.data?.access_token,
        {
          httpOnly: true,
          secure: true,
        }
      );

      return res;
    }
  };

  return callback();
}
