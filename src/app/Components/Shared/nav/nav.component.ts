import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  constructor(private route : Router){}
  isCollapsed = true;

  rotaLogin: boolean | undefined;

  
  ngOnInit(): void {

  }

  verificaRota ():boolean{
    return this.route.url !== '/user/login'    
  }
}
