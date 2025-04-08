/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Container, Typography } from "@mui/material";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db, provider } from "../../../lib/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

const LoginPage = () => {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    console.log("router applied");
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //   if (currentUser) {
      //     router.push("/todos");
      //   }
    });
    return () => unSubscribe();
  }, [router]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userReference = doc(db, "users", user.uid);
      const docSnap = await getDoc(userReference);
      if (!docSnap.exists()) {
        await setDoc(userReference, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
        });
      }
      console.log("result", result, user);
    } catch (err) {
      console.log("err", err, user);
    }
  };

  return (
    <Container>
      <Typography>To Do app 1</Typography>
      <Button onClick={handleLogin}>Sign In With Google</Button>
    </Container>
  );
};

export default LoginPage;
