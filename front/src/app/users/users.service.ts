import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  host = 'http://localhost:3000/api';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private http: HttpClient) {}
  getTasks() {
    return this.http.get(`${this.host}/tasks`);
  }
  addTask(todo: string) {
    return this.http.post(`${this.host}/tasks`, {
      name: todo,
      completed: false,
    });
  }
  deleteTask(id: number) {
    return this.http.delete(`${this.host}/tasks/${id}`);
  }
}
