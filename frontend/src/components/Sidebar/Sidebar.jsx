import React from 'react'
import "./Sidebar.css"

function Sidebar() {
    return (
        <div className="sidebar">
            <div class="Group417">
                <img src={require('./assests/logo.svg').default} alt="logo"/>
            </div>
            <div className="Navigations">
                <div className="Frame716">
                    <div className="Frame716__content">
                        <span></span>
                        <h2>Threads</h2>
                    </div>
                    <div className="Frame716__content">
                        <span></span>
                        <h2>Mentions & Reactions</h2>
                    </div>
                    <div className="Frame716__content">
                        <span></span>
                        <h2>All DMS</h2>
                    </div>
                </div>
                <div className="Integrate">
                    <div className="Integrate__head">
                        <span></span>
                        <h2>Integrate</h2>
                    </div>
                    <div className="Integrate__contents">
                        <div className="Integrate__content">
                            <span></span>
                            <h3>lounge</h3>
                        </div>
                        <div className="Integrate__content">
                            <span></span>
                            <h3>notice board</h3>
                        </div>
                        <div className="Integrate__content">
                            <span></span>
                            <h3>avatar-room</h3>
                        </div>
                        <div className="Integrate__content">
                            <span></span>
                            <h3>meeting-room</h3>
                        </div>
                        <div className="Integrate__content">
                            <span></span>
                            <h3>music-room</h3>
                        </div>
                        <div className="Integrate__content">
                            <span></span>
                            <h3>conference-room</h3>
                        </div>
                    </div>

                </div>
                <div className="Frame719">
                    <div className="Frame719__content">
                        <div className="Frame719__content__dropdown">
                            <span></span>
                            <h2>Channels</h2>
                        </div>
                        <div className="Frame715">
                            <div className="Frame715__contents">
                                <div className="Frame715__content">
                                    <spa></spa>
                                    <h3>announcements</h3>
                                </div>
                                <div className="Frame715__content">
                                    <span></span>
                                    <h3>designers</h3>
                                </div>
                                <div className="Frame715__content">
                                    <span></span>
                                    <h3>stage 4</h3>
                                </div>
                            </div>
                            <span></span>
                        </div>
                    </div>
                    <span></span>
                </div>
                <div className="Frame718">
                    <div className="Frame718__content">
                        <div className="Frame718__content__dropdown">
                            <h2>Direct Messages</h2>
                        </div>
                        <div className="Frame717">
                            <div className="Avatars">
                                <div className="Avatar">
                                    <span></span>
                                    <h3>Miles Esther</h3>
                                </div>
                                <div className="Avatar">
                                    <span></span>
                                    <h3>Cooper Kristine</h3>
                                </div>
                                <div className="Avatar">
                                    <span></span>
                                    <h3>Flores Juanita</h3>
                                </div>
                                <div className="Avatar">
                                    <span></span>
                                    <h3>Black Marvin</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
