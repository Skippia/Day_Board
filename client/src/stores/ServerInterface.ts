interface IUserInfo {
  _id: string
  email: string
  name: string
  gender: TUserGender
  role: TUserRole
}

type TUserGender = 'MALE' | 'FEMALE'
type TUserRole = 'USER' | 'ADMIN'

export type { IUserInfo, TUserGender, TUserRole }
