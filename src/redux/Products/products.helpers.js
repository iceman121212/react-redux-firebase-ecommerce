import { firestore } from "../../firebase/utils"

export const handleAddNewProduct = product => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc()
      .set(product)
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const handleFetchProducts = ({ filterType }) => {
  return new Promise((resolve, reject) => {

    let ref = firestore.collection('products').orderBy('createdDate')
    console.log({ filterType })
    if (filterType) {
      ref = ref.where('productCategory', '==', filterType)
    }

    ref
      .get()
      .then(snapshot => {
        const productsArray = snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            documentID: doc.id,
          }
        })
        resolve(productsArray)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const handleDeleteProduct = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(documentID)
      .delete()
      .then(() => {
        console.log(documentID, 2)
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}
