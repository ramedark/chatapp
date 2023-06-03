import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserStatus } from './modules/user-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.http.get("api/users").subscribe((users) => { console.log(users) })


    this.http.delete("api/users/0").subscribe((users) => { console.log(users) })
    this.http.get("api/users").subscribe((users) => { console.log(users) })


    this.http.post("api/users", {
      id: 7, name: "ab3abdo", status: UserStatus.Online
    }).subscribe((users) => { console.log(users) })
    this.http.get("api/users").subscribe((users) => { console.log(users) })


    this.http.put("api/users", {
      id: 3,
      name: "3baas"
    }).subscribe((users) => { console.log(users) })
    this.http.get("api/users").subscribe((users) => { console.log(users) })

  }
  title = 'simple-chat-app';

}
