import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Typography,
} from "@mui/material";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppBar position="static">
        <Typography>Todo List App</Typography>
        <Box>
          <Button color="inherit" component={Link} href="/todo/add-todo">
            Add Todos
          </Button>
          <Button color="inherit" component={Link} href="/login">
            Logout
          </Button>
        </Box>
      </AppBar>
      <Container>{children}</Container>
    </div>
  );
};

export default layout;
