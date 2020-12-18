import { db } from "../firebase/firebase";

export async function getCurrentUserWall(usercounter: number) {
    const response = await db.collection("userwall").doc(`${usercounter}`).get()
    
    if (response.exists) {
      return response.data()
    }
    throw new Error("error!")
}
  
  