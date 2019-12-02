import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthServiceService} from '@app/service/auth-service.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(private authService: AuthServiceService) { }
  submit() {
    console.log(this.form.value)
    if (this.form.value.email && this.form.value.password) {
        this.authService.login(this.form.value)
          .pipe(first())
          .subscribe(data => {
            if (data) {
              console.log(data);
            }
        });
    }
  }
  ngOnInit() {
  }

}
