export interface ProfileError {
   msg: string
   status: string
}

export interface Profile {
   profile: any
   profiles: Array<any>
   repos: Array<any>
   loading: boolean
   error: ProfileError | {}
}
