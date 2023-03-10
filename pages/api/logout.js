import cookie from "cookie";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "POST") {
    // Destroy Cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0), // todo
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "Success" });
  } else {
    // res.setHeader("Allow", ["POST"]); // todo
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
