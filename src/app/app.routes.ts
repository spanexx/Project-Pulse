import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectManagerComponent } from './components/project-manager/project-manager.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AuthGuard } from './AuthGuard/AuthGuard';
import { NotesContainerComponent } from './components/notes/notes-container/notes-container.component';
import { StatsComponent } from './components/stats/stats.component';
import { IdeaManagementComponent } from './components/idea-management/idea-management.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HotspotComponent } from './components/hotspot/hotspot.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { TrendsComponent } from './components/trends/trends.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'log-in', component: LogInComponent},
    {path: 'sign-up', component: SignupComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}, 
    {path: 'project-manager', component: ProjectManagerComponent, canActivate: [AuthGuard]}, 
    {path: 'task-list', component: TaskListComponent, canActivate: [AuthGuard]}, 
    {path: 'stats', component: StatsComponent, canActivate: [AuthGuard]}, 
    {path: 'idea-manager', component: IdeaManagementComponent, canActivate: [AuthGuard]}, 
    {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
    {path: 'archives', component: ArchivesComponent, canActivate: [AuthGuard]},  
    {path: 'hotspot', component: HotspotComponent},
    {path: 'trends', component: TrendsComponent},




    {path: 'notes', canActivate: [AuthGuard], children:[
        {path: 'notes-container', component: NotesContainerComponent},
        
    ]},

    {path: '**', component: HotspotComponent}
];
