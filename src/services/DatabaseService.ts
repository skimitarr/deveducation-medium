import { db } from '../firebase'
import  {
  collection,
  onSnapshot,
  query,
  doc, setDoc
} from "firebase/firestore";
// import { IArticle } from '../components/Interfaces';

export interface IstateArticleProps {
  articles: IArticle[];
}

export interface IProps {
  item: IArticle
}
export interface IArticle {
  description: string
  expertComment: string
  imageUrl: string
  title: string
}

import data from '../firebase-data.json'
const watchArticles = (fn: (arr: IArticle[]) => void) => {
  const queryCollection = query(collection(db, 'deveducation-easy'));
  const unsubscribe = onSnapshot(queryCollection, (data) => {
    const arrOfArticles: IArticle[] = [];
    data.forEach((item) => {
      arrOfArticles.push({
        title: item.data().title,
        description: item.data().description,
        imageUrl: item.data().imageUrl,
        expertComment: item.data().expertComment
      });
    });
    fn(arrOfArticles);
  })
  return () => unsubscribe()
}

const setDataToFirestorm = () => {
  setDoc(doc(db, "deveducation-medium", "myId"), data);
}


export { watchArticles, setDataToFirestorm }

// const getArticlesAsync = () => (dispatch: Dispatch<AnyAction>) => {
//   const queryCollection = query(collection(db, 'deveducation-medium'));
//   const unsubscribe = onSnapshot(queryCollection, (data) => {
//     let accounts: IAccount = {} as IAccount;
//     let rooms: IRoom[] = [];
//     data.forEach((item) => {
//       accounts = {...item.data().Accounts};
//       rooms = [...item.data().Rooms];
//     });
//     dispatch(getAccounts(accounts));
//     dispatch(getRooms(rooms));
//   })
//   return () => unsubscribe()
// }
