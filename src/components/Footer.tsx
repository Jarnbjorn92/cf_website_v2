import { Stack } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        © {new Date().getFullYear()} Connor Fleming. All rights reserved.
      </div>
    </Stack>
  );
};

export default Footer;
