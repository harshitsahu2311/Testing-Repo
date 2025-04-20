import { InfoOutlined } from "@mui/icons-material";
import FloModal, { FloModalProps } from "@/components/modals/FloModal";
import { Button } from "@mui/material";

export type BillingBlockConfirmModalProps = Omit<
  FloModalProps,
  "sx" | "children" | "onClose"
> & {
  handleClose: () => void;
  onBlockConfirm: () => void;
  title?: string;
  confirmButtonText?: string;
  id?: string;
};

function BillingBlockConfirmModal(props: BillingBlockConfirmModalProps) {
  const {
    handleClose,
    onBlockConfirm,
    title = "Block Confirmation",
    confirmButtonText = "Yes Block It",
    ...rest
  } = props;

  return (
    <FloModal {...rest} onClose={() => handleClose()}>
      <div className="flex flex-col gap-8 px-4 py-7">
        <div className="flex flex-col justify-center items-center gap-2">
          <InfoOutlined color="error" className="h-16 w-16 min-h-16 min-w-16" />
          <p className="text-base font-medium text-center">{title}</p>
          <p className="text-sm text-center font-normal text-secondary ml-4 mr-4">
            User won't be able to use his account
          </p>
        </div>
        <div className="flex flex-row items-center justify-end gap-3">
          <Button variant="contained" onClick={() => onBlockConfirm()}>
            <p className="py-1 text-sm">{confirmButtonText}</p>
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleClose()}
          >
            <p className="py-1 text-sm">Cancel</p>
          </Button>
        </div>
      </div>
    </FloModal>
  );
}

export default BillingBlockConfirmModal;
