import { create } from "zustand";

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  addUser: (email, password, name, joinDate) =>
    set(state => ({ users: [...state.users, { email, password, name, joinDate }] })),

  deleteUser: (email) =>
    set(state => ({ users: state.users.filter(user => user.email !== email) })),

  updateUser: (email, password, name, joinDate) =>
    set(state => ({
      users: state.users.map(user =>
        user.email === email
          ? { email, password, name, joinDate }
          : user
      )
    }))
}));


export const useAnnualStore = create<CounterType>((set)=>({
  annualCal:0,
  count:0,
  setAnnualCal : (value:number) => set({ annualCal : value }),
  setCount : (value:number) => set({count : value})
}))

export const useMyStore = create<MyStore>((set) => ({
  data: [],
  addMyData: (myDataArray: MyDataType[]) =>
    set((state: { data: MyDataType[] }) => ({
      data: [...state.data, ...myDataArray]
    })),
}));


