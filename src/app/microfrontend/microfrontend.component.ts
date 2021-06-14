import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-microfrontend',
  templateUrl: './microfrontend.component.html',
  styleUrls: ['./microfrontend.component.scss']
})
export class MicrofrontendComponent implements OnInit, AfterViewInit {
  selector: any;
  isScriptLoad: any;
  @Input() config: any;

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.loadScripts(this.config.id, this.config.path).then((res: any) => {
      if (this.config.type === 'fn') {
        try {
          if (window[this.config.selector]) {
            let caller: any = window[this.config.selector];
            caller(this.config.eleId);
          }
        }
        catch {
          throwError('nooo')
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }

  ngAfterViewInit() {
    if (this.config.type === 'selector') {
      this.selector = this.sanitizer.bypassSecurityTrustHtml(`<${this.config.selector}></${this.config.selector}>`);
    }
  }

  loadScripts(id: string, host: string) {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (document.getElementById(id)) {
        resolve({ script: id, status: 'Already Loaded' });
      }
      else {
        //load script

        let script: HTMLScriptElement = document.createElement('script');
        this.http.get(host + '/asset-manifest.json').subscribe((res: any,) => {
          try {
            script.src = host + '/' + (res['main.js'] || res.entrypoints[0]);
          }
          catch {
            throwError("JS file not found");
          }
        }, err => console.log(err))

        //load script
        script.type = 'text/javascript';
        script.id = id;
        script.async = true;
        script.onload = () => {
          resolve({ script: id, loaded: true, status: 200 });
        };
        script.onerror = (error: any) => {
          reject({ script: id, loaded: false, status: 'error', error })
        };
        document.getElementsByTagName('head')[0].appendChild(script);

      }
    });
  };

}
