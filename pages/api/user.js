const { API_URL } = require("@/config/index");
import cookie from "cookie";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    // todo 내가만든쿠키
    // const token = req.headers.cookie.replace("token=", "");
    const { token } = cookie.parse(req.headers.cookie);
    // console.log(token); // todo: 이곳에서 log를 찍으면 루프가 걸림. why?

    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await strapiRes.json();
    // console.log("api_user_me_data", user);

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "사용자 정보가 없습니다" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
