import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

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
    ScatterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFileUploaderModule,
    RouterModule.forRoot([
      {path: '', component: MainComponent},
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
    ], {relativeLinkResolution: 'legacy'}),
  ],
  providers: [UserService, AlgorithmsService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
