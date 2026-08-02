import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


const docRef=(uid:string)=> doc(db,"users",uid);

export async function getUser(uid:string){
    return await getDoc(docRef(uid));
}

async function registerUser(uid:string,name:string,email:string,photo:string){
    const userData={
        name:name,
        email:email,
        photo:photo,
        onboardingCompleted:false,
        musicalProfile:{
            artists:[],
            genres:[]
        }
    }
    await setDoc(docRef(uid),userData);

    return userData;
}



export async function loginWithEmailPassword (email:string,password:string){

    const userAuth= await signInWithEmailAndPassword(auth,email,password);
    const docSnap= await getUser(userAuth.user.uid);

    return {uid:userAuth.user.uid,...docSnap.data()} as User;
}

export async function authWithGoogle (){

    const provider= new GoogleAuthProvider();
    const userAuth = await signInWithPopup(auth,provider);
    const authData=userAuth.user;
    const docSnap = await getUser(authData.uid);
    if(!docSnap.exists()){
        const userData= await registerUser(authData?.uid,authData.displayName,authData.email,authData.photoURL);
        return {uid:authData.uid,...userData} as User;
    } else {
        return {uid:authData.uid,...docSnap.data()} as User;
    }

}

export async function register (name:string,email:string,password:string){

    const userAuth= await createUserWithEmailAndPassword(auth,email,password);
    const userData = await registerUser(userAuth.user.uid,name,email,"");

    return {uid:userAuth.user.uid,...userData} as User;

}

