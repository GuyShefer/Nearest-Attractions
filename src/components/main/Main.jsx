import react from 'react'


const Main = () => {


    return (<>
        main
        {
            ("geolocation" in navigator) ?
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log('user latitude : ', position.coords.latitude);
                    console.log('user longitude : ', position.coords.longitude);
                })
                :
                console.log('not avaialble')

        }
    </>)
}

export default Main;