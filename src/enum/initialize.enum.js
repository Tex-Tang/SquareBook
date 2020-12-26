import firebase from 'firebase/app'
import Places from './places.enum'
import UECBookEnum from './uec-book.enum'
import CategoriesEnum from './categories.enum'

firebase.firestore().collection('aggregates').doc('uec-book').set(UECBookEnum)
firebase.firestore().collection('aggregates').doc('general').set(
  { places: Places } 
)
firebase.firestore().collection('aggregates').doc('categories').set(CategoriesEnum)
