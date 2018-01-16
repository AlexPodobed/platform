import { MetaReducer } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Book } from '../models/book';
import {
  CollectionActionTypes,
  CollectionActions,
} from './../actions/collection';

export interface State extends EntityState<Book> {}

const adapter = createEntityAdapter({
  selectId: (book: Book) => book.id,
  sortComparer: (a: Book, b: Book) =>
    a.volumeInfo.title.localeCompare(b.volumeInfo.title),
});

const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: CollectionActions
): State {
  switch (action.type) {
    case CollectionActionTypes.AddBook: {
      return adapter.addOne(action.payload, state);
    }

    case CollectionActionTypes.RemoveBook: {
      return adapter.removeOne(action.payload.id, state);
    }

    default: {
      return state;
    }
  }
}

export const { selectIds, selectAll } = adapter.getSelectors();
