import { useState, useCallback, useMemo } from "react";

type UseDialogReturn = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  toggleDialog: () => void;
};

export const useDialog = (): UseDialogReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDialog = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return useMemo(
    () => ({
      isOpen,
      openDialog,
      closeDialog,
      toggleDialog,
    }),
    [isOpen, openDialog, closeDialog, toggleDialog]
  );
};
