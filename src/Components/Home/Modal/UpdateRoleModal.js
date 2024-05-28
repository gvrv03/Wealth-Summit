"use client";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { useDashboard } from "@/Context/UseDashboardContext";
import { DefaultBTN } from "../Utility/Utility";
import React, { useState } from "react";

export default function UpdateRoleModal({ state, setState }) {
  const { updateUserRole } = useDashboard();
  const [loading, setloading] = useState(false);
  return (
    <>
      <Modal open={state} >
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            Are you absolutely sure you want to Update?
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            This action cannot be undone.
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          >
            <DefaultBTN
              name="Continue"
              clickHandle={() => {
                setloading(true);
                updateUserRole();
                setState(false);
                setloading(false);
              }}
              loading={loading}
              styleCSS="px-5 rounded-md text-sm"
            />

            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setState(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}
