import { FC, useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  styled,
} from "@mui/material";
import { StyledMainStack } from ".";

interface MessageHistory {
  sender: string;
  message: string | null;
}

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    borderColor: "orange", // Change the border color here
    "&:hover fieldset": {
      borderColor: "orange", // Change border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "orange", // Change border color when focused
    },
  },
  "& .MuiInputBase-root": {
    fontFamily: "'Brownstone', serif",
    color: "#cd7f32",
  },
  backgroundColor: "wheat",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: theme.spacing(50),
  margin: "auto",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
  backdropFilter: "blur(8px)", // Apply blur effect to background
  borderRadius: theme.spacing(1),
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  marginTop: theme.spacing(13),
}));

const ChatBox: FC = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<MessageHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);

  // Function to handle message submission
  const handleMessageSubmit = async (
    message: string,
    initMessage: boolean = false
  ) => {
    if (message.trim()) {
      if (!initMessage) {
        setThinking(true);
      }
      // Add user's message to chat history
      setChatHistory((prev) => [...prev, { sender: "user", message }]);

      // Clear input field
      setUserMessage("");

      setLoading(true); // Set loading to true

      try {
        const response = await fetch("/api/ask-aifrica", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userMessage: message }),
        });

        const data = await response.json();

        const aiMessage = data.reply;

        // Add AI's message to chat history
        setTimeout(() => {
          {
            setChatHistory((prev) => [
              ...prev,
              { sender: "ai", message: aiMessage },
            ]);
            setThinking(false);
          }
        }, 1000);
      } catch (error) {
        console.error("Error sending message to ChatGPT:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    }
  };

  useEffect(() => {
    setChatHistory((prev) => [
      ...prev,
      { sender: "ai", message: "How can I help you today?" },
    ]);
  }, []);

  return (
    <StyledMainStack direction='column' spacing={2} sx={{ marginTop: "500px" }}>
      <StyledPaper>
        <Box sx={{ flexGrow: 1, overflowY: "auto", marginBottom: "16px" }}>
          {chatHistory.map((chat, index) => (
            <Box key={index} sx={{ marginBottom: "8px" }}>
              <Typography
                variant='body2'
                color={chat.sender === "user" ? "black" : "#cd7f32"}
                fontFamily="'Brownstone', serif"
              >
                <strong>{chat.sender === "user" ? "You" : "AIfrica"}:</strong>{" "}
                {chat.message}
              </Typography>
            </Box>
          ))}
          {thinking ? (
            <Box sx={{ marginBottom: "8px" }}>
              <Typography
                variant='body2'
                color='#cd7f32'
                fontFamily="'Brownstone', serif"
              >
                <strong>AIfrica:</strong> Thinking...
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </Box>

        <StyledTextField
          label='Type a message'
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          fullWidth
          variant='outlined'
          sx={{ marginBottom: "16px" }}
          slotProps={{
            inputLabel: {
              style: {
                color: "#cd7f32",
                fontFamily: "'Brownstone', serif",
              },
            },
          }}
        />

        {/* Submit button */}
        <Button
          variant='contained'
          onClick={() => handleMessageSubmit(userMessage)}
          disabled={loading || !userMessage.trim()}
          sx={{ backgroundColor: "#cd7f32", fontFamily: "'Brownstone', serif" }}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </StyledPaper>
    </StyledMainStack>
  );
};

export default ChatBox;
