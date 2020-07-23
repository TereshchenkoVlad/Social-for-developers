export interface User {
   name: string
   email: string
   avatar: string
   date: Date
}

export interface Auth {
   token: string | null
   isAuthenticated: boolean | null
   loading: boolean
   user: User | null
}
