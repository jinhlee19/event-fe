/* eslint-disable import/no-anonymous-default-export */
import cookie from "cookie";
const { API_URL } = require("@/config/index");

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await strapiRes.json();

    console.log(data.jwt);

    if (strapiRes.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ user: data.user });
    } else {
      res.status(data.error.status).json({ error: data.error.message });
    }
  } else {
    // res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};

//Auth (register) Endpoint https://strapi.io/blog/a-beginners-guide-to-authentication-and-authorization-in-strapi
