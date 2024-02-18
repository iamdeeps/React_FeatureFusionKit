import { useState } from "react";
import dummyData from './data'
import './styles.css'

const Accordian = () => {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multipleSelected, setMultipleSelected] = useState([])
    const handleSingleSelection = (getCurrentId) => {
        if (getCurrentId === selected) {
            setSelected(null)
        } else {
            setSelected(getCurrentId)
        }
    }

    const handleMultiSelection = (getCurrentId) => {
        let cpyMultipleState = [...multipleSelected];
        const findIndexOfCurrentId = cpyMultipleState.indexOf(getCurrentId);
        if (findIndexOfCurrentId === -1) {
            cpyMultipleState.push(getCurrentId);
        } else {
            cpyMultipleState.splice(findIndexOfCurrentId, 1);
        }
        setMultipleSelected(cpyMultipleState)
    }

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multiselection</button>
            <div className="accordian">
                {
                    dummyData && dummyData.length > 0 ?
                    dummyData.map(dataItem => (
                        <div className="item" key={dataItem.id}>
                            <div className="title" onClick={enableMultiSelection 
                                ? () => handleMultiSelection(dataItem.id) 
                                : () => handleSingleSelection(dataItem.id)}>
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                enableMultiSelection ?
                                multipleSelected.indexOf(dataItem.id) !== -1 && (
                                    <div className="content">{dataItem.answer}</div>
                                )
                                : selected === dataItem.id && (
                                    <div className="content">{dataItem.answer}</div>
                                )
                            }
                        </div>
                    )) : (<div>No Data Found</div>)
                }
            </div>
        </div>
    )
};

export default Accordian;