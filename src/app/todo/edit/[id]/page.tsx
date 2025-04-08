/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../lib/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";

const page = () => {
  const [todoText, setTodoText] = useState("");
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUpdateDetails = async () => {
      const reference = doc(db, "todo", id as string);
      const data = await getDoc(reference);
      console.log("reference data", data);
      if (data.exists()) {
        setTodoText(data?.data().text);
        setLoading(false);
      }
    };

    if (id) {
      fetchUpdateDetails();
    }
  }, [id]);

  useEffect(() => {
    console.log("todo list ", todoText);
  }, [todoText]);

  const handleUpdate = async () => {
    const reference = doc(db, "todo", id as string);
    await updateDoc(reference, {
      text: todoText,
    });
    router.push("/todo/todo-list");
  };

  return (
    <div>
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <Container>
          <Typography>Edit Todo</Typography>
          <TextField
            value={todoText}
            onChange={(e: any) => setTodoText(e.target.value)}
            fullWidth
          ></TextField>
          <Button variant="contained" onClick={() => handleUpdate()}>
            Update Todo
          </Button>
        </Container>
      )}
    </div>
  );
};

export default page;
