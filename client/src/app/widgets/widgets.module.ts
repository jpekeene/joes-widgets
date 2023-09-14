import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './all-widgets/widgets.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EditWidgetComponent } from './edit-widget/edit-widget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const ROUTES: Routes = [
    {
        path: '',
        component: WidgetsComponent,
    },
    {
        path: 'edit/:id',
        component: EditWidgetComponent,
    },
    {
        path: 'new',
        component: EditWidgetComponent,
    },
];

@NgModule({
    declarations: [WidgetsComponent, EditWidgetComponent],
    imports: [CommonModule, RouterModule.forChild(ROUTES), SharedModule, ReactiveFormsModule, FormsModule],
})
export class WidgetsModule {}
