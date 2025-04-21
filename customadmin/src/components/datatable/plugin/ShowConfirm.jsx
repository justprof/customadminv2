import React from "react";
import { Button } from "@chakra-ui/react";
import { Dialog } from "@chakra-ui/react";

const ShowConfirm = ({ isOpen, onClose, onConfirm, deleteTarget }) => {
  const message =
    deleteTarget.length > 1
      ? "Emin misin? Seçilen satırlar silinecek, bu işlem geri alınamaz!"
      : "Emin misin? Seçilen satır silinecek, bu işlem geri alınamaz!";

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <Button
              onClick={onClose}
              position="absolute"
              top="1"
              right="1"
              variant="ghost"
            >
              ✕
            </Button>
          </Dialog.CloseTrigger>

          <Dialog.Header>
            <Dialog.Title>Silme Onayı</Dialog.Title>
            <Dialog.Description>{message}</Dialog.Description>
          </Dialog.Header>

          <Dialog.Footer display="flex" justifyContent="flex-end" gap={3}>
            <Button colorScheme="red" onClick={onConfirm}>
              Evet, Sil!
            </Button>
            <Button variant="ghost" onClick={onClose}>
              İptal Et
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default ShowConfirm;
