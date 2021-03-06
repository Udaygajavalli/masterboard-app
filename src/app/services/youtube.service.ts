import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  getPlaylistItems(id: string): Observable<any> {
    return this.http.get<any>(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${id}&key=${environment.googleAPI_KEY}`
    );
  }
  getPlaylistDetails(id: string): Observable<any> {
    return this.http.get<any>(
      `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${environment.googleAPI_KEY}`
    );
  }
}
