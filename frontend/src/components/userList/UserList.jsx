import './userList.scss'
import Card from "../card/Card"
import { listData } from "../../lib/tempData"

function List({ posts }) {
    console.log("posts", posts)
    return (
        <div className='list'>
            {posts.map(item => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    )
}

export default List