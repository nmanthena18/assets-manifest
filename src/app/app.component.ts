import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angmanifest';
  angApp = {
    id: 'angapp',
    path: 'http://localhost:4300',
    type: 'selector',
    selector: 'child-root',
    eleId: 'ang'
  }

  reactApp = {
    id: 'reactapp',
    path: 'http://localhost:3000',
    type: 'fn',
    selector: 'rendersubapp1',
    eleId: 'react-app-12'

  }
  constructor() {

  }



}
