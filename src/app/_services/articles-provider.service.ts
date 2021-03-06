import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ArticlesProviderService {
    constructor(private http: HttpClient) {
    }

    getArticles() {
        return this.http.get<any>(`${environment.API_URL}/article`)
            .pipe(map(articles => articles));

    }

    getArticle(id) {
      return this.http.get<any>(`${environment.API_URL}/article/${id}`);
    }

    generateArticle() {
        return this.http.get<any>(`${environment.API_URL}/generate`);
    }

    getRecommendations(id) {
        return this.http.get<any>(`${environment.API_URL}/recommendations/${id}`)
        .pipe(map(recommendations => recommendations));
    }
    generateLDA() {
        return this.http.get<any>(`${environment.API_URL}/generateLDA`);
    }
}
