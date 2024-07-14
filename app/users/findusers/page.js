"use client";
import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Checkbox } from "@mui/material";
import AuthService from "../../../services/AuthService";
import Navbar from "../../../components/Navbar";

import { useRouter } from "next/navigation";

export default function FindUsersPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    name: "",
    login_before_date: "",
    login_after_date: "",
    active: false,
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    }
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let finalValue = value;

    if (value === "true" || value === "false") {
      finalValue = value === "true";
    }

    setFilters({ ...filters, [name]: finalValue });
  };

  const handleSearch = async () => {
    const users = await AuthService.findUsers(filters);
    setUsers(users);
  };

  return (
    <>
      <Navbar />
      <div>
        <Container>
          <TextField label="name" name="name" onChange={handleInputChange} />
          <TextField
            label="login_before_date"
            name="login_before_date"
            type="date"
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="login_after_date"
            name="login_after_date"
            InputLabelProps={{
              shrink: true,
            }}
            type="date"
            onChange={handleInputChange}
          />
          <Checkbox
            checked={filters.active}
            onChange={(e) =>
              setFilters({ ...filters, active: e.target.checked })
            }
            name="active"
          />
          <Button onClick={handleSearch}>Buscar</Button>
          <Container>
            {users && users.length > 0 && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      Email
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {user.name}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {user.email}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {user.status ? "Active" : "Inactive"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Container>
        </Container>
      </div>
    </>
  );
}