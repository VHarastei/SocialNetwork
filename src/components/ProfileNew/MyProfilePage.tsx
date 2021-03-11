import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getStatus, getUserProfile } from "../../redux/profileReducer";
import { AppStateType } from "../../redux/reduxStore";
import { PeopleProfile } from "../Users/PeopleProfile/PeopleProfile";


export const ProfilePage = () => {
  const userId = useSelector((state: AppStateType) => state.auth.userId) as number
  useEffect(() => {
    getUserProfile(userId);
    getStatus(userId);
  }, [userId])



  return <div>
    {/* <PeopleProfile /> */}

  </div>;
}