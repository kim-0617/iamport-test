import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const onClickCertificate = () => {
    router.push("/cert");
  };

  return (
    <>
      <Button variant="contained" onClick={onClickCertificate}>
        인증
      </Button>
    </>
  );
}
