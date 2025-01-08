import React, {useEffect, useState} from 'react';
import {useFetching} from "../../Hooks/useFetching";
import {getCertificates} from "../../API/APICertificates";
import cl from './PageCertificates.module.css'
import Loader from "../../Components/Loader/Loader";
import DropdownMenu from "../../Components/DropdownMenu/DropdownMenu";
import {useNavigate} from "react-router-dom";

const PageCertificates = () => {
    const navigate = useNavigate()
    const [certificates, setCertificates] = useState([])
    const [chosen, setChosen] = useState({NAME:'Выберете товар...'})
    const [fetchData, isLoading, , isDone] = useFetching(async () => {
        const response = await getCertificates()
        setCertificates(response.data)

    })

    useEffect(() => {
        fetchData()
    }, []);


    return (
        <div className={cl.container}>
            <div className={cl.window}>
                <h1 className={cl.title}>Выберете сертификат</h1>
                {isLoading && <Loader/>}
                {isDone &&  certificates.length > 0 && (
                    <DropdownMenu data={certificates} chosen={chosen} setChosen={setChosen}/>
                )}
                {chosen.NAME !== 'Выберете товар...' &&
                    <div className={cl.next}>
                        <span>
                            Цена: <b>{chosen.SUMMA} р.</b>
                        </span>

                        <button onClick={() => navigate('/form', { state: chosen})}>
                            Перейти к оплате
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default PageCertificates;