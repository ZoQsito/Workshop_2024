import { Box } from "@mui/material";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Scheduler } from "@aldabil/react-scheduler";

function CalendarPage() {
  const { isAdmin, setIsAuthenticated, isAuthenticated, decodedToken } =
    useAuth();

  return (
    <>
      <Box>
        <h1>Calendrier</h1>
        <Scheduler
          view="month"
          disableViewNavigator="false"
          events={[
            {
              event_id: 1,
              title: "Event 1",
              start: new Date("2021/5/2 09:30"),
              end: new Date("2021/5/2 10:30"),
            },
            {
              event_id: 2,
              title: "Event 2",
              start: new Date("2021/5/4 10:00"),
              end: new Date("2021/5/4 11:00"),
            },
          ]}
        />
      </Box>
    </>
  );
}

export default CalendarPage;
