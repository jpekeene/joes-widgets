import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'widgets',
        pathMatch: 'full',
    },
    {
        path: 'widgets',
        loadChildren: () => import('./widgets/widgets.module').then((m) => m.WidgetsModule),
    },
    {
        path: 'manufacturers',
        loadChildren: () => import('./manufacturers/manufacturers.module').then((m) => m.ManufacturersModule),
    },
    {
        path: 'widget-types',
        loadChildren: () => import('./widget-types/widget-types.module').then((m) => m.WidgetTypesModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
