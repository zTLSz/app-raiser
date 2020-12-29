import { db } from "../firebase/firebase";

export async function getCurrentUserWall(usercounter: number) {
    let responsearray: any[] = [];
    const response = await db.collection("userwall")
                            .doc(`${usercounter}`).collection('posts')
                            .orderBy("date", "desc").limit(3).get();

    response.forEach((doc) => {
      responsearray.push(doc.data())
    });

    return responsearray;
}
  
  