import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Map, Placemark, Polyline } from 'react-yandex-maps'
import { useMainContext } from '../MainContext';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        padding: 0,
        margin: 0
    }
}))

const mapState = {
    center: [59.935850, 30.315635],
    zoom: 10, 
    controls: ['zoomControl'],
}

const myPlacemark = {
    geometry: {
        type: 'point',
        coordinates: []
    },
    options: {
        draggable: true
    }
}

export default function MyMap() {
    const classes = useStyles()
 
    const {
        pointsList,
        pointsListChangeHandler,
        ymaps,
        setYmaps,
        polyline,
        setSearchInputValue,
        setMap,
        searchInputRef
    } = useMainContext()

    const onYMapsLoad = ymaps => {
        setYmaps(ymaps)
        new ymaps.SuggestView(searchInputRef.current.id).events.add('select', e => {
            setSearchInputValue(e.get('item').value)
            searchInputRef.current.focus()
        })
    }
    
    return (
        <>
            <Map
                instanceRef={map => {
                    try {map.behaviors.disable('scrollZoom')}
                    catch(e) {console.log(e)}
                    setMap(map)
                }}
                className={classes.root} 
                defaultState={mapState}
                modules={['control.ZoomControl', 'SuggestView']}
                onLoad={onYMapsLoad}
            >
                {pointsList.map((point, idx) => (
                    <Placemark
                        key={point.id}
                        geometry={point.coords}
                        properties={{
                            balloonContentHeader: idx+1,
                            balloonContentBody: `x: ${point.coords[0]}, y: ${point.coords[1]}`,
                            iconContent: idx+1
                        }}
                        options={myPlacemark.options}
                        // instanceRef={ref => {
                        //     if(ref) {
                        //         ref.geometry.events.add('change', e => {
                        //             polyline.current.geometry.set(idx, e.get('newCoordinates'))
                        //         })
                        //     }
                        // }}
                        onDragEnd={e => {
                            const newCoords = e.get('target').geometry.getCoordinates()
                            ymaps.geocode(newCoords).then(result => {
                                const locateName = result.geoObjects.get(0).getAddressLine()
                                pointsListChangeHandler(point.id, newCoords, locateName)
                            })
                        }}
                    />
                ))}
                <Polyline 
                    geometry={pointsList.map(point => point.coords)}
                    instanceRef={polyline}
                    options={{
                      balloonCloseButton: false,
                      strokeColor: "#000",
                      strokeWidth: 4,
                      strokeOpacity: 0.5
                    }}    
                />
            </Map>
        </>
    )
}