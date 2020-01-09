import {HttpResponse} from '@angular/common/http';

export const REST_API_URL = 'http://localhost:8080';

export function tokenSetter(response: HttpResponse<any>) {
  if (response.headers.has('Authorization')) {
    const jwtToken = response.headers.get('Authorization');
    sessionStorage.setItem('jwt-token', jwtToken);
  }
}
