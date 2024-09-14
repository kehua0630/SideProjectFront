import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import {
  ClassicEditor,
  AccessibilityHelp,
  AutoLink,
  Autosave,
  Bold,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Italic,
  Link,
  Paragraph,
  SelectAll,
  Strikethrough,
  Underline,
  Undo,
  type EditorConfig
} from 'ckeditor5';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class MarqueeComponent {

  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {}; // CKEditor needs the DOM tree before 

  trustedMarqueeText?: SafeHtml;
  marqueeHtmlSpace = '&nbsp; ';
  marqueeHtmlSpaceNumber = 8;

  isQueryingMarquee = true;
  marqueeText?: string;
  marquees?: any[];

  /** server marqueeParameter */
  marqueeParameter = {
    RenewTime: '5',
    Direction: 'LeftToRight',
    Speed: '3',
  };

  /** parse server marqueeParameter to parameter for html <marquee> tag */
  marqueeHtmlElementParameter = {
    htmlDirection: 'left',
    htmlScrollamount: '3',
  };

  settingForm: FormGroup = this.fb.group({
    renewTime: '5',
    direction: 'LeftToRight',
    speed: '3'
  });

  constructor(
    private changeDetector: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder) { }


  ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    this.config = {
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'link'
        ],
        shouldNotGroupWhenFull: false
      },
      plugins: [
        AccessibilityHelp,
        AutoLink,
        Autosave,
        Bold,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Italic,
        Link,
        Paragraph,
        SelectAll,
        Strikethrough,
        Underline,
        Undo
      ],
      fontFamily: {
        supportAllValues: true
      },
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
      },
      initialData: '',
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file'
            }
          }
        }
      },
      placeholder: 'Type or paste your content here!'
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }

  getMarquee(): void {
    this.isQueryingMarquee = true;
    // this.marqueeService.getMarquees((data) => {
    //   console.log(data);
    //   if (RETCODE.SUCCESS !== data.RetCode) {
    //     this.loggerService.error(COMMON.CSM_CONSOLE_LOG_PREFIX, data.RetMsg);
    //     // custom error handle
    //     return;
    //   }
    //   this.marqueeParameter.RenewTime =
    //     data.RetResult.MarqueeSetup.RenewTime;
    //   const serverDirection = data.RetResult.MarqueeSetup.Direction;
    //   switch (serverDirection) {
    //     case 'LeftToRight': {
    //       this.marqueeHtmlElementParameter.htmlDirection = 'right';
    //       break;
    //     }
    //     case 'RightToLeft': {
    //       this.marqueeHtmlElementParameter.htmlDirection = 'left';
    //       break;
    //     }
    //     case 'TopToBottom': {
    //       this.marqueeHtmlElementParameter.htmlDirection = 'down';
    //       break;
    //     }
    //     case 'BottomToTop': {
    //       this.marqueeHtmlElementParameter.htmlDirection = 'up';
    //       break;
    //     }
    //     default: {
    //       throw new Error(
    //         `serverDirection:${serverDirection} not implemented.`
    //       );
    //     }
    //   }

    //   this.marqueeHtmlElementParameter.htmlScrollamount =
    //     data.RetResult.MarqueeSetup.Speed;

    //   this.marquees = data.RetResult.Marquees;

    //   const text = this.getMarqueeText(this.marquees);

    //   this.marqueeText = text.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '');
    //   // console.log(this.marqueeText);

    //   let marqueeHtml = '';
    //   const marqueOpenTag =
    //     '<marquee id="marquee" class="GeneratedMarquee" ' +
    //     // 'direction="left" scrollamount="8" behavior="scroll">';
    //     'direction="' +
    //     this.marqueeHtmlElementParameter.htmlDirection +
    //     '" scrollamount="' +
    //     this.marqueeHtmlElementParameter.htmlScrollamount +
    //     '" behavior="scroll">';

    //   marqueeHtml = marqueOpenTag;
    //   marqueeHtml = marqueeHtml.concat(this.marqueeText, '');
    //   const marqueCloseTag = '</marquee>';
    //   marqueeHtml = marqueeHtml.concat(marqueCloseTag, '');

    //   // // TODO if angular sanitize innerHtml but want keep html style use this and check XSS issue
    //   this.trustedMarqueeText = this.sanitizer.bypassSecurityTrustHtml(
    //     marqueeHtml
    //   );
    //   // console.log(this.trustedMarqueeText);

    //   this.isQueryingMarquee = false;
    //   console.log('marquee renew end');

    //   // job for next time to renew marquee
    //   this.jobToRefreshMarquee(
    //     parseInt(this.marqueeParameter.RenewTime || '3', 10)
    //   );
    // });
  }

  getMarqueeText(marquees: any[]): string {
    let text = '';
    for (const marquee of marquees) {
      text += marquee.Content;
      text += this.marqueeHtmlSpace.repeat(this.marqueeHtmlSpaceNumber);
    }
    // Remove the start <p> or <p attr="">
    //  Replace the end
    text = text.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '');
    // console.log(text);
    return text;
  }

  jobToRefreshMarquee(marqueeRenewTime: number): void {
    const renewMilliseconds = marqueeRenewTime * 60 * 1000;

    setTimeout(() => {
      this.getMarquee();
    }, renewMilliseconds);
  }
}


