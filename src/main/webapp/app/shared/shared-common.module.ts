import { NgModule } from '@angular/core';

import { PasserelleSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PasserelleSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PasserelleSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PasserelleSharedCommonModule {}
