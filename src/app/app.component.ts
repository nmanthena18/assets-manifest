import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angmanifest';
  loadApp = false;
  constructor(private http: HttpClient) {

  }

  loadScript() {
    const host = 'http://localhost:4300'
    this.http.get(host + '/assets-manifest.json').subscribe((res: any) => {
      console.log('preparing to load...')
      let script = document.createElement('script');
      script.id = "8a8d789as79d7"
      script.crossOrigin = '';
      script.src = host + '/' + res['runtime.js'];
      script.type = 'text/javascript';
      script.async = true;
      script.charset = 'utf-8';
      script.type = "module";
      document.getElementsByTagName('body')[0].appendChild(script);
      let script2 = document.createElement('script');
      script2.id = "sadde13213123"
      script2.crossOrigin = '';
      script2.src = host + '/' + res['polyfills.js'];
      script2.type = 'text/javascript';
      script2.async = true;
      script2.charset = 'utf-8';
      script2.type = "module";
      document.getElementsByTagName('body')[0].appendChild(script2);

      let script3 = document.createElement('script');
      script3.id = "32434fafdfsdfsdf"
      script3.crossOrigin = '';
      script3.src = host + '/' + res['main.js'];
      script3.type = 'text/javascript';
      script3.async = true;
      script3.charset = 'utf-8';
      script3.type = "module";
      document.getElementsByTagName('body')[0].appendChild(script3);

      this.loadApp = true;
    })
  }
}
