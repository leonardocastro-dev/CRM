import { create } from "zustand";

interface DialogStore {
  editDialogOpen: string | null;
  setEditDialogOpen: (id: string | null) => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  editDialogOpen: null,
  setEditDialogOpen: (id: string | null) => set({ editDialogOpen: id }),
}));
export default useDialogStore;

