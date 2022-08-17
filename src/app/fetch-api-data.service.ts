import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Declaring the API URL that provides data for the application
const apiUrl = 'https://lee-movies.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject HttpClient module to constructor params
  constructor(private http: HttpClient) {}

  /**
   * calls API endpoint to register a new user
   * @param userDetails
   * @returns a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * calls API endpoint to login an existing user
   * @param userDetails
   * @returns data of the user in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * handles errors
   * @param error
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error Body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try gagin later.')
    );
  }

  /**
   * calls API endpoint to get data on all movies
   * @returns array of all movies in JSON format
   */
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

  /**
   * calls API endpoint to get data on a single movie specified by its title
   * @param title
   * @returns JSON object holding movie data
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to get data on a director
   * @param name
   * @returns JSON obejct holding director data
   */
  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/director/${director}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to get data on a genre
   * @param name
   * @returns JSON object holding genre data
   */
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/Genre/${genre}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to get data on a single user
   * @returns JSON object holding data about the requested user
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}/${user}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to get list of favorite movies of this user
   * @returns list of the user's favorite movies in JSON format
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}users/${user}/movies`, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to add a movie to the user's list of favorite movies
   * @param movieID
   * @returns JSON object holding data about the updated user
   */
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(
        `${apiUrl}users/${user}/movies/${movieID}`,
        { FavoriteMovie: movieID },
        {
          headers: new HttpHeaders({ Authorization: `Bearer${token}` }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to allow user to update their user information
   * @param updateDetails
   * @returns JSON object holding data about the updated user
   */

  updateUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}users/${user}`, updateDetails, {
        headers: new HttpHeaders({ Authorization: `Bearer${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to deregister an existing user
   * @returns	A success message indicating that the profile was successfully deleted.
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: `Bearer${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to delete a movie from the user's list of favorite movies
   * @param movieID
   * @returns JSON object holding data about the updated user
   */
  removeFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${user}/movies/${movieID}`, {
        headers: new HttpHeaders({ Authorization: `Bearer${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * extracts response data from HTTP response
   * @param res
   * @returns response body or empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
