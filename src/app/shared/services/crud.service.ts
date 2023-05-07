import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Result } from 'src/app/shared/models/result';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private resultCollection: AngularFirestoreCollection<Result>;
  results: Observable<Result[]>;

  constructor(private firestore: AngularFirestore) {
    this.resultCollection = this.firestore.collection<Result>('Results', ref => ref.orderBy('time'));
    this.results = this.resultCollection.valueChanges({ idField: 'id' });
  }

  addResult(result: Result): Promise<void> {
    const newResult = Object.assign({}, result);
    newResult.id = this.firestore.createId();
    return this.resultCollection.doc(newResult.id).set(newResult);
  }

  deleteResult(resultId: string): Promise<void> {
    return this.resultCollection.doc(resultId).delete();
  }

  getResults(): Observable<Result[]> {
    return this.results;
  }
}
