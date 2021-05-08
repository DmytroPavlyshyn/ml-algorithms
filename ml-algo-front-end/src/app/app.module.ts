import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// Material section
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { NotifierModule, NotifierOptions } from 'angular-notifier';

import {AppComponent} from './app.component';
import {GrrnComponent} from './grrn/grrn.component';
import {AlgorithmListComponent} from './algorithm-list/algorithm-list.component';
import {SvrComponent} from './svr/svr.component';
import {SgdComponent} from './sgd/sgd.component';
import {AdaBoostComponent} from './ada-boost/ada-boost.component';
import {RandomForestComponent} from './random-forest/random-forest.component';
import {MlpComponent} from './mlp/mlp.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {AllAlgosComponent} from './all-algos/all-algos.component';
import {UserService} from './user.service';
import {LoginComponent} from './login/login.component';
import {AlgorithmsService} from './algorithms.service';
import {CookieService} from 'ngx-cookie-service';
import {ProtectedDirective} from './protected.directive';
import {TemplateComponent} from './template/template.component';
import {TestAlgoComponent} from './test-algo/test-algo.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {MainComponent} from './main/main.component';
import {RandomForestNewComponent} from './random-forest-new/random-forest-new.component';
import {ScatterComponent} from './scatter/scatter.component';
import {DatasetUploaderComponent} from './dataset/dataset-uploader/dataset-uploader.component';
import {NgxFileDropModule} from "ngx-file-drop";
import { MetricsTableComponent } from './metrics-table/metrics-table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UploadDirective } from './directives/upload.directive';
import { RegisterComponent } from './register/register.component';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
      AppComponent,
      GrrnComponent,
      AlgorithmListComponent,
      SvrComponent,
      SgdComponent,
      AdaBoostComponent,
      RandomForestComponent,
      MlpComponent,
      TopBarComponent,
      AllAlgosComponent,
      LoginComponent,
      ProtectedDirective,
      TemplateComponent,
      TestAlgoComponent,
      MainComponent,
      RandomForestNewComponent,
      ScatterComponent,
      DatasetUploaderComponent,
      MetricsTableComponent,
      FileUploadComponent,
      UploadDirective,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFileDropModule,
    // Material
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatProgressBarModule,
    NotifierModule.withConfig(customNotifierOptions),
    RouterModule.forRoot([
      {path: '', component: AlgorithmListComponent},
      {path: 'algo-list', component: AlgorithmListComponent},
      {path: 'grrn', component: GrrnComponent},
      {path: 'test-algo', component: TestAlgoComponent},
      {path: 'svr', component: SvrComponent},
      {path: 'sgd', component: SgdComponent},
      {path: 'ada-boost', component: AdaBoostComponent},
      {path: 'random-forest', component: RandomForestComponent},
      {path: 'mlp', component: MlpComponent},
      {path: 'all-algos', component: AllAlgosComponent},
      {path: 'login', component: LoginComponent},
      {path: 'upload', component: FileUploadComponent},
      {path: 'auth', component: MainComponent},
    ], {relativeLinkResolution: 'legacy'}),
  ],
  providers: [UserService, AlgorithmsService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
