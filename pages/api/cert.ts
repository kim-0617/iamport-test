// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name?: string;
  certificationsInfo?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { imp_uid } = req.body;
    console.log("imp_uid : ", imp_uid);

    try {
      const body = {
        imp_key: "5678286640672464",
        imp_secret:
          "04b74be52e75c3ed9d7cf59608f3da6817a3d436114f1e90cd8b0bc04b65e99b1130a41dc18d8c9e",
      };
      const getToken = await axios.post(
        "https://api.iamport.kr/users/getToken",
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { access_token } = getToken.data.response;
      console.log("acc@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : ", access_token);

      const getCertifications = await axios.get(
        `https://api.iamport.kr/certifications/${imp_uid}`,
        {
          headers: { Authorization: access_token },
        }
      );
      const certificationsInfo = getCertifications.data.response;
      res.send({ certificationsInfo: certificationsInfo });
    } catch (e: any) {
      console.error("ERROR: ", e);
    }
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
