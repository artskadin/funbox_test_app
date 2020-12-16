import React, {useContext, useState, useRef} from 'react'
import {v4 as uusdv4} from 'uuid'

const MainContext = React.createContext()

export const useMainContext = () => {
    return useContext(MainContext)
}

export function MainContextProvider({ children }) {
    const [currentPoint, setCurrentPoint] = useState('')
    const [pointsList, setPointsList] = useState([])
    const [searchInputValue, setSearchInputValue] = useState('')
    const [ymaps, setYmaps] = useState(null)
    const polyline = useRef(null)
    const searchInputRef = useRef(null)

    const [map, setMap] = useState(null)

    const addPointToList = (coords, locateName) => {
        setPointsList((prev) => [...prev, {
            id: uusdv4(),
            coords,
            locateName
        }])
    }

    const pointsListChangeHandler = (id, coords, locateName) => {
        setPointsList(prev => {
            return prev.map(point => {
                if (point.id === id) {
                    return {id, coords, locateName}
                }
                return point
            })
        })
    }
    
    const deletePoint = id => {
        setPointsList(prev => prev.filter(point => point.id !== id))
    }

    const inputChangeHandler = event => {
        setSearchInputValue(event.target.value)
    }

    const inputClearHandler = () => {
        setSearchInputValue('')
    }

    const myMapRef = ymaps => {
        if (ymaps) {
            setYmaps(ymaps)
            ymaps.events.add('click', e => {
                ymaps.balloon.close()
            })
        }
    }

    return (
        <MainContext.Provider value={{
            currentPoint,
            setCurrentPoint,
            pointsList,
            setPointsList,
            searchInputValue,
            setSearchInputValue,
            addPointToList,
            pointsListChangeHandler,
            deletePoint,
            inputChangeHandler,
            inputClearHandler,
            ymaps,
            setYmaps,
            polyline,
            searchInputRef,
            myMapRef,
            map, 
            setMap
        }}>
            { children }
        </MainContext.Provider>
    )
}