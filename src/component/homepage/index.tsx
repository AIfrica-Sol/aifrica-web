import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const StyledMainStack = styled(Stack)(() => ({
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "& .MuiStack-root": {
    marginTop: "200px",
  },
}));

const HomePageTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(10),
  fontWeight: "bold",
  color: "#cd7f32",
  opacity: "0.7",
  textAlign: "center",
  marginBottom: theme.spacing(20),
  fontFamily: "'Brownstone', serif",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "wheat",
  color: "#cd7f32",
  width: theme.spacing(40),
  height: theme.spacing(5),
  fontSize: theme.spacing(2),
  border: "2px solid transparent", // Initially transparent border
  transition: "all 0.3s ease", // Smooth transition for hover effects

  // On hover
  "&:hover": {
    backgroundColor: "#cd7f32", // Transparent background on hover
    color: "wheat", // Change text color on hover
    borderColor: "wheat", // Add border on hover
  },
}));

const HomePage: FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <HomePageTitle>AIfrica</HomePageTitle>
      <Stack direction='row' spacing={4}>
        <StyledButton
          onClick={() => navigate("/ask-aifrica")}
          sx={{ fontFamily: "'Brownstone', serif" }}
        >
          Ask AIfrica
        </StyledButton>
        <StyledButton sx={{ fontFamily: "'Brownstone', serif" }}>
          Donate for African Children
        </StyledButton>
      </Stack>
    </Box>
  );
};

export default HomePage;
