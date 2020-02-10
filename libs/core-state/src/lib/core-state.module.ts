import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPersistence } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreModule } from '@ngrx/store';

import { CoreDataModule } from '@mdv13/core-data';
import { reducers } from '.';
import { AuthEffects } from './auth/auth.effects';
import { TasksEffects } from './tasks/tasks.effects';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true
  }
};

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([
      AuthEffects,
      TasksEffects
    ]),
    StoreDevtoolsModule.instrument({ name: 'mdv13 Store' })
  ],
  providers: [DataPersistence]
})
export class CoreStateModule {}
