import { NgModule } from '@angular/core';
import * as notesEffects from './store/notes.effects';
import { notesFeature } from './store/notes.feature';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
@NgModule({
  providers: [provideState(notesFeature), provideEffects(notesEffects)],
})
export class AppModule {}
