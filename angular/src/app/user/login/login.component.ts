import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorForm = "";

  formLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.authService.login(this.formLogin.value).subscribe(data => {
      if (this.authService.currentRoute)
        this.route.navigate([this.authService.currentRoute]);
      else
        this.route.navigate(['/'])
    }, err => this.errorForm = err.error.message);
  }
}
