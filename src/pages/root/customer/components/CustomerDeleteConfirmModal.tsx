import { InfoOutlined } from "@mui/icons-material";
import FloModal, { FloModalProps } from "@/components/modals/FloModal";
import { Button } from "@mui/material";

export type CustomerDeleteConfirmModalProps = Omit<
  FloModalProps,
  "sx" | "children" | "onClose"
> & {
  handleClose: () => void;
  onDeleteConfirm: () => void;
};

function CustomerDeleteConfirmModal(props: CustomerDeleteConfirmModalProps) {
  const { handleClose, onDeleteConfirm, ...rest } = props;
  return (
    <FloModal {...rest} onClose={() => handleClose()}>
      <div className="flex flex-col gap-8 px-4 py-7">
        <div className="flex flex-col justify-center items-center gap-2">
          <InfoOutlined color="error" className="h-16 w-16 min-h-16 min-w-16" />
          <p className="text-base font-medium text-center">Are You Sure!</p>
          <p className="text-sm text-center font-normal text-secondary ml-4 mr-4">
            This account will be deleted permanently from flo
          </p>
        </div>
        <div className="flex flex-row items-center justify-end gap-3">
          <Button variant="contained" onClick={() => onDeleteConfirm()}>
            <p className="py-1 text-sm">Yes Delete It</p>
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

export default CustomerDeleteConfirmModal;
