import { TrophyOutlined } from "@ant-design/icons";
import { db } from "../../firebase/firebase";

export async function getCurrentUserWall(
  usercounter: number,
  currentUser: number,
  page?: number
) {
  let responsearray: any[] = [];
  let isLikedByCurrentUser;
  const postRef = db
    .collection("userwall")
    .doc(`${usercounter}`)
    .collection("posts");
  let response: any;

  if (page) {
    response = await postRef
      .orderBy("date", "desc")
      .startAfter(page)
      .limit(5)
      .get();
  } else {
    response = await postRef.orderBy("date", "desc").limit(5).get();
  }

  response.forEach((doc: any) => {
    responsearray.push({ ...doc.data(), postId: doc.id });
  });

  for (let i = 0; i < responsearray.length; i++) {
    isLikedByCurrentUser = await postRef
      .doc(responsearray[i].postId)
      .collection("likes")
      .doc(`${currentUser}`)
      .get();
    let likedType = "";
    if (typeof isLikedByCurrentUser.data() === "object") {
      const datatype = isLikedByCurrentUser.data();
      likedType = datatype?.type;
    }
    responsearray[i] = {
      ...responsearray[i],
      isLikedByCurrentUser: likedType,
    };
  }

  console.log(responsearray);

  return responsearray;
}
