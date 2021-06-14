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
  @Input() config: any;

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    console.log(this.config)
    this.loadScripts(this.config.id, this.config.path).then((res: any) => {
      if (res.status === 200) {
      }
    })
  }

  ngAfterViewInit() {
    if (this.config.type === 'selector') {
      this.selector = this.sanitizer.bypassSecurityTrustHtml(`<${this.config.selector}></${this.config.selector}>`);
    } else if (this.config.type === 'fn') {
      console.log(this.config.selector, window[this.config.selector])
      try {
        if (document.getElementById(this.config.id)) {
          console.log(document.getElementById(this.config.id))
          setTimeout(() => {
            let caller: any = window[this.config.selector];
            console.log(window[this.config.selector])
            caller(this.config.eleId);
          }, 200)
        }
      }
      catch {
        throwError('nooo')
      }

    } else {
      throwError('Invalid selector');
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
        this.http.get(host + '/asset-manifest.json').subscribe((res: any) => {
          console.log('preparing to load...')
          script.src = host + '/' + (res['main.js'] || res.entrypoints[0]);
        })

        //load script
        script.type = 'text/javascript';
        script.id = id;
        script.async = true;
        if (script.onloadstart) {  //IE
          script.onloadstart = () => {
            if (script.onloadeddata) {
              resolve({ script: id, loaded: true, status: 'Loading start' });
            }
          };
        } else {  //Others
          script.onload = () => {
            resolve({ script: id, loaded: true, status: 200 });
          };
        }
        script.onerror = (error: any) => reject({ script: id, loaded: false, status: 'error', error });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  };

}
