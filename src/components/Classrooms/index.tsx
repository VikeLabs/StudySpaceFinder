import { useEffect, useState } from 'react'
import ClassroomCard from './ClassroomCard';
import { useSearchParams } from "react-router-dom";
import { mockFetch } from "mock";
import Container from "components/common/Container";
import { PageTitle } from "components/common/PageTitle";

function ClassroomCardsContainer(input: any){
    const [params, setparams] = useSearchParams();
    const [building, setBuilding] = useState(params.get('building'))
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        mockFetch("resolve", 100)
        .then((response) => response.json())
        .then((data) => setData(data[building]))
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }, []);

    return(
        <Container>
            <PageTitle name={building}/>
            {loading ? <p>Loading...</p> : 
            <div>
                { data && Object.keys(data).map((key: any) => {
                    return <ClassroomCard name={key} classroom={data[key]} building={building}/>
                })}
            </div>}                
        </Container>
    );
}
    


export default ClassroomCardsContainer