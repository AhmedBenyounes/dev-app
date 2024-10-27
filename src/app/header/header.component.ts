import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn:boolean
  userDetails:any;

  constructor(private router:Router,public service:CrudService) { 
  
  }
 

  ngOnInit(): void {
    this.isLoggedIn=this.service.isLoggedIn()
  }
logout(){
  console.log("logout");
  localStorage.clear()
  this.router.navigate(['/']).then(()=>{window.location.reload()});
  
}
}
