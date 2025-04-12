import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import UserList from "../../components/userList/UserList";
import apiRequest from "../../lib/apiCall";
import "./profile.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
    const { postData, chatData } = useLoaderData();
    // console.log("Profile-->", data)

    const navigate = useNavigate();

    const { currentUser, updateUser } = useContext(AuthContext);


    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            // localStorage.removeItem("user");
            navigate("/");

        } catch (error) {
            console.error("Error in logout: ", error);
        }
    }

    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to={"/profile/update"}>
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>
                            Avatar:
                            <img
                                src={currentUser.avatar || "/noavatar.jpg"}
                                alt=""
                            />
                        </span>
                        <span>
                            Username: <b>{currentUser.username}</b>
                        </span>
                        <span>
                            E-mail: <b>{currentUser.email}</b>
                        </span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <Link to={"/add"}>
                            <button>Create New Post</button>
                        </Link>
                    </div>
                    <UserList posts={postData.userPosts} />
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <UserList posts={postData.savedPosts} />
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat chats={chatData} />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;