import React, {useState} from 'react';
import cl from './DropdownMenu.module.css'
import arrow from '../../Assets/Icons/arrow-down.svg'
const DropdownMenu = ({data, chosen, setChosen}) => {
    const [isSelect, setIsSelect] = useState(false)

    const handleChange = (item) => {
        setChosen(item)
        setIsSelect(false)
    }
    return (
        <div className={cl.menu}>
            <div className={cl.chosen} onClick={() => setIsSelect(!isSelect)}>
                <span>
                    {chosen.NAME}
                </span>
                <img className={cl.arrow} src={arrow} alt={'arrow'}/>
            </div>
            {isSelect &&
                <div className={cl.dropdown}>
                    {data.map((item) => (
                        <div key={item.ID} onClick={() => handleChange(item)} className={cl.dropdownItem}>
                            <span>{item.NAME}</span>
                        </div>
                    ))}
                </div>
            }

        </div>
    );
};

export default DropdownMenu;