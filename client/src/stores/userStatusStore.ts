import { create } from "zustand";
import { persist } from "zustand/middleware";

type STATUS = {
  status: boolean;
};
const initialState: STATUS = {
  status: false,
};

export const userStatusStore = create<STATUS>()(
  persist(() => initialState, { name: "userIDStore" })
);

export default function userStatusService() {
  const { status } = userStatusStore();

  return {
    saveUserStatus: (status: boolean) => {
      userStatusStore.setState({ status });
    },
  };
}
