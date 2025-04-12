import { listData } from "../../lib/tempData";
import "./list.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { useLoaderData } from "react-router-dom";

function ListPage() {
    const { postsData } = useLoaderData();
    console.log("POSTSSSS___>", postsData)

    return <div className="listPage">
        <div className="listContainer">
            <div className="wrapper">List Page is Alive
                <Filter />
                {postsData.map(item => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </div>
        <div className="mapContainer">
            <Map items={postsData} />
        </div>
    </div>;
}

export default ListPage;