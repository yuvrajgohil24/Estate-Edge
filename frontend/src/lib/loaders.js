// import { defer } from "react-router-dom";
import apiRequest from "./apiCall.js";

export const singlePageLoader = async ({ request, params }) => {
    const res = await apiRequest("/posts/" + params.id);
    return res.data;
};
export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    console.log("REQUEST-->", request, query)
    const postResponse = await apiRequest("/posts?" + query);
    // return postPromise.data;
    return ({
        postsData: postResponse.data,
    });
};

export const profilePageLoader = async () => {
    const postResponse = await apiRequest("/users/profilePosts");
    const chatResponse = await apiRequest("/chats");
    return ({
        postData: postResponse.data,
        chatData: chatResponse.data,
    });
    // return defer({
    //     postResponse: postPromise,
    //     chatResponse: chatPromise,
    // });
};