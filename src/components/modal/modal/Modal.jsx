import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  Portal,
  CloseButton,
} from "@chakra-ui/react";

const Modal = ({
  title,
  bodyContent,
  footerContent,
  size = "md",
  closeButton = true,
  triggerButtonLabel = "Modalı Aç",
  triggerButtonProps = {},
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} {...triggerButtonProps}>
        {triggerButtonLabel}
      </Button>

      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} size={size}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>{bodyContent}</Dialog.Body>

              <Dialog.Footer>
                {footerContent || (
                  <Button colorPalette="blue" onClick={() => setIsOpen(false)}>
                    Kapat
                  </Button>
                )}
              </Dialog.Footer>

              {closeButton && (
                <Dialog.CloseTrigger asChild>
                  <CloseButton position="absolute" top={2} right={2} />
                </Dialog.CloseTrigger>
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  bodyContent: PropTypes.node.isRequired,
  footerContent: PropTypes.node,
  size: PropTypes.string,
  closeButton: PropTypes.bool,
  triggerButtonLabel: PropTypes.string,
  triggerButtonProps: PropTypes.object,
};

export default Modal;
