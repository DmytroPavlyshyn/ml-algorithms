import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GrrnComponent } from './grrn/grrn.component';
import { AlgorithmListComponent } from './algorithm-list/algorithm-list.component';
import { SvrComponent } from './svr/svr.component';
import { SgdComponent } from './sgd/sgd.component';
import { AdaBoostComponent } from './ada-boost/ada-boost.component';
import { RandomForestComponent } from './random-forest/random-forest.component';
import { MlpComponent } from './mlp/mlp.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AllAlgosComponent } from './all-algos/all-algos.component';

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
    AllAlgosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AlgorithmListComponent },
      { path: 'grrn', component: GrrnComponent },
      { path: 'svr', component: SvrComponent },
      { path: 'sgd', component: SgdComponent },
      { path: 'ada-boost', component: AdaBoostComponent },
      { path: 'random-forest', component: RandomForestComponent },
      { path: 'mlp', component: MlpComponent },
      { path: 'all-algos', component: AllAlgosComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
