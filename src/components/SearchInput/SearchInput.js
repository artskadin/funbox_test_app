import React from 'react'
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/styles';
import {useMainContext} from '../MainContext';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
        marginLeft: 20
    }, 
    input: {
        width: '80%'
    }
}))

export default function SearchInput({locateName, onChange, onAdd}) {
    const classes = useStyles()

    const {
        setCurrentPoint, 
        addPointToList, 
        ymaps, 
        searchInputRef, 
        searchInputValue, 
        inputClearHandler, 
        inputChangeHandler,
        map
    } = useMainContext()

    const keyDownInputHandler = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            ymaps.geocode(e.target.value).then(result => {
                const coord = result.geoObjects.get(0).geometry.getCoordinates()
                const locateName = result.geoObjects.get(0).getAddressLine()
                setCurrentPoint(coord)
                addPointToList(coord, locateName)
                map.panTo(coord)
            })

            inputClearHandler()
            console.log(`input was pressed. ${e.target.value}`)
        }
    }


    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <Input
                    id="mySuggest" 
                    className={classes.input} 
                    onChange={inputChangeHandler}
                    value={searchInputValue}
                    inputRef={searchInputRef} 
                    placeholder="Введите ваш адрес + Enter" 
                    inputProps={{ 'aria-label': 'description' }} 
                    onKeyDown={keyDownInputHandler}
                />
            </form>
        </div>
    )
}