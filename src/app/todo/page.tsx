/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { onAuthStateChanged } from "firebase/auth";
import {
  query,
  collection,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { List, ListItem, ListItemText, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../lib/firebase-config";

const page = () => {
  const [todoList, setTodoList] = useState<any[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("firebase user", firebaseUser);
      if (!firebaseUser) {
        router.push("/login");
      } else {
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
          setTodoList(itemArray);
          setIsLoading(false);
          console.log("now itemArray is", itemArray);
        });
        return () => unSubscribeTodo();
      }
    });

    return () => unSubscribeAuth();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "todo", id));
  };

  const handleUpdate = async (id: string) => {
    router.push(`/todo/edit/${id}`);
  };
  return (
    <div>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <List>
          {todoList.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <>
                  <Button onClick={() => handleDelete(todo.id)}>
                    Delete Icon
                  </Button>
                  <Button onClick={() => handleUpdate(todo.id)}>Update</Button>
                </>
              }
            >
              <ListItemText primary={todo.text} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default page;
