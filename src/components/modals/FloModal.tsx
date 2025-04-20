import { Box, Modal, ModalProps, SxProps } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25vw",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "6px",
} as SxProps;

export type FloModalProps = Omit<ModalProps, "sx"> & {
  sx?: SxProps;
};
function FloModal(props: FloModalProps) {
  const { children, sx, ...rest } = props;

  const boxSx = { ...style, ...sx };
  return (
    <Modal {...rest}>
      <Box sx={boxSx}>{children}</Box>
    </Modal>
  );
}

export default FloModal;
