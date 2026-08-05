import { doc, updateDoc } from "firebase/firestore"
import { db } from "../lib/firebase"

type CompleteOnboardingProps={
    uid?:string
    genres:string[],
    artists:MediaItem[]
}
export default async function CompleteOnboarding({uid,genres,artists}:CompleteOnboardingProps){
    const docRef=doc(db,"users",uid)
    await updateDoc(docRef,{
        onboardingCompleted:true,
        musicalProfile:{
            artists:artists,
            genres:genres
        }
    })

    
}