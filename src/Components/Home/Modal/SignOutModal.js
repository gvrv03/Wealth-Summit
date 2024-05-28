"use client";
import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { useUserAuth } from "@/Context/UserAuthContext";

export default function SignOutModal({ state, setState }) {
  const { signOut } = useUserAuth();

  return (
    <React.Fragment>
      <Modal open={state} onClose={() => setState(false)}>
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
          Are you absolutely sure you want to log out?
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
            <Button
              className="bg-primaryColor"
              onClick={() => {
                signOut();
                setState(false);
              }}
            >
              Continue
            </Button>
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
    </React.Fragment>
  );
}
