import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private apiService: ApiService) {}

  getRepositories(): Observable<{ success: boolean; data: Repository[] }> {
    return this.apiService.get<{ success: boolean; data: Repository[] }>('repositories');
  }

  syncRepositories(): Observable<{ success: boolean; message: string; data: Repository[] }> {
    return this.apiService.post<{ success: boolean; message: string; data: Repository[] }>('repositories/sync', {});
  }

  getRepository(id: string): Observable<{ success: boolean; data: Repository }> {
    return this.apiService.get<{ success: boolean; data: Repository }>(`repositories/${id}`);
  }
}