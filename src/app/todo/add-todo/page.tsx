/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Container, TextField, Typography } from "@mui/material";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../../lib/firebase-config";

const page = () => {
  const [todoValue, setTodoValue] = useState<any>("");
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("firebase user", firebaseUser);
      if (firebaseUser) {
        setUser(firebaseUser);
        const dbQuery = query(
          collection(db, "todo"),
          where("uid", "==", firebaseUser.uid)
        );
        console.log("uid is true", dbQuery);
        const unSubscribeTodo = onSnapshot(dbQuery, (itemTodo) => {
          console.log("itemtododd", itemTodo);
          const itemArray: any[] = [];
          itemTodo.forEach((item) => {
            itemArray.push({ id: item.id, ...item.data() });
          });
          console.log("now itemArray is", itemArray);
        });
        return () => unSubscribeTodo();
      }
    });

    return () => unSubscribeAuth();
  }, []);

  const handleAddTodo = async () => {
    if (!todoValue.trim() || !user) return;
    await addDoc(collection(db, "todo"), {
      uid: user.uid,
      text: todoValue,
      createdAt: new Date(),
    });
    setTodoValue("");
  };
  return (
    <>
      <Container>
        <Typography>Add New Todo</Typography>
        <TextField
          fullWidth
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          variant="outlined"
        ></TextField>
        <Button onClick={() => handleAddTodo()}>Add ToDo</Button>
      </Container>
    </>
  );
};

export default page;
