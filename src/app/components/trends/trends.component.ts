import { Component } from '@angular/core';
import { TrendService } from '../../Services/trend.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './trends.component.html',
  styleUrl: './trends.component.css'
})
export class TrendsComponent {
  articles: any[] = [];
  guardian$!: Observable<any[]>;

  constructor(private trendService: TrendService) { }

  ngOnInit(): void {
    this.getTeslaNews();
    this.getGuardianNews();
  }

  getTeslaNews(): void {
    this.trendService.getTeslaNews().subscribe({
      next: (data) => {
        this.articles = data.articles.slice(0, 3); 
      },
      error: (error) => {
        console.error('Error fetching news:', error);
      }}
    );
  }


  getGuardianNews(): void {
    this.guardian$ = this.trendService.getGuardianNews().pipe(
      map((data: any) => data.response.results)
    );
  }
}