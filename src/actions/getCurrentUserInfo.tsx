import { db } from "../firebase/firebase";

export async function getCurrentUserInfo(usercounter: number) {
    const response = await db.collection("userinfo").doc(`${usercounter}`).get()
    
    if (response.exists) {
      return response.data()
    }
    throw new Error("error!")
}
  
  