import { Pipe, PipeTransform } from '@angular/core';
import { ROUTING_PATH } from '../const/router.const';
/**
 * convert the value y,n to chines 是,否
 *
 * Usage:
 *   input | yesNoChinese
 *
 * Example:
 *   {{ 'Y' | yesNoChinese }}
 *   formats to: 是
 *
 * Usage 2:
 *   output = yesNoChinesePipe.transform(input)
 *
 * Example 2 (in component, need provide pipe in module.ts):
 *
 * ```
 * constructor(
 *  ...
 *  private yesNoChinesePipe: YesNoChinesePipe
 * ) { }
 * ...
 *   output = this.yesNoChinesePipe.transform(input);
 * ...
 *  ```
 */
@Pipe({ name: 'funcPipe' })
export class FunctionPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case ROUTING_PATH.ACCOUNT:
                return '帳戶';
            case ROUTING_PATH.MARQUEE:
                return '跑馬燈';
            case ROUTING_PATH.ACCOUNT:
                return '帳戶';
            case ROUTING_PATH.UPLOAD_PDF:
                return '上傳PDF';
            default:
                return '';

        }

    }
}
