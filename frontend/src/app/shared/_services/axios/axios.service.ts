import { Injectable } from '@angular/core';
import  axios from 'axios';
import {AuthService} from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private authService: AuthService) {
    axios.defaults.baseURL = "http://localhost:8080"
    axios.defaults.headers.post["Content-Type"] = "application/json"
  }

  private getHeaders(): Record<string, string> {
    if (this.authService.isAuthenticated()) {
      return { "Authorization": "Bearer " + this.authService.getToken() };
    }
    return {};
  }

  request(method: string, url: string, data: any) {

    const headers = this.getHeaders()

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    })
  }
}
