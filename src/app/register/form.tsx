"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please add a valid email"
    ),
  tel: z
    .string()
    .regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      "Please add a valid telephone number"
    ),
  role: z.enum(["user", "admin"], {
    required_error: "Role is required",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function FormPage() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      role: "user",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        if (signInResult?.ok) {
          router.push("/");
        } else {
          throw new Error("Login failed");
        }
      } else {
        throw new Error("Registration failed");
      }
      console.log("Registration and login successful", response);
      alert("Registration and login successful");
      router.push("/");
    } catch (error) {
      console.error("Registration or login failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
      sx={{ width: "50%", margin: "auto", mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ""}
          />
        )}
      />
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ""}
          />
        )}
      />
      <Controller
        name="tel"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Tel"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ""}
          />
        )}
      />
      <Controller
        name="role"
        control={form.control}
        render={({ field, fieldState }) => (
          <FormControl fullWidth margin="normal" error={!!fieldState.error}>
            <InputLabel>Role</InputLabel>
            <Select
              {...field}
              label="Role"
              defaultValue="user"
              error={!!fieldState.error}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            {fieldState.error && (
              <Typography variant="body2" color="error">
                {fieldState.error.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ""}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}
