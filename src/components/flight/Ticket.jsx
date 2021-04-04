import React from 'react'

const Ticket = (flight) => {


    return (
        <>
            <div className="ticket-info">
                <div className="left-ticket">

                    <header className="ticket-header radius-left radius-right">
                        <span>FLIGHT TICKET : {flight.originAirPort} To {flight.destinationAirPort}</span>
                    </header>

                    <main className="main-ticket">
                        <div className="main-item">{flight.oridingCode}</div>
                        <div className="main-item airplane-icon"></div>
                        <div className="main-item">{flight.destinationCode}</div>
                    </main>

                    <footer className="footer-ticket">
                        <div className="left-footer">
                            <span>Boarding Date:</span> {flight.boardingDate} <br></br>
                            <span>Boarding Time:</span> {flight.boardingTime}
                        </div>
                        <div className="right-footer">
                            <span>Deparating Date:</span> {flight.deparatingDate} <br></br>
                            <span>Deparating Time:</span> {flight.deparatingTime}
                        </div>
                    </footer>

                </div>
                <div className="right-ticket">
                    <div className="dashed-ticket"></div>
                    <header className="ticket-header radius-right">
                        <span> {flight.oridingCode} <div className="mini-icon"></div> {flight.destinationCode} </span>
                    </header>

                    <main className="right-ticket-main">
                        <b>Price : </b>
                        <div> {flight.price} {flight.currency} </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Ticket;