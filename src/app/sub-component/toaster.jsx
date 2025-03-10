"use client";
import Snackbar from "@mui/joy/Snackbar";
import Button from "@mui/joy/Button";

export default function Toaster({ toast, setToast }) {
  return (
    <>
      <Snackbar
        variant="soft"
        color="success"
        open={toast.status}
        onClose={() => setToast({ ...toast, status: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000} // Auto-hide after 3000ms (3 seconds)
        endDecorator={
          <Button
            onClick={() => setToast({ ...toast, status: false })}
            size="sm"
            variant="soft"
            color="success"
          >
            Dismiss
          </Button>
        }
      >
        {toast.message}
      </Snackbar>
    </>
  );
}
