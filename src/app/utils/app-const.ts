import { environment } from '@env/environment';

export const LocalStorageKey = {
  authUser: `authUser`
}
export const Api = {
    login: environment.host + '/login'
}
