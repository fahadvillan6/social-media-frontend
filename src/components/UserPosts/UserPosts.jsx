/* eslint-disable no-param-reassign */
import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { fetchUserPosts } from "../../apiRequests/Postapi";
import Post from "../Post/Post";
import {CloudName as cloudName} from '../../Constants/defaults'


// eslint-disable-next-line react/prop-types
function UserPosts({id}) {
  const [Posts, setPosts] = useState([]);
  const { userId } = useSelector((state) => state.authReducer);
  const isLoggedUser = id === userId;
  const fetchPosts = async () => {
    const res = await fetchUserPosts(id);
    setPosts(res.data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const myCld = new Cloudinary({ cloud: { cloudName} });
  return Posts?.length === 0 ? (
    // eslint-disable-next-line react/no-unescaped-entities
    <Text className="text-center">
      {isLoggedUser ? "You don't added any Post" : "No Posts"}
    </Text>
  ) : (
    Posts?.map((val) => {
      const publicid = val?.image?.split("/")[7]?.split(".")[0];
      const img = myCld.image(publicid);
      val.img = img;
      // eslint-disable-next-line no-underscore-dangle
      val.userid._id = id;
      return (
        <div className=" w-full ">
          <Post post={val} fetchAll={fetchPosts} isProfile />
        </div>
      )
    })
  );
}

export default UserPosts;
