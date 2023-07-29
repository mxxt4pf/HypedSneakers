import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box>
        <Typography variant="h1"> Welcome to HypedSneakers</Typography>;
      </Box>
      <div>
        <img src="/images/homepage.png" style={{ width: "100%" }} />
      </div>
    </>
  );
}
