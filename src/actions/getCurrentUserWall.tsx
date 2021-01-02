import { TrophyOutlined } from "@ant-design/icons";
import { db } from "../firebase/firebase";

export async function getCurrentUserWall(usercounter: number, currentUser: number) {
    let responsearray: any[] = [];
    let isLikedByCurrentUser;
    const postRef = db.collection("userwall").doc(`${usercounter}`).collection('posts')
    const response = await postRef.orderBy("date", "desc").limit(5).get();

    response.forEach((doc) => {
      responsearray.push({ ...doc.data(), postId: doc.id })
    });

    for (let i=0; i < responsearray.length; i++) {
      isLikedByCurrentUser = await postRef.doc(responsearray[i].postId).collection('likes').doc(`${currentUser}`).get() 
      responsearray[i] = {
        ...responsearray[i],
        isLikedByCurrentUser: typeof isLikedByCurrentUser.data() === "object" ? true : false
      }  
    }



    return responsearray;
}
  
  