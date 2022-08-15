import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://lee-movies.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * userRegistration -- API call to User registration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * userLogin -- API call to User login
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.log('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is : ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try gagin later.')
    );
  }

  // API call to get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get one movie
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get director
  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/director/${director}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get genre
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/Genre/${genre}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get user
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}/${user}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get favorite movies for a user
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}users/${user}/movies`, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to add a movie to favorite movies
  addFavoriteMovie(movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}users/${user}/movies/${movie}`, {
        headers: new HttpHeaders({ Authorization: `Bearer${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to edit user
  updateUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: `Bearer${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to delete user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: `Bearer${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to delete a movie from the favorite movies
  removeFavoriteMovie(movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${user}/movies/${movie}`, {
        headers: new HttpHeaders({ Authorization: `Bearer${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
