import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const ShowConfirm = ({ isOpen, onClose, onConfirm, deleteTarget }) => {
  const message =
    deleteTarget.length > 1
      ? "Emin misin? Seçilen satırlar silinecek, bu işlem geri alınamaz!"
      : "Emin misin? Seçilen satır silinecek, bu işlem geri alınamaz!";

  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogBackdrop />
      <DialogContent>
        <DialogTitle>Silme Onayı</DialogTitle>
        <DialogDescription>{message}</DialogDescription>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
            marginTop: "1.5rem",
          }}
        >
          <Button colorScheme="red" onClick={onConfirm}>
            Evet, Sil!
          </Button>
          <Button variant="ghost" onClick={onClose}>
            İptal Et
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowConfirm;
